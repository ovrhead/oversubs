import { useState, useEffect, useRef } from 'react';
import configData from './data/config.json';
import './index.css';

function App() {
  const [series] = useState(configData.series || []);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [selectedSource, setSelectedSource] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.title = 'oversubs';
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    const firstSeason = item.seasons?.[0];
    if (firstSeason) {
      setSelectedSeason(firstSeason);
    }
    setSelectedEpisode(null);
    setSelectedSource(null);
    setSearchTerm("");
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setSelectedItem(null);
    setSelectedSeason(null);
    setSelectedEpisode(null);
    setSelectedSource(null);
  };



  const getEmbedUrl = (url) => {
    if (!url) return "";
    let processedUrl = url;
    if (processedUrl.includes("drive.google.com/file/d/")) {
      processedUrl = processedUrl.replace(/\/view(\?.*)?$/i, "/preview");
    }
    if (processedUrl.includes("voe.sx/") && !processedUrl.includes("/e/")) {
      processedUrl = processedUrl.replace("voe.sx/", "voe.sx/e/");
    }
    if (processedUrl.includes("video.sibnet.ru/video") && !processedUrl.includes("shell.php")) {
      processedUrl = processedUrl.replace("video.sibnet.ru/video", "video.sibnet.ru/shell.php?videoid=");
    }
    return processedUrl;
  };

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="header" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div className="logo cursor-pointer" onClick={handleBack}>
          <span className="logo-text">oversubs</span>
        </div>
        {!selectedItem && (
          <div className="search-container-header" style={{ flex: '0 1 400px' }}>
            <fluent-text-field
              placeholder="Seri Ara..."
              value={searchTerm}
              onInput={(e) => setSearchTerm(e.target.value)}
              style={{ width: "100%" }}
            ></fluent-text-field>
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {!selectedItem ? (
          /* GRID VIEW */
          <div className="home-content">
            <div className="fluent-grid">
              {series
                .filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.searchTitle?.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(item => (
                  <fluent-card key={item.id} className="fluent-series-card" onClick={() => handleItemClick(item)}>
                    {item.image && (
                       <img src={item.image} alt={item.title} className="fluent-cover" loading="lazy" />
                    )}
                    <div className="fluent-card-content">
                      <h3 className="fluent-card-title">{item.title}</h3>
                      {item.titleJapanese && (
                        <p style={{ color: "var(--colorNeutralForeground3)", fontSize: "0.8rem", margin: "4px 0 0 0" }}>{item.titleJapanese}</p>
                      )}
                    </div>
                  </fluent-card>
                ))}
            </div>
          </div>
        ) : (
          /* DETAIL VIEW */
          <div className="detail-view">
            <fluent-button appearance="stealth" onClick={handleBack} style={{ marginBottom: "2rem" }}>
              ← Tüm Serilere Dön
            </fluent-button>

            <div className="detail-header">
              {selectedItem.image && (
                <img src={selectedItem.image} alt={selectedItem.title} className="detail-cover" />
              )}
              <div className="detail-info">
                  <h1 className="detail-title">{selectedItem.title}</h1>
                  {selectedItem.titleJapanese && (
                    <p style={{ color: "var(--colorNeutralForeground3)", fontSize: "1rem", marginTop: "-10px", marginBottom: "10px" }}>{selectedItem.titleJapanese}</p>
                  )}
                  <p className="detail-desc">{selectedItem.description}</p>
              </div>
            </div>

            {/* CONTENT */}
            {selectedItem.seasons && selectedItem.seasons.length > 0 && (
              <div className="sources-section" style={{ marginBottom: "2rem" }}>
                <label className="selection-label" style={{ display: "block", marginBottom: "0.8rem" }}>Sezon:</label>
                <div className="sources-grid">
                  {selectedItem.seasons.map(season => (
                    <fluent-button
                      key={season.name}
                      appearance={selectedSeason?.name === season.name ? "accent" : "neutral"}
                      onClick={() => { setSelectedSeason(season); setSelectedEpisode(null); setSelectedSource(null); }}
                    >
                      {season.name}
                    </fluent-button>
                  ))}
                </div>
              </div>
            )}

            {selectedSeason && (
              <div className="episodes-section">
                <h3 className="section-title">Bölümler</h3>
                <div className="episodes-grid">
                  {selectedSeason.episodes.map(ep => (
                    <fluent-button
                      key={ep.number}
                      appearance={selectedEpisode?.number === ep.number ? "accent" : "neutral"}
                      onClick={() => { setSelectedEpisode(ep); setSelectedSource(ep.sources?.[0] || null); }}
                    >
                       {ep.number}. Bölüm {ep.name ? `- ${ep.name}` : ''}
                    </fluent-button>
                  ))}
                </div>
              </div>
            )}

            {selectedEpisode && (
              <div style={{ marginTop: "2rem" }}>
                {selectedEpisode.sources?.length > 0 && (
                  <div className="sources-section" style={{ marginBottom: "1rem" }}>
                    <label className="selection-label" style={{ display: "block", marginBottom: "0.8rem", color:"var(--colorNeutralForeground2)" }}>Kaynaklar:</label>
                    <div className="sources-grid">
                      {selectedEpisode.sources.map((src, index) => (
                        <fluent-button
                          key={index}
                          appearance={selectedSource?.url === src.url ? "accent" : "neutral"}
                          onClick={() => setSelectedSource(src)}
                        >
                          {src.type.toUpperCase()} - {src.name}
                        </fluent-button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="player-container">
                  {selectedSource && selectedSource.url ? (
                    <iframe src={getEmbedUrl(selectedSource.url)} className="player-iframe" allowFullScreen title="Video Player"></iframe>
                  ) : (
                    <div className="loader-container">
                      <p style={{ color: "var(--colorNeutralForeground3)" }}>Lütfen kaynak ekleyin.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "1rem" }}>
          <a href="https://discord.gg/nAHgNtFtKS" target="_blank" rel="noopener noreferrer" className="footer-link">
            Discord Sunucumuz
          </a>
        </div>
        <p style={{ color: "var(--colorNeutralForeground4)", fontSize: "0.85rem" }}>
          © {new Date().getFullYear()} - oversubs Tüm hakları saklıdır.
        </p>
      </footer>
    </div>
  );
}

export default App;
