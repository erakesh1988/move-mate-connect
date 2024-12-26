import type { User } from "@supabase/supabase-js";
import type { UserRole } from "@/constants/auth";

export const determineUserRole = (user: User | null, urlParams?: URLSearchParams): UserRole => {
  if (!user) return 'customer';
  
  console.log("Determining user role...");
  console.log("User metadata:", user.user_metadata);
  
  const roleFromUrl = urlParams?.get('role');
  console.log("Role from URL:", roleFromUrl);
  
  // Try to get role from different possible locations
  const role = (roleFromUrl as UserRole) || 
               (user.user_metadata?.role as UserRole) || 
               (user.app_metadata?.role as UserRole) || 
               'customer';
               
  console.log("Determined role:", role);
  return role as UserRole;
};