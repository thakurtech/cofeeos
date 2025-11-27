import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AffiliateSidebar } from "@/components/affiliate/AffiliateSidebar"

export default function AffiliateLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-[#f8f5f2]">
                <AffiliateSidebar />
                <main className="flex-1 flex flex-col min-h-screen">
                    <header className="h-16 border-b border-[#e6dcc8] bg-white/50 backdrop-blur-sm flex items-center px-6 sticky top-0 z-10">
                        <SidebarTrigger />
                        <h1 className="ml-4 text-xl font-serif font-bold text-[#2B1A12]">Affiliate Portal</h1>
                    </header>
                    <div className="p-6 flex-1 overflow-auto">
                        {children}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    )
}
