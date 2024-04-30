"use client";
import Image from "next/image";
import lockImageOne from "@/assets/lockImageOne.svg";
import lockImageTwo from "@/assets/lockImageTwo.svg";
import { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import CustomInput from "@/components/shared/CustomInput";
import PasswordInput from "@/components/shared/PasswordInput";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="h-screen flex items-center justify-center mx-3">
      <div className="md:max-w-[600px] bg-white shadow-modalShadow md:px-11 pb-7 rounded-2xl px-10 py-14">
        <div className="flex items-center justify-center">
          <Image
            src={lockImageOne}
            alt="verifyEmailLogo"
            className="hidden md:block"
          />
          <Image
            src={lockImageTwo}
            alt="verifyEmailLogo"
            className="block md:hidden"
          />
        </div>
        <h3 className="text-black text-center font-bold text-xl md:text-2xl my-4">
          Reset Password
        </h3>
        <p className="text-center text-black text-opacity-50 text-[16px] mb-8">
          Set the password for your account so you can access all the features.
        </p>
        <form action="">
          <label htmlFor="password" className="text-black text-opacity-70">
            New Password
          </label>
          <PasswordInput
            onChange={(e) => console.log(e)}
            placeholder="New Password"
            inputStyle="mb-5"
          />
          <label htmlFor="password" className="text-black text-opacity-70">
            Confirm Password
          </label>
          <PasswordInput
            onChange={(e) => console.log(e)}
            placeholder="Confirm Password"
          />
          <button
            type="submit"
            className="w-full main-bg-color text-white font-medium py-3 rounded-lg my-10"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
