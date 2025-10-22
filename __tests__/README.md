# RAG System Test Suite

This test suite validates the RAG (Retrieval-Augmented Generation) system functionality and edge cases.

## Setup

First, install the testing dependencies:

```bash
npm install
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Test Coverage

The test suite covers:

### Core Functionality
- ✅ Empty query handling
- ✅ Single keyword matching
- ✅ Multiple keyword intersection
- ✅ Typo tolerance and fallback

### Edge Cases
- ✅ Off-topic query detection
- ✅ Gibberish query handling
- ✅ Context size limiting
- ✅ Quality validation

### Integration Tests
- ✅ Complete RAG flow validation
- ✅ End-to-end functionality

## Test Scenarios

1. **Empty Query**: Returns no results, triggers fallback
2. **TouchDesigner Matching**: Exact keyword matching
3. **Abbreviation Handling**: TD → TouchDesigner (documents expected behavior)
4. **Typo Tolerance**: TouchDsigner → triggers broader search
5. **Off-topic Detection**: "capital of France" → returns empty context
6. **Gibberish Handling**: "xyzabc" → triggers return_all fallback
7. **Multi-keyword Search**: "MIDI sensors TouchDesigner" → intersection
8. **Context Limiting**: 20 matches → limited to 15 entities

## Manual Inspection

The test suite includes a test that logs full context for manual inspection, helping you understand what the RAG system is returning for specific queries.

## Analytics Mocking

The `track()` function is mocked to prevent actual analytics calls during testing.
