# mvp-web-scraper

> Universal web scraper — extracts structured data from any page via server-side Cheerio, exports to CSV, supports multi-page season scraping.

A Next.js application with server-side scraping routes. No browser automation required — HTML is fetched and parsed with Cheerio on the API layer, keeping the client lean. Vercel-deployable with zero infrastructure.

## Features

- **Single-page scraping** — extract all structured data from one URL
- **Season / multi-page scraping** — follow an index page and scrape every linked page
- **Round filtering** — limit multi-page scrape to a specific round or section
- **CSV export** — download all results as a comma-separated file
- **Data table view** — paginated in-browser table with scraping metadata
- **Debug tooling** — `debug-parse-fix.js` and `debug-ua.js` for diagnosing blocked requests

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 |
| HTML parsing | Cheerio |
| Styling | Tailwind CSS |
| Deployment | Vercel |

## Getting Started

```bash
npm install
npm run dev   # http://localhost:3000
```

## API

| Endpoint | Method | Body | Description |
|----------|--------|------|-------------|
| `/api/scrape` | POST | `{ url, type, roundNumber? }` | Scrape a URL |

`type`: `"match"` (single page) or `"season"` (multi-page)

## License

MIT
