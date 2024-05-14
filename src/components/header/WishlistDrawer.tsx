import CustomGlobalDrawer from "../shared/CustomGlobalDrawer";
import { IconChevronRight } from "@tabler/icons-react";
import ModalCloseBtn from "../shared/ModalCloseBtn";
import Link from "next/link";
import { useAppSelector } from "@/redux/hook";
import Image from "next/image";
import emptyCart from "@/assets/empty-card-photo.svg";
import WishlistItem from "../WishlistPageData/WishlistItem";

const WishlistDrawer = ({ openWishlistDrawer, setOpenWishlistDrawer }: any) => {
  const { products } = useAppSelector((state) => state.favouriteCartSlice);

  const handleCloseWishlist = () => {
    setOpenWishlistDrawer(false);
  };

  // <== Handle Add Product In Cart ==>
  return (
    <div>
      <CustomGlobalDrawer
        isVisible={openWishlistDrawer}
        setOpenDrawer={setOpenWishlistDrawer}
        drawerController="w-full md:max-w-[500px]"
      >
        <ModalCloseBtn
          handleClose={handleCloseWishlist}
          icon={<IconChevronRight stroke={1} width={24} height={24} />}
        />
        <h3 className="text-center text-black text-[20px] font-medium border-b pb-4 mb-7">
          Wishlist
        </h3>
        <div className="">
          <div>
            {products?.length ? (
              <div className="overflow-y-scroll no-scrollbar flex flex-col gap-5 justify-between h-[calc(100vh-140px)]">
                <div className="flex flex-col  overflow-y-scroll no-scrollbar ">
                  {products?.map((product: any) => (
                    <WishlistItem
                      product={product}
                      key={product._id}
                      handleCloseWishlist={handleCloseWishlist}
                    />
                  ))}
                </div>
                <div className="mx-5">
                  <Link
                    onClick={handleCloseWishlist}
                    href={"/wishlist"}
                    className="flex items-center hover:scale-105 transition-all bg-black justify-center main-bg-color py-3 text-white rounded-[5px] w-full"
                  >
                    View Wishlist
                  </Link>
                </div>
              </div>
            ) : (
              <div className="mx-5 h-screen flex flex-col gap-y-5 items-center justify-center">
                <div className="flex items-center justify-center">
                  <Image src={emptyCart} alt="Empty Cart" />
                </div>
                <span className="text-lg text-red-500 font-semibold">
                  Your Wishlist Is Empty!!
                </span>
                <Link
                  href={"/products"}
                  onClick={() => handleCloseWishlist()}
                  className="flex items-center justify-center main-bg-color py-2 text-white rounded-lg w-full"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      </CustomGlobalDrawer>
    </div>
  );
};

export default WishlistDrawer;
