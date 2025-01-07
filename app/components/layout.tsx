"use client";
import React, { ReactNode } from "react";
import Nav from "./Nav";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Navigation - floating button on mobile, left on desktop */}
      <section className="md:w-1/4 md:h-screen md:p-8">
        <Nav />
      </section>

      {/* Content - full screen on mobile, right side on desktop */}
      <section className="w-full md:w-3/4 min-h-screen md:h-screen flex items-center justify-center p-4">
        <main className="w-full md:w-2/3">{children}</main>
      </section>
    </div>
  );
};

export default Layout;