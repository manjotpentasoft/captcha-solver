"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/dashboard/StatCard";
import { Zap, Activity, Package } from "lucide-react";

interface UserData {
  id: string;
  email: string;
  credits: number;
  currentPlan?: {
    id: string;
    name: string;
    price: number;
    credits: number;
    description: string;
  } | null;
}

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/user"); 
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!userData) return <p>Failed to load user data</p>;

  return (
    <div className="space-y-8">
      <p className="text-2xl font-bold">Dashboard Overview</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <StatCard
          title="Credits Remaining"
          value={userData.credits.toString()}
          icon={<Package size={40} />}
        />
        <StatCard
          title="Requests Today"
          value="87"
          icon={<Activity size={40} />}
        />
        <StatCard
          title="Current Plan"
          value={
            userData.currentPlan
              ? `${userData.currentPlan.name} (₹${userData.currentPlan.price})`
              : "None"
          }
          icon={<Zap size={40} />}
        />
      </div>

      <div className="rounded-3xl p-8 shadow-lg border border-primary/50 bg-primary/10">
        <h2 className="text-xl font-bold mb-4">API Key</h2>
        <code className="block p-4 rounded-xl font-mono border border-primary/20 bg-primary/10">
          api_key
        </code>
      </div>
    </div>
  );
}
