import React from "react";
import placeHolder from "@/assets/Placeholder_view_vector.svg";
import Image from "next/image";

const HeroItemSliderSkeleton = () => {
  return (
    <div className="w-full bg-gray-300 animate-pulse flex items-center justify-between gap-20 h-[280px] md:h-[450px] rounded-custom-10px px-[60px] py-[90px] relative">
      <div className="flex flex-col  gap-5 w-full">
        <div className="flex flex-col gap-2.5 w-full">
          <div className="bg-gray-400 md:w-28 skeleton w-20 h-2 rounded-full"></div>
          <div className="bg-gray-400 md:w-40 skeleton w-28 h-3 rounded-full"></div>
          <div className="bg-gray-400 md:w-48 skeleton w-28 h-2 rounded-full"></div>
        </div>
        <div className="bg-gray-400 w-[112px] md:w-[190px] skeleton rounded md:h-[57px] h-[40px]"></div>
      </div>
      <div className="w-full">
        <Image
          src={placeHolder}
          alt="carousel-loader"
          className="md:w-[250px] w-[220px] h-[150px] md:h-[250px] rounded-md"
        />
      </div>
      <div className="absolute bottom-8 left-20 flex items-center gap-2">
        <div className="rounded-full bg-gray-400 skeleton w-2.5 h-2.5"></div>
        <div className="rounded-full bg-gray-400 skeleton w-2.5 h-2.5"></div>
        <div className="rounded-full bg-gray-400 skeleton w-2.5 h-2.5"></div>
      </div>
    </div>
  );
};

export default HeroItemSliderSkeleton;
