# npm audit Report

_Generated: 2026-11-17_

## Current status

The root `npm audit` reports **19 package-level findings: 0 critical, 0 high, 19 moderate, and 0 low**. They arise from two upstream dependency chains described below. Updates use caret ranges, and transitive dependencies were upgraded through their parents where upstream releases allow it. One scoped override is used only for the TypeScript ESLint `minimatch` dependency.

## Dependency updates

Root and workspace package manifests, including the standalone `tools` manifest, were refreshed to the latest stable same-major releases available during this update. Security-related updates include:

| Dependency chain | Resolution |
|---|---|
| `axios`, `follow-redirects` | `axios` 1.21.1; `follow-redirects` 1.16.3. |
| `better-auth`, `mysql2` | `better-auth` 1.7.25; `mysql2` 3.24.4. |
| Prisma toolchain | Prisma, client, and adapters 7.10.1; `prisma-zod-generator` 3.3.1; `deepmerge-ts` 8.0.2. |
| AWS CDK and bundled dependencies | `aws-cdk-lib` `^2.277.0`, the latest available release; its bundled `minimatch` remains affected. |
| `glob` | Upgraded to 14.0.6 to move its normal dependency tree to patched `minimatch` 11.0.8. |
| TypeScript ESLint | Updated to 8.72.2; its `minimatch` dependency is scoped to patched 11.0.8 through the root npm override because the published parent release still requires vulnerable 10.x. |
| `eslint-plugin-prisma` | Updated to 2.0.0. |
| `fast-uri`, `ip-address` | Updated to 3.1.9 and 10.7.6. |
| `nodemailer`, `vite`, `zod`, `source-map-js` | Updated to 10.6.0, 8.3.8, 4.6.7, and 1.2.2. |
| Jest toolchain | Updated to Jest `^30.5.2` and `@types/jest` `^30.0.0`; `ts-jest` remains at `^29.4.15`, whose peer range supports Jest 30 and TypeScript below 7. The latest Jest release introduces moderate advisories in its transitive dependency tree, documented below. |

`@testing-library/jest-dom` is constrained to `^6.9.1 <6.10.0` to avoid the deprecated 6.10.0 release. The repository runtime baseline is Node.js 26.12.0+ and npm 12.2.2+.

## TypeScript 7 compatibility

The repository currently uses TypeScript 6.0.3. TypeScript 7.0.2 is the latest stable release checked on 2026-11-17, but the current Jest and ESLint integrations do not yet declare support for it:

| Tool | Latest checked version | TypeScript peer range |
|---|---:|---|
| `ts-jest` | 29.4.15 | `>=4.3 <7` |
| `typescript-eslint` | 8.73.0 | `>=4.8.4 <6.1.0` |

Consequently, upgrading the compiler to TypeScript 7.0.2 now would put both integrations outside their declared peer ranges. Prisma 7.10.1 declares TypeScript `>=5.4.0`, so its peer range does include TypeScript 7. No TypeScript vulnerability was reported by the current npm audit; upgrading the compiler would not address the audit findings listed below.

## Remaining findings

| Severity | Package chain | Why it remains |
|---|---|---|
| Moderate (2 findings) | `aws-cdk-lib` → bundled `minimatch` 10.2.6 | The latest published CDK release bundles the vulnerable copy. npm's proposed fix is to downgrade CDK to 2.239.0; there is no newer upstream release available to upgrade to yet. |
| Moderate (18 affected package entries; includes the shared `minimatch` finding above) | Jest 30.5.2 dependency tree: `glob` / `minimatch` and Jest packages | npm reports the `glob` AbortSignal cancellation bypass ([GHSA-3g3m-2fjr-6pw4](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4)) and the `minimatch` globparts amplification DoS ([GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249)). The latter affects both Jest's transitive tree and CDK's bundled copy. npm's suggested Jest fix is a major downgrade to 29.7.0. |

The Jest findings are in development/test dependencies; they do not represent production runtime dependencies. No broad overrides or hand-edited bundled package files were used.
