import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Target, 
  Zap,
  RefreshCw,
  Play,
  Pause,
  RotateCcw,
  Settings,
  DollarSign,
  PieChart,
  Activity
} from 'lucide-react';
import SankeyDiagram from '../components/charts/SankeyDiagram';

interface SimulationData {
  productRevenue: number;
  serviceRevenue: number;
  productCost: number;
  serviceCost: number;
  operating: number;
  rnd: number;
  sga: number;
  tax: number;
}

interface KPI {
  name: string;
  value: number;
  previousValue: number;
  unit: string;
  icon: React.ComponentType<any>;
  color: string;
  format: (value: number) => string;
}

export default function SimulationToolPage() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationData, setSimulationData] = useState<SimulationData>({
    productRevenue: 1200000,
    serviceRevenue: 800000,
    productCost: 440000,
    serviceCost: 320000,
    operating: 450000,
    rnd: 200000,
    sga: 350000,
    tax: 40000
  });

  const [originalData, setOriginalData] = useState<SimulationData>({ ...simulationData });

  // Calculate KPIs based on simulation data
  const calculateKPIs = (data: SimulationData): KPI[] => {
    const totalRevenue = data.productRevenue + data.serviceRevenue;
    const totalCosts = data.productCost + data.serviceCost + data.operating + data.rnd + data.sga + data.tax;
    const netProfit = totalRevenue - totalCosts;
    const profitMargin = (netProfit / totalRevenue) * 100;
    const operationalEfficiency = ((totalRevenue - data.operating) / totalRevenue) * 100;
    const rndIntensity = (data.rnd / totalRevenue) * 100;

    return [
      {
        name: 'Total Revenue',
        value: totalRevenue,
        previousValue: originalData.productRevenue + originalData.serviceRevenue,
        unit: '₹',
        icon: DollarSign,
        color: 'text-green-600',
        format: (val) => `₹${(val / 100000).toFixed(1)}L`
      },
      {
        name: 'Net Profit',
        value: netProfit,
        previousValue: (originalData.productRevenue + originalData.serviceRevenue) - 
                      (originalData.productCost + originalData.serviceCost + originalData.operating + 
                       originalData.rnd + originalData.sga + originalData.tax),
        unit: '₹',
        icon: TrendingUp,
        color: netProfit > 0 ? 'text-green-600' : 'text-red-600',
        format: (val) => `₹${(val / 100000).toFixed(1)}L`
      },
      {
        name: 'Profit Margin',
        value: profitMargin,
        previousValue: ((originalData.productRevenue + originalData.serviceRevenue - 
                        (originalData.productCost + originalData.serviceCost + originalData.operating + 
                         originalData.rnd + originalData.sga + originalData.tax)) / 
                        (originalData.productRevenue + originalData.serviceRevenue)) * 100,
        unit: '%',
        icon: PieChart,
        color: profitMargin > 15 ? 'text-green-600' : profitMargin > 5 ? 'text-yellow-600' : 'text-red-600',
        format: (val) => `${val.toFixed(1)}%`
      },
      {
        name: 'Operational Efficiency',
        value: operationalEfficiency,
        previousValue: ((originalData.productRevenue + originalData.serviceRevenue - originalData.operating) / 
                       (originalData.productRevenue + originalData.serviceRevenue)) * 100,
        unit: '%',
        icon: Activity,
        color: operationalEfficiency > 80 ? 'text-green-600' : operationalEfficiency > 70 ? 'text-yellow-600' : 'text-red-600',
        format: (val) => `${val.toFixed(1)}%`
      },
      {
        name: 'R&D Intensity',
        value: rndIntensity,
        previousValue: (originalData.rnd / (originalData.productRevenue + originalData.serviceRevenue)) * 100,
        unit: '%',
        icon: Target,
        color: rndIntensity > 10 ? 'text-blue-600' : 'text-gray-600',
        format: (val) => `${val.toFixed(1)}%`
      }
    ];
  };

  const [kpis, setKPIs] = useState<KPI[]>(calculateKPIs(simulationData));

  // Update KPIs when simulation data changes
  useEffect(() => {
    setKPIs(calculateKPIs(simulationData));
  }, [simulationData]);

  const generateSankeyData = (data: SimulationData) => {
    const totalRevenue = data.productRevenue + data.serviceRevenue;
    return {
      nodes: [
        { name: "Products", value: data.productRevenue },
        { name: "Services", value: data.serviceRevenue },
        { name: "Total Revenue", value: totalRevenue },
        { name: "Product Cost", value: data.productCost },
        { name: "Service Cost", value: data.serviceCost },
        { name: "Operating", value: data.operating },
        { name: "R&D", value: data.rnd },
        { name: "SG&A", value: data.sga },
        { name: "Tax", value: data.tax },
        { name: "Net Profit", value: totalRevenue - (data.productCost + data.serviceCost + data.operating + data.rnd + data.sga + data.tax) }
      ],
      links: [
        { source: 0, target: 2, value: data.productRevenue },
        { source: 1, target: 2, value: data.serviceRevenue },
        { source: 2, target: 3, value: data.productCost },
        { source: 2, target: 4, value: data.serviceCost },
        { source: 2, target: 5, value: data.operating },
        { source: 2, target: 6, value: data.rnd },
        { source: 2, target: 7, value: data.sga },
        { source: 2, target: 8, value: data.tax },
        { source: 2, target: 9, value: totalRevenue - (data.productCost + data.serviceCost + data.operating + data.rnd + data.sga + data.tax) }
      ]
    };
  };

  const handleSliderChange = (field: keyof SimulationData, value: number) => {
    setSimulationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetSimulation = () => {
    setSimulationData({ ...originalData });
    setIsSimulating(false);
  };

  const startSimulation = () => {
    setIsSimulating(!isSimulating);
  };

  const applyPreset = (preset: 'aggressive_growth' | 'cost_optimization' | 'balanced') => {
    let newData = { ...simulationData };
    
    switch (preset) {
      case 'aggressive_growth':
        newData = {
          ...newData,
          productRevenue: simulationData.productRevenue * 1.5,
          serviceRevenue: simulationData.serviceRevenue * 1.3,
          rnd: simulationData.rnd * 2,
          sga: simulationData.sga * 1.4
        };
        break;
      case 'cost_optimization':
        newData = {
          ...newData,
          productCost: simulationData.productCost * 0.8,
          serviceCost: simulationData.serviceCost * 0.85,
          operating: simulationData.operating * 0.9,
          sga: simulationData.sga * 0.8
        };
        break;
      case 'balanced':
        newData = {
          ...newData,
          productRevenue: simulationData.productRevenue * 1.2,
          serviceRevenue: simulationData.serviceRevenue * 1.15,
          productCost: simulationData.productCost * 0.95,
          serviceCost: simulationData.serviceCost * 0.95,
          rnd: simulationData.rnd * 1.3
        };
        break;
    }
    
    setSimulationData(newData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-beige-50 to-primary-100 p-6 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="neo-button w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
            <Zap className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-primary-900 dark:text-primary-100 font-['Manrope'] mb-2">
            Financial Simulation Tool
          </h1>
          <p className="text-primary-700 dark:text-gray-400 font-['Manrope']">
            Experiment with financial parameters and visualize their impact on KPIs and company status
          </p>
        </motion.div>

        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="neo-card p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-primary-800 font-['Manrope'] flex items-center">
              <Settings className="w-6 h-6 mr-2" />
              Simulation Controls
            </h2>
            <div className="flex space-x-3">
              <button
                onClick={startSimulation}
                className={`neo-button px-6 py-2 flex items-center space-x-2 transition-all ${
                  isSimulating 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' 
                    : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                }`}
              >
                {isSimulating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isSimulating ? 'Pause' : 'Start'} Simulation</span>
              </button>
              <button
                onClick={resetSimulation}
                className="neo-button px-6 py-2 flex items-center space-x-2 text-gray-700"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Preset Scenarios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={() => applyPreset('aggressive_growth')}
              className="neo-button p-4 text-left hover:shadow-md transition-all"
            >
              <h3 className="font-bold text-blue-700 mb-1">Aggressive Growth</h3>
              <p className="text-sm text-gray-600">High revenue growth with increased R&D investment</p>
            </button>
            <button
              onClick={() => applyPreset('cost_optimization')}
              className="neo-button p-4 text-left hover:shadow-md transition-all"
            >
              <h3 className="font-bold text-green-700 mb-1">Cost Optimization</h3>
              <p className="text-sm text-gray-600">Focus on reducing operational costs and improving margins</p>
            </button>
            <button
              onClick={() => applyPreset('balanced')}
              className="neo-button p-4 text-left hover:shadow-md transition-all"
            >
              <h3 className="font-bold text-purple-700 mb-1">Balanced Approach</h3>
              <p className="text-sm text-gray-600">Moderate growth with controlled cost increases</p>
            </button>
          </div>
        </motion.div>

        {/* Main Simulation Dashboard */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* Parameter Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="neo-card p-6">
              <h3 className="text-lg font-bold text-primary-800 mb-6 font-['Manrope']">
                Financial Parameters
              </h3>
              
              <div className="space-y-6">
                {/* Profit Controls */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-green-700 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Profit
                    </h4>
                    <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      100% of Revenue
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Product Revenue: ₹{(simulationData.productRevenue / 100000).toFixed(1)}L
                        </label>
                        <span className="text-xs font-medium text-green-600">
                          {(simulationData.productRevenue / (simulationData.productRevenue + simulationData.serviceRevenue) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="500000"
                        max="3000000"
                        step="50000"
                        value={simulationData.productRevenue}
                        onChange={(e) => handleSliderChange('productRevenue', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-green"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Service Revenue: ₹{(simulationData.serviceRevenue / 100000).toFixed(1)}L
                        </label>
                        <span className="text-xs font-medium text-green-600">
                          {(simulationData.serviceRevenue / (simulationData.productRevenue + simulationData.serviceRevenue) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="300000"
                        max="2000000"
                        step="50000"
                        value={simulationData.serviceRevenue}
                        onChange={(e) => handleSliderChange('serviceRevenue', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-green"
                      />
                    </div>
                  </div>
                </div>

                {/* Operations Controls */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-red-700 flex items-center">
                      <TrendingDown className="w-4 h-4 mr-2" />
                      Operations
                    </h4>
                    <span className="text-sm font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">
                      {((simulationData.productCost + simulationData.serviceCost + simulationData.operating + simulationData.sga) / (simulationData.productRevenue + simulationData.serviceRevenue) * 100).toFixed(1)}% of Revenue
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Product Cost: ₹{(simulationData.productCost / 100000).toFixed(1)}L
                        </label>
                        <span className="text-xs font-medium text-red-600">
                          {(simulationData.productCost / (simulationData.productRevenue + simulationData.serviceRevenue) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="200000"
                        max="800000"
                        step="20000"
                        value={simulationData.productCost}
                        onChange={(e) => handleSliderChange('productCost', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-red"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Service Cost: ₹{(simulationData.serviceCost / 100000).toFixed(1)}L
                        </label>
                        <span className="text-xs font-medium text-red-600">
                          {(simulationData.serviceCost / (simulationData.productRevenue + simulationData.serviceRevenue) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="150000"
                        max="600000"
                        step="20000"
                        value={simulationData.serviceCost}
                        onChange={(e) => handleSliderChange('serviceCost', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-red"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Operating Costs: ₹{(simulationData.operating / 100000).toFixed(1)}L
                        </label>
                        <span className="text-xs font-medium text-red-600">
                          {(simulationData.operating / (simulationData.productRevenue + simulationData.serviceRevenue) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="200000"
                        max="800000"
                        step="25000"
                        value={simulationData.operating}
                        onChange={(e) => handleSliderChange('operating', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-red"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          SG&A: ₹{(simulationData.sga / 100000).toFixed(1)}L
                        </label>
                        <span className="text-xs font-medium text-red-600">
                          {(simulationData.sga / (simulationData.productRevenue + simulationData.serviceRevenue) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="150000"
                        max="700000"
                        step="25000"
                        value={simulationData.sga}
                        onChange={(e) => handleSliderChange('sga', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-orange"
                      />
                    </div>
                  </div>
                </div>

                {/* Savings Controls */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-blue-700 flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      Savings
                    </h4>
                    <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                      {(simulationData.rnd / (simulationData.productRevenue + simulationData.serviceRevenue) * 100).toFixed(1)}% of Revenue
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          R&D Investment: ₹{(simulationData.rnd / 100000).toFixed(1)}L
                        </label>
                        <span className="text-xs font-medium text-blue-600">
                          {(simulationData.rnd / (simulationData.productRevenue + simulationData.serviceRevenue) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="50000"
                        max="500000"
                        step="25000"
                        value={simulationData.rnd}
                        onChange={(e) => handleSliderChange('rnd', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-blue"
                      />
                    </div>
                  </div>
                </div>

                {/* Taxes Controls */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-purple-700 flex items-center">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Taxes
                    </h4>
                    <span className="text-sm font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                      {(simulationData.tax / (simulationData.productRevenue + simulationData.serviceRevenue) * 100).toFixed(1)}% of Revenue
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Tax Amount: ₹{(simulationData.tax / 100000).toFixed(1)}L
                        </label>
                        <span className="text-xs font-medium text-purple-600">
                          {(simulationData.tax / (simulationData.productRevenue + simulationData.serviceRevenue) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="20000"
                        max="200000"
                        step="10000"
                        value={simulationData.tax}
                        onChange={(e) => handleSliderChange('tax', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-orange"
                      />
                    </div>
                  </div>
                </div>

                {/* Net Profit Summary */}
                <div className="border-t-2 border-gray-200 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-800 flex items-center">
                      <Activity className="w-4 h-4 mr-2" />
                      Net Profit
                    </h4>
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                      (simulationData.productRevenue + simulationData.serviceRevenue) - 
                      (simulationData.productCost + simulationData.serviceCost + simulationData.operating + simulationData.rnd + simulationData.sga + simulationData.tax) > 0
                      ? 'text-green-600 bg-green-100' 
                      : 'text-red-600 bg-red-100'
                    }`}>
                      {(((simulationData.productRevenue + simulationData.serviceRevenue) - 
                        (simulationData.productCost + simulationData.serviceCost + simulationData.operating + simulationData.rnd + simulationData.sga + simulationData.tax)) / 
                        (simulationData.productRevenue + simulationData.serviceRevenue) * 100).toFixed(1)}% of Revenue
                    </span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-center">
                      <div className={`text-2xl font-bold mb-2 ${
                        (simulationData.productRevenue + simulationData.serviceRevenue) - 
                        (simulationData.productCost + simulationData.serviceCost + simulationData.operating + simulationData.rnd + simulationData.sga + simulationData.tax) > 0
                        ? 'text-green-600' 
                        : 'text-red-600'
                      }`}>
                        ₹{(((simulationData.productRevenue + simulationData.serviceRevenue) - 
                          (simulationData.productCost + simulationData.serviceCost + simulationData.operating + simulationData.rnd + simulationData.sga + simulationData.tax)) / 100000).toFixed(1)}L
                      </div>
                      <div className="text-sm text-gray-600">
                        Total Revenue: ₹{((simulationData.productRevenue + simulationData.serviceRevenue) / 100000).toFixed(1)}L
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Financial Flow Simulation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="neo-card p-6">
              <h3 className="text-lg font-bold text-primary-800 mb-4 font-['Manrope'] flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Financial Flow Simulation
              </h3>
              <div className="transform scale-90 origin-top-left">
                <SankeyDiagram 
                  data={generateSankeyData(simulationData)}
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Interactive S.T.O.P Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="neo-card p-6 mb-8"
        >
          <h3 className="text-lg font-bold text-primary-800 mb-6 font-['Manrope'] flex items-center">
            <Target className="w-5 h-5 mr-2" />
            S.T.O.P Financial Breakdown
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 font-['Manrope']">
            Click on each category to explore detailed methods and strategies
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Savings */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/methods/stop'}
              className="cursor-pointer group"
            >
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-32 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <span className="text-white text-4xl font-bold">S</span>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-white text-green-600 text-sm font-bold px-2 py-1 rounded-full shadow-md">
                    {(simulationData.rnd / (simulationData.productRevenue + simulationData.serviceRevenue) * 100).toFixed(0)}%
                  </div>
                </div>
                <h4 className="text-xl font-bold text-green-700 mt-4 mb-2 group-hover:text-green-800 transition-colors">
                  Savings
                </h4>
                <p className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                  ₹{(simulationData.rnd / 1000).toFixed(0)}k
                </p>
                <p className="text-sm text-gray-500 text-center">
                  Click to explore S.T.O.P Method
                </p>
              </div>
            </motion.div>

            {/* Taxes */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/methods/taxes'}
              className="cursor-pointer group"
            >
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-32 h-20 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <span className="text-white text-4xl font-bold">T</span>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-white text-red-600 text-sm font-bold px-2 py-1 rounded-full shadow-md">
                    {(simulationData.tax / (simulationData.productRevenue + simulationData.serviceRevenue) * 100).toFixed(0)}%
                  </div>
                </div>
                <h4 className="text-xl font-bold text-red-700 mt-4 mb-2 group-hover:text-red-800 transition-colors">
                  Taxes
                </h4>
                <p className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                  ₹{(simulationData.tax / 1000).toFixed(0)}k
                </p>
                <p className="text-sm text-gray-500 text-center">
                  Click to explore Tax Strategies
                </p>
              </div>
            </motion.div>

            {/* Operations */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/methods/operations'}
              className="cursor-pointer group"
            >
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-32 h-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <span className="text-white text-4xl font-bold">O</span>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-white text-blue-600 text-sm font-bold px-2 py-1 rounded-full shadow-md">
                    {((simulationData.productCost + simulationData.serviceCost + simulationData.operating + simulationData.sga) / (simulationData.productRevenue + simulationData.serviceRevenue) * 100).toFixed(0)}%
                  </div>
                </div>
                <h4 className="text-xl font-bold text-blue-700 mt-4 mb-2 group-hover:text-blue-800 transition-colors">
                  Operations
                </h4>
                <p className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                  ₹{((simulationData.productCost + simulationData.serviceCost + simulationData.operating + simulationData.sga) / 1000).toFixed(0)}k
                </p>
                <p className="text-sm text-gray-500 text-center">
                  Click to explore Operations Guide
                </p>
              </div>
            </motion.div>

            {/* Profit */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/methods/nws'}
              className="cursor-pointer group"
            >
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-32 h-20 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <span className="text-white text-4xl font-bold">P</span>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-white text-purple-600 text-sm font-bold px-2 py-1 rounded-full shadow-md">
                    {(((simulationData.productRevenue + simulationData.serviceRevenue) - (simulationData.productCost + simulationData.serviceCost + simulationData.operating + simulationData.rnd + simulationData.sga + simulationData.tax)) / (simulationData.productRevenue + simulationData.serviceRevenue) * 100).toFixed(0)}%
                  </div>
                </div>
                <h4 className="text-xl font-bold text-purple-700 mt-4 mb-2 group-hover:text-purple-800 transition-colors">
                  Profit
                </h4>
                <p className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                  ₹{(((simulationData.productRevenue + simulationData.serviceRevenue) - (simulationData.productCost + simulationData.serviceCost + simulationData.operating + simulationData.rnd + simulationData.sga + simulationData.tax)) / 1000).toFixed(0)}k
                </p>
                <p className="text-sm text-gray-500 text-center">
                  Click to explore N.W.S Method
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* KPI Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="neo-card p-6"
        >
          <h3 className="text-lg font-bold text-primary-800 mb-6 font-['Manrope'] flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Key Performance Indicators
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {kpis.map((kpi, index) => {
              const Icon = kpi.icon;
              const change = kpi.value - kpi.previousValue;
              const changePercent = kpi.previousValue ? ((change / kpi.previousValue) * 100) : 0;
              
              return (
                <motion.div
                  key={kpi.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="neo-card p-4 text-center"
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    change > 0 ? 'bg-green-100' : change < 0 ? 'bg-red-100' : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${kpi.color}`} />
                  </div>
                  
                  <h4 className="text-sm font-medium text-gray-700 mb-2 font-['Manrope']">
                    {kpi.name}
                  </h4>
                  
                  <div className="text-2xl font-bold text-gray-900 mb-1 font-['Manrope']">
                    {kpi.format(kpi.value)}
                  </div>
                  
                  <div className={`text-sm font-medium flex items-center justify-center space-x-1 ${
                    change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {change > 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : change < 0 ? (
                      <TrendingDown className="w-3 h-3" />
                    ) : null}
                    <span>
                      {Math.abs(changePercent).toFixed(1)}%
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}