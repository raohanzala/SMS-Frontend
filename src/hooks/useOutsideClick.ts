import { useEffect, useRef, RefObject } from "react";

export function useOutsideClick(
  handler: () => void,
  listenCapturing = true
): RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (ref.current && e.target instanceof Node && !ref.current.contains(e.target)) {
          // Check if the click target is inside any other modal container
          // If it is, don't close this modal (to support nested modals)
          const target = e.target as HTMLElement;
          const clickedModalContainer = target.closest('[data-modal="container"]');
          
          // If the click is inside a modal container (but not this one), don't close
          if (clickedModalContainer && clickedModalContainer !== ref.current) {
            return;
          }

          // Check if this modal is the topmost one (to prevent closing lower modals)
          // Get all modal containers in the DOM
          const allModalContainers = Array.from(
            document.querySelectorAll('[data-modal="container"]')
          ) as HTMLElement[];

          if (allModalContainers.length > 1) {
            // Find the topmost modal by comparing z-index and DOM order
            // Since React portals append to the end, the last one in the array is typically on top
            // But we'll also check z-index to be safe
            let topmostModal = allModalContainers[0];
            let topmostIndex = 0;
            let topmostZ = 0;

            allModalContainers.forEach((modal, index) => {
              const modalStyle = window.getComputedStyle(modal);
              const modalZ = parseInt(modalStyle.zIndex) || 0;
              
              // If this modal has a higher z-index, it's on top
              if (modalZ > topmostZ) {
                topmostModal = modal;
                topmostIndex = index;
                topmostZ = modalZ;
              } 
              // If z-index is the same, prefer the one that appears later in DOM (on top)
              else if (modalZ === topmostZ && index > topmostIndex) {
                topmostModal = modal;
                topmostIndex = index;
              }
            });

            // Only close if this is the topmost modal
            if (ref.current !== topmostModal) {
              return;
            }
          }

          // Otherwise, it's a true outside click on the topmost modal - close it
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}