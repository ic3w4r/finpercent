import { KPIType } from '../../types/finpercent';

interface KPIStockTickerProps {
  kpis: KPIType[];
}

const KPIStockTicker = ({ kpis }: KPIStockTickerProps) => {
  return (
    <div className="ticker-container overflow-hidden whitespace-nowrap">
      <div className="ticker-content inline-block animate-marquee">
        {kpis.map((kpi) => (
          <div key={kpi.id} className="ticker-item inline-block mx-4">
            <span className="font-medium">{kpi.name}:</span>
            <span className={`ml-2 ${kpi.trend >= 0 ? 'text-market-up' : 'text-market-down'}`}>
              {kpi.currentValue} ({kpi.trend >= 0 ? '+' : ''}{kpi.trend}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KPIStockTicker;
