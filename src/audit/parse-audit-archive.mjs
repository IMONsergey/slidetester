import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import JSZip from 'jszip';

const ARCHIVES = [
  'input/figma_slide_factory_audit.zip',
  'input/figma-slide-factory-design-fidelity-addendum.zip'
];

const OUTPUT = 'output/audit-archive-summary.json';

async function summarizeArchive(filePath) {
  const zip = await JSZip.loadAsync(await readFile(filePath));
  const names = Object.keys(zip.files).sort();
  const interesting = names.filter((name) => /\.(json|txt|md)$/i.test(name)).slice(0, 50);

  return {
    filePath,
    status: 'found',
    entryCount: names.length,
    interestingEntries: interesting
  };
}

async function main() {
  await mkdir('output', { recursive: true });

  const archives = [];
  for (const filePath of ARCHIVES) {
    if (!existsSync(filePath)) {
      archives.push({
        filePath,
        status: 'missing'
      });
      continue;
    }

    archives.push(await summarizeArchive(filePath));
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    archives
  };

  await writeFile(OUTPUT, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${OUTPUT}.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
