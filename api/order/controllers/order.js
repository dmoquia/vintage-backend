"use strict";
const stripe = require("stripe")(
  "sk_test_51JHPnEFryCKGNKum34rpbMw1hl8GXbKxX64ZEPRU3nXb6YH2AO4aTV6sQU87xndVWGPpxSJiBSShWjGPehyVXkr600Fh3ubEQG"
);
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  create: async (ctx) => {
    const { name, total, items, stripeTokenId } = ctx.request.body;
    const { id } = ctx.state.user;
    console.log(ctx.request.body);
    const charge = await stripe.charges.create({
      amount: Math.round(total * 100),
      currency: "usd",
      source: stripeTokenId,
      description: `Order ${new Date()} by ${ctx.state.user.username}`,
    });
    const order = await strapi.services.order.create({
      name,
      total,
      items,
      user: id,
    });
    return order;
  },
};
