import { supabase } from "@/supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeviceCommand(deviceId: string) {
  const queryClient = useQueryClient();

  const updateDevice = useMutation({
    mutationFn: async (updates: any) => {
      const { error } = await supabase
        .from("devices")
        .update(updates)
        .eq("id", deviceId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["device", deviceId] });
      queryClient.invalidateQueries({ queryKey: ["devices"] });
    },
  });

  return {
    updateDevice,
  };
}