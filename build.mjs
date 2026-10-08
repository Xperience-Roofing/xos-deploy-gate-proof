// Records, at BUILD time, whether this build could read STRIPE_SECRET_KEY. Never writes the key.
import { writeFileSync } from "node:fs";
const k = process.env.STRIPE_SECRET_KEY;
const kind = !k ? null : k.startsWith("rk_test_") ? "rk_test" : k.startsWith("rk_live_") ? "rk_live" : "other";
writeFileSync("public/build.json", JSON.stringify({
  phase: "build", vercelEnv: process.env.VERCEL_ENV ?? null, gitRef: process.env.VERCEL_GIT_COMMIT_REF ?? null,
  sha: process.env.VERCEL_GIT_COMMIT_SHA ?? null, hasKeyAtBuild: !!k, keyKind: kind, at: new Date().toISOString() }, null, 1));
console.log("build: hasKeyAtBuild=" + !!k + " env=" + process.env.VERCEL_ENV);
