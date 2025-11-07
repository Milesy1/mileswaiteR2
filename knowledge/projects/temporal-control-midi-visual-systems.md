---
title: "Temporal Control in MIDI-Driven Visual Systems"
category: "projects"
keywords: ["TouchDesigner", "MIDI", "Temporal Control", "CHOP Animation", "Generative Motion"]
technologies: ["TouchDesigner", "Python", "Speed CHOP", "LFO CHOP", "Ableton Link"]
---

# Temporal Control in MIDI-Driven Visual Systems

## Overview

Extends the event-driven MIDI mapping framework with time-based behaviours so that a single trigger can launch evolving animations. The approach separates orchestration (Python) from execution (CHOP networks) to achieve smooth, frame-accurate motion without continuous user input.

## Motivation

- Traditional MIDI note mappings set parameters instantly—useful but limited for cinematic or organic motion.
- Temporal control treats notes as initiators of transitions, enabling ramps, oscillations, and sequences that unfold autonomously once triggered.

## Architecture

- **Python Layer:** Evaluates incoming MIDI events, consults mapping tables, and configures temporal behaviours (ramp targets, durations, LFO presets) instead of writing values directly.
- **CHOP Layer:** Speed, LFO, and Filter CHOPs manage interpolation, continuous modulation, and smoothing. SOP parameters reference these CHOP outputs via expressions, removing per-frame Python overhead.

## Temporal Behaviours

- **Ramps & Transitions:** Parameters glide between states using linear or curved interpolation; duration can scale from velocity.
- **Continuous Modulation:** Layered LFOs create breathing or drifting motion and run until disabled.
- **Choreographed Sequences:** Multi-step animations align across different objects using keyframe-style timelines.
- **Musical Synchronisation:** Durations expressed in beats stay tempo-locked via MIDI clock or Ableton Link.

## Visual Outcomes

- Organic motion and “breathing” geometry
- Cinematic camera moves and staged reveals
- Impact-driven surges with natural decay curves
- Layered timescales for temporal depth
- Physics-inspired spring behaviours with damping

## Technical Considerations

- Mapping tables store ramp durations, modulation modes, and curve types alongside existing parameters.
- State management tracks active ramps for restarts or blending when new triggers arrive mid-transition.
- Core system can be implemented in ~6–8 hours; full feature set—including LFO stacks and BPM sync—takes 15–20 hours depending on complexity.

## Related Links

- Blog post: [Temporal Control in MIDI-Driven Visual Systems](/blog/temporal-control-midi-visual-systems)
- Codebase: [Milesy1/emergent-geometry](https://github.com/Milesy1/emergent-geometry)

