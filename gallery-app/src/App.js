import './App.css';
import Layout from './layout/Layout';
import AlbumCard from './molecules/AlbumCard';
import PhotoCard from './molecules/PhotoCard';
import albumsData from "../src/data/albums";


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
        <div className='main-container'>
          {albumsData.map((album, i) => {
            return <AlbumCard key={i} album={album} />;
          })}
        </div>
        {/* <PhotoCard image={image}></PhotoCard> */}
      </Layout>
    </div>
  );
}

export default App;
