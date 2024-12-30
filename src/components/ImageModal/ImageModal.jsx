import ReactModal from "react-modal";
import PropTypes from "prop-types";
import { RiCloseLargeFill } from "react-icons/ri";
import style from "./ImageModal.module.css";

ReactModal.setAppElement(document.getElementById("root"));

const styles = {
  overlay: {
    backgroundColor: "rgb(0 0 0 / 75%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const ImageModal = ({ imageData, isOpen, onClose }) => {
  if (!imageData) return;

  const { urls, description, alt_description, likes, user } = imageData;

  return (
    <ReactModal
      className={style.modal}
      isOpen={isOpen}
      style={styles}
      onRequestClose={onClose}
      closeTimeoutMS={200}
      onAfterClose={() => {
        document.body.classList.remove("ReactModal__Body--open");
      }}
    >
      <button className={style.close} onClick={() => onClose()}>
        <RiCloseLargeFill className={style.closeIcon} width={90} height={100} />
      </button>
      <img className={style.image} src={urls.regular} alt={alt_description} />
      <div className={style.content}>
        {description && <p>💬 Title: {description}</p>}
        <p>👤 Author: {user.name}</p>
        <p>👍 Likes: {likes}</p>
        <p>📍 Location: {user.location}</p>
      </div>
    </ReactModal>
  );
};

ImageModal.propTypes = {
  imageData: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ImageModal;
