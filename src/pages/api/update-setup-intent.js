const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET);


  const handler =async(req, res) =>{
    if (req.method === 'POST') {
    try {
      const  items  = req.body.items;
    console.log(items)
    // Create a PaymentIntent with the order amount and currency
    const setupIntent = await stripe.setupIntents.update(
        `${items.paymentId}`,
        
        {
            metadata: {
              plan: `${items.plan}`,
              subscriptionId: `${items.subscription_id}`
        }
        }
    
    );

    res.send({
      clientSecret: setupIntent.client_secret,
    });
    }  catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  }
    
  }

  export default handler;