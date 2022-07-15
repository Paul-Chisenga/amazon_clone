/* eslint-disable @next/next/no-img-element */
import React from "react";
import Product, { ProductType } from "./Product";

const ProductFeed: React.FC<{
  products: ProductType[];
}> = ({ products }) => {
  return (
    <div className="grid mx-auto md:-mt-52 grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.slice(0, 4).map((item) => (
        <Product key={item.id} {...item} />
      ))}
      <img
        className="md:col-span-full"
        src="https://links.papareact.com/dyz"
        alt=""
      />

      <div className="md:col-span-2">
        {products.slice(4, 5).map((item) => (
          <Product key={item.id} {...item} />
        ))}
      </div>

      {products.slice(5, products.length).map((item) => (
        <Product key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ProductFeed;
