import { useEffect, useState, useCallback, useRef } from "react";
import CategoryRow from "./Category";
import ImageGrid from "./Grid";
import Photo from "./Photo";
import "./Explore.css";

import people from "./CategoryPhotos/people.jpg";
import nature from "./CategoryPhotos/nature.jpg";
import architecture from "./CategoryPhotos/architecture.jpg";
import texture from "./CategoryPhotos/texture.jpg";
import travel from "./CategoryPhotos/travel.jpg";
import film from "./CategoryPhotos/film.jpg";
import wallpaper from "./CategoryPhotos/wallpapers.jpg";
import photography from "./CategoryPhotos/photography.jpg";
import holiday from "./CategoryPhotos/holidays.jpg";

const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_KEY;

export default function Explore() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const didInit = useRef(false);

  const categories = [
    { id: "people", title: "People", countText: "10,000+ Images", coverUrl: people },
    { id: "nature", title: "Nature", countText: "10,000+ Images", coverUrl: nature },
    { id: "architecture", title: "Architecture", countText: "10,000+ Images", coverUrl: architecture },
    { id: "texture", title: "Texture", countText: "10,000+ Images", coverUrl: texture },
    { id: "travel", title: "Travel", countText: "10,000+ Images", coverUrl: travel },
    { id: "wallpapers", title: "Wallpapers", countText: "10,000+ Images", coverUrl: wallpaper },
    { id: "film", title: "Film", countText: "10,000+ Images", coverUrl: film },
    { id: "photography", title: "Photography", countText: "10,000+ Images", coverUrl: photography },
    { id: "holiday", title: "Holidays", countText: "10,000+ Images", coverUrl: holiday },
  ];

  const loadPhotos = useCallback(async () => {
    if (loading) return;
    if (!ACCESS_KEY) {
      console.error("Missing Unsplash key. Add REACT_APP_UNSPLASH_KEY to .env and restart npm start.");
      return;
    }

    setLoading(true);

    try {
      const endpoint = query
        ? `https://api.unsplash.com/search/photos?page=${page}&per_page=20&query=${encodeURIComponent(query)}`
        : `https://api.unsplash.com/photos?page=${page}&per_page=20`;

      const res = await fetch(endpoint, {
        headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Unsplash error ${res.status}: ${errText}`);
      }

      const data = await res.json();
      const results = query ? data.results : data;

      const mapped = (results || []).map((x) => ({
        id: x.id,
        url: x.urls?.regular || x.urls?.small,
        alt: x.alt_description || x.description || "Photo",
        author: x.user?.name || x.user?.username || "Unknown",
        link: x.links?.html,
        download: x.links?.download,
      }));

      setImages((prev) => {
        const ids = new Set(prev.map((p) => p.id));
        const uniqueNew = mapped.filter((p) => !ids.has(p.id));
        return [...prev, ...uniqueNew];
      });

      setPage((p) => p + 1);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [page, query, loading]);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    loadPhotos();
  }, [loadPhotos]);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 300
      ) {
        loadPhotos();
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [loadPhotos]);

  const runSearch = (text) => {
    const q = (text || "").trim();
    if (!q) return;

    setInput(q);
    setImages([]);
    setPage(1);
    setQuery(q);

  didInit.current = false;
    setTimeout(() => loadPhotos(), 0);
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = () => runSearch(input);
  const handleCategoryClick = (cat) => runSearch(cat.title);

  return (
    <div>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search images..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <CategoryRow title="Explore" items={categories} onSelectCategory={handleCategoryClick} />

      <ImageGrid
        title={query || "Explore"}
        images={images}
        onSelect={setSelectedPhoto}
      />

      <Photo photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
    </div>
  );
}
