"use client";
import Image from "next/image";
import OrderIcon from "@/assets/svgIcons/OrderIcon";
import ReviewIcon from "@/assets/svgIcons/ReviewIcon";
import CompleteOrdersIcon from "@/assets/svgIcons/CompleteOrdersIcon";
import ProfileLogoutButton from "./ProfileLogoutButton";
import ProfileViewButton from "./ProfileViewButton";
import ProfileUserIcon from "@/assets/svgIcons/ProfileUserIcon";
import { IconCamera } from "@tabler/icons-react";
import {
  useGetUserQuery,
  useUpdateMeMutation,
} from "@/redux/features/user/user";
import { removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";
import { useRouter } from "next/navigation";
import { imageUrl } from "@/constants/imageUrl";
import { useGetOnlineOrderQuery } from "@/redux/features/online-order/online-orderApi";
import { useReviewByIdQuery } from "@/redux/features/review/reviewApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  setProfileLocalPhoto,
  setProfilePhoto,
} from "@/redux/features/user/profileEditSlice";
import personPlaceholder from "@/assets/placeholder_images/person_placeholder.png";
import ProfileDashboardCardSkeleton from "./../shared/Skeleton/ProfileDashboardCardSkeleton";
import ProfilePhotoAndNameSkeleton from "../shared/Skeleton/ProfilePhotoAndNameSkeleton";

const MyProfileCard = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { profileLocalPhoto, profilePhoto } = useAppSelector(
    (state) => state.profileEdit
  );
  const [updateMe] = useUpdateMeMutation();

  const formData = new FormData();

  // <== User Logout Functionality ==>
  const userLogout = () => {
    removeUserInfo(authKey);
    router.push("/");
    setTimeout(() => {
      location.reload();
    }, 500);
  };

  // <== Get data from user me ==>
  const { data, isError, isLoading } = useGetUserQuery("");

  // <== Get Order Data by Online Order Query ==>
  const onlineOrderData = useGetOnlineOrderQuery(
    `buyer.userId=${data?.data?._id}`
  ).data;

  // <== Get review data by review Query ==>
  const reviewData = useReviewByIdQuery(
    `reviewer.userId=${data?.data?._id}`
  ).data;

  // <== Get Complete Order Data ==>
  const { data: completeOrder } = useGetOnlineOrderQuery(
    `orderStatus.status=Delivered&buyer.userId=${data?.data?._id}`
  );

  // <== onsubmit ==>
  const handleImageUpload = async (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      // Dispatch actions to update local state
      dispatch(setProfilePhoto(file));
      dispatch(setProfileLocalPhoto(URL.createObjectURL(file)));

      // Append the file directly to formData
      formData.append("profilePhoto", file);

      try {
        // Send data to server
        const res = await updateMe(formData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="m:border w-full  rounded-custom-10px ">
      {/* Profile image and logout section */}
      <div className="">
        <div className="flex justify-between items-center pb-5  md:border-b lg:border-b">
          {isLoading ? (
            <ProfilePhotoAndNameSkeleton />
          ) : (
            <div className="flex gap-2  justify-center  items-center">
              <div>
                <div className="relative">
                  <Image
                    src={
                      isLoading
                        ? personPlaceholder
                        : `${imageUrl + data?.data?.profilePhoto}`
                    }
                    alt="My profile image"
                    height={100}
                    width={100}
                    className={`h-[75px] w-[75px] md:h-[100px] md:w-[100px] lg:h-[100px] lg:w-[100px] rounded-full overflow-hidden border object-cover ${
                      isLoading && "animate-pulse"
                    }`}
                  />
                  <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gradient-to-r from-[#7F35CD] to-[#C83B62] text-white absolute bottom-0 right-0 cursor-pointer">
                    <label
                      htmlFor="profileFileInput"
                      className="cursor-pointer"
                    >
                      <IconCamera />
                      <input
                        title="Upload Profile Photo"
                        id="profileFileInput"
                        className="hidden"
                        type="file"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <p>Hello,</p>
                {data?.data?.fullName ? (
                  <h3 className="font-bold">{data?.data?.fullName}</h3>
                ) : (
                  <h3 className="font-bold">User Name</h3>
                )}
              </div>
            </div>
          )}

          {/*  logout button */}

          <ProfileLogoutButton handleLogout={userLogout} />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {[...Array(4)].map((_, index) => {
            return <ProfileDashboardCardSkeleton key={index} />;
          })}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5 justify-between">
          {/* grid card 1 */}
          <div className=" border rounded-lg flex items-center justify-center flex-col p-5 gap-4 text-gray-500 ">
            <ProfileUserIcon />
            <p className="whitespace-pre-wrap text-gray-500">
              Profile Information
            </p>
            <div>
              <ProfileViewButton />
            </div>
          </div>
          {/* grid card 2 */}

          <div className=" border rounded-lg flex items-center justify-center flex-col p-5 gap-4 text-gray-500 ">
            <h3 className="text-xl">
              {" "}
              <OrderIcon />
            </h3>
            <p className="whitespace-nowrap text-gray-500">Orders</p>
            <span className="font-bold">{onlineOrderData?.data?.length}</span>
          </div>

          {/* grid card 3 */}

          <div className=" border rounded-lg flex items-center justify-center flex-col p-5 gap-4 text-gray-500 ">
            <ReviewIcon />
            <p className="whitespace-nowrap text-gray-500">Review</p>
            <span className="font-bold">{reviewData?.data?.length}</span>
          </div>

          {/* grid card 4 */}

          <div className=" border rounded-lg flex items-center justify-center flex-col p-5 gap-4 text-gray-500 ">
            <CompleteOrdersIcon />
            <p className="whitespace-pre-wrap text-gray-500">Complete Orders</p>
            <div className="font-bold">{completeOrder?.data?.length}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfileCard;
