import { useState } from 'react';
import './App.css';
import Layout from './layout/Layout';
import Albums from './pages/albums';
import Photos from './pages/Photos';
import EditAlbum from './pages/EditAlbum';
import EditPhoto from './pages/EditPhoto';
import ConfirmDialog from './molecules/ConfirmDialog';
import albumsCollection from './data/albums';
import photosCollection from './data/photos';


function App() {

  const [currentView, setCurrentView] = useState('albums');
  // Estado para el diálogo de confirmación de eliminación de álbum
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [albumToDelete, setAlbumToDelete] = useState(null);
  const [photoToDelete, setPhotoToDelete] = useState(null);

  // Función para obtener datos del localStorage
  const getFromStorage = (key, defaultValue) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(error);
      return defaultValue;
    }
  };

  // Estado para persistencia de datos
  const [albums, setAlbums] = useState(() => getFromStorage("gallery-albums", albumsCollection));
  const [photos, setPhotos] = useState(() => getFromStorage("gallery-photos", photosCollection));

  const renderCurrentView = () => {
    switch (currentView) {
      case 'albums':
        return <Albums />
      case 'photos':
        return <Photos />
      case 'newAlbum':
        return <EditAlbum onBack={() => setCurrentView("albums")} />
      case 'newPhoto':
        return <EditPhoto onBack={() => setCurrentView("photos")} />
      default:
        return <Albums />
    };
  };

  const handleViewChange = (newView) => {
    setCurrentView(newView);
  }

  const handleConfirmDeleteAlbum = () => {
    if (albumToDelete) {
      const updatedAlbums = albums.filter((a) => a.id !== albumToDelete.id)
      setAlbums(updatedAlbums)
      console.log("Album eliminado:", albumToDelete);
      console.log("ALbums restantes:", updatedAlbums.length);
    }
  };

  const handleCancelDeleteAlbum = () => {
    setIsConfirmDialogOpen(false);
    setAlbumToDelete(null);
  };

  const handleConfirmDeletePhoto = () => {
    if (photoToDelete) {
      const updatedPhotos = photos.filter((p) => p.id !== photoToDelete.id)
      setPhotos(updatedPhotos)
      console.log("Foto eliminada:", photoToDelete);
      console.log("Fotos restantes:", updatedPhotos.length);
    }
  };

  const handleCancelDeletePhoto = () => {
    setIsConfirmDialogOpen(false);
    setPhotoToDelete(null);
  };

  return (

    <div className="App" >
      <Layout currentView={currentView} onViewChange={handleViewChange}>
        {renderCurrentView()}
      </Layout>

      {/* Dialogo para confirmar eliminacion de Album */}
      <ConfirmDialog isOpen={isConfirmDialogOpen}
        type='danger'
        title="Eliminar Album"
        message={`¿Estás seguro que deseas eliminar el album?\n\nEstá acción no puede deshacerse.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDeleteAlbum}
        onCancel={handleCancelDeleteAlbum}
      ></ConfirmDialog>

      {/* Dialogo para confirmar eliminacion de Foto */}
      <ConfirmDialog isOpen={isConfirmDialogOpen}
        type='danger'
        title="Eliminar Foto"
        message={`¿Estás seguro que deseas eliminar la foto?\n\nEstá acción no puede deshacerse.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDeletePhoto}
        onCancel={handleCancelDeletePhoto}
      ></ConfirmDialog>
    </div>
  );
}

export default App;
