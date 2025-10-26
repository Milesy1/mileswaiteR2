---
title: "TouchDesigner Event-Based Systems & Callbacks"
category: "tutorials"
keywords: ["touchdesigner", "event systems", "callbacks", "generative art", "python", "state management"]
technologies: ["touchdesigner", "python", "glsl", "audio reactive", "generative art"]
---

# TouchDesigner Event-Based Systems & Callbacks

## Overview

TouchDesigner's event-based architecture allows for sophisticated, reactive systems that respond to user input, audio, and other real-time data sources. This tutorial covers advanced patterns for building robust, maintainable event systems.

## Core Event Concepts

### 1. Event Flow Architecture
- **Event Sources**: User input, audio analysis, external data
- **Event Processing**: Filtering, transformation, and routing
- **Event Handlers**: Callback functions that respond to events
- **State Management**: Maintaining application state across events

### 2. Callback System
```python
# Basic callback pattern
def onButtonPress(button):
    print(f"Button {button.name} was pressed")
    # Handle the event

# Register callback
button.callback = onButtonPress
```

### 3. Event Propagation
- **Event Bubbling**: Events flow up the component hierarchy
- **Event Capturing**: Events flow down before bubbling up
- **Event Stopping**: Preventing further propagation
- **Custom Events**: Creating and dispatching custom events

## Advanced Event Patterns

### 1. State Machine Implementation
```python
class StateMachine:
    def __init__(self):
        self.current_state = 'idle'
        self.states = {
            'idle': self.handle_idle,
            'active': self.handle_active,
            'paused': self.handle_paused
        }
    
    def transition(self, new_state):
        if new_state in self.states:
            self.current_state = new_state
            self.states[new_state]()
    
    def handle_idle(self):
        # Idle state logic
        pass
    
    def handle_active(self):
        # Active state logic
        pass
    
    def handle_paused(self):
        # Paused state logic
        pass
```

### 2. Event Bus Pattern
```python
class EventBus:
    def __init__(self):
        self.listeners = {}
    
    def subscribe(self, event_type, callback):
        if event_type not in self.listeners:
            self.listeners[event_type] = []
        self.listeners[event_type].append(callback)
    
    def unsubscribe(self, event_type, callback):
        if event_type in self.listeners:
            self.listeners[event_type].remove(callback)
    
    def emit(self, event_type, data=None):
        if event_type in self.listeners:
            for callback in self.listeners[event_type]:
                callback(data)
```

### 3. Reactive Data Binding
```python
class ReactiveValue:
    def __init__(self, initial_value):
        self._value = initial_value
        self._callbacks = []
    
    @property
    def value(self):
        return self._value
    
    @value.setter
    def value(self, new_value):
        if self._value != new_value:
            old_value = self._value
            self._value = new_value
            self._notify_callbacks(old_value, new_value)
    
    def subscribe(self, callback):
        self._callbacks.append(callback)
    
    def _notify_callbacks(self, old_value, new_value):
        for callback in self._callbacks:
            callback(old_value, new_value)
```

## Audio-Reactive Systems

### 1. Audio Analysis Pipeline
```python
# Audio analysis setup
audio_in = op('audio_in')
fft = op('fft')
envelope = op('envelope')

# Audio-reactive parameters
def update_audio_params():
    # Get frequency data
    freq_data = fft['chan1']
    
    # Calculate energy in different frequency bands
    bass_energy = sum(freq_data[0:10])
    mid_energy = sum(freq_data[10:50])
    high_energy = sum(freq_data[50:100])
    
    # Update reactive parameters
    bass_param.value = bass_energy
    mid_param.value = mid_energy
    high_param.value = high_energy
```

### 2. Beat Detection
```python
class BeatDetector:
    def __init__(self, threshold=0.7):
        self.threshold = threshold
        self.last_beat_time = 0
        self.beat_callbacks = []
    
    def analyze_audio(self, audio_data):
        # Simple beat detection algorithm
        current_energy = sum(audio_data)
        
        if current_energy > self.threshold:
            current_time = absTime.frame
            if current_time - self.last_beat_time > 10:  # Minimum beat interval
                self.last_beat_time = current_time
                self.trigger_beat()
    
    def trigger_beat(self):
        for callback in self.beat_callbacks:
            callback()
    
    def on_beat(self, callback):
        self.beat_callbacks.append(callback)
```

