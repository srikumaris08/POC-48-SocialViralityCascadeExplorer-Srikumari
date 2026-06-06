#  Gate 2 — Functional User Acceptance Testing (UAT) Checklist

**Project Name:** Social Virality Cascade Explorer  
**Status:** All Tests Passed  

This checklist confirms that all features in the dashboard work correctly and smoothly.

---

##  Features Checked and Verified

| Test ID | Feature | What the User Does | What the App Successfully Does | Status |
| :--- | :--- | :--- | :--- | :--- |
| **UAT-FIL-01** | **Dropdown Filter** | Changes the platform filter from `All Platforms` to `TikTok`. | Instantly hides other platforms and shows only the TikTok boxes on the screen. | **[x] PASS** |
| **UAT-TLP-02** | **Hover Info Box** | Hovers the mouse pointer over any user account box. | Immediately opens a floating pop-up showing the post content and reach views. | **[x] PASS** |
| **UAT-LOD-03** | **Page Loading** | Refreshes the webpage in the browser. | The page loads smoothly and all tracking layouts display cleanly without errors. | **[x] PASS** |
| **UAT-INT-04** | **Map Moving** | Clicks and drags the map background grid. | Moves and pans around the 2D canvas smoothly so you can look at different sections. | **[x] PASS** |
| **UAT-NAV-05** | **Timeline Slider** | Clicks the **Play** button or drags the time slider. | Moving parts update instantly in 5-minute steps to display the exact state of the timeline. | **[x] PASS** |
| **UAT-RES-06** | **Screen Fitting** | Toggles the web browser window size. | Maintains the layout size perfectly (69% map view and 31% sidebar) with no weird stretching. | **[x] PASS** |
| **UAT-EDG-07** | **Timeline Limits** | Drags the slider all the way to `T+0` or `T+60`. | Reaches both limits smoothly without freezing up or crashing. | **[x] PASS** |
| **UAT-DAT-08** | **Numbers Check** | Lets the timeline reach the final `T+60m` minute mark. | Score board correctly stops at **407,600 total views** and **14,200 shares/min**. | **[x] PASS** |
| **UAT-TRM-09** | **Terminal Colors** | Watches incoming console logs appear. | Displays critical security alerts in **amber-orange text** instead of red so users don't think it's an error. | **[x] PASS** |

---

##  Final Sign-Off
* **Total Tests Run:** 9
* **Total Passed:** 9
* **Remaining Bugs:** 0
