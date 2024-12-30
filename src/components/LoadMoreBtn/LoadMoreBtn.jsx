import PropTypes from "prop-types";
import style from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onLoad }) => {
  return (
    <button className={style.button} onClick={() => onLoad()}>
      Load More
    </button>
  );
};

LoadMoreBtn.propTypes = {
  onLoad: PropTypes.func.isRequired,
};

export default LoadMoreBtn;
