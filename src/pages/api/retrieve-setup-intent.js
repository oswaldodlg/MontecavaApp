// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET);

  const handler =async(req, res) =>{
    if (req.method === 'POST') {
    try{
        const  items  = req.body.items;
        
        // Retrieve the payment Intent
        const setupIntent = await stripe.setupIntents.retrieve(items.paymentId)
        res.send({
        
        customer: setupIntent.customer,
        status: setupIntent.status,
        payment_method: setupIntent.payment_method,
        metadata: setupIntent.metadata,
        });
    } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
    }
  }

  export default handler;