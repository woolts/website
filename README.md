---
home: true
heroText: wool
description: an ecosystem for typescript
actionText: Documentation
actionLink: /learn/getting-started
features:
  - title: Safe & Stable
    details:
      - With in-built sandboxing and only TypeScript packages allowed, you can ensure your project is safer and more stable.
      - Semantic versioning is no longer human led, but defined by a package’s public interface.
  - title: Decentralised
    details:
      - Development is not tied to a single point of failure.
      - Create your own registries to mirror any packages you depend on, or to host your company’s private projects.
  - title: Monorepos
    details:
      - Structure your projects how you want, without restriction, nested as deep as necessary.
      - Each package can opt to share its version or be individually versioned.
  - title: Free & Open Source
    details:
      - Wool is free and open source. Forever.
      - Build with the confidence that bad actors can not cause damage to your business.
footer: MIT Licensed | Free & Open Source. Forever.
---

```bash
# create a new project
wool init hello/world
cd hello-world

# add packages
wool add you/example

# compile
wool make .

# and run
wool run hello/world
```
