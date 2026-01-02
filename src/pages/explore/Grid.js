import "./ImageGrid.css";

export default function ImageGrid({ images, title = "Nature Images", onSelect }) {
  const handleClick = (e, img) => {
    if (!onSelect) return;        // if no modal handler, keep normal link behavior
    e.preventDefault();           // stop opening new tab
    onSelect(img);                // open modal
  };

  return (
    <section className="container">
      <h2 className="catTitle">{title}</h2>

      <div className="masonry">
        {images.map((img) => (
          <a
            key={img.id}
            className="masonry__item"
            href={img.link || "#"}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => handleClick(e, img)}
          >
            <img src={img.url} alt={img.alt || "image"} loading="lazy" />
          </a>
        ))}
      </div>
    </section>
  );
}
