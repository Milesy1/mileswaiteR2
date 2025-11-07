---
title: "Modular Emergent MIDI Mapping System Updates"
category: "projects"
keywords: ["TouchDesigner", "MIDI", "Generative Art", "Velocity Sensitivity", "One-to-Many Mapping"]
technologies: ["TouchDesigner", "Python", "CHOP", "Table DAT", "SOP Modulation"]
---

# Modular Emergent MIDI Mapping System Updates

## Overview

Recent enhancements to the modular, event-driven MIDI control system extend expressive range and reliability for live visual performance. The updates focus on richer parameter modulation, expanded mapping flexibility, and runtime stability while preserving the modular architecture originally described in the [Emergent Geometry](/blog/emergent-geometry-midi-sop-reactivity) write-up.

## Key Enhancements

- **Velocity-Sensitive Modulation:** Mapping tables now include an optional `use_velocity` column. When enabled, incoming MIDI note velocities (0–127) scale parameter values within defined min/max ranges, delivering dynamic response from soft to hard hits without breaking existing presets.
- **One-to-Many Geometry Mappings:** A single MIDI note can trigger multiple SOP parameters simultaneously, matching the existing CC behaviour and unlocking synchronised multi-parameter gestures from a single pad or key.
- **Enhanced Parameter Types:** Decimal values (e.g. 0.1, 2.0) are fully supported, and randomisation respects parameter type—uniform distribution for floats and discrete selection for integers.
- **Multi-Mode Note Control:** Three modes—Momentary, Note-based Toggle, and Any-note Toggle—cover sustained behaviours, exclusive selection, and quick toggles respectively.
- **Performance Improvements:** Mapping table caching reduces I/O, while SOP cooking is tuned to respect TouchDesigner cook cycles yet still apply parameter updates immediately.
- **CC Mapping Parity:** Control Change messages inherit one-to-many support for continuous modulation via faders, knobs, and automation lanes.

## Current State

The modular rewrite keeps MIDI ingestion, mapping logic, and SOP modulation decoupled, making it straightforward to extend or swap components without ripple effects. During live testing the system maintained stable cook times, even with dense mapping tables and rapid triggers.

## Implementation Notes

- Mapping tables store per-row configuration, including velocity usage, ranges, and target SOP paths.
- Python callbacks handle event routing and caching, while SOP operations remain modular.
- TouchDesigner components are organised for quick expansion into new render layers or performance presets.

## Related Links

- Blog post: [Recent Updates: Modular Emergent MIDI Mapping System](/blog/modular-emergent-midi-mapping-updates)
- Codebase: [Milesy1/emergent-geometry](https://github.com/Milesy1/emergent-geometry)

