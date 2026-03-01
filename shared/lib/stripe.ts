import Stripe from "stripe";

let _stripe: Stripe | null = null;

function _getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return _stripe;
}

// Lazy proxy — Stripe is only instantiated on first property access,
// not at module evaluation time. Callers use it like a normal Stripe instance.
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (_getStripe() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
