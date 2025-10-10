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

    // Manejar teclas de navegación
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;

            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);

    }, [isOpen, onClose]);

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
        <div className="photo-viewer-overlay" onClick={onClose}>
            <div className="photo-viewer" onClick={(e) => e.stopPropagation()}>
                {/* Header del modal */}
                <div className="photo-viewer__header">
                    <div className="photo-viewer__info">
                        <h2 className="photo-viewer__title">
                            {photo.title}
                        </h2>
                        {photo.location && (
                            <p className="photo-viewer__location">
                                <span className="photo-viewer__location-icon">📍</span>
                                {photo.location}
                            </p>
                        )}
                    </div>
                    <Button
                        className="photo-viewer__close"
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
                    className="photo-viewer__image-container"
                    onWheel={handleScroll}
                    style={{ overflow: 'hidden' }}
                >
                    <img
                        src={photo.url} alt={photo.title}
                        className="photo-viewer__image"
                        style={{
                            transform: `scale(${zoomLevel})`,
                            transformOrigin: 'center center'
                        }}
                        loading="lazy"
                    />
                </div>

                {/* Footer con descripción */}
                {photo.description && (
                    <div className="photo-viewer__footer">
                        <p className="photo-viewer__description">{photo.description}</p>
                        {photo.tags && photo.tags.length > 0 && (
                            <div className="photo-viewer__tags">
                                {photo.tags.map((tag) => (
                                    <span key={tag} className="photo-viewer__tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

PhotoViewer.propTypes = {
    photo: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        location:PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};