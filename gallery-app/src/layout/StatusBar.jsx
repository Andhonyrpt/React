import albumCollection from '../data/albums';
import photosCollection from '../data/photos';
import './StatusBar.css';

export default function StatusBar({ children, currentView, onViewChange }) {

  const statusText = () => {
    if (currentView === 'albums') {
      return albumCollection.length;
    }
    else if (currentView === 'photos') {
      return photosCollection.length;
    }
  };

  return (
    <div className="status-bar">
      <span>Vista actual {statusText()} {currentView}</span>
      <div className='action-btn'>
        {children}
      </div>
    </div>);
}