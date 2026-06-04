// app/data/mockCascade.ts

export interface CascadeNode {
  id: string;
  type: 'origin' | 'influencer' | 'organic';
  platform: 'X' | 'TikTok' | 'LinkedIn' | 'Reddit';
  user: string;
  timestamp: number; // Minutes from initial post
  timeLabel: string;
  content: string;
  reach: number;
  parentId: string | null;
}

export const mockCascadeData: CascadeNode[] = [
  {
    id: "node-0",
    type: "origin",
    platform: "X",
    user: "@Tech_Whistleblower",
    timestamp: 0,
    timeLabel: "12:00 PM",
    content: "BREAKING: Underlying algorithmic routing rails found diverting public data pipelines without verified consent tokens.",
    reach: 5000,
    parentId: null
  },
  {
    id: "node-1",
    type: "organic",
    platform: "X",
    user: "@Dev_Alpha",
    timestamp: 5,
    timeLabel: "12:05 PM",
    content: "Looked into the routing packets. This is verified. The distribution infrastructure is entirely compromised.",
    reach: 1200,
    parentId: "node-0"
  },
  {
    id: "node-2",
    type: "influencer",
    platform: "LinkedIn",
    user: "@Venture_Capital_Daily",
    timestamp: 15,
    timeLabel: "12:15 PM",
    content: "Massive implications hitting the tech market right now. Corporate data pipelines are operating on unverified rails. Read below:",
    reach: 85000,
    parentId: "node-0"
  },
  {
    id: "node-3",
    type: "organic",
    platform: "LinkedIn",
    user: "@SaaS_Founder_X",
    timestamp: 22,
    timeLabel: "12:22 PM",
    content: "This changes our entire operational compliance approach for Q3.",
    reach: 3400,
    parentId: "node-2"
  },
  {
    id: "node-4",
    type: "influencer",
    platform: "TikTok",
    user: "@ByteSizePolitics",
    timestamp: 30,
    timeLabel: "12:30 PM",
    content: "Why everyone is talking about the 'Data Rail' scandal explained in 60 seconds. 🧵👇",
    reach: 250000,
    parentId: "node-1"
  },
  {
    id: "node-5",
    type: "organic",
    platform: "Reddit",
    user: "u/NetSecurity_Mod",
    timestamp: 45,
    timeLabel: "12:45 PM",
    content: "Megathread: Technical breakdown of algorithmic routing rails and platform distribution control layers.",
    reach: 45000,
    parentId: "node-4"
  },
  {
    id: "node-6",
    type: "organic",
    platform: "X",
    user: "@Privacy_Watchdog",
    timestamp: 60,
    timeLabel: "01:00 PM",
    content: "Demanding regulatory audits on all centralized network distribution nodes immediately.",
    reach: 18000,
    parentId: "node-2"
  }
];

// Structural metric metadata to satisfy dashboard analytic widgets
export const infrastructureMetadata = {
  totalGlobalReach: 407600,
  peakVelocity: "14,200 shares/min",
  dominantPlatform: "TikTok (61.3% attention share)",
  decayHalfLife: "42 minutes"
};