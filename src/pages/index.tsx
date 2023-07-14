import { Variants, motion } from "framer-motion";
import Image from "next/image";
import Dot from "../../public/assets/dot.svg";
import { useState } from "react";
import Nav from "../../components/nav";



export default function Home() {
 
  return (
    <main className="flex flex-row min-h-screen items-center justify-between p-24">
     <section>
      <Nav/>
     </section>
     <section>
      Gallery or whatever
     </section>
    </main>
  );
}
