import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/AuthProvider";

const HRDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user?.user_metadata?.first_name || 'HR Manager'}</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Employee Relocations</CardTitle>
            <CardDescription>Track your employees' moves</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">No active employee relocations.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Company Policies</CardTitle>
            <CardDescription>Manage relocation policies and benefits</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">No policies configured yet.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HRDashboard;