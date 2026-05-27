"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface WebSocketMessage {
  type:
    | "betting_stats_update"
    | "match_update"
    | "new_bet"
    | "platform_stats_update";
  data: any;
}

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const subscriptionsRef = useRef<any[]>([]);

  useEffect(() => {
    const subscriptions = [
      supabase
        .channel("betting_stats_changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "betting_stats",
          },
          (payload) => {
            setLastMessage({
              type: "betting_stats_update",
              data: payload,
            });
          }
        )
        .subscribe(),

      supabase
        .channel("match_changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "matches",
          },
          (payload) => {
            setLastMessage({
              type: "match_update",
              data: payload,
            });
          }
        )
        .subscribe(),

      supabase
        .channel("bet_changes")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "bets",
          },
          (payload) => {
            setLastMessage({
              type: "new_bet",
              data: payload,
            });
          }
        )
        .subscribe(),

      supabase
        .channel("platform_stats_changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "platform_stats",
          },
          (payload) => {
            setLastMessage({
              type: "platform_stats_update",
              data: payload,
            });
          }
        )
        .subscribe(),
    ];

    subscriptionsRef.current = subscriptions;
    setIsConnected(true);

    return () => {
      subscriptions.forEach((subscription) => {
        supabase.removeChannel(subscription);
      });
      setIsConnected(false);
    };
  }, []);

  const sendMessage = (message: WebSocketMessage) => {
    const channel = supabase.channel("custom_messages");
    channel.send({
      type: "broadcast",
      event: "custom_message",
      payload: message,
    });
  };

  return {
    isConnected,
    lastMessage,
    sendMessage,
  };
}
