import { fileURLToPath } from 'url'
import { build } from 'vite'
import path from 'path'
import { createMockFs } from './mockFs'
import { expect, test } from 'vitest'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const fsMock = createMockFs('project1', {
  tmpDirRoot: path.join(__dirname, './test-mocks-dir'),
  initialMockedFiles: {
    './index.html': `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <link rel="icon" type="image/svg+xml" href="/vite.svg" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Vite + React + TS</title>
        </head>
        <body>
          <div id="root"></div>
          <script type="module" src="/src/root.tsx"></script>
        </body>
      </html>
    `,
    './src/root.tsx': `
      console.log('hello world')
    `,
  },
})

test('test', async () => {
  await build({
    root: fsMock.root,
  })

  expect(true).toBe(true)
})
