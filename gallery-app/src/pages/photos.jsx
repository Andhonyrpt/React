import { photos as photosData } from "../data/photos.json";
import PhotoCard from "../molecules/PhotoCard";
export default function photos() {

    return (
        photosData.map((photo, i) => {
            return <PhotoCard key={i} image={photo} />
        })
    );
};