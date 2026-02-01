# Kimi + Firecrawl Setup

## Purpose
Replace the default OpenAI-based stack with Kimi (Moonshot) for primary reasoning and Firecrawl for web search/retrieval.

## Architecture

### Model Stack
```
Primary:    moonshot/kimi-k2.5  → Alias: kimi
Fallback 1: openai-codex/gpt-5.2 (coding tasks)
Fallback 2: openai/gpt-5.2
```

### Search Stack
```
Built-in:   web_search → Brave Search (still available)
Custom:     firecrawl_search → Firecrawl API (preferred)
```

## Configuration Details

### Clawdbot Config (`clawdbot.json`)
```json
{
  "models": {
    "providers": {
      "moonshot": {
        "baseUrl": "https://api.moonshot.ai/v1",
        "apiKey": "${MOONSHOT_API_KEY}",
        "auth": "api-key",
        "api": "openai-completions",
        "models": [{"id": "kimi-k2.5", "name": "Kimi K2.5"}]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "moonshot/kimi-k2.5",
        "fallbacks": ["openai-codex/gpt-5.2", "openai/gpt-5.2"]
      }
    }
  }
}
```

### Environment Variables
Required in gateway environment:
```bash
export MOONSHOT_API_KEY="sk-..."
export FIRECRAWL_API_KEY="fc-..."
```

### Firecrawl Skill
Location: `/home/clawd/.clawdbot/skills/firecrawl/`

Files:
- `SKILL.md` — Documentation
- `tool.json` — Tool schema definition
- `index.js` — Implementation (Node.js)

API: Calls `POST https://api.firecrawl.dev/v1/search`

Parameters:
- `query` (required): Search query
- `limit`: Max results (1-20, default 5)
- `country`: ISO country code (default "US")
- `scrape`: Boolean to scrape results to markdown
- `formats`: ["markdown"] or ["summary"]

## Usage Examples

### Search only
```
Use firecrawl_search: "actblue donor thank you best practices" limit 5
```

### Search + scrape
```
Use firecrawl_search: "fec contributions scraper site:github.com" limit 3 scrape true
```

### Use Kimi explicitly
```
/model kimi
```

## Security Notes
- API keys are **never** stored in repo files
- Config uses `${VAR}` placeholders
- Gateway reads keys from environment at runtime
- Config file can be safely viewed/shared

## Troubleshooting

### Kimi not responding
Check: `MOONSHOT_API_KEY` is set in gateway environment

### Firecrawl search fails
Check: `FIRECRAWL_API_KEY` is set in gateway environment

### Config reverted to hardcoded key
Cause: `clawdbot doctor` or wizard may inline values
Fix: Re-patch config, consider `chmod 444` on config file

## References
- Moonshot API: https://platform.moonshot.cn/
- Firecrawl API: https://docs.firecrawl.dev
- Clawdbot docs: https://docs.clawd.bot
