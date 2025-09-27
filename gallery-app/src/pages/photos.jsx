import photosCollection from '../data/photos';
import PhotoCard from "../molecules/PhotoCard";
import './Photos.css'

export default function photos() {

    return (
        <div className='photo-grid'>
            {photosCollection.map((photo, i) => {
                return <PhotoCard key={i} image={photo} />
            })}
        </div>

    );
};