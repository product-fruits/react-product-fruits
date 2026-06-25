# Security Policy

## Scope

This document covers the `react-product-fruits` npm package — a small React
component that initializes Product Fruits in React applications. It depends on the
[`product-fruits`](https://www.npmjs.com/package/product-fruits) loader and, at
runtime, loads the Product Fruits application script, which is maintained and
secured as part of the Product Fruits platform.

## Organizational security

Product Fruits is **SOC 2 Type II** and **ISO/IEC 27001** certified. Vulnerability
management, incident response, and remediation timelines for this package are
governed by those certified processes. Customers can request our security
documentation (including report summaries under NDA) through their Product Fruits
account contact.

## Supported versions

The latest version published on npm is the supported, recommended version for
production use. We recommend pinning to it and keeping it up to date.

## Reporting a vulnerability

Please report suspected vulnerabilities privately — do **not** open a public
GitHub issue.

- Use GitHub's private vulnerability reporting: the **"Report a vulnerability"**
  button under the repository's **Security** tab, or
- contact us through your Product Fruits account contact.

Please include a description, affected version(s), reproduction steps, and impact.
Reports are triaged and remediated under our SOC 2 / ISO 27001 incident-management
process, prioritized by severity.

## Dependencies

- Runtime dependency: `product-fruits` (the loader). `react` is a peer dependency.
- The repository has **Dependabot** / **GitHub security alerts** enabled for its
  dependencies and build toolchain.

## Verifying a published release

Each npm release is built and published from CI with a provenance attestation, so
every published version is verifiably linked to the source commit and workflow that
produced it. You can verify the package you installed:

```
npm audit signatures
```

and inspect the "Provenance" section on the package's npm page.
