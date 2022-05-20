const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET);

  const handler =async(req, res) =>{
    if (req.method === 'POST') {
    try{
        const  items  = req.body.items;
        
        const subscription =  await stripe.subscriptions.create({
            customer: items.customer,
            default_payment_method: items.payment_method,
            items: [
                {price: items.price},
            ],
        });
        console.log(subscription)
        res.send({
            id: subscription.id,
            amount: subscription.plan.amount,
            active: subscription.plan.active
        });
    } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
    }
  }

  export default handler;