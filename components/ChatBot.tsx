'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { track } from '@vercel/analytics';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle keyboard detection
  useEffect(() => {
    const handleResize = () => {
      const initialHeight = window.innerHeight;
      const currentHeight = window.visualViewport?.height || window.innerHeight;
      const heightDifference = initialHeight - currentHeight;
      
      // If height decreased significantly, keyboard is likely open
      setIsKeyboardOpen(heightDifference > 150);
    };

    // Use visualViewport API if available (better for mobile)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    } else {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      } else {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // Prevent automatic scrolling when keyboard is open
  const scrollToBottom = () => {
    if (!isKeyboardOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputFocus = () => {
    // Prevent page scroll when input is focused
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    if (messages.length > 0 && !isKeyboardOpen) {
      scrollToBottom();
    }
  }, [messages, isKeyboardOpen]);

  useEffect(() => {
    if (isLoading && !isKeyboardOpen) {
      scrollToBottom();
    }
  }, [isLoading, isKeyboardOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setError(null);

    // Track chat session start (first message)
    if (messages.length === 0) {
      track('chat_session_start');
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const aiMessage: Message = { role: 'assistant', content: data.message };
      setMessages([...newMessages, aiMessage]);
      
      // Only scroll if keyboard is not open
      if (!isKeyboardOpen) {
        setTimeout(() => {
          scrollToBottom();
        }, 100);
      }
      
      // Track successful conversation turn
      track('chat_conversation_turn', {
        total_messages: newMessages.length + 1,
        user_message_length: userMessage.content.length,
        ai_response_length: aiMessage.content.length
      });
    } catch (err) {
      setError('Sorry, I encountered an error. Please try again.');
      console.error('Chat error:', err);
      
      // Track client-side errors
      track('chat_client_error', {
        error: err instanceof Error ? err.message : 'unknown'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Dynamic height calculation for mobile
  const getContainerHeight = () => {
    if (isKeyboardOpen) {
      // When keyboard is open, use a smaller fixed height
      return 'h-64';
    }
    return 'h-96';
  };

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-4xl mx-auto chatbot-container"
      style={{
        // Use dynamic viewport height to account for keyboard
        maxHeight: isKeyboardOpen ? '40vh' : '60vh',
        minHeight: isKeyboardOpen ? '32vh' : '48vh'
      }}
    >
      <div className="bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden flex flex-col">
        {/* Messages Container */}
        <div 
          className={`${getContainerHeight()} overflow-y-auto p-4 space-y-4 flex-1 chatbot-messages`}
          style={{
            // Ensure proper scrolling behavior
            scrollBehavior: 'smooth',
            // Prevent content from being hidden behind keyboard
            paddingBottom: isKeyboardOpen ? '1rem' : '1rem'
          }}
        >
          {messages.length === 0 && (
            <div className="text-center text-neutral-400 py-8">
              <p className="text-sm">Sensitive Dependence on Initial Conditions:</p>
            </div>
          )}
          
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-800 text-neutral-100'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-neutral-800 text-neutral-100 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs text-neutral-400">Thinking...</span>
                </div>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-red-900/20 border border-red-800 text-red-300 px-4 py-2 rounded-lg">
                <p className="text-sm">{error}</p>
              </div>
            </motion.div>
          )}

          {messages.length > 0 && <div ref={messagesEndRef} />}
        </div>

        {/* Input Container - Fixed at bottom */}
        <div 
          className="border-t border-neutral-800 p-4 flex-shrink-0 chatbot-input"
          style={{
            // Ensure input stays visible above keyboard
            position: 'sticky',
            bottom: 0,
            backgroundColor: 'rgb(23 23 23)', // neutral-900
            zIndex: 10
          }}
        >
          <div className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={handleInputFocus}
              placeholder="Retrieval-Augmented Generation"
              disabled={isLoading}
              className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-base text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                fontSize: '16px', // Prevent zoom on iOS
                transform: 'translateZ(0)' // Hardware acceleration
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-700 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 flex-shrink-0"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}