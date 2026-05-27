"use client";

import { useState, useEffect, useCallback } from 'react';
import { Match } from '../types';
import { useWebSocket } from './useWebSocket';

export function useMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [featuredMatch, setFeaturedMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { lastMessage } = useWebSocket();

  const fetchMatches = useCallback(async () => {
    try {
      const response = await fetch('/api/sport-betting/matches');
      if (!response.ok) throw new Error('Failed to fetch matches');
      const data = await response.json();
      setMatches(data);

      const featured = data.find((match: Match) => match.featured);
      if (featured) setFeaturedMatch(featured);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch matches');
    }
  }, []);

  useEffect(() => {
    if (lastMessage?.type === 'match_update') {
      fetchMatches();
    }
  }, [lastMessage, fetchMatches]);

  useEffect(() => {
    const loadMatches = async () => {
      setLoading(true);
      try {
        await fetchMatches();
      } catch (err) {
        console.error('Error loading matches:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, [fetchMatches]);

  return {
    matches,
    featuredMatch,
    loading,
    error,
    refetch: fetchMatches,
  };
}

