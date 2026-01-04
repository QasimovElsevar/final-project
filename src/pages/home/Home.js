import { useEffect, useState, useCallback } from "react";
import ImageGrid from "../explore/Grid";
import Photo from "../explore/Photo";

const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_KEY;

export default function Feed() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const loadFeed = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://api.unsplash.com/photos?page=${page}&per_page=20`,
        {
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
          },
        }
      );

      if (!res.ok) {
        console.error("Unsplash error", res.status);
        setLoading(false);
        return;
      }

      const data = await res.json();

      const mapped = data.map((x) => ({
        id: x.id,
        url: x.urls.regular,
        alt: x.alt_description || "Photo",
        author: x.user.name,
        link: x.links.html,
        download: x.links.download,
      }));

      setPhotos((prev) => {
        const ids = new Set(prev.map((p) => p.id));
        return [...prev, ...mapped.filter((p) => !ids.has(p.id))];
      });

      setPage((p) => p + 1);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [page, loading]);

  useEffect(() => {
    loadFeed();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 300
      ) {
        loadFeed();
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [loadFeed]);

  return (
    <div>
      <ImageGrid
        title="Explore photos"
        images={photos}
        onSelect={setSelected}
      />

      <Photo photo={selected} onClose={() => setSelected(null)} />

      {loading && (
        <p style={{ textAlign: "center", padding: 20 }}>Loading...</p>
      )}
    </div>
  );
}
