# call-center-design

  Cinematic neon pharmacy call center UI — a ready-to-run **Next.js 15** project.

  ![Preview](public/callcenter-scene-c6.png)

  ---

  ## Quick Start

  ```bash
  git clone https://github.com/sarvadigital2023-cmyk/call-center-design.git
  cd call-center-design
  npm install
  npm run dev
  ```

  Open [http://localhost:3000](http://localhost:3000) — the scene loads immediately.

  ---

  ## Project Structure

  ```
  call-center-design/
  ├── public/
  │   └── callcenter-scene-c6.png   # Background image (pharmacy call center)
  ├── src/
  │   ├── app/
  │   │   ├── globals.css            # Tailwind directives
  │   │   ├── layout.tsx             # Root layout
  │   │   └── page.tsx               # Entry page → renders the scene
  │   └── components/
  │       └── NeonCallCenterScene.tsx  # ← Main component
  ├── next.config.ts
  ├── tailwind.config.ts
  ├── postcss.config.mjs
  ├── tsconfig.json
  └── package.json
  ```

  ---

  ## Component Features

  **`src/components/NeonCallCenterScene.tsx`** is a self-contained React component:

  | Feature | Description |
  |---------|-------------|
  | Parallax camera | Background drifts slowly via sine-wave offset |
  | Light rays | 5 colored volumetric beams (red / gold / green / blue / purple) |
  | Ambient particles | Floating glowing dots |
  | Call pings | Ripple indicators for incoming calls |
  | Scanline sweep | Moving horizontal line across the full scene |
  | HUD bar | Live clock, LIVE badge, operator count, SLA |
  | Left panel | Metrics with animated bars + call queue |
  | Right panel | Data stream + event log |
  | Neon title | PHARMACY 24/7 with animated glow flicker |
  | Operator cards | Per-operator stats with animated waveforms |
  | Stats row | Count-up animation on mount |
  | Ticker | Scrolling brand text in 5 colors |

  ---

  ## Dependencies

  ```json
  {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^11.0.0",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
  ```

  ---

  ## Using the Component Elsewhere

  If you want to drop `NeonCallCenterScene.tsx` into an existing project:

  1. Copy `src/components/NeonCallCenterScene.tsx` into your project
  2. Copy `public/callcenter-scene-c6.png` into your `public/` folder
  3. Install dependencies: `npm install framer-motion`
  4. Make sure Tailwind CSS is set up
  5. Import and use:

  ```tsx
  import NeonCallCenterScene from "@/components/NeonCallCenterScene";

  export default function Page() {
    return <NeonCallCenterScene />;
  }
  ```

  ---

  ## Color Palette

  | Token  | Hex       | Role                        |
  |--------|-----------|-----------------------------|
  | BLUE   | `#00b4ff` | Accents, data stream, HUD   |
  | RED    | `#ff3a3a` | PHARMACY title, Rx badge    |
  | GREEN  | `#00ff9d` | Live indicator, SLA, metrics|
  | GOLD   | `#ffd700` | VIP, queue, SLA value       |
  | PURPLE | `#b44fff` | Events panel, AVG response  |

  ---

  ## License

  MIT
  