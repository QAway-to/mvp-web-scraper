import { useState } from "react";

const AFL_CONFIG = {
  years: Array.from({ length: 6 }, (_, i) => 2025 - i),
  rounds: [
    { label: "All Rounds", value: "" },
    ...Array.from({ length: 24 }, (_, i) => ({ label: `Round ${i + 1}`, value: i + 1 })),
    { label: "Finals", value: "finals" },
  ],
};

const modeCard = {
  cursor: "pointer",
  padding: "1.5rem",
  borderRadius: "8px",
  border: "1px solid #1E1E2E",
  background: "#0F0F13",
  transition: "border-color 0.15s",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.75rem",
};

const modeCardActive = {
  ...modeCard,
  borderColor: "#6366F1",
  background: "rgba(99,102,241,0.06)",
};

export default function ScraperForm({ onScrape, isLoading }) {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedRound, setSelectedRound] = useState(1);
  const [matchUrl, setMatchUrl] = useState("");

  const handleModeSelect = (m) => { setMode(m); setStep(2); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "season") {
      const url = `https://afltables.com/afl/seas/${selectedYear}.html`;
      const round = selectedRound === "" ? null : parseInt(selectedRound);
      onScrape(url, "season", round);
    } else if (mode === "match") {
      if (!matchUrl.trim()) return;
      onScrape(matchUrl.trim(), "match", null);
    }
  };

  if (step === 1) {
    return (
      <div className="card">
        <p style={{ margin: "0 0 16px", color: "#64748B", fontSize: "0.875rem" }}>Choose scraping mode</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div
            style={mode === "season" ? modeCardActive : modeCard}
            onClick={() => handleModeSelect("season")}
          >
            <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#E2E8F0" }}>Season Stats</div>
            <div style={{ fontSize: "0.8rem", color: "#64748B" }}>Multiple matches from a full season</div>
          </div>
          <div
            style={mode === "match" ? modeCardActive : modeCard}
            onClick={() => handleModeSelect("match")}
          >
            <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#E2E8F0" }}>Single Match</div>
            <div style={{ fontSize: "0.8rem", color: "#64748B" }}>Detailed stats from one game</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
        <button
          type="button"
          onClick={() => setStep(1)}
          className="btn"
          style={{ padding: "6px 12px", fontSize: "0.8rem" }}
        >
          Back
        </button>
        <span style={{ color: "#E2E8F0", fontSize: "0.9rem", fontWeight: 500 }}>
          {mode === "season" ? "Season Scrape" : "Single Match"}
        </span>
      </div>

      {mode === "season" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="form-group">
            <label className="form-label">Year</label>
            <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)} className="form-select">
              {AFL_CONFIG.years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Round</label>
            <select value={selectedRound} onChange={e => setSelectedRound(e.target.value)} className="form-select">
              {AFL_CONFIG.rounds.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>
          <div style={{ gridColumn: "1 / -1", padding: "10px 14px", background: "rgba(99,102,241,0.06)", borderRadius: "6px", border: "1px solid #1E1E2E" }}>
            <span style={{ fontSize: "0.75rem", color: "#64748B" }}>Target: </span>
            <code style={{ fontSize: "0.8rem", color: "#94A3B8", wordBreak: "break-all" }}>
              https://afltables.com/afl/seas/{selectedYear}.html
              {selectedRound ? ` (Round ${selectedRound})` : " (All Rounds)"}
            </code>
          </div>
        </div>
      )}

      {mode === "match" && (
        <div className="form-group">
          <label className="form-label">Match URL</label>
          <input
            type="url"
            value={matchUrl}
            onChange={e => setMatchUrl(e.target.value)}
            placeholder="https://afltables.com/afl/stats/games/..."
            className="form-input"
            required
          />
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary"
        style={{ width: "100%", marginTop: "16px", padding: "10px" }}
      >
        {isLoading ? "Scraping..." : "Start Scraping"}
      </button>
    </form>
  );
}