# UI/UX Guidelines: The Digital Curator

Our platform adopts the "Organic Brutalism" aesthetic. The goal is to transform a list of suggestions into a curated exhibition of ideas, prioritizing expansive white space, intentional asymmetry, and typographic scale over traditional utility UI.

## 1. Surfaces & Borders (The "No-Line" Rule)

We define boundaries solely through background color shifts, treating the UI as stacked sheets of fine paper.

- ✅ **DO:** Use the established surface hierarchy: `surface` (#f8f9fa) for the base, `surface-container-low` (#f3f4f5) for main areas, and `surface-container-lowest` (#ffffff) for interactive cards.
- ❌ **DON'T:** Use 1px solid borders to define sections, cards, or containers. 100% opaque borders are strictly forbidden.
- ✅ **DO:** Use a "Ghost Border" (`outline-variant` #c0c7d0 at 15% opacity) ONLY if accessibility requires a container definition in high-contrast modes.

## 2. Depth & Elevation (Tonal Layering)

We do not use traditional drop shadows to represent elevation.

- ✅ **DO:** Rely on subtle luminance shifts. Place a `surface-container-lowest` (#ffffff) card on a `surface-container-low` (#f3f4f5) background to create a soft, natural lift.
- ✅ **DO:** Use "Ambient Shadows" for floating elements (e.g., FABs or hovered cards): a shadow with a 32px blur at 6% opacity, tinted with our `primary` teal (#004d75) instead of pure black.
- ✅ **DO:** Use Glassmorphism (`surface-container-lowest` at 80% opacity with a 20px backdrop-blur) for floating menus or filters to integrate them smoothly into the layout.

## 3. Typography & Hierarchy (Editorial Authority)

We pair geometric precision with functional clarity.

- ✅ **DO:** Use **Manrope** for Display and Headlines, applying tight letter-spacing (-0.02em) for a premium, authoritative feel.
- ✅ **DO:** Use **Inter** for data-heavy content (body text, descriptions, titles) to ensure readability.
- ❌ **DON'T:** Use pure black (#000000) for text. Always use `on-surface` (#191c1d) to maintain a sophisticated, soft-contrast look.
- ✅ **DO:** Use `label-md` (0.75rem) in all-caps with 0.05em tracking for administrative status labels.

## 4. Component Construction

- ✅ **DO:** Build input fields with a "Soft Inset" look: a `surface-container-highest` (#e1e3e4) background with a `roundedness.sm` (0.125rem) bottom-only accent in `primary` when focused.
- ❌ **DON'T:** Use 4-sided outlines for inputs.
- ✅ **DO:** Give cards an "expensive" amount of white space using `spacing.6` (1.5rem) for internal padding.
- ❌ **DON'T:** Cram cards together. If the screen feels full, increase the spacing scale. Use vertical white space (`spacing.12` or `spacing.16`) to separate major content groups instead of horizontal divider lines.

## 5. Interaction & State Feedback

- ✅ **DO:** Implement Optimistic UI. On the "Vote" action, update the counter immediately in the local React state before the API response.
- ✅ **DO:** Use _Skeletons_ (via shadcn/ui) that match our "No-Line" surface colors to indicate loading, maintaining layout stability.
- ✅ **DO:** On card hover, shift the background to `surface-container-high` (#e7e8e9) and apply the Ambient Shadow.
