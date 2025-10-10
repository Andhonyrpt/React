import PropTypes from 'prop-types';
import Button from '../atoms/Button';
import { BUTTON_SIZES, VIEWS } from '../utils/constants';
import './StatusBar.css';

export default function StatusBar({ currentView, onViewChange, albums = [], photos = [] }) {

  const getStatusInfo = () => {
    switch (currentView) {
      case VIEWS.PHOTOS:
        return {
          count: photos.length,
          label: 'Photos Total',
          canAdd: true,
          addAction: VIEWS.NEW_PHOTO
        };
      case VIEWS.ALBUMS:
        return {
          count: albums.length,
          label: 'Albums Total',
          canAdd: true,
          addAction: VIEWS.NEW_ALBUM
        };
      case VIEWS.NEW_PHOTO:
        return {
          count: null,
          label: 'Adding New Photo',
          canAdd: false
        };
      case VIEWS.NEW_ALBUM:
        return {
          count: null,
          label: 'Creating New Album',
          canAdd: false
        };
      default:
        return {
          count: 0,
          label: 'Items',
          canAdd: false
        };
    };
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="status-bar">
      <div className='status-left'>
        {statusInfo.count !== null && (
          <span className='status-count'>{statusInfo.count} {statusInfo.label}</span>
        )}
        {statusInfo.count === null && (
          <span className='status-title'>{statusInfo.label}</span>
        )}
      </div>

      {statusInfo.canAdd && (
        <Button
          type="button"
          variant='primary'
          size={BUTTON_SIZES.MEDIUM}
          onClick={() => onViewChange(statusInfo.addAction)}
          aria-label={`Add new ${statusInfo.addAction.replace('new', '').toLowerCase()}`}
        >
          <span className="btn-icon">+</span>
        </Button>
      )}
    </div>
  );
};

StatusBar.propTypes = {
  currentView: PropTypes.string.isRequired,
  onViewChange: PropTypes.func.isRequired,
  albums: PropTypes.array,
  photos: PropTypes.array
};