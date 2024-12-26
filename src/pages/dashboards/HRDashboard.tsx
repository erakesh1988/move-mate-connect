import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const HRDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const { data: employees, isLoading: isLoadingEmployees } = useQuery({
    queryKey: ["hr-employees", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hr_employees")
        .select(`
          id,
          company,
          employee:profiles!hr_employees_employee_id_fkey(
            id,
            first_name,
            last_name,
            moves(
              id,
              current_location,
              destination,
              move_date,
              status
            )
          )
        `)
        .eq("hr_id", user?.id);

      if (error) {
        toast.error("Error fetching employees");
        throw error;
      }

      return data;
    },
    enabled: !!user?.id,
  });

  if (isLoadingEmployees) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">HR Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {employees?.map((employee) => (
          <Card key={employee.id}>
            <CardHeader>
              <CardTitle>
                {employee.employee.first_name} {employee.employee.last_name}
              </CardTitle>
              <p className="text-sm text-gray-500">{employee.company}</p>
            </CardHeader>
            <CardContent>
              {employee.employee.moves?.length > 0 ? (
                employee.employee.moves.map((move) => (
                  <div key={move.id} className="mb-4">
                    <p className="font-medium">Move Status: {move.status}</p>
                    <p className="text-sm">From: {move.current_location}</p>
                    <p className="text-sm">To: {move.destination}</p>
                    <p className="text-sm">
                      Date: {move.move_date ? new Date(move.move_date).toLocaleDateString() : 'Not set'}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No moves planned</p>
              )}
            </CardContent>
          </Card>
        ))}
        
        {employees?.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">
            No employees found. Add employees to start tracking their relocations.
          </p>
        )}
      </div>
    </div>
  );
};

export default HRDashboard;