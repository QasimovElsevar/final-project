import { useEffect } from "react";
import heart from "./heart.png"
import download from "./downloadImage.png"
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
    alert("Saved to Liked");
  };

  const handleDownload = () => {
    saveUnique(LS_DOWNLOADED, photo);

    const a = document.createElement("a");
    a.href = photo.url;
    a.download = `photo-${photo.id || "image"}.jpg`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    alert("Saved to Downloaded");
  };

  return (
    <div className="overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="card" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <img className="modal-img" src={photo.url} alt={photo.alt || "photo"} />
        <div className="bottom-elements">
        <div className="meta">
          <div className="title">{photo.alt || "Photo"}</div>
          {photo.author ? <div className="sub">by {photo.author}</div> : null}

          {photo.link ? (
            <a className="link" href={photo.link} target="_blank" rel="noreferrer">
              Open source
            </a>
          ) : null}
        </div>
        {/* Buttons */}
          <div className="actions">
            <button className="actionBtn" onClick={handleLike}>
              <img src={heart} alt="Home" className="like-png" />
            </button>

            <button className="actionBtn primary" onClick={handleDownload}>
               <img src={download} alt="Home" className="like-png" />
            </button>
          </div>
          </div>
      </div>
    </div>
  );
}
