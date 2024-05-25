"use client";
import { useGetCategoryQuery } from "@/redux/features/category/categories";
import FilterButton from "../UI/btn/FilterButton";
import { useGetProductsQuery } from "@/redux/features/products/productsApi";
import ProductCard from "../product/ProductCard";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hook";
import { setCategory } from "@/redux/features/brand/productsByCategorySlice";
import ProductCardSkeleton from "../shared/Skeleton/ProductCardSkeleton";

const BrandProductGridView = () => {
  const dispatch = useDispatch();
  const { brandName } = useAppSelector((state) => state.productByBrandName);
  const { category } = useAppSelector((state) => state.productByCategory);

  const { minPrice, maxPrice } = useAppSelector(
    (state) => state.priceRangeSlice
  );

  // <== Get category name for category wise product ==>
  const { data: allCategory } = useGetCategoryQuery("");

  // <== Brand and Category filtered products ==>
  const { data: filteredProducts, isLoading } = useGetProductsQuery(
    `category.categoryName=${category}&${
      brandName && `&brand.brandName=${brandName}`
    }&${
      minPrice &&
      maxPrice &&
      `variants.sellingPrice[gte]=${minPrice}&variants.sellingPrice[lte]=${maxPrice}`
    }`
  );

  return (
    <div className="w-full mt-5">
      <div className="flex justify-between">
        <div className="space-y-2">
          <span className="text-2xl font-bold">
            {brandName.length > 1 ? brandName : "Brands"}
          </span>
          <p className="text-gray-500 ">
            <span className="text-black font-bold">
              {filteredProducts?.meta?.total}
            </span>{" "}
            Results found.
          </p>
        </div>
        <div className=" md:block hidden">
          <select
            title="Category Name"
            name={"category"}
            id=""
            className="border outline-none px-4 py-3 rounded-md"
            value={category}
            onChange={(e) => dispatch(setCategory(e.target.value))}
          >
            {allCategory?.data?.map((category: any) => (
              <option key={category?._id} value={category?.categoryName}>
                {category?.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div className="lg:hidden md:hidden block">
          {" "}
          <FilterButton brandProductGridView={BrandProductGridView} />
        </div>
      </div>

      <div className="my-6 grid grid-cols-product-grid md:gap-10 gap-5 ">
        {isLoading
          ? [...Array(12)].map((_, index) => {
              return <ProductCardSkeleton key={index} />;
            })
          : filteredProducts?.data?.map((product: any) => (
              <ProductCard key={product?._id} product={product} />
            ))}
      </div>
    </div>
  );
};

export default BrandProductGridView;
