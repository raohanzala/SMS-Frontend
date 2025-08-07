import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollRestoration = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if the page has already been scrolled to a specific position (from previous visit)
    const scrollPosition = sessionStorage.getItem(location.key);
    
    // Restore scroll position if it exists, otherwise scroll to top
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
    } else {
      window.scrollTo(0, 0);  // Scroll to top if no scroll position is saved
    }
    
    // Cleanup: Save the scroll position before the page unloads
    const handleBeforeUnload = () => {
      sessionStorage.setItem(location.key, window.scrollY);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Cleanup event listener when component unmounts or page navigates
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location]);  // Trigger when location changes (i.e., when the page is navigated to)
};

export default useScrollRestoration;
