const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET, {
    apiVersion: '2020-08-27; orders_beta=v4'
});


  const handler =async(req, res) =>{
    if (req.method === 'POST') {
    try {
      const  items  = req.body.items;
    console.log(items)
    // Create a PaymentIntent with the order amount and currency
    const order = await stripe.orders.retrieve(
      items.id, {
        expand: ['line_items'],
      }
    );
    console.log(order)
    res.send({
      clientSecret: order.client_secret,
      total: order.amount_total,
      items: order.line_items
    });
    }  catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  }
    
  }

  export default handler;