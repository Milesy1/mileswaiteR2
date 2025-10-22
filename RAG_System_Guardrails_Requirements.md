# RAG System Guardrails & Fallbacks - Business Requirements Document

**Project:** Portfolio Chatbot RAG Enhancement  
**Version:** 1.0  
**Date:** October 22, 2025  
**Author:** Portfolio Development Team

## Executive Summary

This document outlines requirements for adding guardrails and fallback mechanisms to the existing Entity-Based Semantic Chunking RAG system. The current system uses keyword matching across structured portfolio entities but lacks robust handling of edge cases, typos, and query failures.

### Goals:
- Prevent hallucinations when no relevant context is found
- Improve search recall through synonym/alias support
- Gracefully handle off-topic and malformed queries
- Maintain system simplicity and performance
- Enable continuous improvement through analytics and testing

## Current System Overview

**Architecture:** Domain-Entity Chunking with Keyword Filtering

**Process Flow:**
```
User Query → Extract Keywords → Match Against Entities → Return Complete Entities as Context → LLM Response
```

**Entity Types:**
- Projects (work examples)
- Expertise (capabilities)
- Music (influences)
- Theorists (academic background)
- Concepts (theoretical knowledge)

**Current Limitations:**
- No handling of zero-match scenarios
- No typo tolerance or abbreviation support
- No context size limiting
- No off-topic query detection
- Limited debugging and monitoring capabilities

---

## Functional Requirements

### FR-1: Empty Results Fallback System

**Priority:** Critical  
**Description:** Handle scenarios where keyword matching returns zero entities.

**Requirements:**
1. Detect when all entity arrays (projects, expertise, music) are empty
2. Implement two-tier fallback strategy:
   - **Tier 1:** Retry search with lower keyword length threshold (3→2 characters)
   - **Tier 2:** If still empty, return all entities with size limits (max 5 music items)
3. Append contextual instructions to system prompt indicating fallback was used
4. Track analytics event `rag_fallback` with strategy type (`broader_search` | `return_all`)

**Acceptance Criteria:**
- No query results in zero context being sent to LLM without fallback attempt
- System prompt clearly communicates retrieval context to LLM
- Analytics capture fallback frequency for monitoring

---

### FR-2: Keyword Alias & Synonym System

**Priority:** High  
**Description:** Expand keyword matching to include common abbreviations and synonyms.

**Requirements:**
1. Create `KEYWORD_ALIASES` mapping canonical terms to variant list:
```
   touchdesigner → [td, touch designer, derivative]
   midi → [musical instrument digital interface]
   max → [max/msp, maxmsp, cycling74]
   ableton → [live, ableton live]
   ml → [machine learning, ai, artificial intelligence]
```

2. Implement `expandKeywords()` function that:
   - Takes extracted keywords array
   - Looks up each keyword in alias mapping
   - Returns expanded set including original keywords and all aliases
   - Deduplicates results

3. Integrate with existing keyword extraction pipeline
4. Support case-insensitive matching

**Acceptance Criteria:**
- Query "TD projects" successfully matches "TouchDesigner" entities
- Query "ML expertise" matches "machine learning" and "AI" entities
- Alias expansion is transparent to end user
- System maintains list of aliases as configuration (easily updatable)

**Future Enhancement:**
- Add comment system for documenting how to add new aliases based on analytics

---

### FR-3: Context Size Limiting

**Priority:** Critical  
**Description:** Prevent token overflow and manage LLM costs by capping context size.

**Requirements:**
1. Create `limitContextSize()` function with configurable max entities (default: 15)
2. Count total entities across all arrays (projects + expertise + music)
3. If under limit, return context unchanged
4. If over limit, truncate with priority order:
   - **Priority 1:** Projects
   - **Priority 2:** Expertise
   - **Priority 3:** Music
5. Apply limiting after retrieval, before LLM invocation
6. Track analytics event `context_truncated` with original and final counts

**Acceptance Criteria:**
- No context exceeds 15 total entities
- Truncation preserves highest-priority content
- Analytics capture truncation frequency
- Function accepts TypeScript-typed parameters and returns proper type signature

---

### FR-4: Off-Topic Query Detection

**Priority:** High  
**Description:** Identify and handle queries unrelated to portfolio content.

**Requirements:**
1. Create `isPortfolioRelated()` function returning boolean
2. Implement pattern matching for off-topic queries:
   - "what is the capital of..."
   - "who is the president..."
   - "recipe for..."
   - "weather in..."
   - "how to cook/bake/fix..."
3. Implement pattern matching for portfolio-related terms:
   - project, work, experience, expertise
   - touchdesigner, max, midi, music, installation
   - "you built", "you created", "your background"
4. Use case-insensitive matching
5. If detected as off-topic:
   - Set context to empty
   - Append instruction to system prompt: "NOTE: This query seems off-topic. Politely guide conversation back to portfolio work."
   - Track analytics: `off_topic_query_detected`

**Acceptance Criteria:**
- Obvious non-portfolio queries are detected (>90% accuracy on common patterns)
- Portfolio-related queries are not false-flagged
- System degrades gracefully (conversational response rather than error)
- Pattern lists are easily extensible via configuration

