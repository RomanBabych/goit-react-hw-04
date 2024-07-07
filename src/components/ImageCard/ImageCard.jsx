import css from "./ImageCard.module.css";
export default function ImageCard({ image, onClick }) {
  return (
    <div className={css.imageWrapper} onClick={() => onClick(image)}>
      <img
        className={css.galleryImage}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
}
