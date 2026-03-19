import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Gracefully degrades if env vars aren't configured (fails open during dev)
let contactRatelimit: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  contactRatelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "10 m"),
    prefix: "ratelimit:contact",
    analytics: false,
  });
}

export { contactRatelimit };
