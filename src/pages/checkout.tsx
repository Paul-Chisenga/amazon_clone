import type { NextPage } from "next";
import Image from "next/image";
import React from "react";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/busketSlice";
import { useAppSelector } from "../store";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const Checkout: NextPage = () => {
  const items = useAppSelector(selectItems);
  const total = useAppSelector(selectTotal);
  const { data: session } = useSession();

  const createCheckoutSession = async () => {
    // const stripe = await stripePromise;

    try {
      // create checkout session on the backend
      const checkoutSession = await axios.post("/api/checkout_sessions", {
        items,
        email: session?.user?.email,
      });

      // redirect user to strip checkout
      const stripe = await stripePromise;

      const result = await stripe?.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      });

      if (result?.error) alert(result.error.message);
    } catch (error: any) {
      alert(error.message);
      console.log(error);
    }
  };

  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

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
                role="link"
                onClick={createCheckoutSession}
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
