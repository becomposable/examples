import { copy, exec, tmpdir, vars } from "@becomposable/memory-commands";
import { resolve } from "path";

const cwd = tmpdir();
const { repo } = vars();
if (!repo) {
    throw new Error('No github repo specified. Use --var-repo to specify the github repository to use');
}
console.log("Using github repo at", repo);

await exec(`git clone ${repo} ${cwd}`);

copy(`${cwd}/Powershell/**/*.psm1`, `${cwd}/Powershell!/ps/*`);
copy(`${cwd}/Python3/**/*.py`, `${cwd}/Python3!/py/*`);

// no metadata is required
export default {}
