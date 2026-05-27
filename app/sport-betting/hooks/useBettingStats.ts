"use client";

import { useState, useEffect, useCallback } from 'react';
import { BettingStats } from '../types';
import { useWebSocket } from './useWebSocket';

export function useBettingStats() {
  const [bettingStats, setBettingStats] = useState<Record<string, BettingStats>>({});
  const [loading, setLoading] = useState(true);

  const { lastMessage } = useWebSocket();

  const fetchBettingStats = useCallback(async () => {
    try {
      const response = await fetch('/api/sport-betting/stats?type=betting');
      if (!response.ok) throw new Error('Failed to fetch betting stats');
      const data = await response.json();

      const statsMap = data.reduce((acc: Record<string, BettingStats>, stat: BettingStats) => {
        acc[stat.match_id] = stat;
        return acc;
      }, {});

      setBettingStats(statsMap);
    } catch (err) {
      console.error('Error fetching betting stats:', err);
    }
  }, []);

  useEffect(() => {
    if (
      lastMessage?.type === 'betting_stats_update' ||
      lastMessage?.type === 'new_bet'
    ) {
      fetchBettingStats();
    }
  }, [lastMessage, fetchBettingStats]);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        await fetchBettingStats();
      } catch (err) {
        console.error('Error loading betting stats:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [fetchBettingStats]);

  return {
    bettingStats,
    loading,
    refetch: fetchBettingStats,
  };
}

