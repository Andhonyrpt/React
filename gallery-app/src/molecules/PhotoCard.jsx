import TagButton from "../atoms/TagButton";
import DeleteButton from "../atoms/DeleteButton";

export default function PhotoCard({ image }) {

    return (
        <div>
            <img src={image.url} alt={image.title} />
            <h3>{image.title}</h3>
            <p>{image.description}</p>
            <p>{image.location}</p>
            <TagButton />
            <DeleteButton />
        </div>
    );
};