### 3. Frequency-Based Effects
```python
def create_frequency_effects():
    # Bass frequencies (0-200 Hz)
    bass_filter = op('bass_filter')
    bass_filter.par.cutoff = bass_energy * 1000
    
    # Mid frequencies (200-2000 Hz)
    mid_filter = op('mid_filter')
    mid_filter.par.resonance = mid_energy * 10
    
    # High frequencies (2000+ Hz)
    high_filter = op('high_filter')
    high_filter.par.gain = high_energy * 2
```

## User Interaction Systems

### 1. Touch and Gesture Recognition
```python
class GestureRecognizer:
    def __init__(self):
        self.touch_points = []
        self.gesture_callbacks = {}
    
    def on_touch_start(self, touch_data):
        self.touch_points.append(touch_data)
        self.analyze_gesture()
    
    def on_touch_move(self, touch_data):
        # Update touch point
        for i, point in enumerate(self.touch_points):
            if point['id'] == touch_data['id']:
                self.touch_points[i] = touch_data
                break
        
        self.analyze_gesture()
    
    def on_touch_end(self, touch_data):
        # Remove touch point
        self.touch_points = [p for p in self.touch_points if p['id'] != touch_data['id']]
    
    def analyze_gesture(self):
        if len(self.touch_points) == 1:
            self.detect_single_touch_gesture()
        elif len(self.touch_points) == 2:
            self.detect_pinch_gesture()
        elif len(self.touch_points) > 2:
            self.detect_multi_touch_gesture()
    
    def detect_single_touch_gesture(self):
        # Single touch gesture logic
        pass
    
    def detect_pinch_gesture(self):
        # Pinch gesture logic
        pass
    
    def detect_multi_touch_gesture(self):
        # Multi-touch gesture logic
        pass
```

### 2. Parameter Automation
```python
class ParameterAutomation:
    def __init__(self, target_op, parameter_name):
        self.target_op = target_op
        self.parameter_name = parameter_name
        self.automation_data = []
        self.is_recording = False
    
    def start_recording(self):
        self.is_recording = True
        self.automation_data = []
    
    def stop_recording(self):
        self.is_recording = False
    
    def record_frame(self):
        if self.is_recording:
            current_value = self.target_op.par[self.parameter_name]
            self.automation_data.append({
                'frame': absTime.frame,
                'value': current_value
            })
    
    def play_automation(self):
        current_frame = absTime.frame
        for data_point in self.automation_data:
            if data_point['frame'] == current_frame:
                self.target_op.par[self.parameter_name] = data_point['value']
```

## Performance Optimization

### 1. Event Throttling
```python
class ThrottledEvent:
    def __init__(self, callback, delay=0.016):  # 60fps
        self.callback = callback
        self.delay = delay
        self.last_call = 0
    
    def __call__(self, *args, **kwargs):
        current_time = absTime.seconds
        if current_time - self.last_call >= self.delay:
            self.callback(*args, **kwargs)
            self.last_call = current_time
```

### 2. Event Batching
```python
class EventBatcher:
    def __init__(self, batch_size=10):
        self.batch_size = batch_size
        self.event_queue = []
        self.batch_callbacks = []
    
    def add_event(self, event_data):
        self.event_queue.append(event_data)
        
        if len(self.event_queue) >= self.batch_size:
            self.process_batch()
    
    def process_batch(self):
        batch = self.event_queue[:self.batch_size]
        self.event_queue = self.event_queue[self.batch_size:]
        
        for callback in self.batch_callbacks:
            callback(batch)
    
    def on_batch(self, callback):
        self.batch_callbacks.append(callback)
```

### 3. Memory Management
```python
class EventManager:
    def __init__(self):
        self.active_events = {}
        self.event_pool = []
    
    def create_event(self, event_type, data):
        # Reuse event objects from pool
        if self.event_pool:
            event = self.event_pool.pop()
            event.type = event_type
            event.data = data
        else:
            event = Event(event_type, data)
        
        self.active_events[event.id] = event
        return event
    
    def destroy_event(self, event_id):
        if event_id in self.active_events:
            event = self.active_events.pop(event_id)
            # Reset and return to pool
            event.reset()
            self.event_pool.append(event)
```

