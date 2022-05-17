// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET);


  const handler =async(req, res) =>{
    if (req.method === 'POST') {
    try {
      const  items  = req.body.items;
    console.log(items)
    // Create a PaymentIntent with the order amount and currency
    const setupIntent = await stripe.setupIntents.create({
      payment_method_types: ['card'],
      usage: "off_session",
      customer: items.customer,
      metadata:{
        plan: `${items.plan}`,
        subscriptionId: `${items.subscription_id}`
      }
    });

   
  
    res.send({
      clientSecret: setupIntent.client_secret,
      id: setupIntent.id
    });
    }  catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  }
    
  }

  export default handler;