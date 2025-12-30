import { useState } from 'react';

// Predefined data sources
const DATA_SOURCES = [
  {
    id: 'afltables',
    name: 'AFL Tables',
    description: 'Australian Football League Statistics',
    seasons: [
      { year: 2024, url: 'https://afltables.com/afl/seas/2024.html' },
      { year: 2023, url: 'https://afltables.com/afl/seas/2023.html' },
      { year: 2022, url: 'https://afltables.com/afl/seas/2022.html' },
      { year: 2021, url: 'https://afltables.com/afl/seas/2021.html' },
      { year: 2020, url: 'https://afltables.com/afl/seas/2020.html' },
    ]
  }
];

export default function ScraperForm({ onScrape, isLoading }) {
  const [selectedSource, setSelectedSource] = useState(DATA_SOURCES[0].id);
  const [selectedSeason, setSelectedSeason] = useState(DATA_SOURCES[0].seasons[0].url);
  const [type, setType] = useState('season');
  const [roundNumber, setRoundNumber] = useState('');

  const currentSource = DATA_SOURCES.find(s => s.id === selectedSource);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSeason) {
      return;
    }
    onScrape(selectedSeason, type, roundNumber ? parseInt(roundNumber) : null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">
          Data Source
        </label>
        <select
          value={selectedSource}
          onChange={(e) => {
            setSelectedSource(e.target.value);
            const source = DATA_SOURCES.find(s => s.id === e.target.value);
            if (source && source.seasons.length > 0) {
              setSelectedSeason(source.seasons[0].url);
            }
          }}
          className="form-select"
        >
          {DATA_SOURCES.map(source => (
            <option key={source.id} value={source.id}>
              {source.name} - {source.description}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">
          Season
        </label>
        <select
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(e.target.value)}
          className="form-select"
        >
          {currentSource?.seasons.map(season => (
            <option key={season.year} value={season.url}>
              {season.year} Season
            </option>
          ))}
        </select>
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

