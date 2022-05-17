// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET);

  const handler =async(req, res) =>{
    if (req.method === 'POST') {
    try{
        const  items  = req.body.items;
        
        // Retrieve the customer
        const retrievedCustomer = await stripe.customers.retrieve(items.id)
        console.log(items)
        console.log(retrievedCustomer)
        res.send({
            retrievedCustomer
        });
    } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
    }
  }

  export default handler;
