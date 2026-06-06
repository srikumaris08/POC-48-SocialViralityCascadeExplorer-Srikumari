#  Technical Architecture Summary

## 1. System Design Overview
The Social Virality Cascade Explorer is an interactive, high-fidelity frontend prototype built using **Next.js 14+ (App Router Architecture)** and strict **TypeScript**. 

The application is built to keep data filtering and UI layout rendering completely separate. This ensures that when a user moves the timeline slider, the application instantly updates the tracking map and counters without any sluggishness or page crashes.

---

## 2. Core Data Flow & Component Details

* **Reactive State Manager:** Uses native React hooks (`useState` and `useMemo`) to keep the timeline in sync. When the slider position changes, the application instantly filters the mock data array to match that exact minute before refreshing the visual elements.
* **Infinite Vector Grid:** Powered by the **React Flow engine (`@xyflow/react`)**. This provides a responsive 2D canvas that handles absolute box positioning, allowing users to zoom and pan smoothly using trackpad pinch or mouse wheel scroll gestures.
* **Animated Platform Connections:** Custom vector paths link the nodes together using flowing, animated pulse styles. The stroke color shifts dynamically to match the originating social media platform's visual identity.
* **Scrollless Viewport Layout:** Styled using Tailwind CSS utility flags to lock the entire application into a fixed, single-screen view (`h-screen`, `overflow-hidden`). The interface splits perfectly into a **69% wide main map viewport** and a **31% wide details sidebar**, ensuring everything is completely visible at a glance on all modern monitors without vertical page scrolling.

  ---

