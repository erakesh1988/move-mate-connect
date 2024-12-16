import { useAuth } from "@/components/AuthProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserPlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
          profiles!partner_customers_customer_id_fkey (
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

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers?.map((customer) => (
                <TableRow key={customer.customer_id}>
                  <TableCell>
                    {customer.profiles.first_name} {customer.profiles.last_name}
                  </TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {customers?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8">
                    <div className="text-gray-500">
                      <Users className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                      <p className="font-medium">No Customers Yet</p>
                      <p className="text-sm">Start adding customers to manage their moves.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PartnerCustomers;