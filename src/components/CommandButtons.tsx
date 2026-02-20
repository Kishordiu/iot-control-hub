import { Lock, Unlock, RotateCcw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeviceCommand } from "@/hooks/useDevices";
import { toast } from "@/hooks/use-toast";

interface CommandButtonsProps {
  deviceId: string;
}

export function CommandButtons({ deviceId }: CommandButtonsProps) {
  const { mutate, isPending } = useDeviceCommand();

  const execute = (type: "lock" | "unlock" | "reset" | "emergency_shutdown") => {
    mutate(
      { type, deviceId },
      {
        onSuccess: () => toast({ title: "Command sent", description: `${type} command issued to device.` }),
        onError: () => toast({ title: "Command failed", description: "Unable to send command.", variant: "destructive" }),
      }
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" variant="outline" disabled={isPending} onClick={() => execute("lock")} className="gap-1.5">
        <Lock className="h-3.5 w-3.5" /> Lock
      </Button>
      <Button size="sm" variant="outline" disabled={isPending} onClick={() => execute("unlock")} className="gap-1.5">
        <Unlock className="h-3.5 w-3.5" /> Unlock
      </Button>
      <Button size="sm" variant="outline" disabled={isPending} onClick={() => execute("reset")} className="gap-1.5">
        <RotateCcw className="h-3.5 w-3.5" /> Reset
      </Button>
      <Button size="sm" variant="destructive" disabled={isPending} onClick={() => execute("emergency_shutdown")} className="gap-1.5">
        <AlertTriangle className="h-3.5 w-3.5" /> Emergency Shutdown
      </Button>
    </div>
  );
}
