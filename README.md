# call-center-design

  Cinematic neon pharmacy call center UI — React component with animations.

  ![Preview](public/callcenter-scene-c6.png)

  ## Component

  `src/NeonCallCenterScene.tsx` — self-contained React component featuring:

  - Slow **parallax camera drift** on the background image
  - Animated **colored light rays** (red / gold / green / blue / purple)
  - Floating **ambient particles**
  - **Incoming call pings** with ripple effect
  - **Scanline sweep** + CRT texture overlay
  - Top **HUD bar** with live clock and animated LIVE badge
  - Left panel: **metrics** with animated progress bars + **call queue**
  - Right panel: **data stream** + **event log**
  - Bottom: pulsing **PHARMACY 24/7** neon title, **operator cards** with waveforms, stats row
  - Scrolling **ticker** in brand colors

  ## Dependencies

  ```bash
  npm install framer-motion
  # + Tailwind CSS (v3 or v4)
  ```

  ## Background Image

  Place `public/callcenter-scene-c6.png` in your project's `public/` folder.

  Update the image path in the component if needed:
  ```tsx
  // Line ~80 in NeonCallCenterScene.tsx
  src="/callcenter-scene-c6.png"   // standard Vite/CRA public path
  // or
  src="/__mockup/callcenter-scene-c6.png"  // original Replit mockup sandbox path
  ```

  ## Usage

  ```tsx
  import NeonCallCenterScene from "./src/NeonCallCenterScene";

  export default function App() {
    return <NeonCallCenterScene />;
  }
  ```

  ## Stack

  - **React 18+** (hooks only, no class components)
  - **framer-motion** — all animations
  - **Tailwind CSS** — utility classes (works with v3 and v4)
  - No other dependencies

  ## Color Palette

  | Name   | Hex       | Used for              |
  |--------|-----------|-----------------------|
  | BLUE   | `#00b4ff` | Accents, data stream  |
  | RED    | `#ff3a3a` | PHARMACY title, Rx    |
  | GREEN  | `#00ff9d` | Live indicator, SLA   |
  | GOLD   | `#ffd700` | VIP, queue, SLA       |
  | PURPLE | `#b44fff` | Events panel, AVG     |
  