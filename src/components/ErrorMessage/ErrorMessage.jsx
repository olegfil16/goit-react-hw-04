import PropTypes from "prop-types";
import style from "./ErrorMessage.module.css";

const ErrorMessage = ({ children }) => {
  return <div className={style.error}>{children}</div>;
};

ErrorMessage.propTypes = {
  children: PropTypes.any,
};

export default ErrorMessage;
