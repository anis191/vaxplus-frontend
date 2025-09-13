import RecentCampaigns from "../components/Dashboard/RecentCampaigns";
import StatCard from "../components/Dashboard/StatCard";

export default function Dashboard() {
  return (
    <div>
      <main className="p-6">
        {/* Stats */}
          <StatCard/>
        {/* Recent Camapigns*/}
          <RecentCampaigns />
      </main>
    </div>
  );
}