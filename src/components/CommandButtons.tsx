import { useIssueCommand } from "@/hooks/useDevices";
import { useToast } from "@/hooks/use-toast";

interface Props {
  deviceUid: string;
  tamperDetected: boolean;
}

export function CommandButtons({ deviceUid, tamperDetected }: Props) {
  const { mutate, isPending } = useIssueCommand();
  const { toast } = useToast();

  const send = (type: string) => {
    if (tamperDetected && type === "UNLOCK") {
      toast({
        title: "Security Blocked",
        description: "Device is in tamper state. Unlock disabled.",
        variant: "destructive",
      });
      return;
    }

    mutate(
      { deviceUid, commandType: type },
      {
        onSuccess: () =>
          toast({ title: `${type} command issued successfully` }),
      }
    );
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => send("LOCK")}
        disabled={isPending}
        className="px-4 py-2 bg-red-600 text-white rounded-lg"
      >
        Lock
      </button>

      <button
        onClick={() => send("UNLOCK")}
        disabled={isPending || tamperDetected}
        className="px-4 py-2 bg-green-600 text-white rounded-lg"
      >
        Unlock
      </button>

      <button
        onClick={() => send("ROTATE_KEYS")}
        disabled={isPending}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Rotate Keys
      </button>
    </div>
  );
}