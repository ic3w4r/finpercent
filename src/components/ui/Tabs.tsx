import React from 'react';

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

const TabsContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
} | null>(null);

export function Tabs({ defaultValue, children, className = '' }: TabsProps) {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, onValueChange: setValue }}>
      <div className={className}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = '' }: TabsListProps) {
  return <div className={`flex ${className}`}>{children}</div>;
}

export function TabsTrigger({ value, children, className = '' }: TabsTriggerProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');

  const isSelected = context.value === value;
  
  return (
    <button
      className={`${className} ${isSelected ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-50'}`}
      onClick={() => context.onValueChange(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }: TabsContentProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');

  if (context.value !== value) return null;
  return <div>{children}</div>;
}
