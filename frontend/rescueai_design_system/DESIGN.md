---
name: RescueAI Design System
colors:
  surface: '#f8f9ff'
  surface-dim: '#d0dbed'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dee9fc'
  surface-container-highest: '#d9e3f6'
  on-surface: '#121c2a'
  on-surface-variant: '#434655'
  inverse-surface: '#27313f'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#bb0112'
  on-secondary: '#ffffff'
  secondary-container: '#e02928'
  on-secondary-container: '#fffbff'
  tertiary: '#006243'
  on-tertiary: '#ffffff'
  tertiary-container: '#007d57'
  on-tertiary-container: '#bdffdc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#ffdad6'
  secondary-fixed-dim: '#ffb4ab'
  on-secondary-fixed: '#410002'
  on-secondary-fixed-variant: '#93000b'
  tertiary-fixed: '#85f8c4'
  tertiary-fixed-dim: '#68dba9'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#f8f9ff'
  on-background: '#121c2a'
  surface-variant: '#d9e3f6'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  action-xl:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 24px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-margin-mobile: 16px
  container-margin-desktop: 40px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
The design system is engineered for high-stakes environments where cognitive load must be minimized to ensure rapid, life-saving decision-making. The brand personality is **authoritative and calm**, functioning as a steady hand during emergencies. 

The visual style follows a **Modified Corporate / Functional** approach, stripping away unnecessary decorative elements to focus on utility and speed. It utilizes a refined version of **Minimalism** combined with **Tonal Layering** to create a clear information hierarchy. Every design choice is filtered through the lens of "Time to Action"—ensuring that the user's path from opening the interface to receiving a hospital route is friction-less and unambiguous.

## Colors
The palette is built on high-contrast functional roles to communicate status instantaneously:

- **Primary (Trust Blue):** Used for primary navigation, confirmed routing, and "Next Step" actions. It signals reliability and professional medical guidance.
- **Secondary (Emergency Red):** Reserved strictly for critical alerts, life-threatening triage statuses, and the "Call Emergency Services" trigger.
- **Tertiary (Safety Green):** Used for "Non-Emergency" status or successful completion of a triage flow.
- **Neutral Scale:** Deep grays are used for text to ensure maximum legibility against the "Medical White" surfaces.

Backgrounds remain off-white to reduce screen glare, while pure white is used for card surfaces to create subtle, clean separation.

## Typography
This design system uses **Inter** exclusively due to its exceptional legibility in both small labels and large display formats. 

- **Weight as Signal:** Use Bold (700) for triage status and critical instructions. Use Semi-Bold (600) for primary buttons and interactive labels.
- **Size for Urgency:** Headlines are slightly tighter in letter-spacing to appear more authoritative. 
- **Touch Targets:** Any text intended for interaction must maintain a minimum line height that facilitates a 48px touch target height.
- **Hierarchy:** Ensure a clear contrast between "Status" (Headline) and "Instruction" (Body) text to help users scan the interface in seconds.

## Layout & Spacing
The layout uses a **fluid grid system** that prioritizes a single-column "Action Stack" on mobile devices to prevent decision paralysis.

- **Mobile (Default):** 4-column grid with 16px margins. Content is primarily vertical.
- **Desktop:** 12-column grid with 40px margins, allowing for a side-by-side view of the Map and Triage results.
- **Rhythm:** An 8px base unit governs all spacing. Generous vertical padding (stack-lg) is used between unrelated sections to prevent the UI from feeling "cramped" or overwhelming during a crisis.
- **Touch Zones:** All buttons and interactive inputs must have a minimum height of 56px to accommodate users with limited fine motor control due to stress or injury.

## Elevation & Depth
Depth is used functionally to signify the "active" layer of the triage process.

- **Tonal Layers:** The base background is `$background_color_hex`. Interactive cards sit on pure white surfaces with a very subtle, light-gray border (1px).
- **Functional Shadows:** Use soft, ambient shadows (10% opacity, 12px blur) only for primary action cards or floating emergency buttons. This makes them appear physically "closer" to the user, prompting immediate attention.
- **Flat Overlays:** Modals for critical "Confirm Call" actions should use a high-opacity backdrop (70% neutral-900) to completely isolate the user's focus from background noise.

## Shapes
The design system utilizes **Soft** roundedness (0.25rem - 0.75rem) to strike a balance between clinical precision and approachable safety.

- **Buttons & Inputs:** Use the standard 0.5rem (rounded-lg) for a professional, modern look.
- **Triage Cards:** Use 0.75rem (rounded-xl) to enclose complex information within a friendly, contained container.
- **Emergency Triggers:** These may use 100px (pill-shaped) to distinguish them from standard informational cards, appearing more "tactile" and easy to hit.

## Components

- **Emergency Banner:** A full-width, fixed-position component at the top or bottom of the viewport. Uses 'Emergency Red' with white bold text. Must include a large "Call" icon.
- **Triage Status Cards:**
    - *Critical:* Red border/accent, high-weight typography.
    - *Urgent:* Amber accent.
    - *Moderate:* Blue accent.
    - *Non-Emergency:* Green accent.
- **Primary Action Buttons:** High-contrast blue with white text. Minimum 56px height. Centered text.
- **Map Hospital Cards:** Horizontal scrolling or stacked cards showing distance, wait time, and a "Navigate" button. Wait time is highlighted in bold.
- **Progress Stepper:** A minimal, non-interactive visual indicator at the top of triage flows to show the user that the "Finish" is near, reducing abandonment.
- **Input Fields:** Large text inputs with clear, persistent labels (no disappearing placeholders) to maintain context at all times.