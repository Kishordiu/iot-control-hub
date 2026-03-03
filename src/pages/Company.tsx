import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Cpu, Wifi, Calendar } from "lucide-react";

export default function Company() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["company-overview"],
    queryFn: async () => {
      // Get logged-in user
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) throw userError;
      const user = userData?.user;

      // Total devices
      const { count: totalDevices, error: totalError } = await supabase
        .from("devices")
        .select("*", { count: "exact", head: true });

      if (totalError) throw totalError;

      // Active devices (verified + not in lockdown)
      const { count: activeDevices, error: activeError } =
        await supabase
          .from("devices")
          .select("*", { count: "exact", head: true })
          .eq("trust_state", "verified")
          .eq("lockdown", false);

      if (activeError) throw activeError;

      return {
        name: "ZeroTrust IoT",
        adminEmail: user?.email ?? "N/A",
        totalDevices: totalDevices ?? 0,
        activeDevices: activeDevices ?? 0,
        createdAt: user?.created_at ?? null,
      };
    },
  });

  if (isLoading) {
    return <div className="p-6 text-white">Loading company details...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Failed to load company details.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 text-white">
      <h1 className="text-3xl font-bold">Company</h1>
      <p className="text-muted-foreground">
        Organization overview
      </p>

      <div className="grid gap-4 md:grid-cols-2">

        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-4 flex items-center gap-4">
            <Cpu className="text-cyan-400" />
            <div>
              <p className="text-sm text-muted-foreground">
                COMPANY NAME
              </p>
              <p className="text-lg font-semibold">
                {data?.name}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-4 flex items-center gap-4">
            <Mail className="text-cyan-400" />
            <div>
              <p className="text-sm text-muted-foreground">
                ADMIN EMAIL
              </p>
              <p className="text-lg font-semibold">
                {data?.adminEmail}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-4 flex items-center gap-4">
            <Cpu className="text-cyan-400" />
            <div>
              <p className="text-sm text-muted-foreground">
                TOTAL DEVICES
              </p>
              <p className="text-lg font-semibold">
                {data?.totalDevices}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-4 flex items-center gap-4">
            <Wifi className="text-cyan-400" />
            <div>
              <p className="text-sm text-muted-foreground">
                ACTIVE DEVICES
              </p>
              <p className="text-lg font-semibold">
                {data?.activeDevices}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-lg md:col-span-2">
          <CardContent className="p-4 flex items-center gap-4">
            <Calendar className="text-cyan-400" />
            <div>
              <p className="text-sm text-muted-foreground">
                CREATED
              </p>
              <p className="text-lg font-semibold">
                {data?.createdAt
                  ? new Date(data.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}