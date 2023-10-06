import { expect, test } from 'vitest'
import { replaceStableIdCalls } from '../src/main'
import { dedent } from './testUtils'

test('single usage', () => {
  expect(
    replaceStableIdCalls(`console.log(stableId())`, 'test.ts', true),
  ).toMatchInlineSnapshot(`
    {
      "code": "console.log('196xm6g1')",
      "map": SourceMap {
        "file": undefined,
        "mappings": "AAAA,YAAY,UAAU",
        "names": [],
        "sources": [
          "",
        ],
        "sourcesContent": undefined,
        "version": 3,
      },
    }
  `)
})

test('multiple usages', () => {
  expect(
    replaceStableIdCalls(
      dedent`
        console.log(stableId());
        console.log(stableId());
        console.log(stableId());
        console.log(stableId());
      `,
      'test.ts',
      true,
    ),
  ).toMatchInlineSnapshot(`
    {
      "code": "console.log('196xm6g1');
    console.log('196xm6g2');
    console.log('196xm6g3');
    console.log('196xm6g4');",
      "map": SourceMap {
        "file": undefined,
        "mappings": "AAAA,YAAY,UAAU;AACtB,YAAY,UAAU;AACtB,YAAY,UAAU;AACtB,YAAY,UAAU",
        "names": [],
        "sources": [
          "",
        ],
        "sourcesContent": undefined,
        "version": 3,
      },
    }
  `)
})

test('with labels', () => {
  expect(
    replaceStableIdCalls(
      dedent`
        console.log(stableId('test'));
      `,
      'test.tsx',
      true,
    ),
  ).toMatchInlineSnapshot(`
    {
      "code": "console.log('1f7yvv91-test');",
      "map": SourceMap {
        "file": undefined,
        "mappings": "AAAA,YAAY,eAAgB",
        "names": [],
        "sources": [
          "",
        ],
        "sourcesContent": undefined,
        "version": 3,
      },
    }
  `)

  expect(
    replaceStableIdCalls(
      dedent`
        console.log(stableId("test"));
      `,
      'test.tsx',
      true,
    ),
  ).toMatchInlineSnapshot(`
    {
      "code": "console.log('1f7yvv91-test');",
      "map": SourceMap {
        "file": undefined,
        "mappings": "AAAA,YAAY,eAAgB",
        "names": [],
        "sources": [
          "",
        ],
        "sourcesContent": undefined,
        "version": 3,
      },
    }
  `)

  expect(
    replaceStableIdCalls(
      dedent`
        console.log(stableId("test_ok"));
        console.log(stableId("test-ok"));
        console.log(stableId("test2"));
        console.log(stableId("test3"));
        console.log(stableId("PascalCase"));
      `,
      'test.tsx',
      true,
    ),
  ).toMatchInlineSnapshot(`
    {
      "code": "console.log('1f7yvv91-test_ok');
    console.log('1f7yvv92-test-ok');
    console.log('1f7yvv93-test2');
    console.log('1f7yvv94-test3');
    console.log('1f7yvv95-PascalCase');",
      "map": SourceMap {
        "file": undefined,
        "mappings": "AAAA,YAAY,kBAAmB;AAC/B,YAAY,kBAAmB;AAC/B,YAAY,gBAAiB;AAC7B,YAAY,gBAAiB;AAC7B,YAAY,qBAAsB",
        "names": [],
        "sources": [
          "",
        ],
        "sourcesContent": undefined,
        "version": 3,
      },
    }
  `)
})

test('should not add labels in production', () => {
  expect(
    replaceStableIdCalls(
      dedent`
        console.log(stableId('test'));
      `,
      'test.tsx',
      false,
    ),
  ).toMatchInlineSnapshot(`
    {
      "code": "console.log('1f7yvv9');",
      "map": SourceMap {
        "file": undefined,
        "mappings": "AAAA,YAAY,SAAgB",
        "names": [],
        "sources": [
          "",
        ],
        "sourcesContent": undefined,
        "version": 3,
      },
    }
  `)
})

test('duplicate labels should produce different ids', () => {
  expect(
    replaceStableIdCalls(
      dedent`
        console.log(stableId('test'));
        console.log(stableId('test'));
      `,
      'test.tsx',
      true,
    ),
  ).toMatchInlineSnapshot(`
    {
      "code": "console.log('1f7yvv91-test');
    console.log('1f7yvv92-test');",
      "map": SourceMap {
        "file": undefined,
        "mappings": "AAAA,YAAY,eAAgB;AAC5B,YAAY,eAAgB",
        "names": [],
        "sources": [
          "",
        ],
        "sourcesContent": undefined,
        "version": 3,
      },
    }
  `)
})

test('invalid labels', () => {
  expect(() =>
    replaceStableIdCalls(
      dedent`
        console.log(stableId(''));
      `,
      'test.tsx',
      true,
    ),
  ).toThrowErrorMatchingInlineSnapshot(
    '"Failed to replace all stableId() calls, check if you are using invalid labels, labels should contain only letters, number,`-` and `_`. Invalid examples: like `stableId(\'\')` or `stableId(\'fo ds\')`"',
  )

  expect(() =>
    replaceStableIdCalls(
      dedent`
        console.log(stableId('fo ds'));
      `,
      'test.tsx',
      true,
    ),
  ).toThrowErrorMatchingInlineSnapshot(
    '"Failed to replace all stableId() calls, check if you are using invalid labels, labels should contain only letters, number,`-` and `_`. Invalid examples: like `stableId(\'\')` or `stableId(\'fo ds\')`"',
  )
})
