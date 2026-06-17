import { useState } from "react";

export default function ScrapedDataTable({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  if (!data || data.length === 0) {
    return (
      <div className="card" style={{ textAlign: "center", color: "#64748B", padding: "40px 24px" }}>
        No data to display
      </div>
    );
  }

  const allColumns = new Set();
  data.forEach(row => Object.keys(row).forEach(key => allColumns.add(key)));
  const columns = Array.from(allColumns);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ padding: "16px 24px", borderBottom: "1px solid #1E1E2E" }}>
        <span className="card-header" style={{ display: "block", marginBottom: 0 }}>
          <h3 style={{ margin: 0 }}>Data</h3>
        </span>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table className="data-table">
          <thead>
            <tr>
              {columns.map(col => <th key={col}>{col}</th>)}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, i) => (
              <tr key={i}>
                {columns.map(col => (
                  <td key={col}>{row[col] !== undefined ? String(row[col]) : "—"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <span className="pagination-info">
            {startIndex + 1}–{Math.min(startIndex + itemsPerPage, data.length)} of {data.length}
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              className="btn"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >Prev</button>
            <button
              className="btn"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >Next</button>
          </div>
        </div>
      )}
    </div>
  );
}