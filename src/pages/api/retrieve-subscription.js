const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET);


const handler =async(req, res) =>{
    if (req.method === 'POST') {
    try{
        const  items  = req.body.items;
        // Retrieve the customer
        const subscription = await stripe.subscriptions.retrieve(
            items.subscriptionId
        );
        const product = await stripe.products.retrieve(
            subscription.items.data[0].price.product
        );
        res.send({
            isActive: subscription.items.data[0].price.active,
            subscriptionData: product.metadata
        });
    } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
    }
  }

  export default handler;

