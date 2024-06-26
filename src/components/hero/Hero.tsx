"use client";
import HeroItemSlide from "./HeroItemSlide";
import { useGetHeroSliderQuery } from "@/redux/features/dealWidgetSliderEtc/heroSlider";
import TopSmallBanner from "./TopSmallBanner";
import BottomSmallBanner from "./BottomSmallBanner";
import SmallBannerSkeleton from "../shared/Skeleton/SmallBannerSkeleton";

const Hero = () => {
  const { data, isLoading } = useGetHeroSliderQuery("");

  const sliderArray = Object.values(data?.data?.slider || {});

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* === Left side slider with three nested section === */}
      <div className="h-[280px] md:h-[450px] md:col-span-2">
        <HeroItemSlide isLoading={isLoading} sliderArray={sliderArray} />
      </div>

      {/* === right top and right bottom === */}
      <div className="">
        {isLoading ? (
          <div className="flex flex-col gap-4 h-full md:h-auto">
            {[...Array(2)].map((_, index) => (
              <SmallBannerSkeleton index={index} key={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-5 w-full">
            <div className="h-[215px]">
              <TopSmallBanner topOffer={data?.data?.topOffer} />
            </div>
            <div className="h-[215px]">
              <BottomSmallBanner bottomOffer={data?.data?.bottomOffer} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
