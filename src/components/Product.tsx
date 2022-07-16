/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useAppDispatch } from "../store";
import { addToBusket } from "../slices/busketSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;

export interface ProductType {
  id: string;
  title: string;
  price: number;
  description: string;
  category: "string";
  image: string;
  rating: { rate: 3.9; count: 120 };
}

const Product: React.FC<ProductType> = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
}) => {
  const [productRating, setRating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  const [hasPrime] = useState(Math.random() < 0.5);
  const dispatch = useAppDispatch();

  const addItemToBusket = () => {
    const product = { id, title, price, description, category, image, rating, hasPrime };
    dispatch(addToBusket(product));
  };

  return (
    <div className="relative z-20 flex flex-col p-10 m-5 bg-white">
      <p className="absolute text-xs italic text-gray-400 top-2 right-2">
        {category}
      </p>
      <Image
        src={image}
        height={200}
        width={200}
        objectFit="contain"
        alt={title}
      />
      <h4 className="my-3 ">{title}</h4>
      <div className="flex">
        {Array(productRating)
          .fill(0)
          .map((_, idx) => (
            <StarIcon key={idx} className="h-5 text-yellow-500" />
          ))}
      </div>

      <p className="my-2 text-xs line-clamp-2">{description}</p>

      <div className="mb-5">
        <Currency quantity={price} currency="GBP" />
      </div>

      {hasPrime && (
        <div className="flex items-center -mt-5 space-x-2">
          <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button onClick={addItemToBusket} className="mt-auto button">
        Add to Busket
      </button>
    </div>
  );
};

export default Product;
