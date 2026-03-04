import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      const container = document.querySelector(".content-wrapper");

      if (container) {
        container.scrollTop = 0;
      }

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    };

    // animation complete hone ke baad scroll
    requestAnimationFrame(scrollToTop);
  }, [location.key]);

  return null;
};

export default ScrollManager;