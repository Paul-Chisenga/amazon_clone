import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { items, email } = req.body;
    await NextCors(req, res, {
      // Options
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
      origin: "*",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: items.map((item: any) => ({
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: item.price * 100,
            product_data: {
              name: item.title,
              description: item.description,
              images: [item.image],
            },
          },
        })),
        shipping_address_collection: {
          allowed_countries: ["GB", "US", "KE", "CA"],
        },
        metadata: {
          email,
          images: JSON.stringify(items.map((item: any) => item.image)),
        },
        mode: "payment",
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
      });
      // res.redirect(303, session.url);
      res.status(200).json({ id: session.id });
    } catch (err: any) {
      console.log(err);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
