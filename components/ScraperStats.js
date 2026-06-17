export default function ScraperStats({ stats, onExport }) {
  if (!stats) return null;

  return (
    <div className="card">
      <header className="card-header">
        <div>
          <h3>Results</h3>
          <p>Scraping summary and export</p>
        </div>
        <button onClick={onExport} className="btn btn-primary">Export CSV</button>
      </header>

      <div className="metrics-grid">
        <div className="metric">
          <p className="metric-label">Total Rows</p>
          <p className="metric-value">{stats.rowCount || stats.count || 0}</p>
        </div>
        {stats.metadata?.year && (
          <div className="metric">
            <p className="metric-label">Season</p>
            <p className="metric-value">{stats.metadata.year}</p>
          </div>
        )}
        {stats.metadata?.roundNumber && (
          <div className="metric">
            <p className="metric-label">Round</p>
            <p className="metric-value">{stats.metadata.roundNumber}</p>
          </div>
        )}
        {stats.metadata?.scrapedAt && (
          <div className="metric">
            <p className="metric-label">Scraped At</p>
            <p className="metric-value" style={{ fontSize: "0.9rem" }}>
              {new Date(stats.metadata.scrapedAt).toLocaleTimeString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}