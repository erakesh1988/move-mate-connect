import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/AuthProvider";

const CustomerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user?.user_metadata?.first_name || 'Customer'}</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Move</CardTitle>
            <CardDescription>Track and manage your relocation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">No active moves yet. Start planning your relocation!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Saved Neighborhoods</CardTitle>
            <CardDescription>Areas you're interested in</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">You haven't saved any neighborhoods yet.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDashboard;