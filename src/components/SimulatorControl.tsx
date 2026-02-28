import { supabase } from "@/supabaseClient";
import { useToast } from "@/hooks/use-toast";

export function SimulatorControl() {
  const { toast } = useToast();

  const runSimulator = async () => {
    const { error } = await supabase.rpc("run_device_simulator");

    if (error) {
      toast({
        title: "Simulator Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Simulator Executed",
        description: "Pending commands processed",
      });
    }
  };

  return (
    <button
      onClick={runSimulator}
      className="px-4 py-2 bg-purple-600 text-white rounded-lg"
    >
      Run Device Simulator
    </button>
  );
}