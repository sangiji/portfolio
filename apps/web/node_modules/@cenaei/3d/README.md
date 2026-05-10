# @cenaei/3d

Shared Three.js helpers. Enforce perf budgets in app code:

- Tier 1: max ~6k particles, no shadow maps, textures ≤512²
- Tier 2: ~15k particles, textures ≤1024²
- Tier 3: higher budgets

Use `frameloop="demand"` on R3F `Canvas` and call `invalidate()` on interaction/scroll.
