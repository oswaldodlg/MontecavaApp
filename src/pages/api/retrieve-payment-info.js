// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET);

  const handler =async(req, res) =>{
    if (req.method === 'POST') {
    try{
        const  items  = req.body.items;
        
        // Retrieve the payment Intent
        const retrievedPayment = await stripe.paymentIntents.retrieve(items.paymentId)
        console.log(retrievedPayment)
        res.send({
        customer: retrievedPayment.customer,
        status: retrievedPayment.status,
        amount: retrievedPayment.amount,
        payment_method: retrievedPayment.payment_method,
        metadata: retrievedPayment.metadata,
        });
    } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
    }
  }

  export default handler;