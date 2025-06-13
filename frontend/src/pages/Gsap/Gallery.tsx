import ImageScrollGallery from "../../components/ui/ImageScrollGallery"

const images = [
  "https://images.unsplash.com/photo-1617438817509-70e91ad264a5?crop=entropy&cs=srgb&fm=jpg",
  "https://images.unsplash.com/photo-1617478755490-e21232a5eeaf?crop=entropy&cs=srgb&fm=jpg",
  "https://images.unsplash.com/photo-1617128734662-66da6c1d3505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
  "https://images.unsplash.com/photo-1617412327653-c29093585207?crop=entropy&cs=srgb&fm=jpg",
  "https://images.unsplash.com/photo-1617141636403-f511e2d5dc17?crop=entropy&cs=srgb&fm=jpg",
];

export default function Page() {
  return (
    <ImageScrollGallery
      images={images}
      columnCount={3}
      durations={[20, 90, 70]} // 列ごとに速度変えたいときに渡す
    />
  );
}
