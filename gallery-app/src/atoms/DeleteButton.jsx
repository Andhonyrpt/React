import PropTypes from "prop-types";
import { BUTTON_SIZES } from '../utils/constants';
import "./Button.css";

export default function DeleteButton({ onClick, disabled, size = BUTTON_SIZES.MEDIUM, children }) {
  return (
    <button type="button"
      onClick={onClick} disabled={disabled}
      className={`btn btn--delete btn--${size}`}
      aria-label="Delete item">
      {children || (<span className="btn-icon">🗑</span>)}
    </button>);
  /* .btn--sm .btn--md*/
}

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  children: PropTypes.node
};

DeleteButton.defaultProps = {
  disabled: false,
  size: BUTTON_SIZES.MEDIUM,
  children: null
};