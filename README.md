# ⚡ Bolt IDE (BIDE)

<p align="center">
  <img src="apps/web/src/static/0logov3.png" alt="Bolt IDE Logo" width="120" />
</p>

**Bolt IDE (BIDE)** is a high-performance, web-based digital signal processing (DSP) editor and compilation platform. It is powered by the [Faust](https://faust.grame.fr/) compiler backend (via WebAssembly), [Monaco Editor](https://microsoft.github.io/monaco-editor/), and real-time audio analysis modules. 

BIDE is designed to serve as a **complementary tool to the Bolt DAW**, enabling audio engineers, musicians, and developers to write custom DSP programs (synthesizers, effects, modulators) and instantly load them in their active DAW project.

---

## 📁 Monorepo Structure

BIDE is structured as a **pnpm workspaces monorepo** for optimal package management, caching, and code isolation:

```
├── apps/
│   └── web/                # The main SPA web editor client (package name: "@bide/web")
│       ├── src/            # Web interface, MIDI handling, recording, and Web Audio engines
│       └── src/static/     # HTML pages, examples, presets, and branding assets
│
├── packages/
│   └── monaco-faust/       # Standalone Monaco Editor Faust provider (package name: "@bide/monaco-faust")
│       └── src/            # Syntax highlighting, tokenizers, hovers, and documentation providers
│
├── pnpm-workspace.yaml     # Monorepo workspaces definition
└── package.json            # Global scripts and workspace coordinates
```

---

## ⚡ Complementary DAW Integration

BIDE integrates directly with the main **Bolt DAW** to enable a seamless creators' workflow:

1. **Launching BIDE**: From the Bolt DAW's file browser, navigate to the **DSP Editors** folder and select **BIDE (Faust Compiler)**. This launches BIDE in a linked window (`window.open`).
2. **Writing DSP Code**: Edit, test, and preview your custom DSP code inside BIDE's Monaco editor. Use the real-time oscilloscope, spectroscope, and parametric control knobs in the panels to tweak your sound.
3. **Exporting to DAW**: Click the **⚡ Export to DAW** button in BIDE's toolbar. BIDE compiles the DSP code and sends it via `postMessage` to the DAW, which registers it as a custom plugin in the track's routing matrix.

---

## 🛠️ Tech Stack & Dependencies

| Component | Technology |
|---|---|
| **Workspaces** | PNPN Workspaces / Monorepo |
| **Editor** | Monaco Editor / Monaco Vim Mode |
| **Compiler** | `@grame/faustwasm` (WebAssembly Faust Compiler) |
| **UI Knobs/Sliders** | `@shren/faust-ui` |
| **Audio Scopes** | HTML5 Canvas / Oscilloscope & Spectroscope |
| **Asset Copying** | Webpack 5 / Babel Loader / Copy Webpack Plugin |
| **Bundling** | Webpack Dev Server (port 8000) |

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) and `pnpm` installed on your machine.

### 1. Install Dependencies
Run the install command from BIDE's root directory:
```bash
pnpm install
```

### 2. Start Local Development Server
Launch the development server with webpack-dev-server:
```bash
pnpm dev
```
Open [http://localhost:8000](http://localhost:8000) in your browser. BIDE is now running and ready to compile your DSP code!

### 3. Build the Application
To compile development assets:
```bash
pnpm build
```

To compile production-optimized assets under `apps/web/dist/`:
```bash
pnpm dist
```

---

## 📜 License
Faust IDE is licensed under the **LGPL-2.1** license.
All Bolt suite modifications are copyright (c) 2026.
