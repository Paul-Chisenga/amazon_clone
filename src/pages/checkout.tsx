import type { NextPage } from "next";
import Image from "next/image";
import React from "react";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/busketSlice";
import { useAppSelector } from "../store";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";

const Checkout: NextPage = () => {
  const items = useAppSelector(selectItems);
  const total = useAppSelector(selectTotal);
  const { data: session } = useSession();
  return (
    <div className="bg-gray-200">
      <Header />

      <main className="mx-auto lg:flex max-w-screen-2xl">
        {/* left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
            alt=""
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="pb-4 text-3xl border-b">
              {items.length === 0
                ? "Your Amazon Busket is empy"
                : "Your Shopping Busket"}
            </h1>
            {items.map((item) => (
              <CheckoutProduct key={item.id} {...item} />
            ))}
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col p-10 bg-white shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items) :{" "}
                <span className="font-bold">
                  <Currency quantity={total} />
                </span>
              </h2>
              <button
                className={`button mt-2 ${
                  !session &&
                  `from-gray-300 to bg-gray-500 text-gray-200 cursor-not-allowed border-gray-200`
                }`}
                disabled={!session}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;
