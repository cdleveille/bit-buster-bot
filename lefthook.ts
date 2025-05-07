import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { $ } from "bun";

await mkdir(".git/hooks", { recursive: true });

const hookContent = `#!/bin/sh
export PATH="$PWD/node_modules/.bin:$PATH"
lefthook run pre-commit`;

await writeFile(join(".git/hooks", "pre-commit"), hookContent);

await $`chmod +x .git/hooks/pre-commit`;

console.log("lefthook pre-commit hook installed ✅");
