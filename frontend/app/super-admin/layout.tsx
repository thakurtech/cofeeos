import { SuperAdminSidebar } from "@/components/super-admin/SuperAdminSidebar"

export default function SuperAdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-[#f8f5f2]">
            <SuperAdminSidebar />
            <main className="flex-1 ml-64">
                {children}
            </main>
        </div>
    )
}
