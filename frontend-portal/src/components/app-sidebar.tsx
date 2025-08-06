import { Webhook, Gauge, ShieldCheck, ChartNoAxesCombined, CircleDollarSign, Settings } from "lucide-react"
import { Link } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

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
    url: "#", // # must be replace with ur actual path
    icon: ShieldCheck,
  },
  {
    title: "Usage Analytics",
    url: "#",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Billing",
    url: "#",
    icon: CircleDollarSign,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]
export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Moderato CMaas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {item.url === "#" ? (   // this comditional check will be removed after updating all the paths
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    ) : (
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}