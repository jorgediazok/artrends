/**
 * Catches up on scraper runs GitHub Actions' `schedule` trigger silently
 * dropped. GitHub does not guarantee or retry scheduled workflow runs under
 * load, so this checks each job's last-persisted date against the deployed
 * API and re-runs anything more stale than its cron interval should allow.
 * Spotify is excluded: it only runs weekly, so a short-lived scheduling gap
 * never makes it look stale enough to matter.
 */
import { execFileSync } from "child_process";

const BACKEND_URL = process.env.BACKEND_URL || "https://artrends-backend.onrender.com";

type Job = {
	name: string;
	path: string;
	thresholdMinutes: number;
	extractDate: (body: any) => string | undefined;
};

const jobs: Job[] = [
	{
		name: "google",
		path: "/api/google-trends",
		thresholdMinutes: 100,
		extractDate: body => body?.current?.record?.date,
	},
	{
		name: "twitter",
		path: "/api/twitter-trends",
		thresholdMinutes: 100,
		extractDate: body => body?.current?.record?.date,
	},
	{
		name: "youtube",
		path: "/api/youtube-trends",
		thresholdMinutes: 160,
		extractDate: body => body?.current?.record?.date,
	},
	{
		name: "portals",
		path: "/api/portals",
		thresholdMinutes: 100,
		extractDate: body => body?.current?.elDestape?.record?.date,
	},
];

async function checkStaleness(job: Job): Promise<{ job: Job; staleMinutes: number | null }> {
	const res = await fetch(`${BACKEND_URL}${job.path}`);
	if (!res.ok) {
		console.log(`[watchdog] ${job.name}: HTTP ${res.status} fetching ${job.path}, treating as stale`);
		return { job, staleMinutes: Infinity };
	}

	const body = await res.json();
	const dateStr = job.extractDate(body);
	if (!dateStr) {
		console.log(`[watchdog] ${job.name}: no current record found, treating as stale`);
		return { job, staleMinutes: Infinity };
	}

	const ageMinutes = (Date.now() - new Date(dateStr).getTime()) / 60000;
	console.log(
		`[watchdog] ${job.name}: last record ${dateStr} (${ageMinutes.toFixed(1)}min old, threshold ${job.thresholdMinutes}min)`
	);
	return { job, staleMinutes: ageMinutes > job.thresholdMinutes ? ageMinutes : null };
}

async function main() {
	const results = await Promise.all(jobs.map(checkStaleness));
	const stale = results.filter(r => r.staleMinutes !== null);

	if (stale.length === 0) {
		console.log("[watchdog] all jobs fresh, nothing to do");
		return;
	}

	console.log(`[watchdog] stale jobs: ${stale.map(s => s.job.name).join(", ")}`);

	let hadFailure = false;
	for (const { job } of stale) {
		console.log(`[watchdog] re-running "${job.name}"...`);
		try {
			execFileSync("node", ["build/run-job.js", job.name], {
				stdio: "inherit",
				env: process.env,
			});
		} catch (e) {
			console.error(`[watchdog] "${job.name}" re-run failed`, e);
			hadFailure = true;
		}
	}

	if (hadFailure) {
		process.exit(1);
	}
}

main().catch(e => {
	console.error(e);
	process.exit(1);
});
