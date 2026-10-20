import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently under the sticky header, so
 * navigation can show the user where they are on the page.
 */
export function useScrollSpy(ids: string[], offset = 120): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(",");

  useEffect(() => {
    const sectionIds = key.split(",");
    const onScroll = () => {
      let current: string | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - offset <= 0) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [key, offset]);

  return active;
}
