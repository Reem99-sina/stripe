const stripe = require('stripe')('sk_test_51OnViJJ1yUQMPxwpErpKeSZvui63SFlcm56shrG1VppIqiFaI599PnD97FIslDEpTUOm1XDCnLuSx9jmSYSbI6r8009mXCzd01');
module.exports.requestStripe=async(req,res)=>{
    const customer = await stripe.customers.create();
    console.log(customer,"ephemeralKey")
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2024-04-10'}
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: req.body.currency,
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: 'pk_test_51OnViJJ1yUQMPxwpHSfb0uZFYHJwEo0VBpr3AIRmGwdw6tli8fYgSIVHNn3IE6ZiPpaqplfmaJOx3vuBwaEnn6Kj00Psw1Yqxu'
  });
  
}
module.exports.createPaymentIntent=async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd"
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  })
}