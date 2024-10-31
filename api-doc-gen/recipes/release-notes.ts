import { copy, copyText, exec, tmpdir, vars } from "@becomposable/memory-commands";

const { start, end } = vars();
if (!start || !end) {
    console.error("Please provide start and end tags using --var-start and --var-end");
    process.exit(1);
}

const cwd = tmpdir();

console.log(`Retrieving issues between ${start} and ${end}...`)
// Get list of commit logs containing '#' between the two tags and extract unique reference IDs (issue or pull-request)
const referenceIds = await exec(`git log ${start}..${end} --oneline | grep -o '#[0-9]\\+' | sed 's/#//' | sort -u`) as string;

for (const reference of referenceIds.trim().split("\n")) {
    console.log(`Processing reference #${reference}`)
    try {
        const content = await exec(`gh pr view ${reference}`) as string;
        copyText(content, `pull_requests/${reference}.txt`);
    } catch (e) {
        console.debug(`Failed to get content as pull-request for #${reference}, trying as issue`, e);
        const content = await exec(`gh issue view ${reference}`) as string;
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