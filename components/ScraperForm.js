import { useState } from 'react';

// Auto-detect URL type based on URL pattern
function detectUrlType(url) {
  if (url.includes('/seas/') && url.endsWith('.html')) {
    return 'season'; // Season page like /afl/seas/2024.html
  }
  if (url.includes('/stats/games/')) {
    return 'match'; // Match page like /afl/stats/games/2024/...
  }
  return null; // Unknown, keep current selection
}

export default function ScraperForm({ onScrape, isLoading }) {
  const [url, setUrl] = useState('');
  const [type, setType] = useState('season'); // Default to season
  const [roundNumber, setRoundNumber] = useState('');

  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);

    // Auto-detect and set type based on URL
    const detectedType = detectUrlType(newUrl);
    if (detectedType) {
      setType(detectedType);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) {
      return;
    }
    onScrape(url.trim(), type, roundNumber ? parseInt(roundNumber) : null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">
          Target URL
        </label>
        <input
          type="url"
          value={url}
          onChange={handleUrlChange}
          placeholder="https://afltables.com/afl/seas/2024.html"
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          Scrape Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="form-select"
        >
          <option value="match">Single Match/Page</option>
          <option value="season">Season/Multiple Pages</option>
        </select>
      </div>

      {type === 'season' && (
        <div className="form-group">
          <label className="form-label">
            Round Number (optional)
          </label>
          <input
            type="number"
            value={roundNumber}
            onChange={(e) => setRoundNumber(e.target.value)}
            placeholder="e.g., 2 (leave empty for all rounds)"
            className="form-input"
            min="1"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary"
        style={{ width: '100%' }}
      >
        {isLoading ? '🔄 Scraping...' : '🚀 Start Scraping'}
      </button>
    </form>
  );
}

