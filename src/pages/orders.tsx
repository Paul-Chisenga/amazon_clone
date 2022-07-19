import { collection, getDocs, orderBy, query } from "firebase/firestore";
import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import React from "react";
import { db } from "../../firebase";
import Header from "../components/Header";
import Stripe from "stripe";
import moment from "moment";
import Order, { OrderProps } from "../components/Order";

interface Props {
  orders?: OrderProps[];
}

const Orders: NextPage<Props> = ({ orders }) => {
  const { data: session } = useSession();

  return (
    <div className="">
      <Header />

      <main className="max-w-screen-lg p-10 mx-auto">
        <h1 className="pb-1 mb-2 text-3xl border-b border-yellow-400">
          Your orders
        </h1>
        {session ? (
          <h2>{orders?.length} Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}
        <div className="mt-5 space-y-4">
          {orders?.map((order) => (
            <Order key={order.id} {...order} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Orders;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2020-08-27",
  });
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  // firebase orders
  const firebaseOrders = await getDocs(
    query(
      collection(db, "users", session.user!.email!, "orders"),
      orderBy("timestamp", "desc")
    )
  );

  // stripe orders
  const stripeOrders = await Promise.all(
    firebaseOrders.docs.map(async (dc) => ({
      id: dc.id,
      amount: dc.data().amount,
      amountShiping: dc.data().amount_shipping,
      images: dc.data().images,
      timestamp: moment(dc.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(dc.id, { limit: 100 })
      ).data,
    }))
  );

  return {
    props: {
      orders: stripeOrders,
    },
  };
};
