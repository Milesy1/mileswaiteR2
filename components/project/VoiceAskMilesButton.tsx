'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from '../../contexts/ThemeContext';

// Type definitions for SpeechRecognition API
interface SpeechRecognitionResult {
  [key: number]: {
    [key: number]: {
      transcript: string;
      confidence: number;
    };
  };
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
  error?: string;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: 'no-speech' | 'aborted' | 'audio-capture' | 'network' | 'not-allowed' | 'service-not-allowed';
  message?: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null;
  onend: ((this: SpeechRecognition, ev: Event) => void) | null;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor;
    webkitSpeechRecognition: SpeechRecognitionConstructor;
  }
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function VoiceAskMilesButton() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [buttonText, setButtonText] = useState('Ask Miles');
  const [error, setError] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showChatWidget, setShowChatWidget] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [messages, setMessages] = useState<Array<{id: string, type: 'user' | 'ai', content: string, timestamp: Date}>>([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get page context for AI
  const getPageType = (pathname: string) => {
    if (pathname.startsWith('/projects/')) return 'project';
    if (pathname.startsWith('/blog/')) return 'blog';
    if (pathname === '/code') return 'code';
    if (pathname === '/music') return 'music';
    if (pathname === '/now') return 'now';
    return 'general';
  };

  const getPageContent = (pathname: string) => {
    const pageType = getPageType(pathname);
    if (pageType === 'project') {
      return `Project page: ${pathname.split('/').pop()}`;
    }
    return `Page: ${pathname}`;
  };

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      try {
        const SpeechRecognition = window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        
        if (recognitionRef.current) {
          recognitionRef.current.continuous = false;
          recognitionRef.current.interimResults = false;
          recognitionRef.current.lang = 'en-US';
          recognitionRef.current.maxAlternatives = 1;

          recognitionRef.current.onstart = () => {
            if (process.env.NODE_ENV === 'development') {
              console.log('Speech recognition started');
            }
            setIsListening(true);
            setButtonText('Listening... (Click to stop)');
            setError(null);
          };

          recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = event.results[0][0].transcript;
            
            // Add user message to chat
            const messageId = Date.now().toString();
            setMessages(prev => [...prev, {
              id: messageId,
              type: 'user',
              content: transcript,
              timestamp: new Date()
            }]);
            
            handleVoiceQuery(transcript);
          };

          recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
            // Handle different error types silently
            let errorMessage = '';
            switch (event.error) {
              case 'network':
                errorMessage = 'Network error. Please check your internet connection and try again.';
                break;
              case 'not-allowed':
                errorMessage = 'Microphone access denied. Please enable microphone permissions.';
                break;
              case 'no-speech':
                errorMessage = 'No speech detected. Please try speaking again.';
                break;
              case 'aborted':
                errorMessage = 'Speech recognition was interrupted.';
                break;
              default:
                errorMessage = `Speech recognition error: ${event.error}`;
            }
            
            setError(errorMessage);
            setIsListening(false);
            setButtonText('Ask Miles');
            
            // Show chat widget fallback for network errors
            if (event.error === 'network' || event.error === 'not-allowed') {
              setShowChatWidget(true);
            }
          };

          recognitionRef.current.onend = () => {
            if (isListening) {
              setIsListening(false);
              setButtonText('Ask Miles');
            }
          };
        }
        } catch (initError) {
          setError('Speech recognition initialization failed');
        }
    } else {
      setError('Speech recognition not supported in this browser');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts(prev => prev.slice(1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isWaitingForResponse]);

  const handleVoiceQuery = async (transcript: string) => {
    setIsProcessing(true);
    setButtonText('Thinking...');

    try {
      const pageContext = {
        pathname: pathname || '',
        pageType: getPageType(pathname || ''),
        pageContent: getPageContent(pathname || ''),
        metadata: {
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent
        }
      };

      // Clean the pageContext to prevent JSON parsing issues
      const cleanPageContext = {
        pathname: pageContext.pathname || '',
        pageType: pageContext.pageType || '',
        pageContent: (pageContext.pageContent || '').replace(/[^\w\s.,!?-]/g, ''),
        metadata: pageContext.metadata || {}
      };

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: transcript,
          pageContext: cleanPageContext
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const responseText = data.response || data.message || 'No response received';

      // Add AI response to chat
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: responseText,
        timestamp: new Date()
      }]);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      // Add error message to chat
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `Error: ${errorMessage}`,
        timestamp: new Date()
      }]);
    } finally {
      setIsProcessing(false);
      setButtonText('Ask Miles');
    }
  };

  const handleTextQuery = async () => {
    if (!textInput.trim()) return;
    
    const userMessage = textInput.trim();
    const messageId = Date.now().toString();
    
    // Add user message to chat
    setMessages(prev => [...prev, {
      id: messageId,
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    }]);
    
    setTextInput('');
    setIsWaitingForResponse(true);
    
    try {
      const pageContext = {
        pathname: pathname || '',
        pageType: getPageType(pathname || ''),
        pageContent: getPageContent(pathname || ''),
        metadata: {
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent
        }
      };

      // Clean the pageContext to prevent JSON parsing issues
      const cleanPageContext = {
        pathname: pageContext.pathname || '',
        pageType: pageContext.pageType || '',
        pageContent: (pageContext.pageContent || '').replace(/[^\w\s.,!?-]/g, ''),
        metadata: pageContext.metadata || {}
      };

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          pageContext: cleanPageContext
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const responseText = data.response || data.message || 'No response received';
      
      // Add AI response to chat
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: responseText,
        timestamp: new Date()
      }]);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      // Add error message to chat
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `Error: ${errorMessage}`,
        timestamp: new Date()
      }]);
    } finally {
      setIsWaitingForResponse(false);
    }
  };

  const closeChatWidget = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowChatWidget(false);
      setIsClosing(false);
      setTextInput('');
      setMessages([]);
      setIsWaitingForResponse(false);
    }, 300); // Match the animation duration
  };

  const startListening = () => {
    if (isListening) {
      // Double-click to stop listening
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      return;
    }

    // Clear any previous errors
    setError(null);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (startError) {
        setError('Failed to start speech recognition. Please try again.');
        setShowChatWidget(true);
      }
    } else {
      setError('Speech recognition not available in this browser');
      setShowChatWidget(true);
    }
  };

  return (
    <>
      <button
        onClick={startListening}
        disabled={isProcessing}
        className={`inline-flex items-center px-6 py-2 text-sm font-medium rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
          theme === 'dark'
            ? 'text-neutral-900 bg-white hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white'
            : 'text-white bg-neutral-900 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900'
        }`}
      >
        {buttonText}
      </button>


      {/* Toast Notifications */}
      {toasts.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`max-w-sm p-4 rounded-lg shadow-lg ${
                toast.type === 'success' 
                  ? 'bg-green-500 text-white' 
                  : toast.type === 'error' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-blue-500 text-white'
              }`}
            >
              <p className="text-sm">{toast.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Chat Widget - Facebook Messenger Style */}
      {(showChatWidget || isClosing) && (
        <div className={`fixed bottom-4 right-2 sm:right-4 z-50 w-80 max-w-[calc(100vw-1rem)] sm:max-w-[calc(100vw-2rem)] sm:w-80 rounded-lg shadow-2xl border transition-all duration-300 ease-out transform ${
          theme === 'dark' 
            ? 'bg-neutral-900 border-gray-700' 
            : 'bg-white border-gray-200'
        } ${isClosing ? 'animate-out fade-out-0 zoom-out-95' : 'animate-in slide-in-from-bottom-4 fade-in-0 zoom-in-95'}`}
        style={{
          animation: isClosing ? 'fadeOutDown 0.3s ease-in' : 'fadeInUp 0.5s ease-out'
        }}>
          {/* Chat Header */}
          <div className={`p-4 rounded-t-lg flex items-center justify-between ${
            theme === 'dark' 
              ? 'bg-white text-neutral-900' 
              : 'bg-neutral-900 text-white'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="text-left">
                <h3 className="font-semibold">mileswaite.net</h3>
                <p className={`text-xs ${
                  theme === 'dark' 
                    ? 'text-neutral-600' 
                    : 'text-neutral-300'
                }`}>AI Assistant</p>
              </div>
            </div>
            <button
              onClick={closeChatWidget}
              className={`transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'text-neutral-600 hover:text-neutral-900' 
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Messages */}
          <div className={`h-64 sm:h-80 overflow-y-auto p-3 sm:p-4 space-y-3 ${
            theme === 'dark' ? 'bg-neutral-900' : 'bg-white'
          }`}>
            {messages.length === 0 && (
              <div className="text-center text-neutral-400 py-8">
                <p className="text-sm">Sensitive Dependence on Initial Conditions:</p>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.type === 'user'
                      ? theme === 'dark'
                        ? 'bg-white text-neutral-900'
                        : 'bg-neutral-900 text-white'
                      : theme === 'dark'
                        ? 'bg-gray-700 text-gray-100'
                        : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' 
                      ? theme === 'dark'
                        ? 'text-neutral-600'
                        : 'text-neutral-300'
                      : theme === 'dark' 
                        ? 'text-gray-400' 
                        : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isWaitingForResponse && (
              <div className="flex justify-start animate-in fade-in duration-300">
                <div className={`px-3 py-2 rounded-lg text-sm ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-gray-100' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <div className="flex items-center space-x-2">
                    <div className={`animate-spin rounded-full h-4 w-4 border-b-2 ${
                      theme === 'dark' ? 'border-gray-400' : 'border-gray-600'
                    }`}></div>
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Auto-scroll target */}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className={`p-3 sm:p-4 border-t ${
            theme === 'dark' ? 'border-gray-700 bg-neutral-900' : 'border-gray-200 bg-white'
          }`}>
            <div className="flex space-x-2">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTextQuery()}
                placeholder="Type your message..."
                className={`flex-1 px-3 py-2 border rounded-full focus:outline-none focus:ring-2 text-sm transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:ring-neutral-400 focus:border-neutral-400'
                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-neutral-500 focus:border-neutral-500'
                }`}
                disabled={isWaitingForResponse}
              />
              <button
                onClick={handleTextQuery}
                disabled={!textInput.trim() || isWaitingForResponse}
                className={`px-4 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-white text-neutral-900 hover:bg-neutral-100'
                    : 'bg-neutral-900 text-white hover:bg-neutral-800'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
