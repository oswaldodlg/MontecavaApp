import moment from 'moment'
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET);

const today = moment()

  const handler =async(req, res) =>{
    if (req.method === 'POST') {
    try{
        const  items  = req.body.items;
        
        if (today.day() === 1){
          const subscription =  await stripe.subscriptions.create({
            customer: items.customer,
            default_payment_method: items.payment_method,
            items: [
                {price: items.price},
            ],
          });
          res.send({
            id: subscription.id,
            amount: subscription.plan.amount,
            active: subscription.plan.active
          });
        } else {
          const trial_end = today.add(1, 'M').startOf('month').unix()
          const subscription =  await stripe.subscriptions.create({
            customer: items.customer,
            trial_end: trial_end,
            default_payment_method: items.payment_method,
            items: [
                {price: items.price},
            ],
          });
          res.send({
            id: subscription.id,
            amount: subscription.plan.amount,
            active: subscription.plan.active
          });
        }
        
    } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
    }
  }

  export default handler;