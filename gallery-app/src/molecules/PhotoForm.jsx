import './PhotoForm.css';

export default function PhotoForm({ action, photo, onSavePhoto }) {
    return (
        <div className="new-photo-container">
            <h3>Agregar nueva foto</h3>
            <form className='photo-form'>
                <div className='photo-form-content'>
                    <label>URL de la imagen</label>
                    <input type="url" id="imageUrl" name="imageUrl"
                        placeholder="Escribe la URL de la imagen"></input>
                </div>
                <div className='photo-form-content'>
                    <label>Título de la imagen</label>
                    <input type="text" id="imageTitle" name="imageTitle"
                        placeholder="Ej. Parque"></input>
                </div>
                <div className='photo-form-content'>
                    <label>Descripción</label>
                    <textarea type="text" id="imageDescription" name="imageDescription" rows="3"
                        placeholder="Describe la foto..."></textarea>
                </div>
                <div className='photo-form-content'>
                    <label>Ubicación</label>
                    <input type="text" id="imageLocation" name="imageLocation"
                        placeholder="Ej: AGS, MX."></input>
                </div>
                <div className='photo-form-actions'>
                    <button type="submit" className='photo-create-btn'>Guardar Foto</button>
                    <button type="button" className='photo-cancel-btn'>Cancelar</button>
                </div>
            </form>
        </div>
    );
};