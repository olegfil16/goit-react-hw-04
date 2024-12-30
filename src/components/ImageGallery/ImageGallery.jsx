import PropTypes from "prop-types";
import style from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ photos, onImageClick }) => {
  return (
    <ul className={style.gallery}>
      {photos.map((photo) => {
        const { id, urls, alt_description } = photo;
        return (
          <li key={id} className={style.galleryItem}>
            <ImageCard
              imageLink={urls.small}
              imageLinkModal={urls.regular}
              descr={alt_description}
              onImageClick={onImageClick}
              imageData={photo}
            />
          </li>
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  photos: PropTypes.array,
  onImageClick: PropTypes.func,
};

export default ImageGallery;
