import Head from "next/head";
import ScraperDashboard from "../components/ScraperDashboard";

export default function Home() {
  return (
    <>
      <Head>
        <title>Universal Web Scraper</title>
        <meta name="description" content="Extract structured data from any website" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <main className="page">
        <header className="page-header">
          <div>
            <h1>Universal Web Scraper</h1>
            <p className="subtitle">
              Extract structured data from any website. Enter a URL, choose scrape type, and get clean CSV-ready data.
            </p>
          </div>
          <div className="status-badge status-info">DEMO</div>
        </header>
        <ScraperDashboard />
        <footer className="page-footer">
          Universal Web Scraper — v1.1
        </footer>
      </main>
    </>
  );
}