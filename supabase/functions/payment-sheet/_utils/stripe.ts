// esm.sh is used to compile stripe-node to be compatible with ES modules.
import Stripe from 'https://esm.sh/stripe@17.7.0?target=deno&deno-std=0.224.0&no-check';

// inject from .env to stripe the secret key
export const stripe = Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  httpClient: Stripe.createFetchHttpClient(),
});