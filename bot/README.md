# Bot Documentation Generator

This bot automatically generates documentation for your React components using AI (Gemini 2.5 Flash by default).

## Usage

### Generate documentation for ALL components (Default)

Simply run the command without any arguments:

```bash
npm run bot-doc
```

This will:
- 🔍 Discover all component directories in `src/components`
- 🤖 Process each component using `gemini-2.5-flash` model
- 📝 Generate props data JSON files in `src/data/props/`
- 📄 Generate MDX documentation files in `public/files/media/`
- 📊 Display a comprehensive summary at the end

### Generate documentation for a SINGLE component

```bash
npm run bot-doc Button
```

This will process only the `Button` component.

### Custom component folder

```bash
npm run bot-doc CustomComponent src/custom/path/CustomComponent
```

## Default Configuration

The script now uses **Gemini 2.5 Flash** by default for:
- **Props generation**: `gemini-2.5-flash` via Google AI
- **Comment generation**: `gemini-2.5-flash` via Google AI

## Environment Variables

You can override the defaults using environment variables in your `.env` file:

```env
# Component paths
BASE_COMPONENT_PATH=src/components
PROPS_DATA_FOLDER=src/data/props
MARKDOWN_OUTPUT_FOLDER=public/files/media

# AI Model Configuration
PROPS_MODEL=gemini-2.5-flash
PROPS_PROVIDER=google
COMMENT_MODEL=gemini-2.5-flash
COMMENT_PROVIDER=google
```

### Available Providers

- `google` - Google Gemini models (gemini-2.5-flash, gemini-pro, etc.)
- `openai` - OpenAI models (gpt-4, gpt-4o-mini, etc.)
- `anthropic` - Anthropic Claude models
- `groq` - Groq models
- `replicate` - Replicate models

## Output

For each component, the bot generates:

1. **Props JSON** (`src/data/props/{ComponentName}.props.json`)
   - Contains structured prop definitions
   - Includes types, descriptions, and examples

2. **MDX Documentation** (`public/files/media/{ComponentName}.mdx`)
   - Human-readable documentation
   - Usage examples
   - Component API reference

## Features

- ✅ Automatic component discovery
- ✅ Batch processing with progress tracking
- ✅ Rate limiting protection (1s delay between components)
- ✅ Comprehensive error handling
- ✅ Success/failure summary
- ✅ Skips invalid directories
- ✅ Continues processing on errors

## Example Output

```
🚀 No component specified - Processing ALL components with gemini-2.5-flash
📁 Base path: src/components
🤖 Model: gemini-2.5-flash (google)

📦 Found 50 components to process:
Accordion, Alert, AspectRatio, Avatar, Background, Badge, ...

[1/50] Processing: Accordion
=== Processing documentation for component: Accordion ===
...

======================================================================
📊 DOCUMENTATION GENERATION SUMMARY
======================================================================
✅ Successful: 48 components
   Accordion, Alert, Avatar, Badge, Button, Card, ...

❌ Failed: 2 components
   File, MediaPreview

======================================================================
```

## Troubleshooting

### API Key Issues

Make sure you have the appropriate API keys in your `.env` file:

```env
GOOGLE_API_KEY=your-google-api-key
OPENAI_API_KEY=your-openai-api-key
```

### Component Not Found

If a component is skipped, verify:
- The component directory exists in `src/components/`
- The directory contains valid TypeScript/React files
- The directory is not hidden (doesn't start with `.`)
