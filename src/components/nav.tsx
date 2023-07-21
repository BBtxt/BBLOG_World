import React, { useState } from "react";
import { Variants, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";


const navItems: Variants = {
  whileHover: { scale: 1.2 },
  whileTap: { scale: 0.9 },
  default: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17,
    },
  },
};

const navList: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.5,
      delayChildren: 0.2,
      staggerChildren: 2.5,
    },
  },
};

const Nav = () => {

  const items = [
    { id: 1, name: "HOME", path: "/" },
    { id: 2, name: "RGB", path: "/rgb" },
    { id: 3, name: "MONO", path: "/mono" },
    { id: 4, name: "ABOUT", path: "/about" },
  ];


  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: "linear",
        duration: 2,

      }}
    >
      <motion.ul >
        {items.map((item, index) => (
            <motion.li
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17,
              delay: 0.1 + index * 0.2,
            }}
          >
            <Link
            href={item.path}>
              <motion.div
                variants={navItems}
                whileHover="whileHover"
                whileTap="whileTap"
                className="flex flex-row gap-6"
              >
                <Image src='/assets/dot.svg' alt="dot" width={20} height={20}
                className="ml-3 bg-red-500"/>
                <motion.p>{item.name}</motion.p>
              </motion.div>
              
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.nav>
  );
};

export default Nav;
