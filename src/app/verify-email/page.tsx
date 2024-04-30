import Image from "next/image";
import verifyEmailLogo from "@/assets/verifyEmailLogo.svg";
import verifyEmailLogoTwo from "@/assets/verifyEmailLogo2.svg";
import OTPInput from "@/components/UI/OTPInput";

const VerifyEmail = () => {
  return (
    <div className="h-screen flex items-center justify-center mx-3">
      <div className="md:max-w-[600px] bg-white shadow-modalShadow px-5 md:px-11 pb-7 rounded-2xl">
        <div className="flex items-center justify-center">
          <Image
            src={verifyEmailLogo}
            alt="verifyEmailLogo"
            className="hidden md:block"
          />
          <Image
            src={verifyEmailLogoTwo}
            alt="verifyEmailLogo"
            className="block md:hidden"
          />
        </div>
        <h3 className="text-black text-center font-bold text-xl md:text-2xl my-4">
          Verify your email address
        </h3>
        <p className="text-center text-black text-opacity-50 text-[16px]">
          We emailed a six-digit to artu@gmail.com Enter the code below to
          confirm your email address
        </p>
        <OTPInput length={4} />
        <button
          className=" items-center w-full main-text-color font-medium py-3 border rounded-lg
         border-fuchsia-400 my-10
         "
        >
          Verify Email
        </button>
        <p className="text-center">
          Code didn’t get?
          <button className="font-bold">Resend</button>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
