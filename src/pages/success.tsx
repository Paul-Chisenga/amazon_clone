import React from "react";
import Header from "../components/Header";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

const Success = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center mb-5 space-x-2">
            <CheckCircleIcon className="h-10 text-green-500" />
            <h1 className="text-3xl">
              Thank you, Your order has been comfirmed
            </h1>
          </div>
          <p>
            Thank you for shopping with us. We&apos;ll send a confirmation once
            the items has been shipped. please press the link below to check the
            status of your order(s).
          </p>
          <button
            className="mt-8 button"
            onClick={() => router.push("/orders")}
          >
            Got to my orders
          </button>
        </div>
      </main>
    </div>
  );
};

export default Success;
