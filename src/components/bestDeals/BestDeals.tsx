"use client";
import Image from "next/image";
import { useGetBestDealsQuery } from "@/redux/features/dealWidgetSliderEtc/bestDeal";
import { imageUrl } from "@/constants/imageUrl";
import CountdownTimer from "./CountdownTimer";
import BestDealProduct from "./BestDealProduct";
import BestDealsSkeleton from "../shared/Skeleton/BestDealsSkeleton";

const BestDeals = () => {
  const { data, isLoading } = useGetBestDealsQuery("");
  const endDate = new Date(data?.data?.endDate);

  // <== Get Product Data From Best Deals ==>
  const productData = data?.data?.products?.map((product: any) => {
    return product;
  });

  return isLoading ? (
    <BestDealsSkeleton />
  ) : (
    <section
      className={`py-4 px-2 md:py-7 md:px-8  lg:mt-20 md:mt-20 mt-8 rounded-lg`}
      style={{
        backgroundColor: `${
          data?.data?.backgroundColor !== "" && `${data?.data?.backgroundColor}`
        }`,
        backgroundImage: `url(${
          data?.data?.backgroundColor === "" &&
          imageUrl + data?.data?.backgroundPhoto
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex items-center justify-between gap-3 md:gap-x-5 overflow-hidden">
        <div className="w-1/4">
          <div className="relative w-16 md:w-32 h-16 md:h-32 lg:w-48 lg:h-48 shrink-0">
            <Image
              src={`${imageUrl}${data?.data?.firstProductPhoto}`}
              alt="Offer Image"
              fill
              sizes="500px"
              priority={true}
              className="w-full h-full top-0 left-0 object-cover"
            />
          </div>
        </div>
        <div className="w-2/4 flex items-center flex-col space-y-6">
          <div className="text-center space-y-2 md:space-y-3 lg:space-y-3 mb-5">
            <h4 className="[font-size:_clamp(0.6em,4vw,0.9em)] main-text-color ">
              BEST DEALS
            </h4>
            <h1 className="md:line-clamp-2 line-clamp-1 text-base md:text-2xl main-text-color font-semibold ">
              {data?.data?.title}
            </h1>
            <p className="line-clamp-2 text-sm md:text-lg text-gray-500">
              {data?.data?.description}
            </p>
          </div>
          <div>
            <CountdownTimer endDate={endDate} />
          </div>
        </div>
        <div className="w-1/4 flex items-end justify-end overflow-hidden">
          <div className="relative w-16 md:w-32 h-16 md:h-32 lg:w-48 lg:h-48 shrink-0">
            <Image
              src={`${imageUrl}${data?.data?.secondProductPhoto}`}
              alt="Offer Image"
              fill
              sizes="500px"
              priority={true}
              className="w-full h-full top-0 left-0 object-cover"
            />
          </div>
        </div>
      </div>
      <div className="mt-10 md:mt-20">
        <BestDealProduct productData={productData} />
      </div>
    </section>
  );
};

export default BestDeals;
