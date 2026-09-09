import { describe, expect, it } from "vitest";
import { trimContent } from "../src/enrichment/index";

describe("trimContent", () => {
	it("repeatedly strips script blocks until stable", () => {
		const input =
			"bar</script><<<script><script x></script>script<>alert(1)xyz</script>foo";
		expect(trimContent(input)).toBe("bar <foo");
	});

	it("strips script blocks when the closing tag has trailing whitespace", () => {
		expect(trimContent("safe<script>alert(1)</script >ok")).toBe("safeok");
	});

	it("strips script blocks with malformed script closing tags", () => {
		expect(trimContent("safe<script>alert(1)</script \n bar>ok")).toBe("safeok");
	});
});
