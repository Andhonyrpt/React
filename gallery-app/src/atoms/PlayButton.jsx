import PropTypes from "prop-types";
import { BUTTON_SIZES } from '../utils/constants';
import "./Button.css";

export default function PlayButton({ onClick, isPlaying = false, disabled = false, size = BUTTON_SIZES.MEDIUM }) {
  return (
    <button
      type="button" className={`btn btn--play btn--${size} ${isPlaying ? 'playing' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={onClick} disabled={disabled}>
      <span className="btn-icon">{isPlaying ? '⏸' : '▶'}</span>
    </button>
  );
}

PlayButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.string
};