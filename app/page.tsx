"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { 
  ReactFlow, 
  Background, 
  Node, 
  Edge, 
  Position,
  MarkerType
} from "@xyflow/react";
import "@xyflow/react/dist/style.css"; 

import { Play, Pause, RotateCcw, Download, ShieldAlert, BarChart3, Terminal, Radio, LineChart, TrendingDown } from "lucide-react";

interface CascadeNode {
  id: string;
  user: string;
  platform: string;
  type: "origin" | "influencer" | "routing";
  content: string;
  reach: number;
  timestamp: number;
  parentId: string | null;
  synthetic_label?: string;
}

interface LogMessage {
  id: string;
  timestamp: string;
  text: string;
  type: "info" | "warning" | "critical" | "success";
}

export default function SocialViralityCascadeExplorer() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const maxTime = 60;
  const [selectedPlatform, setSelectedPlatform] = useState<string>("All");
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);
  const [selectedScenario, setSelectedScenario] = useState<string>("A");
  
  // 🔌 LIVE BACKEND STATE
  const [backendNodes, setBackendNodes] = useState<CascadeNode[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 🔄 FIXES AUTO-JUMP JITTER: Blocks parent body jumping by using block: "nearest"
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [logs]);

  // 🔄 LIVE BACKEND API FETCH ENGINE
  useEffect(() => {
    async function fetchCascadeData() {
      try {
        const response = await fetch(`http://localhost:8000/api/cascade?time=${currentTime}&scenario=${selectedScenario}`);
        if (response.ok) {
          const data = await response.json();
          setBackendNodes(data);
        }
      } catch (error) {
        console.error("FastAPI connection offline. Make sure backend is running on port 8000!");
      }
    }
    fetchCascadeData();
  }, [currentTime, selectedScenario]);

  // Dynamic Scoreboard contextual parameters mapping
  const scoreboardMetadata = useMemo(() => {
    if (selectedScenario === "B") {
      return { totalViews: "1,004,200", highestShares: "31,000 shares/min", mainApp: "TikTok (67.7%)" };
    }
    return { totalViews: "407,600", highestShares: "14,200 shares/min", mainApp: "TikTok (61.3%)" };
  }, [selectedScenario]);

  // Assemble logging entries dynamically based on data returned by FastAPI
  useEffect(() => {
    const freshLogs: LogMessage[] = [];
    backendNodes.forEach((node) => {
      const timeStr = `[T+${String(node.timestamp).padStart(2, "0")}m]`;
      if (node.type === "origin") {
        freshLogs.push({ id: `o-${node.id}`, timestamp: timeStr, text: `ALERT: Origin leak on ${node.platform} by ${node.user}.`, type: "critical" });
      } else if (node.type === "influencer") {
        freshLogs.push({ id: `i-${node.id}`, timestamp: timeStr, text: `WARNING: High-density Hub reached on ${node.platform} via ${node.user}.`, type: "warning" });
      } else {
        freshLogs.push({ id: `r-${node.id}`, timestamp: timeStr, text: `ROUTING: Secondary replication verified on ${node.platform} by ${node.user}.`, type: "info" });
      }
    });
    setLogs(freshLogs.sort((a, b) => a.timestamp.localeCompare(b.timestamp)));
  }, [backendNodes]);

  // Playback timeline engine ticker
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => (prev >= maxTime ? (setIsPlaying(false), maxTime) : prev + 5));
      }, 600);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const visibleRawNodes = useMemo(() => {
    return backendNodes.filter((node) => selectedPlatform === "All" || node.platform === selectedPlatform);
  }, [backendNodes, selectedPlatform]);

  // 🎛️ CUSTOM GRAPH NODE BUILDER WITH REQUIREMENT TOOLTIPS
  const flowNodes = useMemo<Node[]>(() => {
    return visibleRawNodes.map((node, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      
      let borderColor = "border-slate-800";
      let bgColor = "bg-slate-950/90";
      let platformBadgeColor = "bg-slate-900 text-slate-400 border-slate-800";

      if (node.platform === "X") { borderColor = "border-slate-600"; bgColor = "bg-black/90"; platformBadgeColor = "bg-white text-black border-white/20"; }
      else if (node.platform === "TikTok") { borderColor = "border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.1)]"; bgColor = "bg-zinc-950"; platformBadgeColor = "bg-pink-950/40 text-pink-400 border-pink-500/30"; }
      else if (node.platform === "LinkedIn") { borderColor = "border-sky-600 shadow-[0_0_15px_rgba(2,132,199,0.1)]"; bgColor = "bg-slate-950"; platformBadgeColor = "bg-sky-950/40 text-sky-400 border-sky-500/30"; }
      else if (node.platform === "Reddit") { borderColor = "border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.1)]"; bgColor = "bg-stone-900"; platformBadgeColor = "bg-orange-950/40 text-orange-400 border-orange-500/30"; }

      return {
        id: node.id,
        data: { 
          label: (
            <div className="flex flex-col items-center justify-center p-2 text-center relative group">
              {/* 🛠️ HOVER NODE TOOLTIP */}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col w-56 p-2 bg-slate-950/95 border border-slate-800 rounded shadow-2xl z-50 text-left text-[10px] font-mono text-slate-300 pointer-events-none">
                <div className="text-white font-bold border-b border-slate-800 pb-1 mb-1">{node.user}</div>
                <p className="italic text-slate-400">"{node.content}"</p>
                <div className="pt-1 mt-1 border-t border-slate-800 flex justify-between text-[9px] text-amber-500 font-bold">
                  <span>Reach: {node.reach.toLocaleString()}</span>
                  <span>🏷️ {node.synthetic_label || "SYNTHETIC_GDELT"}</span>
                </div>
              </div>

              <div className="text-[10px] font-mono font-bold truncate max-w-[115px]">{node.user}</div>
              <div className={`text-[8px] font-mono font-bold mt-1 uppercase px-1.5 py-0.5 rounded border ${platformBadgeColor}`}>{node.platform}</div>
              <div className="mt-1 text-[7px] text-slate-500 font-mono">[SYNTHETIC DATA]</div>
              <div className="mt-1 text-[8px] px-1.5 py-0.2 bg-black/40 rounded border border-slate-800/60 text-slate-400 font-mono">+{node.timestamp}m</div>
            </div>
          )
        },
        position: { x: 40 + col * 210 + (row * 15), y: 30 + row * 135 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        style: { background: "transparent", color: "inherit", width: 155, padding: 0 },
        className: `border rounded-md cursor-grab active:cursor-grabbing ${borderColor} ${bgColor}`
      };
    });
  }, [visibleRawNodes]);

  const flowEdges = useMemo<Edge[]>(() => {
    const edges: Edge[] = [];
    visibleRawNodes.forEach((node) => {
      if (node.parentId && visibleRawNodes.some(n => n.id === node.parentId)) {
        let edgeColor = "#64748b";
        if (node.platform === "TikTok") edgeColor = "#ec4899";
        if (node.platform === "Reddit") edgeColor = "#f97316";
        edges.push({
          id: `e-${node.parentId}-${node.id}`, source: node.parentId, target: node.id, animated: true,
          style: { stroke: edgeColor, strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: edgeColor }
        });
      }
    });
    return edges;
  }, [visibleRawNodes]);

  const currentMetrics = useMemo(() => {
    const totalReach = visibleRawNodes.reduce((acc, curr) => acc + curr.reach, 0);
    return { activeNodes: visibleRawNodes.length, accumulatedReach: totalReach, velocity: visibleRawNodes.length > 1 ? `${Math.round(totalReach / (currentTime || 1))} views/min` : "0 views/min" };
  }, [visibleRawNodes, currentTime]);

  const downloadSampleData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backendNodes, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "social_virality_cascade_sample.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div suppressHydrationWarning className="h-screen w-screen bg-[#030712] text-slate-100 font-sans overflow-hidden flex flex-col">
      {/* Top Header Row */}
      <header className="border-b border-slate-800/60 bg-[#090d16] px-6 py-3.5 flex items-center justify-between z-50 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
          <h1 className="text-md font-semibold text-slate-200">
            Real Rails Intelligence Library <span className="text-slate-500 font-normal">|</span> <span className="text-white font-medium">Social Virality Cascade Explorer</span>
          </h1>
        </div>
        <span className="text-xs font-mono uppercase bg-slate-800/60 text-slate-300 border border-slate-700/50 px-2.5 py-1 rounded flex items-center gap-1.5"><Radio size={11} className="text-white animate-pulse" /> Rail: Distribution & Demand</span>
      </header>

      {/* Frame Container */}
      <main className="flex flex-1 flex-row overflow-hidden w-full" suppressHydrationWarning>
        
        {/* ============================================================================ */}
        {/* LEFT SECTION: MAIN LIVE VIEW (SCROLLS DOWN FOR DATA METRICS ONLY)            */}
        {/* ============================================================================ */}
        <section className="w-[69%] p-5 flex flex-col border-r border-slate-800/40 h-full overflow-y-auto space-y-4 scrollbar-thin">
          
          {/* Header Selector Ribbon */}
          <div className="flex items-center justify-between border-b border-slate-800/40 pb-2 shrink-0" suppressHydrationWarning>
            <div>
              <h2 className="text-sm font-medium text-slate-300">Cascade Replay Stage</h2>
              <p className="text-[11px] text-slate-400 mt-0.5">Scroll or pinch layout to zoom, click and drag background to pan network topology.</p>
            </div>
            <div className="flex items-center space-x-2">
              {/* 🛠️ APPLIED HYDRATION DEFENSE TO DROPDOWNS */}
              <select suppressHydrationWarning value={selectedScenario} onChange={(e) => { setSelectedScenario(e.target.value); setCurrentTime(0); }} className="bg-slate-900 border border-slate-800 text-xs text-white rounded px-3 py-1.5 focus:outline-none focus:border-white">
                <option value="A">Incident A: Corporate Security Leak</option>
                <option value="B">Incident B: Hardware Smart Ring Rumor</option>
              </select>
              <select suppressHydrationWarning value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)} className="bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded px-3 py-1.5 focus:outline-none focus:border-white">
                <option value="All">All Platforms</option>
                <option value="X">X (Twitter)</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="TikTok">TikTok</option>
                <option value="Reddit">Reddit</option>
              </select>
            </div>
          </div>

          {/* 🖥️ PRIMARY GRAPH CANVAS */}
          <div className="relative h-[380px] bg-[#050911] rounded-lg border border-slate-800/80 overflow-hidden w-full shrink-0 shadow-inner">
            <ReactFlow nodes={flowNodes} edges={flowEdges} fitView><Background color="#1e293b" gap={20} size={1} /></ReactFlow>
          </div>

          {/* Timeline Tracking Slider Deck */}
          <div className="bg-[#090d16] border border-slate-800/80 rounded-lg p-3 space-y-2 shrink-0 w-full flex flex-col shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button onClick={() => setIsPlaying(!isPlaying)} className="p-1.5 rounded flex items-center justify-center bg-white text-black">{isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}</button>
                <button onClick={() => { setIsPlaying(false); setCurrentTime(0); }} className="p-1.5 bg-slate-800 rounded text-slate-300"><RotateCcw size={14} /></button>
                <span className="text-xs font-mono text-slate-400">Timeline Offset: <strong className="text-white">T + {currentTime} minutes</strong></span>
              </div>
              <div className="flex items-center space-x-3 text-[10px] font-mono text-slate-400 bg-slate-900/60 border border-slate-800/40 px-2.5 py-1 rounded">
                <div>Nodes: <span className="text-slate-200 font-bold">{currentMetrics.activeNodes}</span></div>
                <div>Accumulated Reach: <span className="text-white font-bold">{currentMetrics.accumulatedReach.toLocaleString()}</span></div>
                <div>Velocity: <span className="text-slate-300 font-bold">{currentMetrics.velocity}</span></div>
              </div>
            </div>
            <input type="range" min="0" max={maxTime} step="5" value={currentTime} onChange={(e) => setCurrentTime(parseInt(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-white focus:outline-none" />
          </div>

          {/* 📟 LIVE TERMINAL CONSOLE LOG - Stays steady on your screen now! */}
          <div className="bg-black border border-slate-800/90 rounded-lg p-3 font-mono text-xs flex flex-col shrink-0 h-[115px] w-full shadow-2xl overflow-hidden group">
            <div className="flex items-center justify-between border-b border-slate-900/80 pb-1.5 mb-1.5 text-slate-400 uppercase tracking-wider text-[9px] font-bold">
              <div className="flex items-center space-x-2">
                <Terminal size={11} className="text-white" />
                <span>Real-Time Intelligence Network Ticker Log</span>
              </div>
              <span className="text-[8px] bg-slate-900 border border-slate-800 px-1 rounded normal-case text-slate-500 group-hover:text-emerald-400 transition-colors">↓ Scroll for Engineering Charts</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-1 text-[11px] scrollbar-none">
              {logs.length === 0 ? <div className="text-slate-600 italic">Awaiting timeline stream execution updates...</div> : logs.map((log) => (<div key={log.id} className="flex space-x-2"><span className="text-slate-500 shrink-0">{log.timestamp}</span><span className="text-slate-300">{log.text}</span></div>))}
              <div ref={logEndRef} />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 📊 LOWER METRIC PLOT DRAWER (Tucked downstream)                           */}
          {/* ========================================================================= */}
          <div className="w-full flex flex-col space-y-4 pt-4 border-t border-slate-900 shrink-0">
            {/* 📈 PLOT PANEL 1: SPREAD TIMELINE CHART */}
            <div className="space-y-1.5 w-full">
              <h4 className="text-[11px] font-semibold text-slate-300 uppercase font-mono flex items-center gap-1.5"><LineChart size={12} /> Node Propagation Spread Timeline</h4>
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-4 pl-10 h-56 flex flex-col justify-between shadow-inner relative">
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[8px] font-mono font-bold tracking-widest text-slate-500 whitespace-nowrap pointer-events-none">CHANNELS</div>
                <div className="flex-1 flex items-end justify-between space-x-4 pt-1 border-b border-slate-800/60 pb-1 relative">
                  {[
                    { t: "T+0m", h: "h-[15%]", n: "1" }, { t: "T+10m", h: "h-[30%]", n: "2" },
                    { t: "T+20m", h: "h-[45%]", n: "3" }, { t: "T+30m", h: "h-[65%]", n: "5" },
                    { t: "T+45m", h: "h-[85%]", n: "6" }, { t: "T+60m", h: "h-[100%]", n: "7" }
                  ].map((col, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                      <span className="text-[9px] text-[#64748b] font-mono font-bold scale-[0.85] mb-1">{col.n}</span>
                      <div className={`w-full ${col.h} bg-[#647d8b]/80 border border-slate-600/30 rounded-t-sm transition-all group-hover:bg-[#647d8b]`} />
                      <span className="text-[9px] text-slate-500 font-mono mt-2 scale-[0.8]">{col.t}</span>
                    </div>
                  ))}
                </div>
                <div className="text-center text-[7.5px] uppercase font-mono font-bold tracking-wider text-slate-600 mt-1 pointer-events-none">Timeline Discovery Benchmarks [Minutes Passed]</div>
              </div>
            </div>

            {/* 📉 PLOT PANEL 2: DECAY CURVE VISUALIZATION */}
            <div className="space-y-1.5 w-full">
              <h4 className="text-[11px] font-semibold text-slate-300 uppercase font-mono flex items-center gap-1.5"><TrendingDown size={12} /> Ingestion Decay Half-Life Curves</h4>
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-4 pl-10 h-56 flex flex-col justify-between relative overflow-hidden shadow-inner">
                <div className="absolute left-1.5 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[8px] font-mono font-bold tracking-widest text-slate-500 whitespace-nowrap pointer-events-none">VELOCITY %</div>
                <div className="flex-1 flex items-end justify-between pt-1 border-b border-slate-800/60 pb-1 relative z-10">
                  <svg className="absolute inset-0 w-full h-full p-2" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M 0 10 Q 30 75 100 95" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="3,1" />
                    <path d="M 0 25 Q 40 85 100 98" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
                  </svg>
                  <div className="absolute left-3 top-3 text-[9px] text-pink-400/80 font-mono font-medium">Scenario A (High Decay Rate)</div>
                  <div className="absolute right-3 top-3 text-[9px] text-cyan-400/80 font-mono font-medium">Scenario B (Low Decay Rate)</div>
                </div>
                <div className="flex justify-between text-[9px] text-slate-500 font-mono px-1 mt-2 relative z-20"><span>T+0m</span><span>T+20m</span><span>T+40m</span><span>T+60m</span></div>
                <div className="text-center text-[7.5px] uppercase font-mono font-bold tracking-wider text-slate-600 mt-1 pointer-events-none">Information Decay Half-Life Vector [Time Horizon]</div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* RIGHT SECTION: SIDEBAR BRIEF                                              */}
        {/* ========================================================================= */}
        <section className="w-[31%] bg-[#060a12] p-5 flex flex-col space-y-5 h-full overflow-y-auto border-l border-slate-800/10 justify-between shrink-0">
          <div className="space-y-5">
            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Dashboard Breakdown</h3>
              <h2 className="text-sm font-bold text-slate-200 mt-1">Incident Tactical Intelligence Brief</h2>
            </div>

            <hr className="border-slate-800/60" />

            {/* KPI Panels Summary block */}
            <div className="grid grid-cols-1 gap-2">
              <div className="bg-slate-900/50 border border-slate-800/80 rounded p-2.5 font-mono">
                <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Total Aggregate Views</div>
                <div className="text-lg font-bold text-white mt-0.5 tracking-tight">{scoreboardMetadata.totalViews}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-900/50 border border-slate-800/80 rounded p-2.5 font-mono">
                  <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Peak Velocity</div>
                  <div className="text-xs font-bold text-slate-200 mt-1 truncate">{scoreboardMetadata.highestShares}</div>
                </div>
                <div className="bg-slate-900/50 border border-slate-800/80 rounded p-2.5 font-mono">
                  <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Primary Rail Share</div>
                  <div className="text-xs font-bold text-slate-200 mt-1 truncate">{scoreboardMetadata.mainApp.split(" ")[0]}</div>
                </div>
              </div>
              <div className="bg-slate-900/30 border border-slate-800/40 rounded px-2.5 py-1 text-[10px] font-mono text-slate-500 flex justify-between">
                <span>Attention Density:</span>
                <span className="text-slate-400 font-medium">(61.3% attention share)</span>
              </div>
            </div>

            {/* 1. Why This Matters briefing block */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-semibold text-slate-300 uppercase font-mono flex items-center gap-1.5">
                <BarChart3 size={12} className="text-slate-200" /> 1. Why This Matters
              </h4>
              <div className="bg-slate-900/40 border border-slate-800/60 rounded p-3 text-xs text-slate-400 leading-relaxed space-y-2">
                <p>
                  Algorithmic amplification from a single tier-1 platform account determines whether content reaches mass distribution or decays within the originating network.
                </p>
                <p className="text-slate-200 font-medium text-[11px]">
                  Absent high-density node acceleration, localized information anomalies consistently fail to breach cross-platform velocity thresholds.
                </p>
              </div>
            </div>

            {/* 2. Who Controls the Rail briefing block */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-semibold text-slate-300 uppercase font-mono flex items-center gap-1.5">
                <ShieldAlert size={12} className="text-slate-200" /> 2. Who Controls the Rail
              </h4>
              <div className="bg-slate-900/40 border border-slate-800/60 rounded p-3 text-xs text-slate-400 leading-relaxed">
                <p>
                  Propagation velocity depends strictly on proprietary algorithmic ingestion models. These platform routing engines prioritize engagement based on thematic volatility and interactive friction coefficients to maximize terminal user attention share.
                </p>
              </div>
            </div>
          </div>

          {/* Export button deck footer */}
          <div className="pt-2 shrink-0">
            <button onClick={downloadSampleData} className="w-full py-2 bg-slate-900 border border-slate-800 hover:border-white/40 hover:bg-slate-800 rounded text-xs font-mono font-medium text-slate-300 flex items-center justify-center space-x-2 transition-all active:scale-[0.99]">
              <Download size={12} className="text-white" />
              <span>Save Data File to Computer</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}