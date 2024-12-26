import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/AuthProvider";

const PartnerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user?.user_metadata?.first_name || 'Partner'}</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Client Organizations</CardTitle>
            <CardDescription>Companies you're helping with relocations</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">No client organizations added yet.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Relocations</CardTitle>
            <CardDescription>Current employee moves you're managing</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">No active relocations at the moment.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerDashboard;