import { useAuth } from "@/components/AuthProvider";

const PartnerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Partner Dashboard</h1>
      <p>Welcome, {user?.user_metadata?.first_name || 'Partner'}!</p>
    </div>
  );
};

export default PartnerDashboard;