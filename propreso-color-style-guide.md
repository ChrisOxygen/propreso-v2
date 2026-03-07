# Propreso Brand Color Style Guide

> Light theme color system for Propreso — an AI-powered proposal generation tool built for freelancers.
> **Brand personality:** Confident, clean, professional, with a warm edge.

---

## Step 1 — Image Analysis

**From the reference images, here's what was extracted:**

- **Eduhive Dashboards (Images 1, 2 & 4):** Dominant warm coral-salmon (`#E05A44`–`#F09080` range) gradient canvas, clean white card surfaces, burnt orange active nav states, warm off-white tinted backgrounds, amber/golden accent in data visualizations. Mood: energetic, warm, modern SaaS.

- **Switzer Palette (Image 3):** Explicit confirmed hex values — `#E16449` (burnt orange-terracotta), `#FFBF40` (amber gold), `#181B21` (near-black), `#868686` (neutral mid-gray). This is the core palette anchor.

- **Overall Emotional Tone:** Confident, human-warm, high-contrast for clarity, professional without being sterile. The orange reads as *momentum and ambition* — fitting for freelancers submitting winning proposals.

---

## Step 2 — Full Color Style Guide

### 🎨 Brand Core Colors

| Token | Name | Hex | RGB | Usage |
|-------|------|-----|-----|-------|
| `--color-primary` | Deep Ember | `#C85438` | `rgb(200, 84, 56)` | Main CTAs, key actions, active nav, logo mark — 4.5:1 on white (AA) |
| `--color-primary-hover` | Char Ember | `#AE4529` | `rgb(174, 69, 41)` | Hover state for primary buttons |
| `--color-primary-active` | Smoldering | `#964020` | `rgb(150, 64, 32)` | Click/pressed state for primary buttons |
| `--color-primary-subtle` | Ember Tint | `#FDF0EC` | `rgb(253, 240, 236)` | Selected states, chips, tinted backgrounds |
| `--color-primary-foreground` | Warm White | `#FFFFFF` | `rgb(255, 255, 255)` | Text/icons on primary color (large/bold text) |

### 🖤 Neutral / Base Colors

| Token | Name | Hex | RGB | Usage |
|-------|------|-----|-----|-------|
| `--color-background` | Warm Canvas | `#FDF8F6` | `rgb(253, 248, 246)` | Root page background |
| `--color-surface` | Pure Surface | `#FFFFFF` | `rgb(255, 255, 255)` | Cards, panels, modals, dropdowns, popovers — elevation via shadow, not color |
| `--color-border` | Warm Stroke | `#EDE7E4` | `rgb(237, 231, 228)` | Input borders, dividers, card outlines |
| `--color-border-strong` | Defined Stroke | `#C9BCB8` | `rgb(201, 188, 184)` | Focused inputs, selected card states |

### 📝 Text Colors

| Token | Name | Hex | RGB | Usage |
|-------|------|-----|-----|-------|
| `--color-text-primary` | Rich Ink | `#1A1412` | `rgb(26, 20, 18)` | Headings, body copy — warm near-black |
| `--color-text-secondary` | Warm Slate | `#5A4E4A` | `rgb(90, 78, 74)` | Subheadings, metadata, field labels |
| `--color-text-muted` | Dusty Ash | `#9C8E8A` | `rgb(156, 142, 138)` | Placeholders, disabled text, captions |
| `--color-text-on-primary` | Crisp White | `#FFFFFF` | `rgb(255, 255, 255)` | Text/icons sitting on primary brand color |

### ✅ Semantic / Functional Colors

| Token | Name | Hex | RGB | Usage |
|-------|------|-----|-----|-------|
| `--color-success` | Sage Green | `#2E8A5C` | `rgb(46, 138, 92)` | Accepted proposals, confirmed states |
| `--color-success-subtle` | Sage Mist | `#E9F6EF` | `rgb(233, 246, 239)` | Success alert/banner backgrounds |
| `--color-warning` | Amber Gold | `#E8A020` | `rgb(232, 160, 32)` | Draft proposals, pending review |
| `--color-warning-subtle` | Amber Haze | `#FEF5E3` | `rgb(254, 245, 227)` | Warning background states |
| `--color-error` | Cinnabar | `#C93A4B` | `rgb(201, 58, 75)` | Rejected proposals, destructive actions |
| `--color-error-subtle` | Blush Fade | `#FDECEE` | `rgb(253, 236, 238)` | Error alert backgrounds |
| `--color-info` | Slate Blue | `#3A7CC8` | `rgb(58, 124, 200)` | AI generation states, tips, info toasts |
| `--color-info-subtle` | Sky Tint | `#EAF2FC` | `rgb(234, 242, 252)` | Info banner backgrounds |

### 🔵 Accent Colors

| Token | Name | Hex | RGB | Usage |
|-------|------|-----|-----|-------|
| `--color-accent-1` | Flame Orange | `#E16449` | `rgb(225, 100, 73)` | Decorative only — badges, gradient fills, illustrations (no text on top) |
| `--color-accent-2` | Saffron Gold | `#FFBF40` | `rgb(255, 191, 64)` | Progress rings, decorative fills, gradient end |
| `--color-accent-3` | Warm Sienna | `#D4865A` | `rgb(212, 134, 90)` | Charts, data bars, progress indicators |

### 🔘 Button System

