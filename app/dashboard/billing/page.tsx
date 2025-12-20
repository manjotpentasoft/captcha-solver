"use client";

import { useEffect, useState } from "react";
import { PricingCard } from "@/components/PricingCard";

interface Plan {
  id: number;
  name: string;
  price: number;
  credits: number;
  description?: string;
}

interface UserData {
  credits: number;
  currentPlan?: Plan | null;
}

export default function BillingPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const userRes = await fetch("/api/user");
        if (!userRes.ok) throw new Error("Failed to fetch user");
        const user = await userRes.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!userData) return <p>Failed to load billing info</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Billing & Plans</h1>

      <div className="rounded-3xl p-6 shadow-lg border border-primary/50 bg-primary/10">
        <h2 className="text-xl font-bold mb-4">
          Current Plan: {userData.currentPlan ? userData.currentPlan.name : "None"}
        </h2>
        <p className="text-md font-semibold">
          Credits Remaining: {userData.credits.toLocaleString()}
        </p>
      </div>
      <PricingCard />
    </div>
  );
}
