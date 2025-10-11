# Knowledge Base File System

This folder contains structured knowledge files that can be dynamically loaded into the RAG system.

## Folder Structure

- **`bio/`** - Personal and professional background information
- **`projects/`** - Detailed project descriptions and case studies  
- **`expertise/`** - Technical expertise and skill areas
- **`music/`** - Musical inspirations and influences
- **`tutorials/`** - How-to guides and technical documentation

## File Format

### Markdown Files (`.md`)
Use YAML frontmatter for metadata:

```markdown
---
title: "Document Title"
category: "projects" | "expertise" | "music" | "tutorials" | "bio"
keywords: ["keyword1", "keyword2", "keyword3"]
technologies: ["tech1", "tech2"]
---

# Content goes here...
```

### JSON Files (`.json`)
```json
{
  "title": "Document Title",
  "category": "projects",
  "keywords": ["keyword1", "keyword2"],
  "technologies": ["tech1", "tech2"],
  "content": "Full content here..."
}
```

### Text Files (`.txt`)
```
Title: Document Title
Category: projects
Keywords: keyword1, keyword2, keyword3

Content goes here...
```

## Adding New Content

1. **Create a file** in the appropriate folder
2. **Add metadata** using the format above
3. **Write your content** in the main body
4. **Save the file** - it will be automatically picked up by the system

## Categories

- **`projects`** - Project descriptions, challenges, solutions
- **`expertise`** - Technical skills and knowledge areas
- **`music`** - Musical inspirations and influences
- **`tutorials`** - Step-by-step guides and documentation
- **`bio`** - Personal and professional background

## Keywords

Use relevant keywords to help the search system find your content. Think about what terms someone might search for to find this information.
