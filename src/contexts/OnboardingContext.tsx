import React, { createContext, useContext, useState, useEffect } from 'react';

interface OnboardingContextType {
  isOnboardingComplete: boolean;
  onboardingProgress: number;
  setOnboardingComplete: (complete: boolean) => void;
  updateOnboardingProgress: (progress: number) => void;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnboardingComplete, setIsOnboardingCompleteState] = useState<boolean>(false);
  const [onboardingProgress, setOnboardingProgress] = useState<number>(0);

  // Load onboarding state from localStorage on mount
  useEffect(() => {
    const savedComplete = localStorage.getItem('onboardingComplete');
    const savedProgress = localStorage.getItem('onboardingProgress');
    
    if (savedComplete) {
      setIsOnboardingCompleteState(JSON.parse(savedComplete));
    }
    
    if (savedProgress) {
      setOnboardingProgress(parseInt(savedProgress, 10));
    }
  }, []);

  const setOnboardingComplete = (complete: boolean) => {
    setIsOnboardingCompleteState(complete);
    localStorage.setItem('onboardingComplete', JSON.stringify(complete));
    
    if (complete) {
      setOnboardingProgress(100);
      localStorage.setItem('onboardingProgress', '100');
    }
  };

  const updateOnboardingProgress = (progress: number) => {
    setOnboardingProgress(progress);
    localStorage.setItem('onboardingProgress', progress.toString());
  };

  const resetOnboarding = () => {
    setIsOnboardingCompleteState(false);
    setOnboardingProgress(0);
    localStorage.removeItem('onboardingComplete');
    localStorage.removeItem('onboardingProgress');
  };

  return (
    <OnboardingContext.Provider value={{
      isOnboardingComplete,
      onboardingProgress,
      setOnboardingComplete,
      updateOnboardingProgress,
      resetOnboarding
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};