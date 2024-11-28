import * as React from "react"
import { IoIosMail } from "react-icons/io";
import { FaBoxOpen } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { IoBarChartSharp } from "react-icons/io5";
import { IoGrid } from "react-icons/io5";
import { FaWallet } from "react-icons/fa6";
import { PiGearFineBold } from "react-icons/pi";
import { BsShieldLockFill } from "react-icons/bs";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
          icon: <IoGrid size={25} />,
          isActive: true,
        },
        {
          title: "Statistics",
          url: "#",
          icon: <IoBarChartSharp size={25} />,
        },
        {
          title: "Customers",
          url: "#",
          icon: <HiUserGroup size={25} />,
        },
        {
          title: "Products",
          url: "#",
          icon: <FaBoxOpen size={25} />,
        },
        {
          title: "Messages",
          url: "#",
          icon: <IoIosMail size={30} />,
        },
        {
          title: "Wallet",
          url: "#",
          icon: <FaWallet size={25} />,
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
          icon: <PiGearFineBold size={25} />,
        },
        {
          title: "Security",
          url: "#",
          icon: <BsShieldLockFill size={25} />,
        }
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="bg-red-500" style={{ width: '200px'}}>
      <SidebarHeader>
        <h2 className="text-white text-center font-bold">RB</h2>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="ml-4 text-white text-md">{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <div className="text-sm flex mt-1 ml-4 gap-2">

                        <div className=""> {item.icon}</div>
                        <a href={item.url} className="ml-2">{item.title}</a>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <p className="text-white text-center text-sm">Version {data.versions[0]}</p>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
