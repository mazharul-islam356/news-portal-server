import HeroSlider from "../components/HeroSlider";
import NewArrivals from "../components/NewArrivals";

export const noImg = "/noimg.jpg";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <NewArrivals />
    </div>
  );
}
