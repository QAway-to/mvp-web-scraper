import { useState, useEffect } from 'react';

// Configuration for AFL Tables
const AFL_CONFIG = {
  years: Array.from({ length: 6 }, (_, i) => 2025 - i), // 2025 down to 2020
  rounds: [
    { label: 'All Rounds', value: '' },
    ...Array.from({ length: 24 }, (_, i) => ({ label: `Round ${i + 1}`, value: i + 1 })),
    { label: 'Finals', value: 'finals' } // Handle logic for this if needed, mainly placeholder
  ]
};

export default function ScraperForm({ onScrape, isLoading }) {
  // Wizard State
  const [step, setStep] = useState(1); // 1 = Mode Selection, 2 = Configuration
  const [mode, setMode] = useState(null); // 'season' | 'match'

  // Data State
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedRound, setSelectedRound] = useState(1); // Default to Round 1 for safety
  const [matchUrl, setMatchUrl] = useState('');

  // Styles
  const cardStyle = {
    cursor: 'pointer',
    padding: '2rem',
    borderRadius: '12px',
    border: '2px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)',
    transition: 'all 0.2s',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem'
  };

  const activeCardStyle = {
    ...cardStyle,
    borderColor: '#0070f3',
    background: 'rgba(0,112,243,0.1)'
  };

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === 'season') {
      // Construct URL automatically
      // https://afltables.com/afl/seas/2024.html
      const url = `https://afltables.com/afl/seas/${selectedYear}.html`;
      // Convert 'finals' or string to appropriate round number/null
      const round = selectedRound === '' ? null : parseInt(selectedRound);
      onScrape(url, 'season', round);
    } else if (mode === 'match') {
      if (!matchUrl.trim()) return;
      onScrape(matchUrl.trim(), 'match', null);
    }
  };

  // Step 1: Mode Selection View
  if (step === 1) {
    return (
      <div className="wizard-step">
        <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Choose Scraping Mode</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div
            style={cardStyle}
            className="hover-card"
            onClick={() => handleModeSelect('season')}
          >
            <div style={{ fontSize: '3rem' }}>📅</div>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Season Stats</div>
            <div style={{ opacity: 0.7 }}>Scrape multiple matches from a full season</div>
          </div>

          <div
            style={cardStyle}
            className="hover-card"
            onClick={() => handleModeSelect('match')}
          >
            <div style={{ fontSize: '3rem' }}>🏟️</div>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Single Match</div>
            <div style={{ opacity: 0.7 }}>Scrape detailed stats from one specific game</div>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Configuration View
  return (
    <form onSubmit={handleSubmit} className="wizard-step">
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          type="button"
          onClick={() => setStep(1)}
          className="btn-secondary"
          style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid #444' }}
        >
          ← Back
        </button>
        <h3>
          {mode === 'season' ? 'Configure Season Scrape' : 'Configure Match Scrape'}
        </h3>
      </div>

      {mode === 'season' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Season Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="form-select"
            >
              {AFL_CONFIG.years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Round</label>
            <select
              value={selectedRound}
              onChange={(e) => setSelectedRound(e.target.value)}
              className="form-select"
            >
              {AFL_CONFIG.rounds.map(round => (
                <option key={round.value} value={round.value}>{round.label}</option>
              ))}
            </select>
          </div>

          <div style={{ gridColumn: '1 / -1', marginTop: '1rem', padding: '1rem', background: 'rgba(0,112,243,0.1)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>🎯 <strong>Target:</strong></div>
            <code style={{ wordBreak: 'break-all' }}>
              https://afltables.com/afl/seas/{selectedYear}.html
              {selectedRound ? ` (Round ${selectedRound})` : ' (All Rounds)'}
            </code>
          </div>
        </div>
      )}

      {mode === 'match' && (
        <div className="form-group">
          <label className="form-label">Match URL</label>
          <input
            type="url"
            value={matchUrl}
            onChange={(e) => setMatchUrl(e.target.value)}
            placeholder="https://afltables.com/afl/stats/games/..."
            className="form-input"
            required
            pattern="https://afltables\.com.*"
          />
          <p style={{ fontSize: '0.85rem', color: '#888', marginTop: '0.5rem' }}>
            Go to <a href="https://afltables.com" target="_blank" rel="noreferrer" style={{ color: '#0070f3' }}>afltables.com</a>, find a match, and copy the URL.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary"
        style={{ width: '100%', marginTop: '2rem', padding: '1rem', fontSize: '1.1rem' }}
      >
        {isLoading ? '🔄 Scraping...' : '🚀 Start Scraping'}
      </button>

      <style jsx>{`
        .wizard-step {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hover-card:hover {
          background: rgba(255,255,255,0.1) !important;
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.3) !important;
        }
        .btn-secondary:hover {
          background: rgba(255,255,255,0.1) !important;
        }
      `}</style>
    </form>
  );
}
