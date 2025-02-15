import React, { useState } from "react";

const OMDB_API_KEY = "1e64f7eb"; // Replace with your OMDb API key

function App() {
  const [query, setQuery] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setError("");
      // Fetch IMDb ID from OMDb API
      const response = await fetch(
        `https://www.omdbapi.com/?t=${encodeURIComponent(query)}&apikey=${OMDB_API_KEY}`
      );
      const data = await response.json();

      if (data.Response === "False") {
        setError("Movie not found!");
        return;
      }

      const imdbId = data.imdbID; // Get IMDb ID
      const vidSrcEmbedUrl = `https://vidsrc.xyz/embed/movie?imdb=${imdbId}`;

      setEmbedUrl(vidSrcEmbedUrl);
    } catch (err) {
      setError("Failed to fetch movie data.");
    }
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
        <button type="submit">Play</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {embedUrl && (
        <div>
          <h2>Now Playing</h2>
          <iframe
            src={embedUrl}
            width="800"
            height="450"
            allowFullScreen
            title="Movie Player"
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default App;
