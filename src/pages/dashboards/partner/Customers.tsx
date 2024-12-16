import { useAuth } from "@/components/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Users, UserPlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const PartnerCustomers = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: customers, isLoading } = useQuery({
    queryKey: ['partner-customers', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partner_customers')
        .select(`
          customer_id,
          profiles:customer_id (
            first_name,
            last_name
          )
        `)
        .eq('partner_id', user?.id);

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-coral" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-powderblue to-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-midnight flex items-center gap-2">
            <Users className="w-8 h-8 text-coral" />
            Your Customers
          </h1>
          <Button className="bg-coral hover:bg-coral/90">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customers?.map((customer) => (
            <Card key={customer.customer_id} className="hover:border-coral transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-coral/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-coral" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {customer.profiles.first_name} {customer.profiles.last_name}
                    </h3>
                    <p className="text-sm text-gray-500">Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {customers?.length === 0 && (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <Users className="w-12 h-12 text-gray-400 mx-auto" />
                <h3 className="text-lg font-semibold text-gray-600">No Customers Yet</h3>
                <p className="text-gray-500">Start adding customers to manage their moves.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PartnerCustomers;