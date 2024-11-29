import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { useRouter } from "next/router";
import { ChevronDown } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", { method: "POST" });
      if (response.ok) {
        router.push("/login");
      } else {
        alert("Failed to logout. Please try again.");
      }
    } catch (err) {
      console.error("Logout error:", err);
      alert("An error occurred during logout.");
    }
  };
  return (
<SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="bg-white">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-2xl font-bold text-gray-800">Sales Admin</h1>
          <ChevronDown className="text-gray-500"/>
          <Button variant="destructive" onClick={handleLogout} style={{ marginLeft: "auto"}}>
            Logout
          </Button>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
            {children}
        </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
