"use client"

import { useState } from "react"
import { CommandPalette } from "@/components/CommandPalette"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "sonner"
import { useHotkeys } from "react-hotkeys-hook"

export function UltraPremiumProviders({ children }: { children: React.ReactNode }) {
    const [commandOpen, setCommandOpen] = useState(false)

    // Global keyboard shortcuts
    useHotkeys("mod+k", (e) => {
        e.preventDefault()
        setCommandOpen(true)
    })

    useHotkeys("mod+/", () => {
        toast("Keyboard Shortcuts", {
            description: "⌘K - Command Palette, ⌘/ - This help",
            duration: 5000,
        })
    })

    return (
        <>
            {children}
            <CommandPalette open={commandOpen} setOpen={setCommandOpen} />
            <Toaster />
        </>
    )
}
