import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Sparkles, Sliders, Activity, 
  ShieldAlert, Terminal, RefreshCw, BarChart2
} from 'lucide-react';
import SankeyDiagram from '../components/charts/SankeyDiagram';

// Preset Scenarios
const PRESETS = [
  {
    title: "Growth Expansion Scenario",
    desc: "A stable packaging business ready to scale but facing minor working capital gaps.",
    prompt: "We run a sustainable packaging plant. Monthly sales are ₹60L, but raw materials require ₹20L upfront. We have a bank balance of ₹15L and need ₹25L in short-term credit to accept a massive B2B contract from NeoPack. Our DSO is currently at 45 days."
  },
  {
    title: "Liquidity Crunch Scenario",
    desc: "A business with solid sales but massive credit locked up in unpaid buyer invoices.",
    prompt: "Our logistics firm does ₹40L in monthly revenue, but ₹22L is stuck in unpaid buyer invoices, driving our DSO to 85 days. We have statutory liabilities of ₹8L due next week, and our current cash reserve is down to ₹3L. We are looking to raise ₹15L immediately."
  },
  {
    title: "Debt Over-Utilization",
    desc: "Stable operations but highly leveraged with high interest costs and low runway.",
    prompt: "We are an engineering enterprise doing ₹80L sales. We have already utilized ₹45L out of our ₹50L bank overdraft line (90% debt utilization). Interest rates are rising, and our cash runway is only 22 days. We want to borrow an additional ₹10L for inventory."
  }
];

