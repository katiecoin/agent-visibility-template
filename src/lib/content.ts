/**
 * Starter content for Katie Coins Base. Replace `SAMPLE_RESOURCES` with your own pages, or
 * POST raw HTML/Markdown to `/api/resources` to enrich your real content.
 *
 * Each entry is intentionally a little messy (headings, lists, prose) so the
 * Workers AI enrichment pass has something realistic to summarize.
 */
import type { RawResource } from "./types";

export const SAMPLE_RESOURCES: RawResource[] = [
	{
		slug: "about",
		url: "https://katiecoinsbase.xyz/about",
		title: "About Katie Coins Base",
		body: `# About Katie Coins Base

Katie Coins Base is the home for Katie Coins' crypto and web3 projects.

## Status

This site is just getting started. Project pages will be added here as they
are published.

## Find the code

Katie's public code lives on GitHub at https://github.com/katiecoin.`,
	},
	{
		slug: "projects",
		url: "https://katiecoinsbase.xyz/projects",
		title: "Projects",
		body: `# Projects

Crypto and web3 projects from Katie Coins will be listed here.

No project write-ups have been published yet. In the meantime, see
https://github.com/katiecoin for public repositories.`,
	},
];
