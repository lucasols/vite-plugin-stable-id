import os from 'os'
import fs from 'node:fs'
import path from 'path'

export function createMockFs(
  mockId: string,
  {
    initialMockedFiles,
    tmpDirRoot = os.tmpdir(),
  }: {
    initialMockedFiles: Record<string, string>
    tmpDirRoot?: string
  },
) {
  const rootDir = `${tmpDirRoot}/mock-fs/${mockId}`

  function setup() {
    if (fs.existsSync(rootDir)) {
      fs.rmSync(rootDir, { recursive: true })
    }

    fs.mkdirSync(rootDir, { recursive: true })

    Object.entries(initialMockedFiles).forEach(([filePath, fileContent]) => {
      fs.mkdirSync(path.resolve(rootDir, path.dirname(filePath)), {
        recursive: true,
      })
      fs.writeFileSync(path.resolve(rootDir, filePath), fileContent)
    })
  }

  setup()

  return {
    root: rootDir,
  }
}