export default function OverviewPage() {
  const navigate = useNavigate();
  const [promptInput, setPromptInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processed, setProcessed] = useState(true);
  const [processingLog, setProcessingLog] = useState<string[]>([
    "✓ System online. Decision model initialized with baseline enterprise schema.",
    "✓ Canonical parameters ready: Sales ₹50L, DSO 45d, Funding ₹15L, Reserves ₹10L."
  ]);
  
  // Simulated Slider State Variables
  const [revenue, setRevenue] = useState(50); // in Lakhs
  const [dso, setDso] = useState(45); // in Days
  const [funding, setFunding] = useState(15); // in Lakhs
  const [cashReserve, setCashReserve] = useState(10); // in Lakhs
  const [debtUtil, setDebtUtil] = useState(40); // in %

  // Heuristic parser to extract numbers from natural language input
  const parsePromptHeuristics = (text: string) => {
    const textLower = text.toLowerCase();
    
    // Default values if parsing fails
    let parsedRevenue = 50;
    let parsedDso = 45;
    let parsedFunding = 15;
    let parsedCash = 10;
    let parsedDebt = 40;

    // Helper regexes for Lakhs (e.g. 20L, 20 lakhs, 20L Lakhs)
    const lakhRegex = /(\d+)\s*(?:lakh|l|lakhs)/i;
    const dsoRegex = /(\d+)\s*(?:days|day|dso)/i;

    // 1. Try to extract revenue/sales
    const salesMatch = textLower.match(/(?:sales|revenue|turnover|doing|of)\s*(?:are|is|of)?\s*₹?(\d+)\s*(?:lakh|l|lakhs)/i);
    if (salesMatch) {
      parsedRevenue = parseInt(salesMatch[1]);
    } else {
      const genericLakhs = textLower.match(lakhRegex);
      if (genericLakhs) parsedRevenue = parseInt(genericLakhs[1]);
    }

    // 2. Try to extract DSO / Stuck cash
    const dsoMatch = textLower.match(/(?:dso|stuck|outstanding|unpaid|invoice|days)\s*(?:of|is|at|to)?\s*(\d+)\s*(?:days|day|dso)?/i);
    if (dsoMatch) {
      parsedDso = parseInt(dsoMatch[1]);
    }

    // 3. Try to extract Funding required
    const fundingMatch = textLower.match(/(?:borrow|funding|credit|loan|need|raise)\s*(?:of|is|at|to)?\s*₹?(\d+)\s*(?:lakh|l|lakhs)/i);
    if (fundingMatch) {
      parsedFunding = parseInt(fundingMatch[1]);
    }

    // 4. Try to extract Cash reserves
    const cashMatch = textLower.match(/(?:cash|reserve|balance|bank|hand)\s*(?:of|is|at|to)?\s*₹?(\d+)\s*(?:lakh|l|lakhs)/i);
    if (cashMatch) {
      parsedCash = parseInt(cashMatch[1]);
    }

    // 5. Debt utilization
    const debtMatch = textLower.match(/(?:debt|utilization|utilized|leverage)\s*(?:of|is|at|to)?\s*(\d+)\s*%/i);
    if (debtMatch) {
      parsedDebt = parseInt(debtMatch[1]);
    }

    // Clamp values to reasonable ranges
    setRevenue(Math.max(5, Math.min(200, parsedRevenue)));
    setDso(Math.max(10, Math.min(120, parsedDso)));
    setFunding(Math.max(0, Math.min(100, parsedFunding)));
    setCashReserve(Math.max(1, Math.min(50, parsedCash)));
    setDebtUtil(Math.max(0, Math.min(100, parsedDebt)));
  };

  const handleProcessPrompt = async (text: string) => {
    setIsProcessing(true);
    setProcessingLog([]);
    
    const logs = [
      "AI Steward Online. Analysing prospect story...",
      "Running Natural Language heuristic extractor...",
      "Extracting key financial vectors: Revenue, DSO, Target Funding, and Liquid Assets...",
      "Normalizing parameters into Canonical Business Schema...",
      "Decision model alignment generated. Generating interactive sliders and Sankey flow..."
    ];

    for (let i = 0; i < logs.length; i++) {
      setProcessingLog(prev => [...prev, logs[i]]);
      await new Promise(resolve => setTimeout(resolve, 400));
    }

    parsePromptHeuristics(text);
    setIsProcessing(false);
    setProcessed(true);
  };

  // Re-run heuristics if the user edits prompt and submits again
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    handleProcessPrompt(promptInput);
  };

  // Dynamic calculations based on slider parameters
  const positiveForceScore = Math.round(
    (revenue * 0.4) + 
    ((100 - dso) * 0.3) + 
    (funding * 0.2)
  );

  const negativePressureScore = Math.round(
    (dso * 0.4) + 
    (debtUtil * 0.3) + 
    ((30 - Math.min(30, cashReserve)) * 1.5)
  );

  const rawScore = positiveForceScore - negativePressureScore;

  const rawPosture: 'BUILD' | 'STABILIZE' | 'DEFEND' = 
    rawScore >= 15 ? 'BUILD' : 
    rawScore >= -10 ? 'STABILIZE' : 'DEFEND';

  const activeTriggers: string[] = [];
  if (cashReserve < 10) activeTriggers.push('Low Cash Runway');
  if (debtUtil > 75) activeTriggers.push('High Debt Overdraft');
  if (dso > 60) activeTriggers.push('Elevated Receivables DSO');

  const triggerDowngraded = activeTriggers.length > 0;
  
  const calculatedPosture = triggerDowngraded 
    ? (rawPosture === 'BUILD' ? 'STABILIZE' : (rawPosture === 'STABILIZE' && cashReserve < 5 ? 'DEFEND' : rawPosture))
    : rawPosture;

  // Sankey Data formatting
  const totalRevenueVal = revenue * 100000;
  const fundingVal = funding * 100000;
  
  const leakageVal = Math.round(totalRevenueVal * (dso / 120));
  const activeRevenueInflowVal = totalRevenueVal - leakageVal;
  
  const totalInflowPoolVal = activeRevenueInflowVal + fundingVal;
  
  // Splits from pool
  const reservesVal = Math.round(cashReserve * 100000);
  const opexVal = Math.round((totalInflowPoolVal - reservesVal) * 0.6);
  const repaymentsVal = totalInflowPoolVal - reservesVal - opexVal;

  const sankeyData = {
    nodes: [
      { name: "Gross Revenue", value: totalRevenueVal },
      { name: "External Funding", value: fundingVal },
      { name: "Operational Capital Pool", value: totalInflowPoolVal },
      { name: "Liquid Cash Reserves", value: reservesVal },
      { name: "Operational WC (Opex)", value: opexVal },
      { name: "Stuck Receivables (DSO)", value: leakageVal },
      { name: "Debt Service / Interest", value: repaymentsVal }
    ],
    links: [
      { source: 0, target: 2, value: activeRevenueInflowVal },
      { source: 0, target: 5, value: leakageVal },
      { source: 1, target: 2, value: fundingVal },
      { source: 2, target: 3, value: reservesVal },
      { source: 2, target: 4, value: opexVal },
      { source: 2, target: 6, value: repaymentsVal }
    ]
  };

  // Nudge to main Decision Engine with loaded values
  const handleLockAndContinue = () => {
    const payload = {
      odpGrowth: Math.round(Math.min(100, (positiveForceScore / 100) * 100)),
      odpLiquidity: Math.round(Math.min(100, (cashReserve / 50) * 100)),
      bizCashRunway: Math.round(cashReserve * 4),
      bizDso: dso,
      bizDebtUtil: debtUtil,
      envInterestRate: 'rising'
    };
    
    // Save to localStorage so AICXOSuitePage can retrieve it on mount
    localStorage.setItem('onboarding_scenario', JSON.stringify(payload));
    
    // Navigate with react-router-dom state
    navigate('/ai-cxo/decision-engine', { state: payload });
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#111111] dark:bg-gray-950 dark:text-gray-100 p-6 pb-20">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* HEADER */}
        <div className="flex items-center space-x-3 border-b border-[#EAEAEA] dark:border-gray-850 pb-6 text-left">
          <div className="w-12 h-12 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[9px] font-bold tracking-wider uppercase font-mono text-neutral-500 block">Interactive Strategic Simulator</span>
            <h1 className="text-3xl font-bold font-serif leading-tight">AI Onboarding Storyteller</h1>
            <p className="text-xs text-neutral-500 mt-0.5">Describe your B2B enterprise in natural language to project capital flows instantly.</p>
          </div>
        </div>

        {/* INPUT STAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-neutral-200 dark:border-gray-800 shadow-sm space-y-4">
              <h3 className="font-bold text-lg font-serif">1. Describe Your Business Prospects</h3>
              <p className="text-xs text-neutral-500">
                Input monthly sales, credit cycles, cash on hand, and current debt. Our parser will instantly translate this into a customized cockpit.
              </p>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <textarea
                  rows={4}
                  value={promptInput}
                  onChange={e => setPromptInput(e.target.value)}
                  placeholder="e.g., We are a manufacturing firm doing ₹50L monthly sales, but ₹15L is stuck in overdue invoices. We have a bank balance of ₹8L and need to raise ₹12L for raw materials."
                  className="w-full bg-[#FBFBFA] dark:bg-gray-950 border border-neutral-200 dark:border-gray-800 rounded-xl p-3.5 text-sm focus:border-neutral-900 dark:focus:border-white focus:ring-0 transition-all font-mono"
                />
                
                <div className="flex flex-wrap gap-2 pt-1 justify-between items-center">
                  <span className="text-[10px] font-bold text-neutral-400 font-mono">
                    Heuristic entity extraction enabled
                  </span>
                  <button
                    type="submit"
                    disabled={isProcessing || !promptInput.trim()}
                    className="neo-button glass-action bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs py-2 px-5 rounded-lg flex items-center space-x-2 transition-all disabled:opacity-50"
                  >
                    {isProcessing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Activity className="w-3.5 h-3.5" />}
                    <span>{isProcessing ? "Processing Story..." : "Map Capital Flow"}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* PRESETS */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-neutral-500">Or Select a Preset Template</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {PRESETS.map((preset, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setPromptInput(preset.prompt);
                      handleProcessPrompt(preset.prompt);
                    }}
                    className="p-4 rounded-xl border border-neutral-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-neutral-50 dark:hover:bg-neutral-950/60 transition text-left space-y-1.5"
                  >
                    <div className="font-bold text-xs flex items-center space-x-1.5">
                      <Terminal className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{preset.title}</span>
                    </div>
                    <p className="text-[10px] text-neutral-500 leading-relaxed line-clamp-3">{preset.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* LOGS PANEL */}
          <div className="bg-[#111111] dark:bg-gray-900 rounded-2xl p-6 border border-[#222222] dark:border-gray-850 text-left font-mono space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-[#222222] pb-2">
              <span className="text-[10px] font-bold text-[#346538] flex items-center">
                <span className="relative flex h-1.5 w-1.5 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#346538] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#346538]"></span>
                </span>
                AI Steward Parser Log
              </span>
              <span className="text-[9px] text-neutral-500">v1.0.0</span>
            </div>
            
            <div className="space-y-2 text-xs h-[180px] overflow-y-auto custom-scrollbar leading-relaxed">
              {processingLog.length === 0 ? (
                <div className="text-neutral-600 italic">Waiting for prompt submission to output logs...</div>
              ) : (
                processingLog.map((log, idx) => (
                  <div key={idx} className="text-neutral-300">
                    <span className="text-neutral-500 select-none mr-1.5">&gt;</span>
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* PROCESSED STATE - SLIDERS & SANKEY */}
        <AnimatePresence>
          {processed && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left border-t border-[#EAEAEA] dark:border-gray-850 pt-8"
            >
              
              {/* SLIDERS COLUMN */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-neutral-200 dark:border-gray-800 shadow-sm space-y-5">
                  <div className="flex justify-between items-center border-b border-[#EAEAEA] dark:border-gray-850 pb-2">
                    <h3 className="font-bold text-md font-serif flex items-center space-x-2">
                      <Sliders className="w-4 h-4 text-neutral-500" />
                      <span>Simulative Slider Cockpit</span>
                    </h3>
                    <span className="text-[9px] font-mono bg-neutral-100 dark:bg-gray-800 py-0.5 px-2 rounded font-bold uppercase tracking-wider text-neutral-500">Live Simulation</span>
                  </div>

                  {/* Slider 1: Revenue */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-neutral-500">Monthly Sales (Revenue):</span>
                      <span className="font-bold font-mono">₹{revenue}L</span>
                    </div>
                    <input 
                      type="range" 
                      min="5" 
                      max="200" 
                      value={revenue} 
                      onChange={e => setRevenue(parseInt(e.target.value))}
                      className="w-full accent-neutral-900 dark:accent-white" 
                    />
                  </div>

                  {/* Slider 2: DSO */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-neutral-500">Receivables DSO (Stuck Invoices):</span>
                      <span className="font-bold font-mono text-[#9F2F2D]">{dso} Days</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="120" 
                      value={dso} 
                      onChange={e => setDso(parseInt(e.target.value))}
                      className="w-full accent-neutral-900 dark:accent-white" 
                    />
                  </div>

                  {/* Slider 3: Target Funding */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-neutral-500">Credit/Funding Required:</span>
                      <span className="font-bold font-mono text-[#1F6C9F]">₹{funding}L</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={funding} 
                      onChange={e => setFunding(parseInt(e.target.value))}
                      className="w-full accent-neutral-900 dark:accent-white" 
                    />
                  </div>

                  {/* Slider 4: Cash Reserves */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-neutral-500">Current Cash Reserve:</span>
                      <span className="font-bold font-mono text-[#346538]">₹{cashReserve}L</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="50" 
                      value={cashReserve} 
                      onChange={e => setCashReserve(parseInt(e.target.value))}
                      className="w-full accent-neutral-900 dark:accent-white" 
                    />
                  </div>

                  {/* Slider 5: Debt Overdraft */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-neutral-500">Debt Utilization:</span>
                      <span className="font-bold font-mono text-[#9F2F2D]">{debtUtil}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={debtUtil} 
                      onChange={e => setDebtUtil(parseInt(e.target.value))}
                      className="w-full accent-neutral-900 dark:accent-white" 
                    />
                  </div>
                </div>
              </div>

              {/* SANKEY COLUMN */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-neutral-200 dark:border-gray-800 shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-[#EAEAEA] dark:border-gray-850 pb-2">
                    <h3 className="font-bold text-md font-serif flex items-center space-x-2">
                      <BarChart2 className="w-4 h-4 text-neutral-500" />
                      <span>Interactive Sankey Capital Flow</span>
                    </h3>
                    <span className="text-xs text-neutral-500 font-mono">₹ in Lakhs</span>
                  </div>

                  {/* Render dynamic Sankey diagram */}
                  <div className="overflow-x-auto overflow-y-hidden border border-[#F1F1EF] dark:border-gray-800 rounded-xl p-4 bg-[#FBFBFA] dark:bg-gray-950 flex items-center justify-center">
                    <SankeyDiagram
                      data={sankeyData}
                      width={680}
                      height={320}
                    />
                  </div>

                  {/* Strategic evaluation feedback panel */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {/* CGT-DBE posture output */}
                    <div className="p-4 rounded-xl border border-neutral-200 dark:border-gray-800 bg-[#FBFBFA] dark:bg-gray-950 space-y-2">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">Policy Decision Assessment</span>
                      <div className="flex justify-between items-center">
                        <span className="font-serif font-bold text-lg">{calculatedPosture} POSTURE</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          calculatedPosture === 'BUILD' ? 'bg-[#EDF3EC] text-[#346538]' :
                          calculatedPosture === 'STABILIZE' ? 'bg-[#E1F3FE] text-[#1F6C9F]' :
                          'bg-[#FDEBEC] text-[#9F2F2D]'
                        }`}>
                          Score: {rawScore >= 0 ? '+' : ''}{rawScore}
                        </span>
                      </div>
                      <p className="text-[10px] text-neutral-500 leading-relaxed">
                        Evaluated against historical debt levels, buyer risk profiles, and observed cash-on-hand runway constraints.
                      </p>
                    </div>

                    {/* Safety alert metrics */}
                    <div className="p-4 rounded-xl border border-neutral-200 dark:border-gray-800 bg-[#FBFBFA] dark:bg-gray-950 space-y-2">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">Activated Safety Triggers</span>
                      <div className="space-y-1">
                        {activeTriggers.length === 0 ? (
                          <div className="text-[11px] font-bold text-[#346538] flex items-center space-x-1">
                            <span>✓ All safety checks cleared</span>
                          </div>
                        ) : (
                          activeTriggers.map((trig, idx) => (
                            <div key={idx} className="text-[10px] font-bold text-[#9F2F2D] flex items-center space-x-1.5">
                              <ShieldAlert className="w-3.5 h-3.5" />
                              <span>{trig}</span>
                            </div>
                          ))
                        )}
                      </div>
                      <p className="text-[10px] text-neutral-500 leading-relaxed">
                        Hard constraints defined under the CGT-DBE Strategic policy engine automatically cap capital deployment postures.
                      </p>
                    </div>
                  </div>

                  {/* NUDGE TO CONTINUE TO MAIN ENGINE */}
                  <div className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 text-left shadow-lg mt-4">
                    <div>
                      <h4 className="font-bold text-sm font-serif">Simulations Visualized. Transition to Finpercent Decision Engine?</h4>
                      <p className="text-[10px] text-neutral-400 dark:text-neutral-500 leading-relaxed mt-0.5">
                        Locks this custom scenario and pre-populates all inputs inside the main operations dashboard and risk analysis views.
                      </p>
                    </div>
                    <button
                      onClick={handleLockAndContinue}
                      className="px-5 py-2.5 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-xl text-xs font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all flex items-center space-x-2 active:scale-98"
                    >
                      <span>Lock Scenario & Run Engine</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
