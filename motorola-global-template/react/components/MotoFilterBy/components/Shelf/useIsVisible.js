import { useEffect, useState } from "react";

export const useIsVisible = ({ element }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (element.current) {
      window.addEventListener("scroll", isVisible);
    }
    return () => window.removeEventListener("scroll", isVisible);
  }, [element]);

  // check element rect top
  const isVisible = () => {
    const bottom = element.current.getBoundingClientRect().bottom;
    if (bottom >= 400) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  return visible;
};
