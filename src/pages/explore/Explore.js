import { useEffect, useState } from "react";
import ImageGrid from "./pages/explore/Grid";

export default function Explore() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function load() {
      // Example: replace with your real API
      const res = await fetch("https://picsum.photos/v2/list?page=1&limit=30");
      const data = await res.json();

      // Map API data -> {id, url, alt, link}
      const mapped = data.map((x) => ({
        id: x.id,
        url: x.download_url,
        alt: x.author,
        link: x.url,
      }));

      setImages(mapped);
    }

    load();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "24px 0" }}>Explore</h1>
      <ImageGrid images={images} />
    </div>
  );
}
