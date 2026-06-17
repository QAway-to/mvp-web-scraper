export default function ScraperLogs({ logs }) {
  if (!logs || logs.length === 0) return null;

  const getLogClass = (type) => {
    switch (type) {
      case "success": return "log-entry log-entry-success";
      case "error":   return "log-entry log-entry-error";
      case "warning": return "log-entry log-entry-warning";
      default:        return "log-entry log-entry-info";
    }
  };

  const getTag = (type) => {
    switch (type) {
      case "success": return "OK";
      case "error":   return "ERR";
      case "warning": return "WARN";
      default:        return "INFO";
    }
  };

  return (
    <div className="card">
      <header className="card-header">
        <h3>Log</h3>
      </header>
      <div className="logs-container">
        {logs.map((log, i) => (
          <div key={i} className={getLogClass(log.type)}>
            <span className="log-tag">{getTag(log.type)}</span>
            {log.timestamp && (
              <span className="log-time">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
            )}
            <span>{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}