## Real-World Applications

### 1. Interactive Installation
```python
class InteractiveInstallation:
    def __init__(self):
        self.audio_analyzer = AudioAnalyzer()
        self.gesture_recognizer = GestureRecognizer()
        self.visual_generator = VisualGenerator()
        
        # Connect events
        self.audio_analyzer.on_beat = self.visual_generator.trigger_beat
        self.gesture_recognizer.on_gesture = self.visual_generator.update_gesture
    
    def update(self):
        self.audio_analyzer.update()
        self.gesture_recognizer.update()
        self.visual_generator.update()
```

### 2. Live Performance System
```python
class LivePerformanceSystem:
    def __init__(self):
        self.scenes = {}
        self.current_scene = None
        self.transition_manager = TransitionManager()
        
        # Scene management events
        self.on_scene_change = EventBus()
        self.on_transition_start = EventBus()
        self.on_transition_end = EventBus()
    
    def change_scene(self, scene_name):
        if scene_name in self.scenes:
            self.transition_manager.transition_to(
                self.scenes[scene_name],
                self.on_transition_complete
            )
    
    def on_transition_complete(self):
        self.current_scene = self.transition_manager.target_scene
        self.on_scene_change.emit('scene_changed', self.current_scene)
```

### 3. Data Visualization
```python
class DataVisualizationSystem:
    def __init__(self):
        self.data_sources = {}
        self.visualization_components = {}
        self.update_scheduler = UpdateScheduler()
        
        # Data update events
        self.on_data_update = EventBus()
        self.on_visualization_change = EventBus()
    
    def add_data_source(self, name, source):
        self.data_sources[name] = source
        source.on_update = lambda data: self.handle_data_update(name, data)
    
    def handle_data_update(self, source_name, data):
        self.on_data_update.emit('data_updated', {
            'source': source_name,
            'data': data
        })
        
        # Update relevant visualizations
        for viz_name, viz in self.visualization_components.items():
            if viz.depends_on(source_name):
                viz.update_data(data)
```

## Best Practices

### 1. Event System Design
- **Single Responsibility**: Each event handler should have one clear purpose
- **Loose Coupling**: Minimize dependencies between event handlers
- **Error Handling**: Implement robust error handling for all events
- **Documentation**: Document event types and their expected data

### 2. Performance Considerations
- **Event Frequency**: Monitor and limit event frequency
- **Memory Usage**: Implement proper cleanup and memory management
- **CPU Usage**: Profile and optimize event processing
- **Threading**: Use appropriate threading for CPU-intensive operations

### 3. Debugging and Monitoring
- **Event Logging**: Log important events for debugging
- **Performance Metrics**: Monitor event processing performance
- **Error Tracking**: Track and report event-related errors
- **Visual Debugging**: Create visual tools for event system debugging

## Common Patterns and Solutions

### 1. Event Ordering
```python
class EventScheduler:
    def __init__(self):
        self.event_queue = []
        self.priority_levels = {
            'critical': 0,
            'high': 1,
            'normal': 2,
            'low': 3
        }
    
    def schedule_event(self, event, priority='normal'):
        event.priority = self.priority_levels[priority]
        self.event_queue.append(event)
        self.event_queue.sort(key=lambda e: e.priority)
    
    def process_events(self):
        while self.event_queue:
            event = self.event_queue.pop(0)
            event.execute()
```

### 2. Event Filtering
```python
class EventFilter:
    def __init__(self, filter_function):
        self.filter_function = filter_function
        self.filtered_callbacks = []
    
    def add_callback(self, callback):
        self.filtered_callbacks.append(callback)
    
    def process_event(self, event):
        if self.filter_function(event):
            for callback in self.filtered_callbacks:
                callback(event)
```

### 3. Event Transformation
```python
class EventTransformer:
    def __init__(self, transform_function):
        self.transform_function = transform_function
        self.transformed_callbacks = []
    
    def add_callback(self, callback):
        self.transformed_callbacks.append(callback)
    
    def process_event(self, event):
        transformed_event = self.transform_function(event)
        for callback in self.transformed_callbacks:
            callback(transformed_event)
```

TouchDesigner's event-based architecture provides powerful tools for building sophisticated, reactive systems. The key to success lies in thoughtful design, proper abstraction, and careful attention to performance and maintainability.