---

### FR-5: Result Quality Validation

**Priority:** Medium  
**Description:** Validate retrieval quality and provide actionable feedback.

**Requirements:**
1. Create `validateContextQuality()` function returning:
```typescript
{ valid: boolean; issue?: string; action?: string }
```
2. Implement three validation rules:
   - **Zero entities:** `{ valid: false, issue: 'no_matches', action: 'use_fallback' }`
   - **Excessive entities (>15):** `{ valid: false, issue: 'too_many_matches', action: 'limit_context' }`
   - **Normal range:** `{ valid: true }`
3. Execute validation after retrieval, before LLM invocation
4. Track analytics event `context_quality_issue` with issue type when validation fails
5. Provide clear TypeScript types for return object

**Acceptance Criteria:**
- Validation catches edge cases (0 matches, excessive matches)
- Return object provides actionable guidance
- Analytics enable monitoring of retrieval quality over time
- Validation is non-blocking (informational only)

---

### FR-6: Dynamic System Prompt Instructions

**Priority:** Medium  
**Description:** Adapt LLM instructions based on retrieval context quality.

**Requirements:**
1. Append conditional instructions to system prompt based on context state:

   **When zero projects matched:**
```
   ⚠️ IMPORTANT: No specific projects matched the query. Either ask 
   clarifying questions, suggest related topics, or politely explain 
   you work best discussing specific projects.
```

   **When fewer than 2 keywords extracted:**
```
   ⚠️ Query was very short. Ask clarifying questions to better assist.
```

   **When more than 10 total entities matched:**
```
   ⚠️ Many items matched. Summarize broadly or ask which aspect 
   interests them most.
```

2. Preserve existing system prompt and append instructions
3. Use clear line breaks (`\n\n`) between sections
4. Apply logic after context retrieval, before LLM invocation

**Acceptance Criteria:**
- LLM receives context-appropriate instructions for each query
- Instructions guide LLM toward better handling of edge cases
- System prompt remains readable and well-formatted
- Instructions are applied conditionally (only when relevant)

---

### FR-7: Enhanced Analytics & Monitoring

**Priority:** High  
**Description:** Comprehensive tracking of RAG system performance for continuous improvement.

**Requirements:**
1. Implement analytics events for key metrics:

   **Event: `rag_retrieval_summary` (fires on every query)**
```typescript
{
  projects_count: number,
  expertise_count: number,
  music_count: number,
  keywords_count: number,
  query_length: number
}
```

   **Event: `rag_empty_results` (fires when no matches)**
```typescript
{
  query: string,
  keywords_extracted: string[]
}
```

   **Event: `rag_fallback_triggered` (fires when fallback activates)**
```typescript
{
  fallback_type: 'broader_search' | 'return_all',
  original_query: string
}
```

   **Event: `context_size_warning` (fires when exceeding threshold)**
```typescript
{
  total_entities: number,
  truncated: boolean
}
```

2. Place tracking calls at appropriate points in retrieval flow
3. Include inline comments explaining when each event fires
4. Ensure tracking doesn't impact performance (async/non-blocking)

**Acceptance Criteria:**
- All major retrieval outcomes are tracked
- Analytics enable identification of common failure modes
- Data supports monthly review and optimization
- Tracking implementation is well-documented

---

### FR-8: Automated Test Suite

**Priority:** High  
**Description:** Comprehensive test coverage for RAG system edge cases and regressions.

**Requirements:**
1. Create test file: `__tests__/rag-retrieval.test.ts`
2. Implement test cases for edge scenarios:
   - Empty query returns no results
   - Single keyword "touchdesigner" matches expected projects
   - Abbreviation "TD" matches TouchDesigner projects (via aliases)
   - Typo "TouchDsigner" - document expected behavior
   - Off-topic query "capital of France" returns empty context
   - Gibberish input "xyzabc" returns empty context
   - Multiple keywords "MIDI sensors TouchDesigner" returns intersection
   - Query matching 20+ entities gets limited to 15
3. Use existing test framework (Jest or Vitest)
4. Mock analytics `track()` function
5. Include comments explaining validation purpose for each test
6. Add test that logs full context for manual inspection

**Acceptance Criteria:**
- Test suite is runnable via `npm test`
- All edge cases defined in requirements are covered
- Tests serve as living documentation of expected behavior
- Tests catch regressions when code changes
- Test output clearly indicates pass/fail for each scenario

---

## Non-Functional Requirements

### NFR-1: Performance
- Retrieval operations must complete in <100ms (95th percentile)
- Fallback mechanisms should add <50ms overhead
- Analytics tracking must be non-blocking

### NFR-2: Maintainability
- All configuration (aliases, patterns) should be easily updatable
- Code must include inline documentation
- Test suite must be easily extensible

### NFR-3: Type Safety
- All new functions must use TypeScript with explicit types
- No `any` types except where absolutely necessary
- Return types must be explicitly defined

