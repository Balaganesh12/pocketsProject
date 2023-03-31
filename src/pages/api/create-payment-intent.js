// This is your test secret API key.
const stripe = require("stripe")('sk_test_51MhQKaSHtnJU4gMoAvkecDZ6YkWC17EiFhD5TaSJQ3K1XmqOTBXg0QJNBsyI4dkqXk0twQDgDzC9CF57PEl8USet0028JzKvra');

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

export default async function handler(req, res) {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    description: 'One-time setup fee',
    
    automatic_payment_methods: {
      enabled: true,
    },
    shipping: {
      name: 'Jenny Rosen',
      address: {
        line1: '510 Townsend St',
        postal_code: '98140',
        city: 'San Francisco',
        state: 'CA',
        country: 'US',
      },
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};