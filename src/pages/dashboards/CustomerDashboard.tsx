import { useAuth } from "@/components/AuthProvider";

const CustomerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Customer Dashboard</h1>
      <p>Welcome, {user?.user_metadata?.first_name || 'Customer'}!</p>
    </div>
  );
};

export default CustomerDashboard;