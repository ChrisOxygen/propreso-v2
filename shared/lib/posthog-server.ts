import { PostHog } from "posthog-node";

function getClient(): PostHog {
  return new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com",
    flushAt: 1,
    flushInterval: 0,
  });
}

/**
 * Fire a server-side PostHog event. Call `await` on this — it flushes
 * immediately so the event isn't lost when the serverless function exits.
 */
export async function captureServerEvent(
  distinctId: string,
  event: string,
  properties?: Record<string, unknown>
): Promise<void> {
  const client = getClient();
  client.capture({ distinctId, event, properties });
  await client.shutdown();
}
