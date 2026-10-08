import type { Env as AppEnv } from "../src/lib/types";

// Type the bindings available via `env` from "cloudflare:test".
declare global {
	namespace Cloudflare {
		interface Env extends AppEnv {}
	}
}
