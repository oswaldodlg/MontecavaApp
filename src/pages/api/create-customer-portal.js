const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET);


  const handler =async(req, res) =>{
    if (req.method === 'POST') {
    try {
      const  items  = req.body.items;
     
      const session = await stripe.billingPortal.sessions.create({
        customer: items.customer,
        return_url: `${req.headers.origin}/user`,
      });
    
  
    res.send({
      url: session.url
    });
    }  catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  }
    
  }

  export default handler;