import PropTypes from "prop-types";
import TagButton from "../atoms/TagButton";
import DeleteButton from "../atoms/DeleteButton";
import './PhotoCard.css';

export default function PhotoCard({ image }) {

    return (
        <div className="photo-card">
            <img src={image.url} alt={image.title} />
            <div className="photo-card-content">
                <h3>{image.title}</h3>
                <p className="description">{image.description}</p>
                <p>{image.location}</p>
                <div className="tags-buttons-container">
                    <TagButton />
                    <DeleteButton />
                </div>
            </div>
        </div>
    );
};

PhotoCard.propTypes = {
    image: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        description: PropTypes.string,
        location: PropTypes.string,
        tags:PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
};