import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import './AlbumCarousel.css';
import Button from '../atoms/Button';
import { BUTTON_SIZES } from '../utils/constants';

export default function AlbumCarousel({ isOpen, album, onClose }) {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (isOpen) {
            setCurrentImageIndex(0);
        }
    }, [isOpen]);

    // Funciones de navegación definidas 
    const goToPrevious = () => {
        setCurrentImageIndex((prev) => prev === 0 ? album?.images?.length - 1 : prev - 1);
    };

    const goToNext = () => {
        setCurrentImageIndex((prev) => prev === album?.images?.length - 1 ? 0 : prev + 1);
    };

    const goToImage = (index) => {
        setCurrentImageIndex(index);
    };

    // Manejar teclas de navegación
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen || !album?.images?.length) return;

            switch (e.key) {
                case "Escape":
                    onClose();
                    break;
                case "ArrowLeft":
                    goToPrevious();
                    break;
                case "ArrowRight":
                    goToNext();
                    break;
                default:
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose, goToNext, goToPrevious]);

    if (!isOpen || !album || !album.images || album.images.length === 0) {
        return null;
    }

    const currentImage = album.images[currentImageIndex];

    return (
        <div className='carousel-modal-overlay' onClick={onClose}>
            <div className='carousel-modal' onClick={(e) => e.stopPropagation()}>

                {/* Header del modal */}
                <div className='carousel-header'>
                    <div className='carousel-album-info'>
                        <h2 className='carousel-album-title'>
                            <span className='carousel-play-icon'>▶</span>
                            {album.title}
                        </h2>
                        <p className='carousel-album-description'>{album.description}</p>
                    </div>
                    <Button className='carousel-close-button'
                        onClick={onClose}
                        variant='secondary'
                        size={BUTTON_SIZES.MEDIUM}
                        ariaLabel="Cerrar carrusel"
                    >
                        x
                    </Button>
                </div>

                {/* Área principal de la imagen */}
                <div className='carousel-main'>
                    <Button className='carousel-nav-button carousel-nav-button__prev'
                        onClick={goToPrevious}
                        variant='secondary'
                        disabled={album.images.length <= 1}
                        size={BUTTON_SIZES.LARGE}
                        ariaLabel="Imagen Anterior"
                    >
                        ‹
                    </Button>

                    <div className='carousel-image-container'>
                        <img
                            src={currentImage.url}
                            alt={currentImage.name || `Imagen ${currentImageIndex + 1}`}
                            className='carousel-image'
                        />
                        <div className='carousel-image-info'>
                            <h3 className='carousel-image-title'>{currentImage.name}</h3>
                            <p className='carousel-image-counter'>{currentImageIndex + 1} de {album.images.length}</p>
                        </div>
                    </div>

                    <Button
                        className='carousel-nav-button carousel-nav-button__next'
                        onClick={goToNext}
                        variant='secondary'
                        disabled={album.images.length <= 1}
                        size={BUTTON_SIZES.LARGE}
                        ariaLabel="Imagen Siguiente"
                    >
                        › </Button>
                </div>

                {/* Thumbnails */}
                {album?.images?.length > 1 && (
                    <div className='carousel-thumbnails'>
                        <div className='carousel-thumbnails-container'>
                            {album.images.map((image, index) => (
                                <Button
                                    key={index}
                                    className={`carousel-thumbnail ${index === currentImageIndex ? "carousel-thumbnail__active" : ""}`}
                                    onClick={() => goToImage(index)}
                                    variant='ghost'
                                    size={BUTTON_SIZES.SMALL}
                                    ariaLabel={image.name || `Imagen ${index + 1}`}
                                >
                                    <img
                                        className='carousel-thumbnail-image'
                                        src={image.url}
                                        alt={image.name || `Thumbnail ${index + 1}`}
                                    />
                                </Button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};

AlbumCarousel.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    album: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        images: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string.isRequired,
                name: PropTypes.string
            })
        )
    }),
    onClose: PropTypes.func.isRequired
};