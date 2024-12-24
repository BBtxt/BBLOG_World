// app/page.tsx
import Globe from "./components/Globe";
import { getLightroomPhotos } from "../utils/lightroom";


export default async function Home() {
  try {
      const photos = await getLightroomPhotos();
      
      return (
          <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black">
              <Globe />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  {photos.resources?.map((photo) => (
                      <div key={photo.id} className="relative aspect-square">
                          <img
                              src={photo.links["2048"]}
                              alt="Lightroom photo"
                              className="object-cover w-full h-full"
                          />
                      </div>
                  ))}
              </div>
          </div>
      );
  } catch (error) {
      console.error("Error:", error);
      return <div>Error loading photos. Please try again later.</div>;
  }
}

