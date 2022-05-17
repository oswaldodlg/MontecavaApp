// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET);

  const handler =async(req, res) =>{
    if (req.method === 'POST') {
    try{
        const  items  = req.body.items;
        
        // Create customer
        const customer = await stripe.customers.create({
            name: items.name,
            email: items.email
          });
        console.log(items)
        console.log(customer)
        res.send({
            id: customer.id
        });
    } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
    }
  }

  export default handler;