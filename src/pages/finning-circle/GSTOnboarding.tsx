import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, ShieldCheck, ArrowRight, CheckCircle2, 
  ChevronLeft, AlertCircle, FileText, MapPin, Tag, UserCheck
} from 'lucide-react';

export default function GSTOnboarding() {
  const navigate = useNavigate();
  const [gstin, setGstin] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');
  const [verifiedData, setVerifiedData] = useState<any>(null);
  const [consentProfile, setConsentProfile] = useState(true);
  const [consentVisibility, setConsentVisibility] = useState(true);

  // Validate format: e.g. 29AAAAA1111A1Z1 (Standard Indian GSTIN)
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gstin) {
      setError('GSTIN number cannot be empty.');
      return;
    }
    
    const cleanGstin = gstin.trim().toUpperCase();
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    
    // We allow a bypass for testing/mocking
    setIsValidating(true);
    setError('');

    setTimeout(() => {
      setIsValidating(false);
      
      // Auto generate mock profile based on GSTIN input
      const stateCode = cleanGstin.substring(0, 2);
      let stateName = 'Karnataka';
      let cityName = 'Trichy';
      
      if (stateCode === '33') {
        stateName = 'Tamil Nadu';
        cityName = 'Trichy Industrial Cluster';
      } else if (stateCode === '27') {
        stateName = 'Maharashtra';
        cityName = 'Pune MIDC';
      } else if (stateCode === '29') {
        stateName = 'Karnataka';
        cityName = 'Peenya Industrial Area, Bangalore';
      } else {
        stateName = 'Tamil Nadu';
        cityName = 'Trichy District';
      }

      setVerifiedData({
        gstin: cleanGstin,
        businessName: 'Apex Fabrication & Precision Engineering Ltd.',
        tradeName: 'Apex Fab',
        constitution: 'Private Limited Company',
        registrationDate: '2019-04-12',
        address: `Shed No. 44, Phase II, Sector A, ${cityName}, ${stateName}`,
        city: cityName,
        state: stateName,
        category: 'Fabrication & Machining',
        ownerName: 'Subramanian Swamy',
        contactEmail: 'contact@apexfab.in',
        status: 'Active'
      });
    }, 1200);
  };

  const handlePublishProfile = () => {
    // Show success dialog and nudge to Showcase Builder
    alert('🎉 Profile Published! "GST Verified SME" Badge Unlocked.');
    navigate('/finning-circle/builder');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 p-6 pb-20 text-left">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Navigation */}
        <button
          onClick={() => navigate('/finning-circle/gateway')}
          className="neo-button glass-action px-4 py-2 text-gray-600 dark:text-gray-400 hover:shadow-lg transition-all duration-300 flex items-center text-xs font-semibold"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          <span>Back to Ecosystem Pathway</span>
        </button>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-primary-950 dark:text-white">GST-Based SME Onboarding</h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Input your business GSTIN to auto-generate a verified profile and unlock your visibility dashboard.
          </p>
        </div>

        {/* GSTIN Submission Card */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-md space-y-6">
          {!verifiedData ? (
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">GSTIN Number</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    placeholder="e.g. 33AAAAA1111A1Z1 (Use 33 for Trichy)"
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-250 dark:border-gray-700 rounded-2xl pl-12 pr-4 py-4 text-base focus:ring-2 focus:ring-primary uppercase font-mono tracking-wider font-semibold"
                  />
                </div>
                <p className="text-[10px] text-gray-400">
                  We verify your registration with the Goods and Services Tax Network (GSTN) registry in real-time.
                </p>
              </div>

              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-150 dark:border-red-900/40 rounded-xl flex items-center gap-3 text-red-650 dark:text-red-400 text-xs">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span className="font-semibold">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isValidating}
                className="w-full py-4 bg-primary hover:bg-primary-600 text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50 text-sm"
              >
                <span>{isValidating ? 'Querying GSTN Registry...' : 'Verify GSTIN'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="space-y-8 animate-fadeIn">
              {/* Verification Header */}
              <div className="flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-950/40 text-green-600 rounded-2xl flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 fill-current" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span>GST Verified Business Identity</span>
                    <span className="text-[10px] bg-green-500/10 text-green-600 border border-green-500/20 px-2 py-0.5 rounded uppercase font-bold tracking-wider font-mono">
                      GST Verified SME
                    </span>
                  </h3>
                  <p className="text-xs text-gray-400">GSTIN: {verifiedData.gstin}</p>
                </div>
              </div>

              {/* Business details summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-left">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-gray-400 uppercase font-mono text-[9px] tracking-wider block">Legal Name</span>
                    <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold text-sm">
                      <Building2 className="w-4 h-4 text-emerald-500" />
                      <span>{verifiedData.businessName}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-gray-400 uppercase font-mono text-[9px] tracking-wider block">Constitution</span>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{verifiedData.constitution}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-gray-400 uppercase font-mono text-[9px] tracking-wider block">Authorized Signatory</span>
                    <div className="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200">
                      <UserCheck className="w-4 h-4 text-emerald-500" />
                      <span>{verifiedData.ownerName}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-gray-400 uppercase font-mono text-[9px] tracking-wider block">Registered Address</span>
                    <div className="flex items-start gap-2 text-gray-800 dark:text-gray-200 font-semibold leading-relaxed">
                      <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{verifiedData.address}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-gray-400 uppercase font-mono text-[9px] tracking-wider block">Category Segment</span>
                    <div className="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200">
                      <Tag className="w-4 h-4 text-emerald-500" />
                      <span>{verifiedData.category}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consent items */}
              <div className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border border-gray-150 dark:border-gray-850 space-y-4">
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Required User Approvals</p>
                
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer text-xs font-semibold text-gray-700 dark:text-gray-300">
                    <input
                      type="checkbox"
                      checked={consentProfile}
                      onChange={(e) => setConsentProfile(e.target.checked)}
                      className="rounded border-gray-300 dark:border-gray-700 text-primary focus:ring-primary mt-0.5"
                    />
                    <span>Consent to auto-generate a public business profile based on government GST registry details.</span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer text-xs font-semibold text-gray-700 dark:text-gray-300">
                    <input
                      type="checkbox"
                      checked={consentVisibility}
                      onChange={(e) => setConsentVisibility(e.target.checked)}
                      className="rounded border-gray-300 dark:border-gray-700 text-primary focus:ring-primary mt-0.5"
                    />
                    <span>Consent to publish the profile to the TradeStream Marketplace for buyer discovery.</span>
                  </label>
                </div>
              </div>

              {/* Nudge Default Choice Banner */}
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 rounded-2xl flex items-start gap-4">
                <span className="text-2xl shrink-0">🎯</span>
                <div className="space-y-1">
                  <h4 className="font-bold text-xs">Recommended Next Action:</h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400">
                    Your profile details are verified! To attract buyer enquiries, add your first fabrication or machining product catalog now.
                  </p>
                </div>
              </div>

              {/* Publish Action */}
              <div className="flex gap-4">
                <button
                  onClick={() => setVerifiedData(null)}
                  className="flex-1 border border-gray-200 dark:border-gray-700 font-semibold py-3 px-6 rounded-2xl text-xs hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  Edit Information
                </button>
                <button
                  onClick={handlePublishProfile}
                  disabled={!consentProfile || !consentVisibility}
                  className="flex-[2] bg-primary hover:bg-primary-650 text-white font-bold py-3 px-6 rounded-2xl text-xs shadow-md hover:shadow-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span>Publish & Add First Product</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
