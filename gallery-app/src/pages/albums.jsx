import albumsData from "../data/albums.json";
import AlbumCard from "../molecules/AlbumCard";
import './albums.css';

export default function albums() {

    return (
        <div className="album-grid">
            {albumsData.map((album, i) => {
                return <AlbumCard key={i} album={album} />;
            })}
        </div>

    );
};