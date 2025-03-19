// app/main/page.tsx
import Layout from "../components/layout";
import PhotoCarousel from "../components/PhotoCarousel";

export default function MainPage() {
  return (
    <Layout>
      <div className="w-full p-36">
        <PhotoCarousel />
      </div>
    </Layout>
  );
}