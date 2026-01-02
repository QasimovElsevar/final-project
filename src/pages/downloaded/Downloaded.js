import { useEffect, useState } from "react";
import ImageGrid from "../explore/Grid";
import PhotoModal from "../explore/Photo"; // adjust path if your modal is elsewhere

export default function Downloaded() {
  const [downloaded, setDownloaded] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("downloaded_photos") || "[]");
    setDownloaded(saved);
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "32px 0" }}>
        ⬇️ Downloaded
      </h1>

      {downloaded.length === 0 ? (
        <p style={{ textAlign: "center", opacity: 0.7 }}>
          No downloaded photos yet
        </p>
      ) : (
        <ImageGrid
          images={downloaded}
          title="Downloaded Photos"
          onSelect={setSelectedPhoto}  
        />
      )}

      <PhotoModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
}
