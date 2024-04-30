"use client";
import PringtingRequestOrderCard from "@/components/PrintingRequest/PringtingRequestOrderCard";
import ReturnToCardButton from "@/components/PrintingRequest/ReturnToCardButton";
import CustomInput from "@/components/shared/CustomInput";
import { setPrintingRequest } from "@/redux/features/printing-request/postPrintingRequestSlice";
import {
  useAddShippingAddressMutation,
  useGetUserAddressQuery,
  useGetUserQuery,
} from "@/redux/features/user/user";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { isLoggedIn } from "@/services/auth.service";
import { IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

const YourInformation = () => {
  const isUserLoggedIn = isLoggedIn();
  const [addNewShipping, setAddNewShipping] = useState(false);
  const dispatch = useAppDispatch();
  const handleAddShipping = () => {
    setAddNewShipping((prevState) => !prevState);
  };
  const [addShipping] = useAddShippingAddressMutation();

  // <== Get User Address ==>
  const { data: address, isLoading } = useGetUserAddressQuery(`isDefault=true`);
  const defaultAddress = address?.data?.find(
    (address: any) => address.isDefault
  );

  // <== Get User Personal Information ==>
  const { data: personalInformation } = useGetUserQuery("");

  const data = useAppSelector((state) => state.printingRequestOrder);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await addShipping(data?.shippingAddress);
      console.log(res, "from res");
    } catch { }
  };

  return (
    <section className="lg:max-w-[1280px] w-full mx-auto  mb-7">
      <div className="mb-7">
        <h3 className="[font-size:_clamp(1.2em,4vw,1.8em)] font-bold">
          Your Information
        </h3>
      </div>
      <div className="flex flex-col md:flex-row lg:flex-row gap-7 justify-between">
        <div className="flex flex-col w-full md:w-8/12 lg:w-8/12 -5 ">
          <div className=" border rounded-lg ">
            {/* == Click here to login btn == */}
            {!isUserLoggedIn && (
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 border-b py-3 text-base text-gray-800"
              >
                <span className="flex items-center gap-2">
                  <IconUser width={20} height={20} /> <p>Click here to login</p>
                </span>
              </Link>
            )}

            <div className="p-4 md:p-7">
              {/* == Personal Information == */}
              <p className="text-base text-gray-500 mb-5">
                Contact information
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-7 gap-5 w-full mb-8">
                <CustomInput
                  label="Email"
                  type="email"
                  value={personalInformation?.data?.email}
                  placeholder="Enter Your Email"
                />
                <CustomInput
                  label="Phone Number"
                  type="number"
                  value={personalInformation?.data?.phoneNumber}
                  placeholder="Enter Your Number"
                />
              </div>

              {/* == Existing User Address == */}
              {isUserLoggedIn && (
                <>
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <div className="flex flex-col mb-5 border p-3 rounded-md">
                      <span className="text-black-opacity-60">
                        Shipping Address
                      </span>
                      <span className="mt-2.5">
                        {defaultAddress?.streetAddress}
                      </span>
                      <span>{defaultAddress?.phoneNumber}</span>
                    </div>
                  )}
                </>
              )}

              {/* == If user logged in then dropdown for new shipping address, else create an account == */}
              {isUserLoggedIn && (
                <div className="mb-5 flex gap-1.5 items-center">
                  <input
                    onClick={handleAddShipping}
                    title="radio"
                    type="radio"
                    className="checked"
                  />
                  <span>Add new shipping address</span>
                </div>
              )}

              {/* == shipping address or shipping information == */}
              {addNewShipping && (
                <div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-7 gap-5 w-full">
                    <CustomInput
                      label="First Name"
                      type="text"
                      name="firstName"
                      // @ts-ignore
                      value={data?.shippingAddress?.firstName}
                      placeholder={"First Name"}
                      onChange={(e) =>
                        dispatch(
                          setPrintingRequest({
                            ...data,
                            shippingAddress: {
                              // @ts-ignore
                              ...data.shippingAddress,
                              [e.target.name]: e.target.value,
                            },
                          })
                        )
                      }
                    />
                    <CustomInput
                      label="Last Name"
                      type="text"
                      name="lastName"
                      // @ts-ignore
                      value={data?.shippingAddress?.lastName}
                      placeholder={"Last Name"}
                      onChange={(e) =>
                        dispatch(
                          setPrintingRequest({
                            ...data,
                            shippingAddress: {
                              // @ts-ignore
                              ...data.shippingAddress,
                              [e.target.name]: e.target.value,
                            },
                          })
                        )
                      }
                    />
                    <CustomInput
                      label="Phone Number"
                      type="text"
                      name="phoneNumber"
                      // @ts-ignore
                      value={data?.shippingAddress?.phoneNumber}
                      placeholder={"Phone Number"}
                      onChange={(e) =>
                        dispatch(
                          setPrintingRequest({
                            ...data,
                            shippingAddress: {
                              // @ts-ignore
                              ...data.shippingAddress,
                              [e.target.name]: e.target.value,
                            },
                          })
                        )
                      }
                    />
                    <CustomInput
                      label="Street Address"
                      type="text"
                      name="streetAddress"
                      // @ts-ignore
                      value={data?.shippingAddress?.streetAddress}
                      placeholder="Your Street Address"
                      onChange={(e) =>
                        dispatch(
                          setPrintingRequest({
                            ...data,
                            shippingAddress: {
                              // @ts-ignore
                              ...data.shippingAddress,
                              [e.target.name]: e.target.value,
                            },
                          })
                        )
                      }
                    />
                    <CustomInput
                      label="State"
                      type="text"
                      name="state"
                      // @ts-ignore
                      value={data?.shippingAddress?.state}
                      placeholder="Your State"
                      onChange={(e) =>
                        dispatch(
                          setPrintingRequest({
                            ...data,
                            shippingAddress: {
                              // @ts-ignore
                              ...data.shippingAddress,
                              [e.target.name]: e.target.value,
                            },
                          })
                        )
                      }
                    />
                    <CustomInput
                      label="Country"
                      type="text"
                      name="country"
                      // @ts-ignore
                      value={data?.shippingAddress?.country}
                      placeholder={"Country"}
                      onChange={(e) =>
                        dispatch(
                          setPrintingRequest({
                            ...data,
                            shippingAddress: {
                              // @ts-ignore
                              ...data.shippingAddress,
                              [e.target.name]: e.target.value,
                            },
                          })
                        )
                      }
                    />
                    <CustomInput
                      label=" Company Name ( Optional )"
                      type="text"
                      name="companyName"
                      // @ts-ignore
                      value={data?.shippingAddress?.companyName}
                      placeholder="Company Name"
                      onChange={(e) =>
                        dispatch(
                          setPrintingRequest({
                            ...data,
                            shippingAddress: {
                              // @ts-ignore
                              ...data.shippingAddress,
                              [e.target.name]: e.target.value,
                            },
                          })
                        )
                      }
                    />
                    <CustomInput
                      label="ZipCode"
                      type="text"
                      name="zipCode"
                      // @ts-ignore
                      value={data?.shippingAddress?.zipCode}
                      placeholder="Your ZipCode"
                      onChange={(e) =>
                        dispatch(
                          setPrintingRequest({
                            ...data,
                            // @ts-ignore
                            shippingAddress: {
                              // @ts-ignore
                              ...(data.shippingAddress || {}),
                              [e.target.name]: e.target.value,
                            },
                          })
                        )
                      }
                    />
                  </div>
                  <div className="mb-3 flex gap-1.5 items-center mt-7">
                    <input
                      name="isDefault"
                      onChange={(e) =>
                        dispatch(
                          setPrintingRequest({
                            ...data,
                            shippingAddress: {
                              // @ts-ignore
                              ...data.shippingAddress,
                              // @ts-ignore
                              isDefault: !data.shippingAddress.isDefault,
                            },
                          })
                        )
                      }
                      title="inputradio"
                      type="checkbox"
                      // @ts-ignore
                      checked={data?.shippingAddress?.isDefault}
                    />

                    <span>Use as default address</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* == Return to previous page == */}
          <div className="hidden md:block w-max mt-8">
            <ReturnToCardButton />
          </div>
        </div>

        {/* == Total Amount Card == */}
        <div className="w-full md:w-4/12 lg:w-4/12">
          <PringtingRequestOrderCard
            handleSubmit={handleSubmit}
            buttonText={"Continue to Payment"}
            href={"/printing-request/payment"}
          />
        </div>

        {/* == Return to previous page == */}
        <div className="block md:hidden w-full ">
          <ReturnToCardButton />
        </div>
      </div>
    </section>
  );
};

export default YourInformation;
