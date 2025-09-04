import BannerCarousel from "./components/BannerCarousel/BannerCarousel.jsx";
import Button from "./components/common/Button.jsx";

function App() {
  const images = [
    {
      image: "https://cdn.aarp.net/content/dam/aarpe/es/home/hogar-familia/tecnologia/info-2022/camaras-digitales-autonomas/_jcr_content/root/container_main/container_body_main/container_image/articlecontentfragme/cfimage.coreimg.75.1320.jpeg/content/dam/aarp/home-and-family/personal-technology/2022/12/1140-digital-camera-viewfinder-esp.jpg",
      title: "Cámara Pro",
      description: "Cámara muy Pro"
    },
    {
      image: "https://media.gettyimages.com/id/171150042/es/foto/sunrise-imagen-en-lcd-oxbow-curva-gtnp.jpg?s=612x612&w=gi&k=20&c=sgVWtLmyZaYtN4z72ErGk-2Bh5plh-jeNNGWaT8UKaI=",
      title: "Cámara menos Pro",
      description: "Cámara menos Pro"
    }
  ];

  function click() {
    alert("OK");
  };

  return (
    <div className="App">
      <BannerCarousel banners={images} />
      <Button type="submit" disabled={false} onClick={click}>
        OK
      </Button>
    </div>
  );
};

export default App;
