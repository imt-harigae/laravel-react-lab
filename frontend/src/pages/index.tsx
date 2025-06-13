import Slider from "../components/ui/ImageSlider";
import "../css/index.css";

export default function App() {
  const images = [
    "https://images.unsplash.com/photo-1617478755490-e21232a5eeaf?crop=entropy&cs=srgb&fm=jpg",
    "https://images.unsplash.com/photo-1617128734662-66da6c1d3505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
    "https://images.unsplash.com/photo-1617438817509-70e91ad264a5?crop=entropy&cs=srgb&fm=jpg",
    "https://images.unsplash.com/photo-1617412327653-c29093585207?crop=entropy&cs=srgb&fm=jpg",
  ];

  return (
    <div className="hero-container">
      <div className="image-slider-section">
        <div className="text-overlay">
          <p className="main-headline">
            Let us be a PIECE of your journey. Let us be a PIECE of your journey.
          </p>
          <p className="sub-message">
            インスピレーションを与え、人々をつなげる特別な体験を
          </p>
        </div>

        <div className="slider-display-area">
          <Slider images={images} />
        </div>
      </div>
    </div>
  );
}
