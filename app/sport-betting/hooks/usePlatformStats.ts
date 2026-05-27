"use client";

import { useState, useEffect, useCallback } from 'react';
import { PlatformStats } from '../types';
import { useWebSocket } from './useWebSocket';

export function usePlatformStats() {
  const [platformStats, setPlatformStats] = useState<PlatformStats | null>(null);
  const [loading, setLoading] = useState(true);

  const { lastMessage } = useWebSocket();

  const fetchPlatformStats = useCallback(async () => {
    try {
      const response = await fetch('/api/sport-betting/stats?type=platform');
      if (!response.ok) throw new Error('Failed to fetch platform stats');
      const data = await response.json();
      setPlatformStats(data);
    } catch (err) {
      console.error('Error fetching platform stats:', err);
    }
  }, []);

  useEffect(() => {
    if (lastMessage?.type === 'platform_stats_update') {
      fetchPlatformStats();
    }
  }, [lastMessage, fetchPlatformStats]);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        await fetchPlatformStats();
      } catch (err) {
        console.error('Error loading platform stats:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [fetchPlatformStats]);

  return {
    platformStats,
    loading,
    refetch: fetchPlatformStats,
  };
}

