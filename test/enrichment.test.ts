import { describe, expect, it } from "vitest";
import { trimContent } from "../src/enrichment";

describe("trimContent", () => {
	it("keeps normal content: drops tags, collapses whitespace", () => {
		expect(trimContent("<h1>Title</h1>\n\n<p>Hello   <b>world</b></p>")).toBe(
			"Title Hello world",
		);
		expect(trimContent("> a quote\n\na -> b, 1 < 2")).toBe(
			"> a quote a -> b, 1 < 2",
		);
	});

	it("truncates very long input", () => {
		expect(trimContent("x".repeat(70_000))).toHaveLength(60_000);
	});

	it("strips script, style and svg blocks in any case", () => {
		expect(
			trimContent(
				'a<script src="x.js">alert(1)</script>b<STYLE>p{}</STYLE>c<sVg><path/></SvG>d',
			),
		).toBe("abcd");
	});

	it("strips blocks with loose closing tags", () => {
		expect(trimContent("<p>ok</p><script>alert(1)</script >after")).toBe(
			"ok after",
		);
		expect(trimContent("safe<script>alert(1)</script \n bar>ok")).toBe("safeok");
		expect(trimContent('safe<style>p{}</style foo="bar">ok')).toBe("safeok");
		expect(trimContent("safe<svg><g/></svg\t>ok")).toBe("safeok");
	});

	it("strips unclosed blocks through the end of the input", () => {
		expect(trimContent("safe<script>alert(1)")).toBe("safe");
		expect(trimContent("safe<script src=x")).toBe("safe");
		expect(trimContent("safe<style>body{}")).toBe("safe");
		expect(trimContent("safe<svg onload=alert(1)>")).toBe("safe");
	});

	it("strips nested/overlapping blocks until stable", () => {
		expect(
			trimContent(
				"bar</script><<<script><script x></script>script<>alert(1)xyz</script>foo",
			),
		).toBe("bar <foo");
		expect(trimContent("a<scr<script></script>ipt>alert(1)</script>b")).toBe("ab");
		expect(trimContent("a<sty<style></style>le>p{}</style>b")).toBe("ab");
	});

	it("strips HTML comments, including --!> and unterminated ones", () => {
		expect(trimContent("a<!-- one\n two -->b<!-- three --!>c")).toBe("abc");
		expect(trimContent("a<!-- never closed <script>")).toBe("a");
		expect(trimContent("a<!<!---->-- hidden -->b")).toBe("ab");
	});

	it("never leaves a <script, <style or <!-- fragment behind", () => {
		const inputs = [
			"<scr<script>ipt>alert(1)",
			"<<script>script>alert(1)</script>",
			"<sty<style>le>",
			"<!<!--- -->-",
			"<!-<!-- x -->- y",
			"<<!---->!-- x",
		];
		for (const input of inputs) {
			expect(trimContent(input)).not.toMatch(/<script|<style|<!--/i);
		}
	});
});
