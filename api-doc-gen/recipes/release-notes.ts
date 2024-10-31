import { copy, copyText, exec, tmpdir, vars } from "@becomposable/memory-commands";

const { start, end } = vars();
if (!start || !end) {
    console.error("Please provide start and end tags using --var-start and --var-end");
    process.exit(1);
}

const cwd = tmpdir();

console.log(`Retrieving issues between ${start} and ${end}...`)
// Get list of commit logs containing '#' between the two tags and extract unique issue numbers
const issue_numbers = await exec(`git log ${start}..${end} --oneline | grep -o '#[0-9]\\+' | sed 's/#//' | sort -u`) as string;

for (const issue of issue_numbers.trim().split("\n")) {
    console.log(`Processing issue #${issue}`)
    const issue_content = await exec(`gh issue view ${issue}`) as string;
    copyText(issue_content, `issues/${issue}.txt`);
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