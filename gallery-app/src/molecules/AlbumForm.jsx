import './AlbumForm.css';

export default function AlbumForm({ action, album, onSaveAlbum }) {
    return (
        <div className="new-album-container">
            <h3>Crear nuevo álbum</h3>
            <form className='album-form'>
                {/* Título */}
                <div className='album-form-content'>
                    <label>Título del álbum</label>
                    <input
                        type="text"
                        id="albumTitle"
                        name="albumTitle"
                        placeholder="Ej. City Nights"
                    ></input>
                </div>
                {/* Descripción */}
                <div className='album-form-content'>
                    <label>Descripción del álbum</label>
                    <textarea
                        type="text"
                        id="albumDescription"
                        name="albumDescription"
                        rows='3'
                        placeholder="Describe el álbum"
                    ></textarea>
                </div>
                {/* Imágenes */}
                <div className='album-form-content'>
                    <label>Imágenes del álbum</label>
                    <div>
                        <input
                            type="url"
                            id="imageUrl"
                            name="imageUrl"
                            placeholder="URL de la imagen"
                        ></input>
                        <input
                            type="text"
                            id="imageTitle"
                            name="imageTitle"
                            placeholder="Nombre de la imagen"
                        ></input>
                        <button className='add-album-btn'>+</button>
                    </div>
                </div>
                <div className='album-form-actions'>
                    <button type="submit" className='album-create-btn'>Crear Álbum</button>
                    <button type="button" className='album-cancel-btn'>Cancelar</button>
                </div>
            </form>
        </div>
    );
};