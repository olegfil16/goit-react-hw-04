import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { fetchPhotos } from "./gallery-api";
import style from "./App.module.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        if (!query.trim()) return;

        setIsError(false);
        setIsLoading(true);
        setNoResults(false);

        const { results, total_pages } = await fetchPhotos(query, page);
        setTotalPages(total_pages);

        if (results.length === 0 && page === 1) {
          setNoResults(true);
        }

        setPhotos((prev) => [...prev, ...results]);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getPhotos();
  }, [query, page]);

  const handleLoadPage = () => {
    setPage((prev) => prev + 1);
  };

  const handleQuery = (value) => {
    if (value.trim() === query.trim()) {
      toast.error("Change query!", {
        position: "top-right",
      });
      return;
    }

    setQuery(value);
    setPhotos([]);
  };

  const openModal = (imageData) => {
    setSelectedImage(imageData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className={style.container}>
      <SearchBar onSubmit={handleQuery} />

      {isError ? (
        <ErrorMessage>😕 Oooops! Something went wrong...</ErrorMessage>
      ) : (
        <ImageGallery photos={photos} onImageClick={openModal} />
      )}

      {noResults && !isError && !isLoading && (
        <ErrorMessage>😕 No results found for {`"${query}"`}</ErrorMessage>
      )}

      {isLoading && <Loader />}

      {page >= totalPages || isError ? (
        ""
      ) : (
        <LoadMoreBtn onLoad={handleLoadPage} />
      )}

      <ImageModal
        imageData={selectedImage}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      <Toaster containerClassName={style.toast} />
    </div>
  );
}

export default App;
