import PropTypes from 'prop-types';
import DeleteButton from "../atoms/DeleteButton";
import PlayButton from "../atoms/PlayButton";
import TagButton from "../atoms/TagButton";
import './AlbumCard.css';

export default function AlbumCard({ album }) {

  return (
    <div className="album-card">
      <div className="images-container">
        {album && album.images.length > 0 ?
          album.images.map((img, i) => {
            return <img key={img.url || i} src={img.url} alt={img.name} className="album-image" />
          }) :
          <p>No hay imágenes para mostrar en este album</p>}
      </div>
      <div className="album-card-content">
        <h3>{album.title}</h3>
        <p className="description">{album.description}</p>

        <div className="tags-container" >
          <TagButton />
        </div>
        <div className="buttons-container">
          <PlayButton />
          <DeleteButton />
        </div>
      </div>
    </div>);
};

AlbumCard.propTypes = {
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
  }).isRequired
};