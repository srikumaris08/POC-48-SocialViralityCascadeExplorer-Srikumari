# 🌐 Social Virality Cascade Explorer (Frontend Prototype)

A high-fidelity, interactive frontend prototype designed to visualize and track simulated cross-platform information cascades minute-by-minute.

> **Prototype Notice:** This application is a client-side Proof of Concept (PoC) built to demonstrate user interaction quality, dashboard storytelling, and visual identity. It operates entirely on static mock data pipelines and does not require active database configurations or external API integrations.

---

##  Project Intent
This system serves as an **Interactive Forensics Dashboard** prototype for data analysts and brand safety managers. Instead of creating content, its purpose is to map out and study data *after* a viral event or data leak occurs. By tracking data propagation across platform algorithms ("The Rails"), users can isolate high-density influencer hubs and export structural data for targeted crisis response.

---

##  Core Features & Requirements

* **Interactive Timeline:** Use a slider to watch how the post spreads minute-by-minute from `T+0` to `T+60`.
* **Live Scoreboard:** Instantly counts total views, active accounts, and sharing speed as the timeline moves.
* **Custom Social App Boxes:** The graph matches real app styles (X, TikTok, LinkedIn, Reddit) so you can easily see where the data is traveling.
* **Live Activity Ticker:** A text log box prints updates as events happen, using high-contrast amber text for important alerts.
* **One-Click Download:** A button lets you instantly save the entire event history to your computer as a clean data file (`.json`).
* **Fits on One Screen:** Uses a precise split layout (69% map view and 31% info sidebar) locked into a single page height so you never have to scroll down.
---

##  Tech Stack
* **Framework:** Next.js 14+ (App Router Architecture)
* **Language:** TypeScript
* **Graph Canvas Engine:** `@xyflow/react` (React Flow)
* **Styling Engine:** Tailwind CSS (Custom Obsidian Black overrides)
* **Component Icons:** Lucide-React

---

##  Getting Started

To get the prototype running on your local machine, run these simple commands inside your project terminal:

### 1. Install Required Libraries
```bash
npm install
```
### 2.Start the application
```bash
npm run dev
```
### 3.Open the browser
   http://localhost:3000

