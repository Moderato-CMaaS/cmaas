import { Webhook, Gauge, ShieldCheck, ChartNoAxesCombined, CircleDollarSign, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Gauge,
  },
  {
    title: "API Key Management",
    url: "/api-keys",
    icon: Webhook,
  },
  {
    title: "Policy Management",
    url: "/policies",
    icon: ShieldCheck,
  },
  {
    title: "Usage Analytics",
    url: "/analytics",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: CircleDollarSign,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="px-3 py-2 mt-6 mb-4 flex items-center gap-2">
              <h2 className="text-xl font-semibold text-gray-800">MODERATO CMAAS</h2>
            </div>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <div className=" py-7">
              <SidebarMenu>
                <div className="space-y-3">
                  {items.map((item) => {
                    const isActive = location.pathname === item.url;

                    const linkClasses = `flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-gray-700 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                    }`;

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link to={item.url} className={linkClasses}>
                            <item.icon className="w-5 h-5" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </div>
              </SidebarMenu>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
