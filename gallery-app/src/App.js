import './App.css';
import Layout from './layout/Layout';
import AlbumCard from './molecules/AlbumCard';
import PhotoCard from './molecules/PhotoCard';
import albums from "../src/data/albums";
import photosData from '../src/data/photos';


function App() {

  const image = {
    url: "",
    title: "Photo1",
    description: "Photo1 description",
    location: "RdR, Ags"
  }

  return (

    <div className="App" >
      <h1>App</h1>
      <Layout>
        <div className='main-container-album'>
          {albums.map((album, i) => {
            return <AlbumCard key={i} album={album} />;
          })}
        </div>

        {/* <div className='main-container-photo'>
          {photosData.map((photo, i) => {
            return <PhotoCard key={i} image={photo} />
          })};
        </div> */}
      </Layout>
    </div>
  );
}

export default App;
