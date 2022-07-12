const Stripe = require('stripe');
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
        line_items: items.products,
        customer: items.customer,
        expand: ['line_items'],
      });
    const resource = await Stripe.StripeResource.extend({
      request: Stripe.StripeResource.method({
        method: 'POST',
        path: `orders/${order.id}/submit`,
      })
    });
    new resource(stripe).request({
      "expected_total": order.amount_total
    },  
    function(err, response) {
      try{
        res.send({
          order: response
        })
      }catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
    })

    }  catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  }
    
  }

  export default handler;