import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/AuthProvider";

const VendorDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user?.user_metadata?.first_name || 'Vendor'}</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Service Requests</CardTitle>
            <CardDescription>Manage incoming service requests</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">No pending service requests.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Service Areas</CardTitle>
            <CardDescription>Locations where you provide services</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">No service areas configured yet.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorDashboard;