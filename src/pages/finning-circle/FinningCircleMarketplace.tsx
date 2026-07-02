import React, { useState } from 'react';
import FinningCircleNav from '../../components/finning-circle/FinningCircleNav';
import { 
  Building2, Search, MapPin, Tag, CheckCircle2, Star, 
  MessageCircle, Info, X, SlidersHorizontal, ArrowUpRight, HelpCircle
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  companyName: string;
  price: string;
  moq: string;
  location: string;
  image: string;
  rating: number;
  reviewsCount: number;
  badges: string[];
  specs: string[];
  description: string;
}

const PRODUCTS_DATA: Product[] = [
  {
    id: 1,
    name: 'Precision Fiber Laser Cutting Service',
    category: 'fabrication',
    companyName: 'Apex Precision Fabrication Pvt Ltd',
    price: '₹180 / hour',
    moq: '50 units',
    location: 'Peenya Industrial Area, Bangalore',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 124,
    badges: ['GST Verified', 'Capability Verified', 'Market Active'],
    specs: ['Laser Power: 4 kW', 'Workbed: 1500 x 3000 mm', 'Materials: SS, MS, Aluminium', 'Thickness: Up to 12 mm'],
    description: 'High-speed precision laser cutting for complex sheet metal designs. Strict quality tolerances within 0.05mm. Rapid turnaround times.'
  },
  {
    id: 2,
    name: 'Compostable Bio-Shrink Wrap Rolls',
    category: 'packaging',
    companyName: 'EcoPack Global Solutions',
    price: '₹350 / roll',
    moq: '50 rolls',
    location: 'Trichy Industrial Cluster, Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    reviewsCount: 88,
    badges: ['GST Verified', 'Capability Verified'],
    specs: ['Material: 100% Cornstarch PLA', 'Width: 450 mm', 'Thickness: 15 microns', 'Biodegradable: 180 Days'],
    description: 'Eco-friendly alternative to standard PVC stretch films. Perfect for food wrapping and box shipments. FDA approved and fully compostable.'
  },
  {
    id: 3,
    name: 'Modular Birch Plywood Kitchen Cabinets',
    category: 'interiors',
    companyName: 'Studio Woodkrafts',
    price: '₹8,500 / unit',
    moq: '5 units',
    location: 'Pune MIDC, Maharashtra',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop',
    rating: 4.7,
    reviewsCount: 62,
    badges: ['GST Verified'],
    specs: ['Material: ISI-grade Marine Ply', 'Fittings: Hettich soft-close', 'Finish: Anti-fingerprint Matte', 'Warranty: 5 Years'],
    description: 'Factory-assembled modular cabinets ready to fit. Highly durable against moisture and humidity. Fully customizable by shape.'
  },
  {
    id: 4,
    name: '200-Ton Hydraulic Stamping Press',
    category: 'machinery',
    companyName: 'Bharat AgriMachinery Coimbatore',
    price: '₹4.8 Lakhs / unit',
    moq: '1 unit',
    location: 'Coimbatore Hub, Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 45,
    badges: ['GST Verified', 'Capability Verified'],
    specs: ['Force: 200 Tons', 'Stroke: 250 mm', 'Table Size: 800 x 600 mm', 'Power: 15 HP'],
    description: 'Heavy duty hydraulic draw press for metal stamping, stamping tractor body panels and industrial hoods. Equipped with dual two-hand safety valves.'
  }
];

export default function FinningCircleMarketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [rfqModal, setRfqModal] = useState(false);
  const [rfqNote, setRfqNote] = useState('');

  // Filter logic
  const filteredProducts = PRODUCTS_DATA.filter(prod => {
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || prod.category === selectedCategory;
    const matchesCity = selectedCity === 'all' || prod.location.toLowerCase().includes(selectedCity.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesCity;
  });

  const handleSendRFQ = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`✉️ B2B Enquiry RFQ sent to "${selectedProduct?.companyName}" successfully via WhatsApp Integration!`);
    setRfqModal(false);
    setRfqNote('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 text-left">
      <FinningCircleNav />

      <main className="flex-1 overflow-y-auto p-6 max-w-7xl mx-auto w-full space-y-6">
        
        {/* Page title */}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">TradeStream Marketplace</h1>
          <p className="text-sm text-gray-550 mt-1">Discover GST-verified SME manufacturers and direct capability catalogues.</p>
        </div>

        {/* Search & Filter Header */}
        <div className="bg-white dark:bg-gray-900 p-5 rounded-3xl border border-gray-150 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, services, factory profiles..."
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl pl-10 pr-4 py-2.5 text-xs focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
            {/* Category selection */}
            <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-850 px-3 py-1.5 rounded-xl border text-xs">
              <Tag className="w-3.5 h-3.5 text-gray-400" />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent border-none text-xs font-semibold focus:ring-0 cursor-pointer pr-8"
              >
                <option value="all">All Categories</option>
                <option value="fabrication">🔩 Fabrication</option>
                <option value="packaging">📦 Packaging</option>
                <option value="interiors">🛋️ Modular Kitchens</option>
                <option value="machinery">🚜 Machinery</option>
              </select>
            </div>

            {/* City selection */}
            <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-850 px-3 py-1.5 rounded-xl border text-xs">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              <select 
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent border-none text-xs font-semibold focus:ring-0 cursor-pointer pr-8"
              >
                <option value="all">All Locations</option>
                <option value="bangalore">Bangalore</option>
                <option value="trichy">Trichy</option>
                <option value="pune">Pune</option>
                <option value="coimbatore">Coimbatore</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(prod => (
            <div 
              key={prod.id} 
              className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-150 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-emerald-500/30 transition duration-200"
            >
              {/* Product Image */}
              <div className="relative aspect-video bg-gray-100 dark:bg-gray-850">
                <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                  {prod.badges.map((badge, idx) => (
                    <span 
                      key={idx} 
                      className="text-[8px] bg-black/60 backdrop-blur-md text-emerald-350 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono uppercase font-bold"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[9px] uppercase font-bold text-gray-400 font-mono tracking-wider">
                    {prod.category.toUpperCase()}
                  </span>
                  <h3 className="font-extrabold text-sm text-gray-950 dark:text-white leading-snug hover:text-primary cursor-pointer" onClick={() => setSelectedProduct(prod)}>
                    {prod.name}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 pt-1">
                    <Building2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="text-[10px] text-gray-500 font-semibold truncate block w-full">{prod.companyName}</span>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">{prod.location.split(',')[0]}</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline pt-3 border-t border-gray-100 dark:border-gray-800">
                  <div>
                    <span className="text-base font-black text-emerald-600 dark:text-emerald-400 block">{prod.price}</span>
                    <span className="text-[9px] text-gray-400">Min. Order: {prod.moq}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-yellow-500 text-[10px] font-bold">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{prod.rating}</span>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="px-5 pb-5 pt-0 flex gap-2">
                <button 
                  onClick={() => {
                    setSelectedProduct(prod);
                    setRfqModal(true);
                  }}
                  className="flex-1 bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm hover:bg-emerald-700 transition"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Request Quote
                </button>
                <button 
                  onClick={() => setSelectedProduct(prod)}
                  className="p-2.5 border border-gray-255 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <Info className="w-4 h-4 text-gray-500" />
                </button>
              </div>

            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div className="col-span-full py-16 text-center text-gray-400 space-y-2">
              <Building2 className="w-12 h-12 mx-auto text-gray-300 animate-pulse" />
              <p className="font-bold">No products match your search or filters.</p>
              <p className="text-xs text-gray-500">Try resetting categories or using generic keywords.</p>
            </div>
          )}
        </div>

        {/* PRODUCT SPECIFICATION MODAL DETAIL SHEET */}
        {selectedProduct && !rfqModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl p-6 text-xs text-left shadow-2xl border border-gray-205 dark:border-gray-850 space-y-6 animate-scaleUp max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start border-b border-gray-100 dark:border-gray-800 pb-3">
                <div>
                  <h3 className="text-base font-extrabold text-gray-950 dark:text-white leading-tight">{selectedProduct.name}</h3>
                  <p className="text-[10px] text-gray-450 uppercase font-mono tracking-wider mt-1">{selectedProduct.companyName}</p>
                </div>
                <button 
                  onClick={() => setSelectedProduct(null)} 
                  className="p-1 text-gray-450 hover:text-gray-650 rounded-full bg-gray-100 dark:bg-gray-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 border">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-gray-400 uppercase font-mono tracking-wider block">Description</span>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">{selectedProduct.description}</p>
                  </div>
                  
                  <div className="flex justify-between">
                    <div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase font-mono tracking-wider block">Price range</span>
                      <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{selectedProduct.price}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase font-mono tracking-wider block">MOQ Requirement</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{selectedProduct.moq}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="space-y-2">
                <span className="text-[9px] font-bold text-gray-400 uppercase font-mono tracking-wider block">Specification Parameter Checklist</span>
                <div className="grid grid-cols-2 gap-3">
                  {selectedProduct.specs.map((spec, idx) => (
                    <div key={idx} className="p-3 bg-gray-55 dark:bg-gray-800/40 border rounded-xl font-bold text-gray-800 dark:text-gray-250">
                      {spec}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button 
                  onClick={() => setRfqModal(true)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-md"
                >
                  <MessageCircle className="w-4 h-4" /> Request Quote on WhatsApp
                </button>
                <button 
                  onClick={() => navigate('/finning-circle/passport')}
                  className="flex-1 border border-gray-250 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-1.5"
                >
                  View SME Passport Badges
                </button>
              </div>

            </div>
          </div>
        )}

        {/* B2B WHATSAPP REQUEST QUOTE MODAL */}
        {rfqModal && selectedProduct && (
          <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] flex items-center justify-center p-4">
            <form onSubmit={handleSendRFQ} className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl p-6 text-xs text-left shadow-2xl border border-gray-250 dark:border-gray-800 space-y-5 animate-scaleUp">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-emerald-500" /> Send RFQ via WhatsApp
                </h4>
                <button onClick={() => setRfqModal(false)} className="p-1 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3.5 bg-emerald-500/5 border border-emerald-500/10 rounded-xl space-y-1">
                <p className="font-bold text-gray-950 dark:text-white">{selectedProduct.name}</p>
                <p className="text-[10px] text-gray-400 font-mono">SME: {selectedProduct.companyName}</p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">Enquiry specifications / Notes</label>
                <textarea
                  value={rfqNote}
                  onChange={(e) => setRfqNote(e.target.value)}
                  placeholder="e.g. Seeking quote for 500 units of laser cut plates. Material standard required: SS304..."
                  rows={4}
                  className="w-full bg-gray-50 dark:bg-gray-800 border rounded-2xl px-4 py-3 text-xs"
                  required
                />
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl text-[10px] text-gray-400 leading-relaxed font-mono">
                Notice: TradeStream forwards this message directly to the SME owner's verified WhatsApp contact. 
                Your basic contact information and GST verified details will be attached as social proof.
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Submit WhatsApp RFQ Enquiry</span>
              </button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
}
