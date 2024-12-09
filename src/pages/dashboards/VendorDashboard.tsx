import { useAuth } from "@/components/AuthProvider";

const VendorDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Vendor Dashboard</h1>
      <p>Welcome, {user?.user_metadata?.first_name || 'Vendor'}!</p>
    </div>
  );
};

export default VendorDashboard;