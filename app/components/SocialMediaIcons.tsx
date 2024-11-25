import React from "react";
import Image from "next/image";

const SocialMediaIcons = () => {
  return (
    <div className="flex justify-center md:justify-start my-5 gap-7">
      <a
        className=" p-0.5 rounded-lg "
        href="https://github.com/BBtxt"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src="/assets/icons8-github-100.png"
          alt="github"
          height={30}
          width={30}
        />
      </a>
      <a
        className=" p-0.5 rounded-full "
        href="https://www.instagram.com/bblog.world/"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src="/assets/icons8-instagram-100.png"
          alt="instagram" 
          height={30}
          width={30}
        />
      </a>
      <a
        className="  p-0.5 rounded-lg"
        href="https://twitter.com/bblogwrld"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src="/assets/icons8-twitter-100.png"
          alt="Instagram"
          height={30}
          width={30}
        />
      </a>
    </div>
  );
};

export default SocialMediaIcons;
