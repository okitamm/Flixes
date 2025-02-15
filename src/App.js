import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Example: Generate SFlix URL (this depends on how SFlix structures URLs)
    const sflixUrl = `https://sflix.to/search/${encodeURIComponent(query)}`;

    // For now, just open the search results
    setVideoUrl(sflixUrl);
  };

  return (
    <div>
      <h1>Flixes Streaming</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter movie title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Find Movie</button>
      </form>

      {videoUrl && (
        <div>
          <h2>Watch Here:</h2>
          <a href={videoUrl} target="_blank" rel="noopener noreferrer">
            Open Movie in SFlix
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
