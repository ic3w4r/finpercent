import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

interface NavigationContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  isMobile: boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Determine initial open state based on screen width (desktop starts open, mobile starts closed)
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  // Track window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openSidebar = useCallback(() => setIsSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);
  const toggleSidebar = useCallback(() => setIsSidebarOpen(prev => !prev), []);

  // Keyboard shortcut: Cmd+B / Ctrl+B to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  // AUTO-COLLAPSE ON SIDEWAYS SCROLL:
  // Detects horizontal wheel scroll, touch horizontal swipe, and horizontal container scrolling
  const touchStartRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    // 1. Wheel / Trackpad horizontal scroll listener
    const handleWheel = (e: WheelEvent) => {
      if (!isSidebarOpen) return;
      
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);

      // If horizontal scroll is dominant and exceeds sensitivity threshold
      if (absX > 18 && absX > absY * 0.8) {
        closeSidebar();
      }
    };

    // 2. Touch gesture listeners for mobile / touchpads
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          time: Date.now()
        };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isSidebarOpen || e.touches.length === 0) return;

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = currentX - touchStartRef.current.x;
      const diffY = currentY - touchStartRef.current.y;
      const absDiffX = Math.abs(diffX);
      const absDiffY = Math.abs(diffY);

      // If user swipes horizontally more than 30px with horizontal dominance
      if (absDiffX > 30 && absDiffX > absDiffY * 1.2) {
        closeSidebar();
      }
    };

    // 3. Scroll event listener on window / scrollable containers
    let lastScrollLeft = window.scrollX || document.documentElement.scrollLeft;
    const handleScroll = () => {
      if (!isSidebarOpen) return;
      const currentScrollLeft = window.scrollX || document.documentElement.scrollLeft;
      if (Math.abs(currentScrollLeft - lastScrollLeft) > 20) {
        closeSidebar();
      }
      lastScrollLeft = currentScrollLeft;
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isSidebarOpen, closeSidebar]);

  return (
    <NavigationContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        openSidebar,
        closeSidebar,
        isMobile
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
