import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { USER_ROLES, type UserRole } from "@/constants/auth";
import { GoogleSignInButton } from "./GoogleSignInButton";

interface RoleSelectorProps {
  defaultRole?: UserRole;
}

export const RoleSelector = ({ defaultRole = "customer" }: RoleSelectorProps) => {
  const getRoleLabel = (role: string) => {
    return role === 'hr' ? 'HR' : role.charAt(0).toUpperCase() + role.slice(1);
  };

  const getRoleDescription = (role: UserRole) => {
    const descriptions = {
      customer: "Sign in as a Customer if you're an individual or employee planning to relocate",
      partner: "Sign in as a Partner if you're a relocation management company that helps multiple organizations manage their employee relocations",
      vendor: "Sign in as a Vendor if you provide specific relocation services like moving, storage, or housing",
      hr: "Sign in as HR if you're an internal HR professional managing relocations for your company's employees"
    };
    return descriptions[role];
  };

  return (
    <Tabs defaultValue={defaultRole} className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-8">
        {USER_ROLES.map((role) => (
          <TabsTrigger key={role} value={role}>
            {getRoleLabel(role)}
          </TabsTrigger>
        ))}
      </TabsList>
      {USER_ROLES.map((role) => (
        <TabsContent key={role} value={role}>
          <GoogleSignInButton role={role} />
          <p className="mt-4 text-sm text-gray-600 text-center">
            {getRoleDescription(role)}
          </p>
        </TabsContent>
      ))}
    </Tabs>
  );
};