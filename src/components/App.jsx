import { useEffect, useState } from 'react';
import css from './App.module.css';
import fetchImages from 'api/Api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import Loader from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const response = await fetchImages(page, search);
        const imagesList = response.hits.map(image => ({
          largeImageURL: image.largeImageURL,
          webformatURL: image.webformatURL,
          id: image.id,
          tags: image.tags,
        }));
        setImages(imagesList);
        setTotal(response.totalHits);
        if (response.hits.length === 0) {
          toast.error('There is no images found with that search request');
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (search) load();
  }, [page, search]);

  const handleSubmit = search => {
    setSearch(search);
    setPage(1);
    setImages([]);
    setTotal(0);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = modalData => {
    setModalData(modalData);
  };

  const closeModal = () => {
    setModalData(null);
  };

  const showButton = images.length !== total && !isLoading;

  return (
    <>
      <div className={css.App}>
        <Searchbar onSearch={handleSubmit} />
        {images.length > 0 && (
          <ImageGallery images={images} openModal={openModal} />
        )}
        {showButton && <Button title="Load more" handler={loadMore} />}
        {isLoading && <Loader />}
      </div>

      <ToastContainer autoClose={3000} />
      {modalData && <Modal image={modalData} onClose={closeModal} />}
    </>
  );
};
