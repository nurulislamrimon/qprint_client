import { useGetShippingQuery } from "@/redux/features/api/shipping/shippingApi";
import { setPrintingRequest } from "@/redux/features/printing-request/postPrintingRequestSlice";
import { useGetUserAddressQuery } from "@/redux/features/user/user";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { isLoggedIn } from "@/services/auth.service";
import { IconPlus } from "@tabler/icons-react";
import { IconMinus } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const PringtingRequestOrderCard = ({ href, buttonText, btnDisable }: any) => {
  const data = useAppSelector((state) => state.printingRequestOrder);
  const getShipping = useGetShippingQuery("");

  const dispatch = useAppDispatch();

  const calculateHeightWidth = data?.paperSize?.height * data?.paperSize?.width;

  const heightWidthMultiplyByType = calculateHeightWidth * data?.paperTypePrice;

  const heightWidthMultiplyMode =
    calculateHeightWidth * data?.printingModePrice;

  // default address
  const { data: address } = useGetUserAddressQuery(`isDefault=true`);
  // is user login
  const isUserLoggedIn = isLoggedIn();

  let deliveryCharge;

  if (isUserLoggedIn && address?.data[0].state === "Doha") {
    deliveryCharge = getShipping?.data?.data?.inside;
  } else if (isUserLoggedIn && address?.data[0].state !== "Doha") {
    deliveryCharge = getShipping?.data?.data?.outside;
  } else if (isUserLoggedIn === false || address?.data[0].state === undefined) {
    deliveryCharge = getShipping?.data?.data?.inside;
  }

  if (
    data?.shippingAddress?.oldAddress == false &&
    data?.shippingAddress?.state === "Doha"
  ) {
    deliveryCharge = getShipping?.data?.data?.inside;
  } else if (
    data?.shippingAddress?.oldAddress == false &&
    data?.shippingAddress?.state !== "Doha"
  ) {
    deliveryCharge = getShipping?.data?.data?.outside;
  } else if (
    data?.shippingAddress?.oldAddress == true &&
    address?.data[0].state === "Doha"
  ) {
    deliveryCharge = getShipping?.data?.data?.inside;
  } else if (
    data?.shippingAddress?.oldAddress == true &&
    address?.data[0].state !== "Doha"
  ) {
    deliveryCharge = getShipping?.data?.data?.outside;
  }

  const totalAmount = heightWidthMultiplyByType + heightWidthMultiplyMode;

  const totalAmountWithQuantity = totalAmount * data?.totalQuantity;

  return (
    <div className=" border rounded-lg pb-5 mb-5">
      <h4 className="px-5 py-4 text-lg font-medium">Total Order</h4>

      <div className="border-y">
        <div className="flex justify-between items-center px-5 py-4   ">
          <small className="text-base text-gray-500">Item of print </small>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                dispatch(
                  setPrintingRequest({
                    ...data,

                    totalQuantity: data?.totalQuantity - 1,
                  })
                )
              }
              className={`${
                data?.totalQuantity < 1 ? "btn-disabled opacity-50" : ""
              } border border-fuchsia-800 p-0.5 text-black text-opacity-70 `}
            >
              {""}
              <IconMinus stroke={3} width={15} height={15} />
            </button>

            <span>{data?.totalQuantity ? data?.totalQuantity : 0}</span>
            <button
              onClick={() =>
                dispatch(
                  setPrintingRequest({
                    ...data,

                    totalQuantity: data?.totalQuantity + 1,
                  })
                )
              }
              className="border border-fuchsia-800 p-0.5 text-black text-opacity-70 "
            >
              {""}
              <IconPlus stroke={3} width={15} height={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Printing price */}
      <div className="flex justify-between items-center px-5 py-4   ">
        <small className="text-base text-gray-500">Printing Price</small>{" "}
        <p className="text-lg font-medium text-gray-800">
          {totalAmountWithQuantity || 0} QAR
        </p>
      </div>
      {/* delivery Charge */}
      <div className="flex justify-between items-center px-5 py-4   ">
        <small className="text-base text-gray-500">Delivery Charge</small>{" "}
        <p className="text-lg font-medium ">{deliveryCharge} QAR</p>
      </div>

      <div className="flex justify-between items-center px-5 py-4 border-t">
        <small className="text-lg font-medium text-gray-900">Total</small>{" "}
        <p className=" text-[22px]  font-bold bg-gradient-to-r from-[#C83B62] to-[#7F35CD] text-transparent bg-clip-text">
          {totalAmountWithQuantity + deliveryCharge || 0} QAR
        </p>
      </div>

      <button
        className={`flex justify-center items-center px-5 py-4 w-full ${btnDisable}  `}
      >
        <Link
          href={`${href}`}
          className={`bg-gradient-to-r from-[#C83B62] to-[#7F35CD] w-full rounded-lg py-3 text-white  shadow-sm hover:duration-500 hover:shadow-lg text-center ${
            totalAmountWithQuantity
              ? "cursor-pointer"
              : "cursor-not-allowed btn-disabled"
          }`}
        >
          {buttonText}
        </Link>
      </button>
    </div>
  );
};

export default PringtingRequestOrderCard;
