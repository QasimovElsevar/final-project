import { useRef } from "react";
import "./Category.css";

export default function CategoryRow({ items = [], title = "Nature Images" }) {
  const scrollerRef = useRef(null);

  const scrollByAmount = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="catSection">
      <h2 className="catTitle">{title}</h2>

      <div className="catWrap">
        <button
          className="catBtn catBtnLeft"
          onClick={() => scrollByAmount(-1)}
          aria-label="Scroll left"
        >
          ‹
        </button>

        <div className="catScroller" ref={scrollerRef}>
          {items.map((c) => (
            <div className="catCard" key={c.id}>
              <div className="catImgWrap">
                <img className="catImg" src={c.coverUrl} alt={c.title} />
              </div>
              <div className="catMeta">
                <div className="catName">{c.title}</div>
                {c.countText ? <div className="catCount">{c.countText}</div> : null}
              </div>
            </div>
          ))}
        </div>

        <button
          className="catBtn catBtnRight"
          onClick={() => scrollByAmount(1)}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </section>
  );
}
