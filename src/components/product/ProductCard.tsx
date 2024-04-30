"use client";
import React from "react";
import ProductImageSlide from "./ProductImageSlide";
import AddToCartButton from "../UI/btn/AddToCartButton";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import StarRating from "./StarRating";
import { addToCart } from "@/redux/features/cart/productCartSlice";

const ProductCard = ({ product, loading }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // <== Take default variants by using find method ==>
  const defaultVariant = product?.variants?.find(
    (variant: any) => variant.isDefault === true
  );

  // <== Handle Add Product In Cart ==>
  const handleAddToCart = (event: React.MouseEvent, product: any) => {
    event.stopPropagation();
    dispatch(
      addToCart({
        ...product,
        ...product?.variants[0],
        price: product?.variants[0].discountedPrice
          ? product?.variants[0].discountedPrice
          : product?.variants[0].sellingPrice,
        orderQuantity: 1,
        productId: product?._id,
      })
    );
  };

  // <== Product View Function ==>
  const handleViewProduct = (e: any) => {
    e.stopPropagation();
    router.push(`/product/${product?._id}`);
  };

  return (
    <div
      onClick={handleViewProduct}
      className="border hover:border-fuchsia-700 rounded-custom-10px p-4 group max-w-[300px] w-[300px] h-[405px] max-h-max cursor-pointer"
    >
      <div>
        <ProductImageSlide loading={loading} product={product} defaultVariant={defaultVariant} />
      </div>

      <div className="mt-4 pt-4 border-t">
        <h3 className="[font-size:_clamp(0.7em,4vw,1em)] line-clamp-2 mb-2">
          {product?.productName}
        </h3>
        <p className=" text-gray-500 [font-size:_clamp(0.5em,4vw,0.8em)] mb-1">
          {" "}
          {product?.brand?.brandName}
        </p>

        <StarRating rating={Math.round(product?.averageRating)} />

        <div className="flex items-baseline justify-start gap-2 my-1 whitespace-nowrap">
          <h4 className="[font-size:_clamp(0.6em,4vw,1.1em)] main-text-color font-bold">
            {defaultVariant?.discountedPrice || defaultVariant?.sellingPrice}{" "}
            QAR
          </h4>
          {defaultVariant?.discountedPrice && (
            <del className="text-md text text-gray-500 [font-size:_clamp(0.5em,4vw,0.8em)] ">
              {defaultVariant.sellingPrice} QAR
            </del>
          )}
        </div>

        <AddToCartButton
          onClick={(event: React.MouseEvent) => handleAddToCart(event, product)}
        />
      </div>
    </div>
  );
};

export default ProductCard;
