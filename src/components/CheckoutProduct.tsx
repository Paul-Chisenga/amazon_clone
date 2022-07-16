/* eslint-disable @next/next/no-img-element */
import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React from "react";
import { ProductType } from "./Product";
import Currency from "react-currency-formatter";
import { useAppDispatch } from "../store";
import { addToBusket, removeFromBusket } from "../slices/busketSlice";

const CheckoutProduct: React.FC<
  ProductType & Partial<{ hasPrime: boolean }>
> = ({ id, category, title, image, rating, description, price, hasPrime }) => {
  const dispatch = useAppDispatch();

  const addItemToBusket = () => {
    const product = {
      id,
      category,
      title,
      image,
      rating,
      description,
      price,
      hasPrime,
    };
    dispatch(addToBusket(product));
  };
  const removeItemFromBusket = () => {
    dispatch(removeFromBusket(id));
  };
  return (
    <div className="grid grid-cols-5">
      <Image
        src={image}
        alt={title}
        objectFit="contain"
        width={200}
        height={200}
      />

      {/* Middle */}
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex space-x-3">
          {Array(Math.ceil(rating.rate))
            .fill(0)
            .map((_, idx) => (
              <StarIcon key={idx} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="my-2 text-xs line-clamp-3">{description}</p>
        <Currency quantity={price} />
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              className="w-12"
              src="https://links.papareact.com/fdw"
              alt=""
            />
            <p className="text-xs text-gray-500">Free Next-day Delivery</p>
          </div>
        )}
      </div>
      <div className="flex flex-col my-auto space-y-2 justify-self-end">
        <button className="button" onClick={addItemToBusket}>
          Add to Busket
        </button>
        <button className="button" onClick={removeItemFromBusket}>
          Remove from Busket
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
