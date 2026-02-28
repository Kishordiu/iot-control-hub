import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";
import { useEffect } from "react";

export type DeviceLog = {
  id: string;
  device_uid: string;
  level: "info" | "warning" | "critical";
  message: string;
  created_at: string;
};

export function useDeviceLogs(deviceUid?: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["device_logs", deviceUid],
    queryFn: async () => {
      let queryBuilder = supabase
        .from("device_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (deviceUid) {
        queryBuilder = queryBuilder.eq("device_uid", deviceUid);
      }

      const { data, error } = await queryBuilder;

      if (error) throw error;

      return data as DeviceLog[];
    },
  });

  // 🔥 REALTIME SUBSCRIPTION
  useEffect(() => {
    const channel = supabase
      .channel("device_logs_realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "device_logs",
        },
        (payload) => {
          const newLog = payload.new as DeviceLog;

          if (!deviceUid || newLog.device_uid === deviceUid) {
            queryClient.invalidateQueries({
              queryKey: ["device_logs", deviceUid],
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [deviceUid, queryClient]);

  return query;
}