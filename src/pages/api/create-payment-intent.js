// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET);

const calculateOrderAmount = (items) => {
    let price= items.price * 100
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return price;
  };

  const handler =async(req, res) =>{
    if (req.method === 'POST') {
    try {
      const  items  = req.body.items;
    console.log(items)
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "mxn",
      automatic_payment_methods: {
        enabled: true,
      },
      setup_future_usage: 'off_session',
      customer: items.customer,
      metadata:{
        plan: `${items.plan}`,
        subscriptionId: `${items.subscription_id}`
      }
    });

   
  
    res.send({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id
    });
    }  catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  }
    
  }

  export default handler;
  