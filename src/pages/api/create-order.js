const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET, {
    apiVersion: '2020-08-27; orders_beta=v4'
});


  const handler =async(req, res) =>{
    if (req.method === 'POST') {
    try {
      const  items  = req.body.items;
    
    // Create a PaymentIntent with the order amount and currency
    const order = await stripe.orders.create({
        currency: 'mxn',
        line_items: [
          {product: items.product, quantity: 1},
        ],
        expand: ['line_items'],
      });

    res.send({
      order
    });
    }  catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  }
    
  }

  export default handler;