require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      payment_method_types: ["card"],
      description: 'test payment',
      shipping: {
        name: 'name1',
        address: {
          line1: 'street 1',
          postal_code: '123123',
          city: 'Chennai',
          state: 'Tamil Nadu',
          country: 'India',
        },
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent })
    }
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    }
  }
}