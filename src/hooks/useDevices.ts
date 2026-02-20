import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import type { Device, DashboardStats, DeviceCommand, PaginatedResponse } from "@/types/device";

export function useDevices(page = 1, pageSize = 20) {
  return useQuery<PaginatedResponse<Device>>({
    queryKey: ["devices", page, pageSize],
    queryFn: async () => {
      const { data } = await api.get("/devices", { params: { page, pageSize } });
      return data;
    },
  });
}

export function useDevice(id: string) {
  return useQuery<Device>({
    queryKey: ["device", id],
    queryFn: async () => {
      const { data } = await api.get(`/devices/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const { data } = await api.get("/dashboard/stats");
      return data;
    },
    refetchInterval: 30000,
  });
}

export function useDeviceCommand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (command: Omit<DeviceCommand, "issuedBy" | "timestamp">) => {
      const { data } = await api.post(`/devices/${command.deviceId}/commands`, {
        type: command.type,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devices"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
}
