// App.tsx
import { useEffect, useRef } from "react";
import Slider from "../components/ui/Slider";
import TextSlider from "../components/ui/TextSlider";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { animateOnScroll } from "../utils/gsapAnimations";
import "../css/gsap.css";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const images = [
    "https://images.unsplash.com/photo-1617478755490-e21232a5eeaf?crop=entropy&cs=srgb&fm=jpg",
    "https://images.unsplash.com/photo-1617128734662-66da6c1d3505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
    "https://images.unsplash.com/photo-1617438817509-70e91ad264a5?crop=entropy&cs=srgb&fm=jpg",
    "https://images.unsplash.com/photo-1617412327653-c29093585207?crop=entropy&cs=srgb&fm=jpg",
  ];


  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1つ目のセクション / Titleにアニメーションを適用
    if (titleRef.current) {
      animateOnScroll(titleRef.current, {
        animationType: "slide-right", // 画面に出た時のアニメ
        delay: 0.3,
      });
    }

    // 1つ目のセクション / Subtitleにアニメーションを適用
    if (subtitleRef.current) {
      animateOnScroll(subtitleRef.current, {
        animationType: "slide-right",
        delay: 0.3
      });
    }

    // 2つ目のセクション / Aboutにアニメーションを適用
    if (aboutRef.current) {
      animateOnScroll(aboutRef.current, {
        animationType: "slide-left",
        delay: 0.3
      });
    }
  }, []);


  return (
    <div className="container">
      {/* 1つ目のセクション */}
      <section className="hero">
        <div className="slider-wrapper">
          {/* タイトル */}
          <div className="slider-text" ref={titleRef}>
            <TextSlider
              text="Let us be a PIECE of your journey. Let us be a PIECE of your journey. "
              direction="left"
              speed={0.7}
              fontSize="10rem"
            />
          </div>

          <div className="slider-text-wrapper">
            <Slider images={images} />
          </div>
        </div>

        {/* サブタイトル */}
        <div className="slider-subtitle-wrapper" ref={subtitleRef}>
          <p className="slider-subtitle">
            インスピレーションを与え、人々をつなげる特別な体験を
          </p>
        </div>
      </section>
      <section className="about">
      <div ref={aboutRef}>
        <img src="https://images.unsplash.com/photo-1617478755490-e21232a5eeaf?crop=entropy&cs=srgb&fm=jpg" alt="" />
      </div>
      </section>
    </div>
  );
}