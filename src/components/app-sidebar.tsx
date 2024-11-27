import * as React from "react"
import { Users, Package, MessageCircle, Wallet, Settings, Shield, LayoutGrid , ChartColumnIncreasing} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Menu",
      url: "#",
      items: [
        {
          title: "Overview",
          url: "#",
          icon: <LayoutGrid size={20}/>,
          isActive: true,
        },
        {
          title: "Statistics",
          url: "#",
          icon: <ChartColumnIncreasing size={20}/>,
        },
        {
          title: "Customers",
          url: "#",
          icon: <Users size={20}/>,
        },
        {
          title: "Products",
          url: "#",
          icon: <Package size={20}/>,
        },
        {
          title: "Messages",
          url: "#",
          icon: <MessageCircle size={20}/>,
        },
        {
          title: "Wallet",
          url: "#",
          icon: <Wallet size={20}/>,
        },
      ],
    },
    {
      title: "General",
      url: "#",
      items: [
        {
          title: "Settings",
          url: "#",
          icon: <Settings size={20}/>,
        },
        {
          title: "Security",
          url: "#",
          icon: <Shield size={20}/>,
        }
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="bg-red-500">
      <SidebarHeader>
        <h2 className="text-white text-center font-bold">RB</h2>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <div>
                      {item.icon}
                      <a href={item.url}>{item.title}</a>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
