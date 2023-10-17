declare module 'virtual:stable-id' {
  export type ViteStableId = string & { __brand: 'ViteStableId' }

  /** Generates a stable hash id based on code file path and the position which this function is called, can be used, for example for creating unique classnames */
  export function stableId(label?: string): ViteStableId
}
