import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ images, onClick, lastItemRef }) {
  return (
    <ul className={css.galleryList}>
      {images.map((image, index) => (
        <li
          className={css.galleryListItem}
          key={image.id}
          ref={index === images.length - 1 ? lastItemRef : null}
        >
          <ImageCard image={image} onClick={onClick} />
        </li>
      ))}
    </ul>
  );
}
