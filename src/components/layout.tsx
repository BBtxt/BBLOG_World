// layout.tsx
import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { Variants, motion } from "framer-motion";

// Nav items and animations
const navItems: Variants = {
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.95 },
  default: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17,
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
      transition={{ ease: "linear", duration: 2 }}
      className="w-full md:w-auto"
    >
      <motion.ul className="flex flex-row md:flex-col gap-4 md:gap-6 justify-center md:justify-start">
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
            <Link href={item.path}>
              <motion.div
                variants={navItems}
                whileHover="whileHover"
                whileTap="whileTap"
                className="font-extrabold text-sm md:text-2xl"
              >
                <motion.p>{item.name}</motion.p>
              </motion.div>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.nav>
  );
};

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen w-full px-4 md:px-0 md:w-4/5 mx-auto">
      {/* Mobile Layout */}
      <div className="md:hidden w-full py-4">
        <Nav />
      </div>

      {/* Desktop Layout */}
      <div className="flex flex-col md:flex-row justify-center md:items-center gap-4 h-full md:h-screen">
        <section className="hidden md:flex w-1/4 h-auto justify-start items-start">
          <Nav />
        </section>
        <section className="flex-1 md:w-3/4 h-auto">
          <main>{children}</main>
        </section>
      </div>
    </div>
  );
};

export default Layout;
