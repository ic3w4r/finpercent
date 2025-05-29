import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { CreditCard, TrendingDown, ArrowRight, DollarSign, Building2, PiggyBank } from 'lucide-react';
import DebtMethodGuide from '../components/debt/DebtMethodGuide';
import VelocityBanking from '../components/debt/VelocityBanking';
import AvalancheMethod from '../components/debt/AvalancheMethod';
import SnowballMethod from '../components/debt/SnowballMethod';

export default function DebtRepaymentPage() {
  const [showGuide, setShowGuide] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method);
    setShowGuide(false);
  };

  return (
    <div className="min-h-screen glass-container p-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card card-container mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-primary-50 rounded-full">
              <TrendingDown className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Debt Repayment Strategy</h1>
              <p className="text-gray-600">Choose the best method for your financial situation</p>
            </div>
          </div>

          {showGuide ? (
            <DebtMethodGuide onMethodSelect={handleMethodSelect} />
          ) : (
            <Tabs defaultValue={selectedMethod || 'velocity'} className="space-y-6">
              <TabsList className="neo-card p-1 flex space-x-2">
                <TabsTrigger 
                  value="velocity" 
                  className="flex-1 p-2 rounded-lg text-center transition-colors"
                >
                  Velocity Banking
                </TabsTrigger>
                <TabsTrigger 
                  value="avalanche" 
                  className="flex-1 p-2 rounded-lg text-center transition-colors"
                >
                  Avalanche Method
                </TabsTrigger>
                <TabsTrigger 
                  value="snowball" 
                  className="flex-1 p-2 rounded-lg text-center transition-colors"
                >
                  Snowball Method
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="velocity">
                <VelocityBanking />
              </TabsContent>
              
              <TabsContent value="avalanche">
                <AvalancheMethod />
              </TabsContent>
              
              <TabsContent value="snowball">
                <SnowballMethod />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
}
