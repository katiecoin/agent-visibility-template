import { describe, expect, it } from "vitest";
import { trimContent } from "../src/enrichment/index";

describe("trimContent", () => {
	it("repeatedly strips script blocks until stable", () => {
		const input =
			"bar</script><<<script><script x></script>script<>alert(1)xyz</script>foo";
		expect(trimContent(input)).toBe("bar <foo");
	});
});
