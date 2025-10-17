---
title: "TouchDesigner Modular MIDI-to-SOP System"
category: "projects"
keywords: ["touchdesigner", "midi", "python", "modular", "persistent storage", "parameter mapping", "sop control", "live performance", "generative art", "audio-reactive", "emergent behavior", "real-time", "json", "backup systems"]
technologies: ["TouchDesigner 2023.12480+", "Python", "MIDI", "TDAbleton", "Ableton Live", "JSON", "Table DAT"]
---

# TouchDesigner Modular MIDI-to-SOP System

A comprehensive modular system for TouchDesigner that creates audio-reactive visuals with emergent geometry generation. Features a complete MIDI input handling system, persistent storage, parameter mapping, and SOP state management for live performance and generative art.

## Challenge

Create a robust, modular system for live MIDI control of TouchDesigner SOPs with persistent state management, parameter mapping, and emergent behavior generation. The system must handle real-time MIDI input, maintain state across sessions, and provide intuitive UI controls for live performance.

## Solution

Built a 9-module system with persistent storage, MIDI input normalization, parameter mapping editor, SOP state control, and integration scripts. Architecture includes: MIDI In DAT → midi_input_handler_DAT → midi_listener_DAT → parameter_mod_DAT → SOP pool.

## Key Features

- **Persistent Storage**: JSON-based configuration with backup system
- **MIDI Handling**: Normalizes MIDI messages, filters by channel/type/velocity
- **Parameter Mapping**: Visual editor for MIDI/CC → SOP parameter control
- **SOP States**: Three states per SOP (ON, OFF, MIDI-ONLY)
- **Modular Architecture**: 9-module system with clear data flow

## Current Status

Foundation working with basic MIDI note → SOP mapping. System supports persistent storage, parameter mapping, and SOP state management. Ready for expansion to full 9-module system.
