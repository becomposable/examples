import { copy, copyText, exec, tmpdir, vars } from "@becomposable/memory-commands";

const { start, end } = vars();
if (!start || !end) {
    console.error("Please provide start and end tags using --var-start and --var-end");
    process.exit(1);
}

const cwd = tmpdir();

console.log(`Retrieving issues between ${start} and ${end}...`)

// Get GitHub reference IDs (issue or pull-request) from commit messages
// Commits having the hashtag, like "Fix #123" => 123
const hashtagIds = await exec(`git log ${start}..${end} --oneline | grep -o -E '#[0-9]+' | sed 's/#//'`) as string;
// Commits with patterns like "fix(456) ..." or "feat(456) ..." => 456
const patternIds = await exec(`git log ${start}..${end} --oneline | grep -o -E '\\([0-9]+\\)' | sed 's/[()]//g'`) as string;

const unsortedReferenceIds = new Set(`${hashtagIds}\n${patternIds}`.trim().split("\n").map(v => v.trim()).map(Number));
const referenceIds = Array.from(unsortedReferenceIds).sort((a, b) => a - b);
console.log(`Found ${referenceIds.length} references`);

for (const reference of referenceIds) {
    console.log(`Processing reference #${reference}`)
    let content = await exec(`gh pr view ${reference}`) as string;
    if (content) {
        copyText(content, `pull_requests/${reference}.txt`);
    } else {
        console.debug(`Failed to get content as pull-request for #${reference}, trying as issue`);
        content = await exec(`gh issue view ${reference}`) as string;
        copyText(content, `issues/${reference}.txt`);
    }
}

console.log("Generating diff");
// We use git-log to get authors, commit messages and code diff.
// We use --submodule=diff to include submodule changes
await exec(`git log --submodule=diff --patch ${start}...${end} > ${cwd}/range_diff.txt`)
copy(`${cwd}/range_diff.txt`, "range_diff.txt");

export default {
    from_version: start,
    release_version: end,
}