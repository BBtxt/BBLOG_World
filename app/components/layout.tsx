"use client";
import React, { ReactNode } from "react";
import Nav from "./nav";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center ">
      {/* Navigation - top on mobile, left on desktop */}
      <section className="w-full md:w-1/4 h-20 md:h-screen flex items-center justify-center md:justify-end ">
        <Nav />
      </section>

      {/* Content - below nav on mobile, right side on desktop */}
      <section className="w-full md:w-3/4 h-[calc(100vh-5rem)] md:h-screen flex items-center justify-center ">
        <main className="w-2/3">{children}</main>
      </section>
    </div>
  );
};

export default Layout;
