import { useEffect } from "react";
import "./Photo.css";

const LS_LIKED = "liked_photos";
const LS_DOWNLOADED = "downloaded_photos";

function readList(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

function saveUnique(key, photo) {
  const list = readList(key);

  // Use a stable id (prefer original id if you have it)
  const exists = list.some((p) => p.id === photo.id);
  if (!exists) {
    const updated = [photo, ...list];
    localStorage.setItem(key, JSON.stringify(updated));
  }
}

export default function PhotoModal({ photo, onClose }) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  if (!photo) return null;

  const handleLike = () => {
    saveUnique(LS_LIKED, photo);
    alert("Saved to Liked ✅");
  };

  const handleDownload = () => {
    saveUnique(LS_DOWNLOADED, photo);

    // optional: actually download the image file too
    const a = document.createElement("a");
    a.href = photo.url;
    a.download = `photo-${photo.id || "image"}.jpg`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    alert("Saved to Downloaded ✅");
  };

  return (
    <div className="modalOverlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modalCard" onClick={(e) => e.stopPropagation()}>
        <button className="modalClose" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <img className="modalImg" src={photo.url} alt={photo.alt || "photo"} />

        <div className="modalMeta">
          <div className="modalTitle">{photo.alt || "Photo"}</div>
          {photo.author ? <div className="modalSub">by {photo.author}</div> : null}

          {/* Buttons */}
          <div className="modalActions">
            <button className="actionBtn" onClick={handleLike}>
              ❤️ Like
            </button>

            <button className="actionBtn primary" onClick={handleDownload}>
              ⬇️ Download
            </button>
          </div>

          {photo.link ? (
            <a className="modalLink" href={photo.link} target="_blank" rel="noreferrer">
              Open source
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
