import { useEffect, useState } from "react";
import CategoryRow from "./Category";
import ImageGrid from "./Grid";
import "./Explore.css";

export default function Explore() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(""); 

  const limit = 20;

  const categories = [
    { id: "flower", title: "Flower Images", countText: "10,000+ Images", coverUrl: "https://picsum.photos/seed/flower/600/400" },
    { id: "fall", title: "Fall Images", countText: "100+ Images", coverUrl: "https://picsum.photos/seed/fall/600/400" },
    { id: "rose", title: "Rose Images", countText: "10,000+ Images", coverUrl: "https://picsum.photos/seed/rose/600/400" },
    { id: "beach", title: "Beach Images", countText: "10,000+ Images", coverUrl: "https://picsum.photos/seed/beach/600/400" },
  ];

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);

    const res = await fetch(
      `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
    );
    const data = await res.json();

    const mapped = data.map((x) => ({
      id: `${x.id}-${page}`,
      url: x.download_url,
      alt: x.author,
      link: x.url,
      author: x.author,
    }));

    setImages((prev) => [...prev, ...mapped]); // ✅ append
    setPage((p) => p + 1);
    setLoading(false);
  };

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 300
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [loading]);


  const filteredImages = images.filter((img) =>
    img.author.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <CategoryRow title="Explore" items={categories} />

      <ImageGrid title = {query ? query : "Explore"} images={filteredImages} />

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
    </div>
  );
}