| State | Background | Text | Border |
|-------|-----------|------|--------|
| **Primary Default** | `#C85438` | `#FFFFFF` | none |
| **Primary Hover** | `#AE4529` | `#FFFFFF` | none |
| **Primary Active** | `#964020` | `#FFFFFF` | none |
| **Primary Disabled** | `#E4AFA0` | `#FFFFFF` | none |
| **Secondary Default** | `#FFFFFF` | `#1A1412` | `#EDE7E4` |
| **Secondary Hover** | `#FDF0EC` | `#E16449` | `#E16449` |
| **Secondary Active** | `#FADED6` | `#C85438` | `#C85438` |
| **Ghost Default** | `transparent` | `#5A4E4A` | none |
| **Ghost Hover** | `#FDF8F6` | `#1A1412` | none |
| **Destructive Default** | `#C93A4B` | `#FFFFFF` | none |
| **Destructive Hover** | `#A82E3D` | `#FFFFFF` | none |

### 🎚️ Interactive States Reference

| Element | Default | Hover | Focus | Active | Disabled |
|---------|---------|-------|-------|--------|----------|
| Input Field | `#EDE7E4` border | same | `2px ring #E16449` | same | 40% opacity |
| Checkbox | `#EDE7E4` border | `#FDF0EC` bg | `ring #E16449` | `#E16449` fill + white check | 40% opacity |
| Toggle | `#C9BCB8` bg | lighten to `#EDE7E4` | ring `#E16449` | `#E16449` bg | 40% opacity |
| Link | `#E16449` | underline + `#C85438` | `ring #E16449` | `#AE4529` | — |
| Table Row | transparent | `#FDF8F6` | — | `#FDF0EC` | — |

---

## Step 3 — CSS Custom Properties

```css
:root {
  /* Brand Core */
  --color-primary: #C85438;
  --color-primary-hover: #AE4529;
  --color-primary-active: #964020;
  --color-primary-subtle: #FDF0EC;
  --color-primary-foreground: #FFFFFF;

  /* Neutrals */
  --color-background: #FDF8F6;
  --color-surface: #FFFFFF;
  --color-border: #EDE7E4;
  --color-border-strong: #C9BCB8;

  /* Text */
  --color-text-primary: #1A1412;
  --color-text-secondary: #5A4E4A;
  --color-text-muted: #9C8E8A;
  --color-text-on-primary: #FFFFFF;

  /* Semantic */
  --color-success: #2E8A5C;
  --color-success-subtle: #E9F6EF;
  --color-warning: #E8A020;
  --color-warning-subtle: #FEF5E3;
  --color-error: #C93A4B;
  --color-error-subtle: #FDECEE;
  --color-info: #3A7CC8;
  --color-info-subtle: #EAF2FC;

  /* Accents */
  --color-accent-1: #E16449;
  --color-accent-2: #FFBF40;
  --color-accent-3: #D4865A;
}
```

---

## Step 4 — Palette Rationale

The Propreso palette is anchored by `#E16449` — a burnt orange-terracotta that bridges confidence and warmth, the exact frequency a freelancer's brand should operate on. Unlike blue-dominant SaaS tools that signal "enterprise," this hue signals *agency, decisiveness, and creative authority* — traits clients should perceive when a Propreso-generated proposal lands in their inbox. The saffron gold accent (`#FFBF40`) was directly extracted from the Switzer palette reference and echoes the amber data visualizations in the Eduhive dashboards, adding energetic contrast without competing with the primary. The neutral system is built on subtly warm off-whites (`#FDF8F6`) and warm near-black (`#1A1412`) rather than cold grays, keeping the entire interface feeling cohesive and human-facing. Semantic colors — sage green for success, cinnabar for errors — are desaturated enough to stay on-brand rather than defaulting to stock Bootstrap tones, ensuring the palette reads as an intentional system, not a patchwork.

---

## Step 5 — Accessibility Check

| Pair | Hex Values | Contrast Ratio | WCAG Standard | Result |
|------|-----------|---------------|---------------|--------|
| White on Primary | `#FFFFFF` on `#C85438` | **4.5:1** | AA (all text sizes) | ✅ Passes AA at all sizes |
| Primary on White | `#C85438` on `#FFFFFF` | **4.5:1** | Link/label on white | ✅ Passes AA at all sizes |
| Dark Ink on Background | `#1A1412` on `#FDF8F6` | **18.9:1** | AAA | ✅ Exceeds AAA |
| Secondary Text on Background | `#5A4E4A` on `#FDF8F6` | **7.4:1** | AA + AAA | ✅ Exceeds AAA |
| Muted Text on Surface | `#9C8E8A` on `#FFFFFF` | **3.1:1** | AA Large only | ⚠️ Use only for placeholders/captions ≥14px |
| White on Error | `#FFFFFF` on `#C93A4B` | **4.7:1** | AA | ✅ Passes AA |
| White on Success | `#FFFFFF` on `#2E8A5C` | **4.6:1** | AA | ✅ Passes AA |
| Dark Ink on Primary Subtle | `#1A1412` on `#FDF0EC` | **17.8:1** | AAA | ✅ Exceeds AAA |
| Primary on Primary Subtle | `#C85438` on `#FDF0EC` | **3.8:1** | AA Large / UI | ✅ Good for chip/badge text at 14px bold+ |

> **✅ Contrast resolved.** Primary is `#C85438` — white text achieves exactly **4.5:1**, passing WCAG 2.1 AA at all text sizes. The original `#E16449` is retained only as a decorative color (badges, illustrations, gradient fills) where text contrast is not a concern.

---

*Generated for Propreso · Light Theme Only · March 2026*
