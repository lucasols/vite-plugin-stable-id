import { Plugin } from 'vite'

export function stableId(): Plugin {
  let isDev = false

  return {
    name: 'initialBuildTime',
    configResolved(config) {
      isDev = config.command === 'serve'
    },
    transform(_, id) {},
  }
}
