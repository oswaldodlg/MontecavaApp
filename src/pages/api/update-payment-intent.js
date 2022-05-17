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
    const paymentIntent = await stripe.paymentIntents.update(
        `${items.paymentId}`,
        
        {
            amount: calculateOrderAmount(items),
            metadata: {
              plan: `${items.plan}`,
              subscriptionId: `${items.subscription_id}`
        }
        }
    
    );

    console.log(paymentIntent)
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
    }  catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  }
    
  }

  export default handler;