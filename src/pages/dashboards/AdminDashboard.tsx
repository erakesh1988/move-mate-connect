import { useAuth } from "@/components/AuthProvider";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, {user?.user_metadata?.first_name || 'Admin'}!</p>
    </div>
  );
};

export default AdminDashboard;