import PropTypes from 'prop-types';
import './NavBar.css';

export default function NavBar({ currentView, onViewChange }) {
  return (
    <nav className='nav-bar'>
      <button
        onClick={() => onViewChange('albums')}
        disabled={currentView === 'albums'}
      >
        Albums
      </button>
      <button
        onClick={() => onViewChange('photos')}
        disabled={currentView === 'photos'}
      >
        Photos
      </button>
    </nav>);
};

NavBar.propTypes = {
  currentView: PropTypes.string.isRequired,
  onViewChange: PropTypes.func.isRequired
};