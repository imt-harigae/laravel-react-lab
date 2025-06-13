// App.tsx
import { Link } from 'react-router-dom';
import ImageSlider from "../components/ui/ImageSlider";
import TextSlider from "../components/ui/TextSlider";
import FadeInOnScroll from "../components/ui/FadeInOnScroll";
import FadeInBlock from "../components/ui/FadeInBlock";
import AnimatedGridSlider from "../components/ui/AnimatedGridSlider";
import AnimatedGrid from "../components/ui/AnimatedGrid";
import "../css/gsap.css";

export default function App() {
  const images = [
    "https://images.unsplash.com/photo-1617438817509-70e91ad264a5?crop=entropy&cs=srgb&fm=jpg",
    "https://images.unsplash.com/photo-1617478755490-e21232a5eeaf?crop=entropy&cs=srgb&fm=jpg",
    "https://images.unsplash.com/photo-1617128734662-66da6c1d3505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
    "https://images.unsplash.com/photo-1617412327653-c29093585207?crop=entropy&cs=srgb&fm=jpg",
    "https://images.unsplash.com/photo-1617141636403-f511e2d5dc17?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxODAzMjc4Mw&ixlib=rb-1.2.1&q=75w=1920",
  ];

  return (
    <div className="container">
      {/* セクション① */}
      <section className="hero">
        <div className="slider-wrapper">
          <FadeInOnScroll animationType="slide-right" delay={1.5} className="slider-text">
            {/* テキストスライド */}
            <TextSlider
              text="The only way to do great work is to love what you do. If you haven’t found it yet, keep looking. Don’t settle. As with all matters of the heart, you’ll know when you find it."
              direction="left"
              speed={0.5}
              fontSize="10rem"
            />
          </FadeInOnScroll>

          {/* 画像スライド */}
          <FadeInOnScroll animationType="slide-left" delay={0.3} className="slider-text-wrapper">
            <ImageSlider images={images} direction="right" speed={0.5} shape="square" />
          </FadeInOnScroll>
        </div>

        {/* サブタイトル */}
        <FadeInOnScroll animationType="slide-right" delay={1} className="slider-subtitle-wrapper">
          <p className="slider-subtitle">心が動くまで、歩みを止めないこと。</p>
        </FadeInOnScroll>
      </section>

      {/* セクション② */}
      <section className="about">
        <FadeInOnScroll animationType="slide-right" delay={0.3} className="about-wrapper">
          <div className="about-text">
            <h2 className="about-heading">about</h2>
            <p className="about-description">
              創造は、情熱から始まります。<br />
              私たちは、ただ「作る」のではなく、<br className="sm-only" />
              心を動かす体験をデザインします。<br />
              テクノロジーと感性の交差点で、<br className="sm-only" />
              あなたのビジョンをかたちにします。
            </p>
            <FadeInBlock>
              <p className="about-description">
                フェードインブロック検証<br />
              </p>
              <AnimatedGrid imageUrl={images[4]} />
            </FadeInBlock>
          </div>

          <div className="about-image">
            {/* アニメーション付きの画像スライド */}
            <AnimatedGridSlider images={images} />

            <div className="detail-button-wrapper">
              <Link to="/gallery">
                <button className="detail-button" >
                  もっと見る
                </button>
              </Link>
            </div>
          </div>
        </FadeInOnScroll>
      </section>
    </div>
  );
}