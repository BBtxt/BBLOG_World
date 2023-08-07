import SocialMediaIcons from "@/components/SocialMediaIcons";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <motion.div
        className=""
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, y: -100 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <Image
          src="/assets/avatar.png"
          alt="Picture of the author"
          width={100}
          height={100}
          className="rounded-full"
        />
      </motion.div>
      <motion.div
        className="w-1/2 text-center py-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, y: -100 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <p>Hi I'm Brandon</p>
        <p>
          I'm a photographer and engineer. I try to capture beauty in the
          mundane. If you'd like to see what else I'm up too check out my
          socials below.{" "}
        </p>
      </motion.div>
      <motion.div
        className=""
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, y: -100 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        {" "}
        <SocialMediaIcons />{" "}
      </motion.div>
    </div>
  );
};

export default About;
