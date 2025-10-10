import { useState, useEffect } from 'react';
import './App.css';
import albumsCollection from './data/albums';
import photosCollection from './data/photos';
import Layout from './layout/Layout';
import ConfirmDialog from './molecules/ConfirmDialog';
import AlbumCarousel from './pages/AlbumCarousel';
import PhotoViewer from './pages/PhotoViewer';
import Albums from './pages/albums';
import EditAlbum from './pages/EditAlbum';
import Photos from './pages/Photos';
import EditPhoto from './pages/EditPhoto';
import { STORAGE_KEYS, VIEWS } from "./utils/constants";
import { getFromStorage, saveToStorage } from "./utils/localStorage";


function App() {

  // Función para obtener datos del localStorage
  const getFromStorage = (key, defaultValue) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}"`, error);
    }
  };

  // Función para guardar datos del localStorage
  const saveToStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error saving to localStorage key "${key}":`, error);
    }
  };

  const [currentView, setCurrentView] = useState(VIEWS.ALBUMS);

  // Estado para persistencia de datos
  const [albums, setAlbums] = useState(() => getFromStorage(STORAGE_KEYS.ALBUMS, albumsCollection));
  const [photos, setPhotos] = useState(() => getFromStorage(STORAGE_KEYS.PHOTOS, photosCollection));

  // Estado para el modal de álbumes
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
  const [albumModalAction, setAlbumModalAction] = useState("create");
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  // Estado para el modal de fotos
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [photoModalAction, setPhotoModalAction] = useState("create");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Estado para el diálogo de confirmación de eliminación de álbum
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [albumToDelete, setAlbumToDelete] = useState(null);

  // Estado para el diálogo de confirmación de eliminación de foto
  const [isPhotoConfirmDialogOpen, setIsPhotoConfirmDialogOpen] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState(null);

  // Estado para el modal del carrusel de álbum
  const [isCarouselModalOpen, setIsCarouselModalOpen] = useState(false);
  const [carouselAlbum, setCarouselAlbum] = useState(null);

  // Estado para el visor de fotos en fullscreen
  const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false);
  const [photoToView, setPhotoToView] = useState(null);

  // useEffect para guardar en localStorage cuando cambian los datos
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ALBUMS, albums);
  }, [albums]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PHOTOS, photos);
  }, [photos]);

  const handleViewChange = (newView) => {
    // Si es una acción de crear/editar, abrir modal en lugar de cambiar vista
    if (newView === VIEWS.NEW_ALBUM) {
      setAlbumModalAction("create");
      setSelectedAlbum(null);
      setIsAlbumModalOpen(true);
    } else if (newView === VIEWS.NEW_PHOTO) {
      setPhotoModalAction("create");
      setSelectedPhoto(null);
      setIsPhotoModalOpen(true);
    } else {
      setCurrentView(newView);
    }
  };

  // Funciones para manejar álbumes
  const handleEditAlbum = (album) => {
    setAlbumModalAction("edit");
    setSelectedAlbum(album);
    setIsAlbumModalOpen(true);
  };

  const handlePlayAlbum = (album) => {
    console.log("✅ Abriendo carrusel para el álbum:", album.title);

    // 💡 NUEVO LOG DE DEPURACIÓN
    console.log("Estructura del Álbum:", album);
    setCarouselAlbum(album);
    setIsCarouselModalOpen(true);
  };

  const handleCloseCarousel = () => {
    setCarouselAlbum(null);
    setIsCarouselModalOpen(false);
  };

  const handleDeleteAlbum = (album) => {
    setAlbumToDelete(album);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmDeleteAlbum = () => {
    if (albumToDelete) {
      // Solo eliminar el álbum del estado
      // Las imágenes están contenidas dentro del álbum, no son entidades separadas
      const updatedAlbums = albums.filter((a) => a.id !== albumToDelete.id);
      setAlbums(updatedAlbums);

      console.log(`Álbum "${albumToDelete.title}" eliminado exitosamente`);
      console.log(`Número de álbumes restantes: ${updatedAlbums.length}`);
    }

    // Limpiar estado
    setIsConfirmDialogOpen(false);
    setAlbumToDelete(null);
  };

  const handleCancelDeleteAlbum = () => {
    setIsConfirmDialogOpen(false);
    setAlbumToDelete(null);
  };

  // Funciones para manejar fotos
  const handleViewPhoto = (photo) => {

    console.log("Abriendo PhotoViewer para:", photo.title);

    setPhotoToView(photo);
    setIsPhotoViewerOpen(true);
  };

  const handleClosePhotoViewer = () => {
    setPhotoToView(null);
    setIsPhotoViewerOpen(false);
  };

  const handleSaveAlbum = (albumData) => {
    if (albumModalAction === "create") {
      // Crear nuevo álbum
      const newAlbum = {
        ...albumData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      setAlbums((prevAlbums) => [...prevAlbums, newAlbum]);
    } else {
      // Editar álbum existente
      setAlbums((prevAlbums) =>
        prevAlbums.map((album) =>
          album.id === selectedAlbum.id
            ? { ...album, ...albumData, updatedAt: new Date().toISOString() }
            : album
        )
      );
    }
    setIsAlbumModalOpen(false);
  };

  const handleCloseAlbumModal = () => {
    setIsAlbumModalOpen(false);
    setSelectedAlbum(null);
  };

  const handleEditPhoto = (photo) => {
    setPhotoModalAction("edit");
    setSelectedPhoto(photo);
    setIsPhotoModalOpen(true);
  };

  const handleSavePhoto = (photoData) => {
    if (photoModalAction === "create") {
      // Crear nueva foto
      const newPhoto = {
        ...photoData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      setPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
    } else {
      // Editar foto existente
      setPhotos((prevPhotos) =>
        prevPhotos.map((photo) =>
          photo.id === selectedPhoto.id
            ? { ...photo, ...photoData, updatedAt: new Date().toISOString() }
            : photo
        )
      );
    }
    setIsPhotoModalOpen(false);
  };

  const handleClosePhotoModal = () => {
    setIsPhotoModalOpen(false);
    setSelectedPhoto(null);
  };

  // Funciones para manejar eliminación de fotos
  const handleDeletePhoto = (photo) => {
    setPhotoToDelete(photo);
    setIsPhotoConfirmDialogOpen(true);
  };

  const handleConfirmDeletePhoto = () => {
    if (photoToDelete) {
      // Eliminar foto
      setPhotos((prevPhotos) =>
        prevPhotos.filter((p) => p.id !== photoToDelete.id)
      );
      console.log(`Foto "${photoToDelete.title}" eliminada exitosamente`);
    }
    // Limpiar estado
    setIsPhotoConfirmDialogOpen(false);
    setPhotoToDelete(null);
  };

  const handleCancelDeletePhoto = () => {
    setIsPhotoConfirmDialogOpen(false);
    setPhotoToDelete(null);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case VIEWS.ALBUMS:
        return (
          <Albums
            albums={albums}
            onEditAlbum={handleEditAlbum}
            onPlayAlbum={handlePlayAlbum}
            onDeleteAlbum={handleDeleteAlbum}
          />
        );
      case VIEWS.PHOTOS:
        return (
          <Photos
            photos={photos}
            onEditPhoto={handleEditPhoto}
            onDeletePhoto={handleDeletePhoto}
            onViewPhoto={handleViewPhoto}
          />
        );
      default:
        return (
          <Albums
            albums={albums}
            onEditAlbum={handleEditAlbum}
            onPlayAlbum={handlePlayAlbum}
            onDeleteAlbum={handleDeleteAlbum}
          />
        );
    }
  };

  return (

    <div className="App" >
      <Layout
        currentView={currentView}
        onViewChange={handleViewChange}
        albums={albums}
        photos={photos}
      >
        {renderCurrentView()}
      </Layout>

      {/* Modal de edición de álbum */}
      <EditAlbum
        isOpen={isAlbumModalOpen}
        action={albumModalAction}
        album={selectedAlbum}
        onSaveAlbum={handleSaveAlbum}
        onCancel={handleCloseAlbumModal}
      />

      {/* Modal de edición de foto */}
      <EditPhoto
        isOpen={isPhotoModalOpen}
        action={photoModalAction}
        photo={selectedPhoto}
        onSavePhoto={handleSavePhoto}
        onCancel={handleClosePhotoModal}
      />

      {/* Modal carrusel de álbum */}
      <AlbumCarousel
        isOpen={isCarouselModalOpen}
        album={carouselAlbum}
        onClose={handleCloseCarousel}
      />

      {/* Diálogo de confirmación para eliminar álbum */}
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        type="danger"
        title="Eliminar álbum"
        message={
          albumToDelete
            ? `¿Estás seguro de que quieres eliminar el álbum "${albumToDelete.title}"?\n\nEsta acción también eliminará todas las fotos asociadas y no se puede deshacer.`
            : ""
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDeleteAlbum}
        onCancel={handleCancelDeleteAlbum}
      />

      {/* Diálogo de confirmación para eliminar foto */}
      <ConfirmDialog
        isOpen={isPhotoConfirmDialogOpen}
        type="danger"
        title="Eliminar foto"
        message={
          photoToDelete
            ? `¿Estás seguro de que quieres eliminar la foto "${photoToDelete.title}"?\n\nEsta acción no se puede deshacer.`
            : ""
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDeletePhoto}
        onCancel={handleCancelDeletePhoto}
      />

      {/* Visor de fotos en fullscreen */}
      <PhotoViewer
        isOpen={isPhotoViewerOpen}
        photo={photoToView}
        onClose={handleClosePhotoViewer}
      />
    </div>
  );
}

export default App;