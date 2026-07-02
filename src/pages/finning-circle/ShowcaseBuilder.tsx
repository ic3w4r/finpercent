import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, Sliders, ChevronLeft, ArrowRight, Video, 
  Trash2, Upload, Sparkles, AlertCircle, ShoppingBag, DollarSign, Users, Info
} from 'lucide-react';

export default function ShowcaseBuilder() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<'fabrication' | 'interiors'>('fabrication');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);
  const [showUpsell, setShowUpsell] = useState(false);

  // Category specific fields
  const [material, setMaterial] = useState('');
  const [thickness, setThickness] = useState('');
  const [leadTime, setLeadTime] = useState('');
  const [cityServed, setCityServed] = useState('');
  const [moq, setMoq] = useState('');

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setVideoFile('eco_pack_demo_upload.mp4');
      // Generate AI suggestions
      setAiSuggestions({
        title: `${productName || 'Precision Fabrication'} - Heavy Duty B2B Industrial Quality`,
        caption: `Custom laser cutting & bending services. Spec: ${material || 'Steel'} (${thickness || '6mm'}). Fast turnaround in ${leadTime || '5 days'}. Direct enquiries on WhatsApp! #SME #B2BManufacturing`
      });
    }, 1500);
  };

  const handleGenerateAiCopy = () => {
    setAiSuggestions({
      title: `${productName || 'Custom B2B CNC Milling'} - Heavy Duty Fabrication`,
      caption: `We support high-volume runs for B2B procurement. Material: ${material || 'Aluminium/Steel'} with precision tolerances. Proudly GST-verified. Inquire below for quotes! #Fabrication #IndiaMade #SMEPassport`
    });
  };

  const handleSaveProduct = () => {
    alert('🎉 Product Catalogue Listed successfully on TradeStream Marketplace!');
    navigate('/finning-circle/passport');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 p-6 pb-20 text-left">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation */}
        <button
          onClick={() => navigate('/finning-circle/gateway')}
          className="neo-button glass-action px-4 py-2 text-gray-600 dark:text-gray-400 hover:shadow-lg transition-all duration-300 flex items-center text-xs font-semibold"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          <span>Back to Pathway</span>
        </button>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-primary-950 dark:text-white">Product & Service Showcase Builder</h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Build your digital catalog using customized templates and upload capability proof videos to unlock visibility.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left: Input Form */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md space-y-6">
            
            {/* Category selection tabs */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Catalog Category Template</label>
              <div className="flex gap-2 p-1 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setCategory('fabrication')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    category === 'fabrication'
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-450 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  🔩 Fabrication & Machining
                </button>
                <button
                  type="button"
                  onClick={() => setCategory('interiors')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    category === 'interiors'
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-450 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  🛋️ Modular Interiors
                </button>
              </div>
            </div>

            {/* General Fields */}
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">Product / Service Name</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Heavy Duty Laser Bending"
                  className="w-full bg-gray-55 dark:bg-gray-800 border border-gray-250 dark:border-gray-750 rounded-xl px-4 py-2.5 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your capabilities, machinery used, and quality standards..."
                  rows={3}
                  className="w-full bg-gray-55 dark:bg-gray-800 border border-gray-250 dark:border-gray-750 rounded-xl px-4 py-2.5 text-sm"
                />
              </div>
            </div>

            {/* Category Specific Technical Templates */}
            <div className="p-4 bg-gray-50 dark:bg-gray-850 rounded-2xl border border-gray-150 dark:border-gray-750 space-y-4">
              <span className="text-[10px] uppercase font-bold text-emerald-650 dark:text-emerald-400 tracking-wider block font-mono">
                Technical Specifications ({category.toUpperCase()})
              </span>

              {category === 'fabrication' ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-500">Material Type</label>
                    <input
                      type="text"
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      placeholder="e.g. SS-304, Mild Steel"
                      className="w-full bg-white dark:bg-gray-800 border border-gray-250 dark:border-gray-750 rounded-lg px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-500">Max Thickness Capability</label>
                    <input
                      type="text"
                      value={thickness}
                      onChange={(e) => setThickness(e.target.value)}
                      placeholder="e.g. Up to 12mm"
                      className="w-full bg-white dark:bg-gray-800 border border-gray-250 dark:border-gray-750 rounded-lg px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-500">Typical Lead Time</label>
                    <input
                      type="text"
                      value={leadTime}
                      onChange={(e) => setLeadTime(e.target.value)}
                      placeholder="e.g. 5-7 Working Days"
                      className="w-full bg-white dark:bg-gray-800 border border-gray-250 dark:border-gray-750 rounded-lg px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-500">MOQ Capacity</label>
                    <input
                      type="text"
                      value={moq}
                      onChange={(e) => setMoq(e.target.value)}
                      placeholder="e.g. 100 units"
                      className="w-full bg-white dark:bg-gray-800 border border-gray-250 dark:border-gray-750 rounded-lg px-3 py-2 text-xs"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-500">Project Specialty</label>
                    <input
                      type="text"
                      placeholder="e.g. Commercial Office, Modular Kitchens"
                      className="w-full bg-white dark:bg-gray-800 border border-gray-250 dark:border-gray-750 rounded-lg px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-500">Material Standard</label>
                    <input
                      type="text"
                      placeholder="e.g. ISI Grade Plywood, Hettich Fittings"
                      className="w-full bg-white dark:bg-gray-800 border border-gray-250 dark:border-gray-750 rounded-lg px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-500">Estimated Price Range</label>
                    <input
                      type="text"
                      placeholder="e.g. ₹150 - ₹450 / sqft"
                      className="w-full bg-white dark:bg-gray-800 border border-gray-250 dark:border-gray-750 rounded-lg px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-500">Cities Served</label>
                    <input
                      type="text"
                      value={cityServed}
                      onChange={(e) => setCityServed(e.target.value)}
                      placeholder="e.g. Trichy, Bangalore"
                      className="w-full bg-white dark:bg-gray-800 border border-gray-250 dark:border-gray-750 rounded-lg px-3 py-2 text-xs"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleSaveProduct}
                className="flex-1 bg-primary hover:bg-primary-650 text-white font-bold py-3 px-6 rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <span>Publish to Marketplace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right: Short Video Upload Simulator */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md space-y-4">
              <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-emerald-500" />
                <span>Upload Product Reel</span>
              </h3>
              
              <p className="text-xs text-gray-500">
                Upload a 30-90 second clip showcasing your machinery operating or finished products. Immediate boost in category ranking.
              </p>

              {/* Video upload placeholder */}
              <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl aspect-[9/16] max-h-[300px] flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-800/40 relative overflow-hidden group">
                {videoFile ? (
                  <div className="absolute inset-0 bg-cover bg-center flex flex-col justify-end p-4 text-white" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop')` }}>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-emerald-400 animate-pulse" />
                    </div>
                    <div className="z-10 bg-black/60 backdrop-blur-sm p-3 rounded-xl border border-white/10 space-y-2">
                      <p className="text-[10px] text-green-400 font-bold flex items-center gap-1 uppercase tracking-wider font-mono">
                        <span>✓ Uploaded: {videoFile}</span>
                      </p>
                      <button 
                        onClick={() => setVideoFile(null)} 
                        className="text-[10px] font-bold text-red-400 hover:text-red-300 flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Remove Video
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-gray-400 mb-3 group-hover:text-emerald-500 transition-colors" />
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Drag video here</span>
                    <span className="text-[10px] text-gray-400">MP4, MOV up to 50MB</span>
                    <input 
                      type="file" 
                      accept="video/*" 
                      onChange={handleVideoChange} 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                    />
                  </>
                )}
              </div>

              {/* AI generated COPYWRITING suggestions */}
              {aiSuggestions && (
                <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-[9px] font-mono">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 fill-current" /> AI CMO Suggested Copy
                    </span>
                    <button onClick={handleGenerateAiCopy} className="text-emerald-700 hover:underline">Regenerate</button>
                  </div>
                  <p className="font-bold text-gray-900 dark:text-white leading-tight">{aiSuggestions.title}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-[11px] leading-relaxed line-clamp-3">{aiSuggestions.caption}</p>
                </div>
              )}

            </div>

            {/* Paid Upsell card: Short Content Pack */}
            <div className="bg-gradient-to-br from-primary-950 to-emerald-950 text-white rounded-3xl p-6 border border-emerald-900/60 shadow-xl space-y-4 text-xs">
              <div className="flex justify-between items-center">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded uppercase font-bold text-[8px] font-mono">Recommended Boost</span>
                <span className="font-bold text-emerald-300">₹4,999</span>
              </div>
              
              <div>
                <h4 className="font-bold text-sm">Finpercent Short Content Pack</h4>
                <p className="text-[11px] text-primary-200/80 mt-1 leading-relaxed">
                  No video equipment? Select our team pack. We send a verified editor to shoot 5 professional demo videos of your machinery, write headlines, and schedule trade center demos.
                </p>
              </div>

              <div className="space-y-1.5 text-[10px] text-primary-300">
                <p>✓ 5 HD Product/Service demonstration clips</p>
                <p>✓ Founder Intro & Facility Tour package</p>
                <p>✓ Automated WhatsApp lead capture forms setup</p>
              </div>

              <button
                onClick={() => setShowUpsell(true)}
                className="w-full py-2 bg-emerald-550 hover:bg-emerald-600 text-white font-bold rounded-xl transition text-[11px] shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Purchase Content Pack</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
