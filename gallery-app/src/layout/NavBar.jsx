import './NavBar.css';

export default function NavBar({ currentView, onViewChange }) {
  return (
    <div className='nav'>
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
    </div>);
}