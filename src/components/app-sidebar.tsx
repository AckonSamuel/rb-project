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
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useState } from "react";

// This is sample data.
const data = [
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
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const [navData, setNavData] = useState<any>(data);

  const handleNavigate = (parentIndex: number, childIndex: number) => {
    setNavData((prevNavData: any[]) => 
      prevNavData.map((section, sectionIdx) => ({
        ...section,
        items: section.items.map((item: any, itemIdx: any) => ({
          ...item,
          isActive: sectionIdx === parentIndex && itemIdx === childIndex, // Activate only the clicked item
        })),
      }))
    );
  };
  


  return (
    <Sidebar {...props} className="bg-red-500" style={{ width: "200px" }}>
      <SidebarHeader>
        <h2 className="text-white text-center text-2xl mt-2 font-bold mb-8">RB</h2>
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden hide-scrollbar">
        {navData.map((section: any, sectionIdx: number) => (
          <div key={section.title}>
            {section.title === "General" && (
              <hr className="border-[#9e9a9a] w-[85%] mr-2 ml-auto mt-8 mb-2" />
            )}
            <div
              className={`text-white text-md mb-4 ml-6 ${section.title === "General" ? "text-[#9e9a9a]" : "mb-8"
                }`}
            >
              {section.title}
            </div>
            <div>
              {section.items.map((item: any, itemIdx: number) => (
                <div
                  key={item.title}
                  onClick={() => handleNavigate(sectionIdx, itemIdx)} // Pass parent and child indices
                  className="w-full cursor-pointer"
                >
                  <div className="text-sm h-8 mb-2 flex gap-2">
                    <div
                      className={`h-8 w-1 rounded-lg mr-2 ${item.isActive ? "bg-[#9BF22B]" : ""
                        }`}
                    ></div>
                    <div
                      className={`${item.isActive ? "text-[#9BF22B]" : ""} my-auto`}
                    >
                      {item.icon}
                    </div>
                    <a
                      href={item.url}
                      className={`ml-2 my-auto ${item.isActive ? "text-white" : ""
                        }`}
                    >
                      {item.title}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <hr className="border-[#9e9a9a] w-[85%] mr-2 ml-auto mt-8 -mb-6" />
        <div className="flex gap-2 mt-8 ml-4 -mr-1">
          <div className="w-8 h-8 bg-[#9BF22B] mt-0 rounded-full"></div>
          <div>
            <p className="text-white text-xs -mb-1">Fandaww Punx</p>
            <small>fandaww6@gmail.com</small>
          </div>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>

  )
}
