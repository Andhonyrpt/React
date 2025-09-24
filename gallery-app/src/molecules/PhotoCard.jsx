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