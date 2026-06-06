#  Gate 2 — Functional User Acceptance Testing (UAT) Checklist

**Project Name:** Social Virality Cascade Explorer  
**Architecture:** Decoupled Next.js (Frontend) + FastAPI & Pandas (Backend)  
**Status:** All Tests Passed  

This checklist confirms that all system components, asynchronous API data loops, and frontend interface layers function smoothly under unified local client-server execution.

---

## Features Checked and Verified

| Test ID | Feature Category | What the User Does | What the App Successfully Does | Status |
| :--- | :--- | :--- | :--- | :--- |
| **UAT-API-01** | **Asynchronous Fetching** | Moves the timeline slider clock or switches data contexts. | Frontend triggers async fetch request to FastAPI (`/api/cascade`) and populates state without lag. | **[x] PASS** |
| **UAT-PND-02** | **Pandas Filtration** | Changes the playback time slider index between `T+0` and `T+60`. | Python backend uses Pandas conditional filters to cleanly slice datasets down to the requested minute mark. | **[x] PASS** |
| **UAT-SCE-03** | **Scenario Selector Dropdown** | Swaps Incident Selector from `Incident A` to `Incident B`. | Instantly re-queries the API, updates the full vector topology graph, and refreshes the context log files. | **[x] PASS** |
| **UAT-SCB-04** | **Dynamic Scoreboard** | Toggles between Incident A and Incident B. | Right-hand context text box instantly shifts target view parameters (Views, Peak Velocity, App Share) dynamically. | **[x] PASS** |
| **UAT-FIL-05** | **Platform Filter** | Changes the platform filter from `All Platforms` to `TikTok`. | Instantly filters the active backend data payload down to matching nodes on the visual canvas layer. | **[x] PASS** |
| **UAT-TLP-06** | **Hover Data HUD** | Hovers the mouse cursor over any social media node card. | Immediately opens an absolute vector pop-up dashboard card showing user content, platform, and total reach metrics. | **[x] PASS** |
| **UAT-INT-07** | **Infinite Map Panning** | Clicks and drags the map background grid / scrolls trackpad. | Moves, pans, and scales around the 2D infinite vector grid canvas smoothly using native React Flow hardware acceleration. | **[x] PASS** |
| **UAT-RES-08** | **Viewport Constraint** | Changes screen sizes or changes browser aspect ratios. | Flex utility tags lock interface to a strict, scrollless layout (69% view stage and 31% sidebar) inside `100vh` boundaries. | **[x] PASS** |
| **UAT-TRM-09** | **Terminal Log Alerting** | Hits play or scrub to advance timelines past milestone margins. | System terminal ticker prints streaming message updates, displaying critical node origins in high-contrast amber-orange text layouts. | **[x] PASS** |
| **UAT-EXP-10** | **Data Export Utility** | Clicks the **Save Data File to Computer** action button. | Instantly bundles the currently retrieved backend JSON dataset and streams a local download download anchor link file (`.json`). | **[x] PASS** |

---

##  Final Verification Sign-Off
* **Total Tests Executed:** 10
* **Total Tests Passed:** 10
* **Regression Regression Faults:** 0
* **Remaining Infrastructure Bugs:** 0

> **UAT Sign-Off Summary:** All visual rendering modules, Pandas matrix filtration operations, and cross-origin fetch queries handle state changes perfectly. The system passes Gate 2 criteria and is completely stable for local prototype deployment workflows.
