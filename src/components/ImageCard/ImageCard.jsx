import PropTypes from "prop-types";
import style from "./ImageCard.module.css";

const ImageCard = ({ imageLink, descr, onImageClick, imageData }) => {
  const handleClick = () => {
    onImageClick(imageData);
  };

  return (
    <div className={style.wrapper}>
      <img
        className={style.img}
        src={imageLink}
        alt={descr}
        onClick={handleClick}
      />
    </div>
  );
};

ImageCard.propTypes = {
  imageLink: PropTypes.string.isRequired,
  descr: PropTypes.string,
  onImageClick: PropTypes.func,
  imageLinkModal: PropTypes.string.isRequired,
  imageData: PropTypes.object.isRequired,
};

export default ImageCard;
