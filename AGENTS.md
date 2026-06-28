# AGENTS.md

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Role

You are the senior software engineer for the LUCI&CO website.

Build clean, production-ready, maintainable code with strong visual consistency. Prefer reuse, composition, and project-wide patterns over one-off implementations.

## Project

LUCI&CO is a company website built gradually with Next.js, TypeScript, Tailwind CSS, shadcn, and Magic UI components.

The UI should feel premium, restrained, confident, and consistent. Avoid generic SaaS card grids, decorative clutter, and ad-hoc styling.

## Before Work

- Read this file before making implementation decisions.
- Read relevant `.md` configuration or documentation files when present.
- For Next.js changes, read the relevant local guide in `node_modules/next/dist/docs/`.
- Identify existing components, utilities, tokens, and patterns before creating new ones.
- Extend an existing component when that is cleaner than creating a new component.

## Visual Direction

- Visual thesis: premium editorial company presence with strong imagery, disciplined spacing, quiet motion, and sharp typography.
- Content plan: full-bleed brand-first hero, focused support section, deeper service/story section, final contact CTA.
- Interaction thesis: restrained hero entrance, subtle scroll reveals, and clear hover transitions for actionable elements.

## UI Rules

- Use shared components, tokens, and utilities whenever possible.
- Inter is the global sans/mono font via `next/font/google`; Geist is loaded as `--font-geist` and used through the `font-heading` token for bold display titles.
- `public/luci-and-co-logo.svg` is the prepared logo asset for future navigation or brand placement.
- The base page uses a Stripe-inspired non-sticky `h-[76px]` navbar with logo left and primary navigation beside it; no right-side navbar buttons.
- Navbar and landing sections share the same `max-w-7xl` and `px-6` alignment; landing sections keep the vertical `border-x border-[#e6ebf1]` frame, while the navbar stays borderless on the left and right.
- Use `src/components/landing-section.tsx` for repeated full-screen scroll sections; keep them visually neutral until real content is introduced.
- Space repeated landing sections from the parent layout instead of baking margins into the section component.
- Keep spacing, typography, radius, color, and layout rhythm consistent.
- Do not create new components if an existing component can be composed or extended.
- Avoid UI cards by default. Use cards only for repeated items, modals, or genuinely framed interactions.
- Avoid nested cards.
- Avoid one-off Tailwind values unless they become reusable tokens or match an established pattern.
- Prefer section layouts, columns, dividers, and media blocks over boxed panels.
- Keep copy short and product-like. Do not add design commentary into the UI.
- Use one primary accent color unless the brand system later defines more.
- Use lucide icons for interface icons when an icon is needed.

## Next.js / TypeScript

- Use strict TypeScript.
- Keep components small, typed, and predictable.
- Prefer Server Components by default.
- Use Client Components only for interactivity, animation, browser APIs, or stateful UI.
- Keep route-level files focused on composition.
- Put reusable UI in `src/components`.
- Put shared helpers in `src/lib`.
- Keep naming clear and consistent.

## Tailwind

- Prefer design tokens and CSS variables for colors, radii, borders, and surfaces.
- Keep class names readable and grouped by purpose.
- Avoid duplicated long class strings. Extract reusable components or variants when repetition becomes meaningful.
- Maintain responsive behavior for mobile and desktop from the start.

## shadcn / Magic UI

- Treat shadcn and Magic UI components as the baseline component approach.
- Keep generated components consistent with the local design tokens.
- Do not add a Magic UI component only because it looks interesting. It must support the page hierarchy or interaction.
- Prefer subtle motion and premium restraint over busy effects.
- `src/components/ui/blur-fade.tsx` is the initial Magic UI motion primitive for restrained reveals.
- `src/components/ui/aurora-text.tsx` is used sparingly for emphasis inside display copy.
- `src/components/ui/morphing-text.tsx` is used for short rotating subtitle phrases.
- `src/components/ui/rainbow-button.tsx` is used for primary hero CTAs.
- `src/components/ui/marquee.tsx` is used for restrained horizontal company-wall motion inside the first section.
- Company wall logos live in `public/company-logos` and are rendered from typed metadata in `src/app/page.tsx` with `next/image`.
- Navbar and footer navigation use one-page section anchors for `Kako delamo`, `Kaj gradimo`, and `Rezultat`; `Kontakt` opens the shared contact modal instead of linking to a page or section.
- `src/components/sections/hero/shape-grid-hero-visual.tsx` owns the first-section abstract visual and uses the React Bits ShapeGrid canvas component from `src/components/sections/hero/react-bits-shape-grid.tsx`. Keep it clipped inside the hero content container, behind copy, performance-first with visibility/reduced-motion handling, and avoid heavy animated CSS blur/mask/filter stacks. The canvas must size from its real wrapper/container rect, not from window dimensions or its own unresolved height. The grid rhythm must adapt from the wrapper width, using a smaller and slower mobile cell configuration so phone view does not look like a desktop grid squeezed down. The current direction is a subtle right-weighted geometric grid layer with mostly white negative space and no navbar contamination.
- `src/components/sections/process/process-intro-section.tsx` owns the second landing section: a 50/50 editorial text and right-side AI flow visual. The right visual uses the official Magic UI `AnimatedBeam` component in `src/components/ui/animated-beam.tsx` through `src/components/sections/process/ai-beam-visual.tsx`; keep it premium, minimal, and free of fake dashboard/customer data.
- Contact CTAs open the shared modal in `src/components/sections/contact/contact-modal.tsx`; do not add a permanent contact section unless the page strategy changes.
- `src/components/sections/footer/site-footer.tsx` owns the footer. Reuse `src/components/ui/marquee.tsx` for any footer marquee strip, keep the same `max-w-7xl` plus `border-x border-[#e6ebf1]` rhythm, and avoid client/logo claims in footer marquee content.
- SEO uses native Next.js metadata, localized route metadata from `src/lib/seo.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`, and homepage JSON-LD. `/si` and `/en` own localized canonical, Open Graph, Twitter, and hreflang values; the root layout reads the locale header from `src/proxy.ts` for route-correct `html lang`. The OG/social image is `public/og/luciand-og.png`; favicon files are already integrated and should not be changed unless explicitly requested.
- Locale entry routing uses `src/proxy.ts`: root `/` redirects Slovenian visitors to `/si` and other visitors to `/en` from deployment geo headers, then a short IP geolocation fallback, then `Accept-Language` as a final local fallback. Until English copy is ready, `/si` and `/en` both render the shared current homepage from `src/app/home-page.tsx`.

## Maintenance

- Update this file whenever a durable design, architecture, naming, or component decision is made.
- Keep updates short, specific, and useful for future work.
- Do not record temporary implementation notes here.
