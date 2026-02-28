import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";
import { useEffect } from "react";

/* ===============================
   TYPES
================================ */

export type Device = {
  id: string;
  device_uid: string;
  trust_state: string;
  tamper_detected: boolean;
  lockdown: boolean;
  public_key: string | null;
  key_version: number;
  last_key_rotation: string | null;
  firmware_version: string | null;
  last_seen: string | null;
  metrics: any;
  created_at: string;
};

export type DeviceLog = {
  id: string;
  device_uid: string;
  event_type: string;
  severity: string;
  message: string;
  created_at: string;
};

/* ===============================
   GET ALL DEVICES
================================ */

export function useDevices() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["devices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("devices")
        .select("*")
        .order("last_seen", { ascending: false });

      if (error) throw error;
      return data as Device[];
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel("devices-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "devices" },
        () => queryClient.invalidateQueries({ queryKey: ["devices"] })
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return query;
}

/* ===============================
   SINGLE DEVICE
================================ */

export function useDevice(id: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["device", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("devices")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (!id) return;

    const channel = supabase
      .channel("single-device-realtime")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "devices",
          filter: `id=eq.${id}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["device", id] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, queryClient]);

  return query;
}

/* ===============================
   DEVICE LOGS
================================ */

export function useDeviceLogs(deviceUid?: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["device_logs", deviceUid],
    queryFn: async () => {
      if (!deviceUid) return [];

      const { data, error } = await supabase
        .from("device_logs")
        .select("*")
        .eq("device_uid", deviceUid)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as DeviceLog[];
    },
    enabled: !!deviceUid,
  });

  useEffect(() => {
    if (!deviceUid) return;

    const channel = supabase
      .channel("logs-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "device_logs",
          filter: `device_uid=eq.${deviceUid}`,
        },
        () =>
          queryClient.invalidateQueries({
            queryKey: ["device_logs", deviceUid],
          })
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [deviceUid, queryClient]);

  return query;
}

/* ===============================
   ISSUE COMMAND
================================ */

export function useIssueCommand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      deviceUid,
      commandType,
    }: {
      deviceUid: string;
      commandType: string;
    }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error } = await supabase
        .from("device_commands")
        .insert({
          device_uid: deviceUid,
          command_type: commandType,
          issued_by: user?.id ?? null,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devices"] });
    },
  });
}