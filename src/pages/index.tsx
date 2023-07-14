import { useState } from "react";
import Nav from "../../components/nav";
import Hero from "../../components/Hero";
import Mono from "../../components/Mono";
import Rgb from "../../components/Rgb";
import About from "../../components/About";




export default function Home() {
  const [selectedItem, setSelectedItem] = useState("Hero");
  
  const handleSelect = (name: string) => {
    setSelectedItem(name);
  };
 
  let content;
  if (selectedItem === "Hero") {
    content = <Hero />;
  } else if (selectedItem === "MONO") {
    content = <Mono />;
  } else if (selectedItem === "RGB") {
    content = <Rgb />;
  } else if (selectedItem === "ABOUT") {
    content = <About />;
  }

console.log(selectedItem)

  return (
    <main className="flex flex-row min-h-screen items-center justify-between p-24">
     <section>
      <Nav onTabClick={handleSelect}/>
     </section>
     <section>
      {content}
     </section>
    </main>
  );
}
