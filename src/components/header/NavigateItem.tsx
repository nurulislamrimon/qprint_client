import Link from "next/link";
import React from "react";
// import RequestPrinting from "../UI/RequestPrinting";
const NavigateItem = () => {
  const menuItems = ["Home", "Brands", "Request a Printing", "Products"];

  const hrefValues = ["/", "/brand", "/printing-request", "/products"];
  return (
    <>
      {menuItems.map((link, index) => (
        <React.Fragment key={link}>
          <Link
            className="text-black text-opacity-70 hover:bg-gradient-to-t from-[#C83B62] to-[#7F35CD] hover:text-transparent hover:bg-clip-text hover:font-bold "
            href={hrefValues[index]}
          >
            {link}
          </Link>
        </React.Fragment>
      ))}
    </>
  );
};

export default NavigateItem;
