import NavBar from "./NavBar";
import StatusBar from "./StatusBar";
import './Layout.css';

export default function Layout({ children, currentView, onViewChange }) {

  const renderActionButton = () => {
    switch (currentView) {
      case 'albums':
        return (
          <button
            onClick={() => onViewChange('newAlbum')}
          >
            New Album
          </button>
        );
      case 'photos':
        return (
          <button
            onClick={() => onViewChange('newPhoto')}
            disabled={currentView === 'newPhoto'}
          >
            Add Photo
          </button>
        );
      default:
        return (
          <button
            onClick={() => onViewChange('newPhoto')}
            disabled={currentView === 'newPhoto'}
          >
            Add Photo
          </button>
        );
    };
  };

  return (
    <div className="layout">
      <header>
        <NavBar currentView={currentView} onViewChange={onViewChange} />
        <StatusBar currentView={currentView} >
          {renderActionButton()}
        </StatusBar>
      </header>
      <main className="main-container">
        {children}
      </main>
    </div>);
}