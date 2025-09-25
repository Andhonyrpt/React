import { useState } from 'react';
import './App.css';
import Layout from './layout/Layout';
// import Albums from './pages/Albums';
import Photos from './pages/Photos';
import AlbumCard from './molecules/AlbumCard';
import PhotoCard from './molecules/PhotoCard';
import photosData from '../src/data/photos';


function App() {
  const [currentView,setCurrentView]=useState('photos');

  return (

    <div className="App" >
      <h1>App</h1>
      <Layout>
        {/* <div className='main-container-album'>
          {albums.map((album, i) => {
            return <AlbumCard key={i} album={album} />;
          })}
        </div> */}
        <Albums />
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
