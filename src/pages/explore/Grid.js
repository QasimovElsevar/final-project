import "./pages/explore/ImageGrid.css";

export default function ImageGrid({ images }) {
  return (
    <div className="masonry">
      {images.map((img) => (
        <a
          key={img.id}
          className="masonry__item"
          href={img.link || "#"}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={img.url}
            alt={img.alt || "image"}
            loading="lazy"
          />
        </a>
      ))}
    </div>
  );
}
