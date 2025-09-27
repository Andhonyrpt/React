import albumsCollection from "../data/albums";
import AlbumCard from "../molecules/AlbumCard";
import './Albums.css';

export default function Albums() {

    return (
        <div className="album-grid">
            {albumsCollection.map((album, i) => {
                return <AlbumCard key={i} album={album} />;
            })}
        </div>

    );
};