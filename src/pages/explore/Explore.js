import { useEffect, useState, useCallback, useRef } from "react";
import CategoryRow from "./Category";
import ImageGrid from "./Grid";
import Photo from "./Photo";
import "./Explore.css";

const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_KEY;

export default function Explore() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const didInit = useRef(false);

  const loadPhotos = useCallback(async () => {
    if (loading) return;
    if (!ACCESS_KEY) return; 

    setLoading(true);

    try {
      const endpoint = query
        ? `https://api.unsplash.com/search/photos?page=${page}&per_page=20&query=${encodeURIComponent(
            query
          )}`
        : `https://api.unsplash.com/photos?page=${page}&per_page=20`;

      const res = await fetch(endpoint, {
        headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
      });

      const data = await res.json();
      const results = query ? data.results : data;

      const mapped = results.map((x) => ({
        id: x.id,
        url: x.urls.regular,
        alt: x.alt_description || "Photo",
        author: x.user.name,
        link: x.links.html,
        download: x.links.download,
      }));

      setImages((prev) => {
        const ids = new Set(prev.map((p) => p.id));
        return [...prev, ...mapped.filter((p) => !ids.has(p.id))];
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

  const handleSearch = () => {
    const q = input.trim();
    setImages([]);
    setPage(1);
    setQuery(q);
    
    didInit.current = false; 
    setTimeout(() => loadPhotos(), 0);
  };

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

      <CategoryRow title="Explore" items={[]} />

      <ImageGrid title={query || "Explore"} images={images} onSelect={setSelectedPhoto} />

      <Photo photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
    </div>
  );
}
