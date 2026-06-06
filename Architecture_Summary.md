# Technical Architecture Summary

## 1. System Design Overview
The Social Virality Cascade Explorer is built upon a **fully decoupled, client-server architecture** designed to isolate analytical data manipulation from user interface rendering operations. 

* **Frontend UI Subsystem:** Structured using **Next.js 14+ (App Router Architecture)** and strict **TypeScript**, managing layout constraints, infinite vector topologies, and micro-interactions.
* **Backend Data Subsystem:** Powered by a high-performance **FastAPI (Python)** server coupled with a **Pandas** data-frame processing layer to manage matrix filtration, timestamp slices, and multi-scenario state management.

---

## 2. Decoupled Data Flow & Component Details

### A. Client-Server Communication Loop
1. **State Trigger:** The user changes the interactive timeline slider or toggles the *Multi-Incident Scenario Dropdown* in the header bar.
2. **Asynchronous Fetch Hook:** A React `useEffect` listener captures the state change and fires an asynchronous network request to the FastAPI backend:
   `GET http://127.0.0.1:8000/api/cascade?time={currentTime}&scenario={selectedScenario}`
3. **Pandas Vector Filtration:** The Python backend instantiates the selected mock dataset matrix as a Pandas DataFrame. It computes a quick conditional slice (`df[df["timestamp"] <= current_time]`) and converts the record matrix into a structured JSON payload response.
4. **Reactive State Update:** The Next.js client consumes the clean JSON data payload and updates its internal state arrays, refreshing the visual nodes, streaming ticker logs, and scoreboard readouts instantly.

### B. Core Component Specifications

* **Reactive State Manager:** Orchestrated via native React hooks (`useState` and `useMemo`). The system computes dynamic metrics and handles scenario changes on the fly. It synchronizes the right-hand *Internet Scoreboard* text metadata blocks directly with the selected scenario state without visual blinking.
* **Infinite Vector Grid Stage:** Powered by the **React Flow engine (`@xyflow/react`)**. This layer operates on an absolute coordinate bounding system, allowing users to zoom and pan smoothly using trackpad pinch or mouse wheel scroll gestures over a hardware-accelerated 2D canvas.
* **Chromatically Synced Connections:** Custom vector edge paths link the platform nodes together using animated, flowing pulse behaviors. The stroke color shifts dynamically to match the originating social media platform's visual identity (X, TikTok, LinkedIn, Reddit).
* **Scrollless Viewport Layout Constraints:** Styled using strict Tailwind CSS utility flags to lock the entire application layout into a fixed, single-screen boundary (`w-screen h-screen overflow-hidden`). The interface splits perfectly into a **70% wide main map viewport & log console** and a **30% wide details sidebar**. This creates an absolute, zero-scroll single-page application context that ensures the live activity ticker log is always visible.
