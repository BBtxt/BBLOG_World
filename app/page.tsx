// app/page.tsx
import Globe from "./components/Globe";



export default async function Home() {
 
      return (
          <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black">
              <Globe />
          </div>
      );

}

