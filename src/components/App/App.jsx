import css from "./App.module.css";
import { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import { fetchImages } from "../../images-api";

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const lastGalleryItemRef = useRef();

  const handleSearch = async (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setLoading(true);
    setError(null);

    try {
      const { images, totalPages } = await fetchImages(newQuery, 1);
      setImages(images);
      setTotalPages(totalPages);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const newPage = page + 1;
    setPage(newPage);
    setLoading(true);

    try {
      const { images: newImages } = await fetchImages(query, newPage);
      setImages((prevImages) => [...prevImages, ...newImages]);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [query]);

  useEffect(() => {
    if (lastGalleryItemRef.current) {
      lastGalleryItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [images]);

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {error && <ErrorMessage message={error} />}
      <ImageGallery
        images={images}
        onClick={setSelectedImage}
        lastItemRef={lastGalleryItemRef}
      />
      {loading && <Loader />}
      {images.length > 0 && page < totalPages && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {page === totalPages && (
        <p className={css.endCollectionText}>
          you have reached the end of search results.
        </p>
      )}
      <ImageModal
        isOpen={!!selectedImage}
        onRequestClose={() => setSelectedImage(null)}
        image={selectedImage}
      />
    </div>
  );
}
