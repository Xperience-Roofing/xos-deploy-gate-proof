// Says, at RUN time, whether this deployment can read STRIPE_SECRET_KEY. Never returns the key.
export default function handler(req, res) {
  const k = process.env.STRIPE_SECRET_KEY;
  const kind = !k ? null : k.startsWith("rk_test_") ? "rk_test" : k.startsWith("rk_live_") ? "rk_live" : "other";
  res.setHeader("cache-control", "no-store");
  res.status(200).json({ phase: "runtime", vercelEnv: process.env.VERCEL_ENV ?? null, gitRef: process.env.VERCEL_GIT_COMMIT_REF ?? null,
    sha: process.env.VERCEL_GIT_COMMIT_SHA ?? null, hasKeyAtRuntime: !!k, keyKind: kind });
}
