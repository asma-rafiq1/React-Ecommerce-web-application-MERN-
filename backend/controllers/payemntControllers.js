const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const stripe = require("stripe")("sk_test_26PHem9AhJZvU623DfE1x4sd");

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const mypayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "No Shop",
    },
  });

  res.status(200).json({
    client_secret: mypayment.client_secret,
  });
});

exports.sendApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    key: "pk_test_qblFNYngBkEdjEZ16jxxoWSM",
  });
});
