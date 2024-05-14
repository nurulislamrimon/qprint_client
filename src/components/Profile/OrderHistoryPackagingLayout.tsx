"use client";
import { imageUrl } from "@/constants/imageUrl";
import { useGetOnlineOrderQuery } from "@/redux/features/online-order/online-orderApi";
import Image from "next/image";
import OrderTrackButton from "./OrderTrackButton";
import { formatDate } from "@/constants/formatDate";
import { IconX } from "@tabler/icons-react";
import OrderHistorySkeleton from "@/components/shared/Skeleton/OrderHistorySkeleton";


const OrderHistoryPackagingLayout = ({ id }: string | any) => {
  console.log(id);

  // <== Get data from order history query ==>
  const { data, isLoading } = useGetOnlineOrderQuery(
    `buyer.userId=${id}&orderStatus.status=Packaging`
  );

  return (
    <div>
      {
        isLoading ? (

          [...Array(2)].map((_: any, index: number) => {
            return (
              <OrderHistorySkeleton key={index} />
            )
          })

        ) :


          data?.data?.map((packagingData: any) => (
            <div
              key={packagingData?._id}
              className="mb-5 border rounded-md p-4 md:p-[30px]"
            >
              {/* == Basic Information == */}
              <div className="flex items-baseline justify-between pb-3.5 md:pb-7 border-b mb-3.5 md:mb-7">
                <div className="flex flex-col">
                  <span className="font-semibold text-xs md:text-base">
                    Order Id: {packagingData?.orderId}
                  </span>
                  <span className="text-black-opacity-60 text-sm">
                    {formatDate(packagingData?.createdAt)}
                  </span>
                </div>
                <span className="text-[#FA8232] bg-[#FA8232] bg-opacity-10 py-1 px-2 rounded-full text-xs md:text-base">
                  {packagingData?.orderStatus?.status === "Packaging" &&
                    "Packaging"}
                </span>
              </div>
              {/* == Ordered Items == */}
              <div>
                {packagingData?.orderItems?.map((product: any) => (
                  <div
                    key={product?._id}
                    className="flex md:order-packaging-shipped-order-placed-card-style mb-3.5 md:mb-7"
                  >
                    <div className="">
                      <div className="w-[60px] h-[60px] relative mr-2.5 md:mr-5">
                        <Image
                          src={`${imageUrl}${product?.productPhotos[0]}`}
                          fill
                          objectFit="cover"
                          alt="Product Photo"
                          className="w-full h-full top-0 left-0 object-cover p-1.5 border rounded-md"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col w-full md:w-auto">
                      <span className="font-medium text-sm md:text-base line-clamp-1 md:line-clamp-2">
                        {product?.productName}
                      </span>
                      <span className="text-black-opacity-70 text-xs md:text-sm">
                        {product?.brand?.brandName}
                      </span>
                      <div className="flex justify-between items-center md:hidden w-full">
                        <div className="">
                          <span className="font-medium text-sm md:text-lg text-black-opacity-80">
                            {product?.orderQuantity}
                          </span>
                          x
                          <span className="font-medium text-sm md:text-lgtext-black-opacity-80">
                            {product?.variant?.sellingPrice}
                          </span>
                          <small className="text-sm">QAR</small>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-sm md:text-lgtext-black-opacity-80">
                            {product?.orderQuantity *
                              product?.variant?.sellingPrice}
                          </span>
                          <small className="text-sm">QAR</small>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center gap-0.5">
                      <span>{product?.orderQuantity}</span>
                      <IconX stroke={2} height={15} width={15} />
                      <span>{product?.variant?.sellingPrice}</span>
                      <small>QAR</small>
                    </div>
                    <div className="hidden md:flex items-center gap-1 justify-end">
                      <span>
                        {product?.orderQuantity * product?.variant?.sellingPrice}
                      </span>
                      <small>QAR</small>
                    </div>
                  </div>
                ))}
              </div>
              {/* == Summary == */}
              <div className="flex items-center justify-between border-t border-dashed pt-3.5 md:pt-6">
                <div>
                  <span className="md:text-base text-sm">
                    {packagingData?.orderItems?.length} Items,
                  </span>
                  <span className="text-sm md:text-base">
                    Total: <b className="font-bold">{packagingData?.totalPrice}</b>
                    QAR
                  </span>
                </div>
                <OrderTrackButton id={packagingData?._id} />
              </div>
            </div>
          ))}
    </div>
  );
};

export default OrderHistoryPackagingLayout;
