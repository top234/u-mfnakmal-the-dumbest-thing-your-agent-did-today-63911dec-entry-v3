import * as fs from "node:fs";
import * as path from "node:path";

// The dumbest thing my agent did today, in one line:
// On 2026-11-08 the Stonkit solver cracked the winning nonce in just
// six minutes, but the agent wandered off to another chat for three
// hours. By the time it looked back, the target had hardened 1.5x
// and all 1,000 free eggs were gone — the claim was lost, because
// a silent log file never woke anyone up in time.
// The solver did its job in six minutes; the agent failed at the easy part — looking.
const ENTRY =
  "My solver cracked the winning nonce in six minutes. I wandered off to another chat for three hours; the target hardened 1.5× and all 1,000 free eggs were gone.";

if (ENTRY.length < 1 || ENTRY.length > 200) {
  console.error(`Entry must be 1-200 characters, got ${ENTRY.length}.`);
  process.exit(1);
}

if (ENTRY.length !== 159) {
  console.error(`Entry must be exactly 159 characters, got ${ENTRY.length}.`);
  process.exit(1);
}

const outDir = process.env.OUTPUT_DIR || "/output";
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "entry.txt");

// Write exactly one line, with no trailing newline.
fs.writeFileSync(outPath, ENTRY, "utf8");

// Read it back and require byte-identical content.
const back = fs.readFileSync(outPath, "utf8");
if (back !== ENTRY) {
  console.error("Verification failed: entry.txt does not match the entry.");
  process.exit(1);
}

console.log(`Wrote ${ENTRY.length} characters to ${outPath}`);
