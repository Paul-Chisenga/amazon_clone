/* eslint-disable @next/next/no-img-element */
import React from "react";
import Stripe from "stripe";
import Currency from "react-currency-formatter";
import moment from "moment";

export interface OrderProps {
  id: string;
  amount: any;
  amountShiping: any;
  images: any;
  timestamp: number;
  items: Stripe.LineItem[];
}
[];

const Order: React.FC<OrderProps> = (props) => {
  return (
    <div className="relative border rounded-md ">
      <div className="flex items-center p-5 space-x-10 text-sm text-gray-600 bg-gray-100">
        <div>
          <p className="text-xs font-bold">ORDER PLACED</p>
          <p>{moment.unix(props.timestamp).format("DD MM YYYY")}</p>
        </div>
        <div>
          <p className="text-xs font-bold">TOTAL</p>
          <p>
            <Currency quantity={props.amount} /> - Next Day Delivery{" "}
            <Currency quantity={props.amountShiping} />
          </p>
        </div>

        <p className="self-end flex-1 text-sm text-right text-blue-500 whitespace-nowrap sm:text-xl">
          {props.items.length} items
        </p>
        <p className="absolute w-40 text-xs truncate top-2 right-2 lg:w-72 whitespace-nowrap">
          ORDER # {props.id}
        </p>
      </div>

      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {props.images.map((image: string) => (
            <img
              key={image}
              src={image}
              alt=""
              className="object-contain h-20 sm:h-32"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
