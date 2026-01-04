import "./ImageGrid.css";

export default function ImageGrid({ images, title = "Nature Images", onSelect }) {
  const handleClick = (e, img) => {
    if (!onSelect) return;       
    e.preventDefault();          
    onSelect(img);                
  };

  return (
    <section className="container">
      <h2 className="catTitle">{title}</h2>

      <div className="grid">
        {images.map((img) => (
          <a
            key={img.id}
            className="item"
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
