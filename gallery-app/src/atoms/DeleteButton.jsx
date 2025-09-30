import PropTypes from "prop-types";

export default function DeleteButton({onClick, disabled, size, children}) {
  return (
    <button type="button"
      onClick={onClick} disabled={disabled}
      className={` btn--delete btn--${size}`}>
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
  size: 'md',
  children: null
};