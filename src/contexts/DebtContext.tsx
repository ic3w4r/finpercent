import React, { createContext, useContext, useState } from 'react';

type Item = { id: number; label: string; amount: number };

type DebtContextType = {
  occ: number;
  od: number;
  wc: number;
  occRate: number;
  odRate: number;
  wcRate: number;
  occCredits: Item[];
  occDebits: Item[];
  odCredits: Item[];
  odDebits: Item[];
  wcCredits: Item[];
  wcDebits: Item[];
  setOcc: (v: number) => void;
  setOd: (v: number) => void;
  setWc: (v: number) => void;
  addItem: (facility: 'occ'|'od'|'wc', type: 'credit'|'debit', item: Item) => void;
  editItem: (facility: 'occ'|'od'|'wc', type: 'credit'|'debit', item: Item) => void;
  removeItem: (facility: 'occ'|'od'|'wc', type: 'credit'|'debit', id: number) => void;
  applySnowballTarget: (target?: 'occ'|'od'|'wc') => void;
  applyAvalancheTarget: (target?: 'occ'|'od'|'wc') => void;
  applyVelocityTarget: (target?: 'occ'|'od'|'wc') => void;
};

const DebtContext = createContext<DebtContextType | undefined>(undefined);

export const DebtProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [occ, setOcc] = useState<number>(25000);
  const [od, setOd] = useState<number>(15000);
  const [wc, setWc] = useState<number>(8000);

  const occRate = 12;
  const odRate = 18;
  const wcRate = 10;

  const [occCredits, setOccCredits] = useState<Item[]>([
    { id: 1, label: 'Invoice financing', amount: 8000 },
    { id: 2, label: 'Bank limit refresh', amount: 5000 }
  ]);
  const [occDebits, setOccDebits] = useState<Item[]>([
    { id: 1, label: 'Raw materials', amount: 7000 },
    { id: 2, label: 'Supplier payments', amount: 6000 }
  ]);

  const [odCredits, setOdCredits] = useState<Item[]>([
    { id: 1, label: 'Returned deposits', amount: 2000 }
  ]);
  const [odDebits, setOdDebits] = useState<Item[]>([
    { id: 1, label: 'Emergency drawdown', amount: 9000 }
  ]);

  const [wcCredits, setWcCredits] = useState<Item[]>([
    { id: 1, label: 'Customer prepayment', amount: 3000 }
  ]);
  const [wcDebits, setWcDebits] = useState<Item[]>([
    { id: 1, label: 'Inventory build', amount: 4000 }
  ]);

  const clamp = (v: number) => Math.max(0, Math.round(v));

  const addItem = (facility: 'occ'|'od'|'wc', type: 'credit'|'debit', item: Item) => {
    if (facility === 'occ') {
      if (type === 'credit') setOccCredits(s => [...s, item]);
      else setOccDebits(s => [...s, item]);
    }
    if (facility === 'od') {
      if (type === 'credit') setOdCredits(s => [...s, item]);
      else setOdDebits(s => [...s, item]);
    }
    if (facility === 'wc') {
      if (type === 'credit') setWcCredits(s => [...s, item]);
      else setWcDebits(s => [...s, item]);
    }
  };

  const editItem = (facility: 'occ'|'od'|'wc', type: 'credit'|'debit', item: Item) => {
    const updater = (arr: Item[], set: (v: Item[]) => void) => set(arr.map(a => a.id === item.id ? item : a));
    if (facility === 'occ') {
      if (type === 'credit') updater(occCredits, setOccCredits);
      else updater(occDebits, setOccDebits);
    }
    if (facility === 'od') {
      if (type === 'credit') updater(odCredits, setOdCredits);
      else updater(odDebits, setOdDebits);
    }
    if (facility === 'wc') {
      if (type === 'credit') updater(wcCredits, setWcCredits);
      else updater(wcDebits, setWcDebits);
    }
  };

  const removeItem = (facility: 'occ'|'od'|'wc', type: 'credit'|'debit', id: number) => {
    const remover = (arr: Item[], set: (v: Item[]) => void) => set(arr.filter(a => a.id !== id));
    if (facility === 'occ') {
      if (type === 'credit') remover(occCredits, setOccCredits);
      else remover(occDebits, setOccDebits);
    }
    if (facility === 'od') {
      if (type === 'credit') remover(odCredits, setOdCredits);
      else remover(odDebits, setOdDebits);
    }
    if (facility === 'wc') {
      if (type === 'credit') remover(wcCredits, setWcCredits);
      else remover(wcDebits, setWcDebits);
    }
  };

  // Simple payment strategies that mutate balances
  const applySnowballTarget = (target?: 'occ'|'od'|'wc') => {
    const chunk = 2500;
    if (target === 'occ') setOcc(prev => clamp(prev - chunk));
    else if (target === 'od') setOd(prev => clamp(prev - chunk));
    else if (target === 'wc') setWc(prev => clamp(prev - chunk));
    else {
      // apply to smallest of all
      const smallest = Math.min(occ, od, wc);
      if (smallest === occ) setOcc(prev => clamp(prev - chunk));
      else if (smallest === od) setOd(prev => clamp(prev - chunk));
      else setWc(prev => clamp(prev - chunk));
    }
  };

  const applyAvalancheTarget = (target?: 'occ'|'od'|'wc') => {
    const chunk = 3000;
    if (target === 'occ') setOcc(prev => clamp(prev - chunk));
    else if (target === 'od') setOd(prev => clamp(prev - chunk));
    else if (target === 'wc') setWc(prev => clamp(prev - chunk));
    else {
      // target highest-rate: od
      if (od > 0) setOd(prev => clamp(prev - chunk));
      else if (occ > 0) setOcc(prev => clamp(prev - chunk));
      else setWc(prev => clamp(prev - chunk));
    }
  };

  const applyVelocityTarget = (target?: 'occ'|'od'|'wc') => {
    const transfer = 2000;
    if (target === 'occ') {
      setOcc(prev => clamp(prev - transfer));
    } else if (target === 'od') {
      setOd(prev => clamp(prev - transfer));
    } else if (target === 'wc') {
      setWc(prev => clamp(prev - transfer));
    } else {
      // use wc to reduce others
      if (wc > transfer) {
        setWc(prev => clamp(prev - transfer));
        if (occ > od) setOcc(prev => clamp(prev - transfer));
        else setOd(prev => clamp(prev - transfer));
      } else {
        setWc(prev => clamp(prev - Math.min(prev, transfer)));
      }
    }
  };

  return (
    <DebtContext.Provider value={{
      occ, od, wc, occRate, odRate, wcRate,
      occCredits, occDebits, odCredits, odDebits, wcCredits, wcDebits,
      setOcc, setOd, setWc,
      addItem, editItem, removeItem,
      applySnowballTarget, applyAvalancheTarget, applyVelocityTarget
    }}>
      {children}
    </DebtContext.Provider>
  );
};

export const useDebt = () => {
  const ctx = useContext(DebtContext);
  if (!ctx) throw new Error('useDebt must be used within DebtProvider');
  return ctx;
};

export default DebtContext;
