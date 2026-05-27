"use client";

import { useState, useEffect, useCallback } from 'react';
import { Bet } from '../types';
import { useWebSocket } from './useWebSocket';

export function useUserBets() {
  const [userBets, setUserBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);

  const { lastMessage } = useWebSocket();

  const fetchUserBets = useCallback(async () => {
    try {
      const response = await fetch('/api/sport-betting/bets');
      if (!response.ok) {
        if (response.status === 401) {
          return;
        }
        throw new Error('Failed to fetch user bets');
      }
      const data = await response.json();
      setUserBets(data);
    } catch (err) {
      console.error('Error fetching user bets:', err);
    }
  }, []);

  const placeBet = useCallback(async (
    matchId: string,
    betType: 'team1' | 'team2' | 'draw',
    amount: number
  ) => {
    try {
      const response = await fetch('/api/sport-betting/bets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          match_id: matchId,
          bet_type: betType,
          amount,
        }),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to place bet';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          // Response is not JSON
        }
        throw new Error(errorMessage);
      }

      const newBet = await response.json();
      setUserBets(prev => [newBet, ...prev]);
      return newBet;
    } catch (err) {
      throw err;
    }
  }, []);

  useEffect(() => {
    if (lastMessage?.type === 'new_bet') {
      fetchUserBets();
    }
  }, [lastMessage, fetchUserBets]);

  useEffect(() => {
    const loadBets = async () => {
      setLoading(true);
      try {
        await fetchUserBets();
      } catch (err) {
        console.error('Error loading user bets:', err);
      } finally {
        setLoading(false);
      }
    };

    loadBets();
  }, [fetchUserBets]);

  return {
    userBets,
    loading,
    placeBet,
    refetch: fetchUserBets,
  };
}

