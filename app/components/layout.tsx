"use client";
import React, { ReactNode } from "react";
import Nav from "./Nav";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
    {/* Apply margins here to the container */}
    <div className="mt-6 mx-4 md:mx-8">
      <Nav />
    </div>

    <div className="p-2">
      {children}
    </div>
  </div>
  );
};

export default Layout;