### NFR-4: Scalability
- System must handle portfolio growth to 50+ projects without degradation
- Context limiting ensures LLM costs remain predictable
- Analytics must not impact query latency

---

## Optional/Future Enhancements

### OPT-1: Fuzzy String Matching Fallback
**Priority:** Low (implement only if typos become prevalent in analytics)

**Requirements:**
1. Install `fuzzysort` library
2. Create `fuzzySearchEntities()` function:
   - Search across title, description, keywords fields
   - Return up to 5 best matches
   - Use lenient threshold (-10000)
3. Trigger only when:
   - Regular keyword search returns zero
   - Broader search fallback also returns zero
4. Track analytics: `fuzzy_search_fallback`

**Trade-offs:**
- Adds dependency and complexity
- May surface irrelevant results
- Performance impact (~20-50ms per fallback)

**Decision Criteria:**
- Implement if >10% of empty results are due to typos (based on analytics review)

---

## Implementation Phases

### Phase 1: Critical Guardrails (Week 1)
- FR-1: Empty Results Fallback
- FR-3: Context Size Limiting
- FR-4: Off-Topic Detection
- FR-7: Basic Analytics

**Success Metric:** Zero queries result in empty context without fallback

### Phase 2: Quality Improvements (Week 2-3)
- FR-2: Keyword Alias System
- FR-5: Result Quality Validation
- FR-6: Dynamic System Prompts
- FR-8: Test Suite

**Success Metric:** Test coverage >80%, alias system reduces empty results by 30%

### Phase 3: Optimization (Month 2+)
- Review analytics data
- Expand alias mappings based on common misses
- Tune validation thresholds
- Consider OPT-1 if typos are prevalent

**Success Metric:** <5% of queries trigger fallbacks, user satisfaction maintained

---

## Success Metrics

### Quantitative Metrics
- **Fallback Rate:** <10% of queries trigger fallback mechanisms
- **Empty Context Rate:** <2% of queries result in no usable context
- **Context Size:** 95% of contexts under 15 entities
- **Test Coverage:** >80% code coverage on retrieval logic
- **Performance:** p95 latency <100ms

### Qualitative Metrics
- User reports of "chatbot doesn't understand" decrease
- Fewer hallucinated responses (manual review)
- Improved handling of abbreviations and casual language
- Graceful degradation on off-topic queries

---

## Monitoring & Continuous Improvement

### Weekly Review
Check analytics dashboard for:
- Fallback frequency by type
- Most common empty-result queries
- Off-topic query patterns
- Context size distribution

### Monthly Optimization
- Review failed query patterns
- Add new aliases for common misses
- Adjust validation thresholds if needed
- Update test cases for new edge cases discovered

### Quarterly Assessment
- Evaluate if fuzzy matching (OPT-1) is warranted
- Consider advanced features (e.g., query intent classification)
- Review system performance vs. portfolio growth

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Over-retrieval (too much context) | Increased costs, LLM confusion | FR-3 hard limits context size |
| Under-retrieval (too little context) | Hallucinations, poor answers | FR-1 fallback strategies |
| False positive off-topic detection | Relevant queries rejected | Conservative pattern matching, analytics monitoring |
| Performance degradation | Poor UX | NFR-1 performance requirements, monitoring |
| Increased complexity | Maintenance burden | Comprehensive tests (FR-8), clear documentation |

---

## Appendices

### Appendix A: Data Structures
```typescript
// Context Object
interface Context {
  projects: Project[];
  expertise: Expertise[];
  music: Music[];
}

// Validation Result
interface ValidationResult {
  valid: boolean;
  issue?: 'no_matches' | 'too_many_matches';
  action?: 'use_fallback' | 'limit_context';
}

// Keyword Alias Mapping
type KeywordAliases = Record<string, string[]>;
```

### Appendix B: Configuration Reference
```typescript
// Tunable Parameters
const CONFIG = {
  MIN_KEYWORD_LENGTH: 3,           // FR-1 initial threshold
  FALLBACK_KEYWORD_LENGTH: 2,      // FR-1 fallback threshold
  MAX_CONTEXT_ENTITIES: 15,        // FR-3 hard limit
  MAX_MUSIC_ITEMS: 5,              // FR-1 music limit in fallback
  QUALITY_WARNING_THRESHOLD: 10,   // FR-5 "too many" threshold
};
```

### Appendix C: Analytics Event Reference
All analytics events tracked by the system:
- `rag_retrieval_summary` - Every query
- `rag_empty_results` - Zero matches before fallback
- `rag_fallback_triggered` - Fallback mechanism activated
- `context_size_warning` - Context exceeded threshold
- `context_truncated` - Context was limited
- `context_quality_issue` - Validation detected issue
- `off_topic_query_detected` - Non-portfolio query identified
- `fuzzy_search_fallback` - Fuzzy matching used (if OPT-1 implemented)

---

## Document Control

### Revision History:
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Oct 22, 2025 | Portfolio Team | Initial requirements document |

### Approvals:
- [ ] Technical Lead
- [ ] Product Owner
- [ ] QA Lead

**Next Review Date:** November 22, 2025

---

*End of Document*
