import { useEffect, useState } from "react";
import ImageGrid from "../explore/Grid";
import PhotoModal from "../explore/Photo";
import "./Profile.css";

export default function Profile() {
  const [liked, setLiked] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("liked_photos") || "[]");
    setLiked(saved);
  }, []);

  return (
    <div className="profilePage">
      <header className="profileHeader">
        <div className="profileRow">
          <div className="avatar" aria-hidden="true" />
          <h1 className="profileName">Elsevar Qasímov</h1>
        </div>
      </header>

      <main className="profileContent">
         <h2 className="likedTitle">Liked</h2>

        {liked.length === 0 ? (
          <p className="emptyText">No liked photos yet</p>
        ) : (
          <ImageGrid images={liked} onSelect={setSelected} title="" />
        )}
      </main>

      <PhotoModal photo={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
