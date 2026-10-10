"use client";

import { useState, useEffect } from "react";

export function useGithubStars(repo = "ezeslucky/nexio", initialFallback = 2) {
  const [stars, setStars] = useState<number>(initialFallback);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchStars() {
      try {
        const response = await fetch(`https://api.github.com/repos/${repo}`, {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
          // Cache for 60 seconds to avoid GitHub rate limit while keeping realtime
          next: { revalidate: 60 } as any,
        });

        if (response.ok) {
          const data = await response.json();
          if (isMounted && typeof data.stargazers_count === "number") {
            setStars(data.stargazers_count);
            setLoading(false);
          }
        }
      } catch (err) {
        // Fallback to initial
        if (isMounted) setLoading(false);
      }
    }

    fetchStars();

    // Check periodically for real-time star updates
    const interval = setInterval(fetchStars, 45000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [repo]);

  const formattedStars =
    stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : `${stars}`;

  return { stars, formattedStars, loading };
}
