import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Button from "../atoms/Button";
import { BUTTON_SIZES } from "../utils/constants";
import './PhotoViewer.css';

export default function PhotoViewer({ isOpen, photo, onClose }) {

    const [zoomLevel, setZoomLevel] = useState(1);

    useEffect(() => {
        if (isOpen) {
            setZoomLevel(1);
        }
    }, [isOpen]);

    // 💡 NUEVO useEffect para bloquear el scroll de la página de fondo
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; // Bloquea el scroll
        } else {
            document.body.style.overflow = 'auto'; // Restaura el scroll
        }

        // Función de limpieza para asegurar que el scroll se restaura al desmontar
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const handleScroll = (e) => {
        e.preventDefault();
        e.stopPropagation(); // Previene el scroll de la página
        const zoomFactor = 0.1; // Ajusta la sensibilidad del zoom

        if (e.deltaY < 0) {
            // Scroll hacia arriba = zoom in
            setZoomLevel((prevZoom) => Math.min(prevZoom + zoomFactor, 3)); // Max 300% zoom
        } else {
            // Scroll hacia abajo = zoom out
            setZoomLevel((prevZoom) => Math.max(prevZoom - zoomFactor, 1)); // Min 100% zoom
        }
    };

    if (!isOpen || !photo) {
        return null;
    }

    return (
        <div className="photoviewer-modal-overlay" onClick={onClose}>
            <div className="photoviewer-modal">
                {/* Header del modal */}
                <div className="photoviewer-header">
                    <div className="photoviewer-photo-info">
                        <h2 className="photoviewer-photo-title">
                            <span className="photoviewer-play-icon">▶</span>
                            {photo.title}
                        </h2>
                        <p className="photoviewer-photo-description">{photo.description}</p>
                    </div>
                    <Button
                        className="photoviewer-close-button"
                        onClick={onClose}
                        variant="secondary"
                        size={BUTTON_SIZES.MEDIUM}
                        ariaLabel="Cerrar PhotoViewer"
                    >
                        x
                    </Button>
                </div>

                {/* Área principal de la imagen */}
                <div
                    className="photoviewer-main"

                    onWheel={handleScroll}
                    style={{ overflow: 'hidden' }}
                >
                    <div className="photoviewer-image-container">
                        <img
                            src={photo.url} alt={photo.title}
                            className="photoviewer-image"
                            style={{
                                transform: `scale(${zoomLevel})`,
                                transformOrigin: 'center center'
                            }}
                        />
                        <div className="photoviewer-image-info">
                            {/* <h3 className="photoviewer-image-title">{photo.title}</h3>
                            <h4 className="photoviewer-image-description">{photo.description}</h4> */}
                            <h4 className="photoviewer-image-location">{photo.location}</h4>

                            {photo.tags && photo.tags.length > 0 && (
                                <div className="photoviewer-tags-container">
                                    {photo.tags.map((tag, index) => (
                                        <span key={index} className="photoviewer-tag-badge">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

PhotoViewer.propTypes = {
    photo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        albumId: PropTypes.number,
        tags: PropTypes.arrayOf(PropTypes.string)
    }),
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.bool.isRequired
};