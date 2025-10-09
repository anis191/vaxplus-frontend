import RecentCampaigns from "../components/Dashboard/RecentCampaigns";
import StatCard from "../components/Dashboard/StatCard";
import useAuthContext from "../hooks/useAuthContext";

export default function Dashboard() {
  const {user} = useAuthContext()
  return (
    <div>
      <main className="p-6">
        {/* Stats */}
          <StatCard/>
        {/* Recent Camapigns*/}
        {!user.is_staff && ( 
          <RecentCampaigns />)}
      </main>
    </div>
  );
}