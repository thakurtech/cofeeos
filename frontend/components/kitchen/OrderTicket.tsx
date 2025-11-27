import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

interface OrderTicketProps {
    order: any
    onAction: () => void
    actionLabel: string
}

export function OrderTicket({ order, onAction, actionLabel }: OrderTicketProps) {
    const elapsed = Math.floor((Date.now() - new Date(order.createdAt).getTime()) / 60000)

    return (
        <div className="bg-[#2a2a2a] rounded-lg p-4 border border-white/10 shadow-lg">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="text-xl font-bold text-white">{order.shortId}</div>
                    <div className="text-xs text-gray-400">Table 4 • Dine-in</div>
                </div>
                <div className={`flex items-center gap-1 text-xs font-mono px-2 py-1 rounded ${elapsed > 15 ? 'bg-red-500/20 text-red-400' : 'bg-gray-700 text-gray-300'
                    }`}>
                    <Clock className="w-3 h-3" />
                    {elapsed}m
                </div>
            </div>

            <div className="space-y-2 mb-4">
                {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="text-sm">
                        <div className="flex justify-between text-gray-200">
                            <span><span className="font-bold text-[#BF5700]">{item.quantity}x</span> {item.name}</span>
                        </div>
                        {item.modifiers && (
                            <div className="text-xs text-gray-500 pl-6">
                                {item.modifiers.join(", ")}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <Button
                onClick={onAction}
                className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10"
            >
                {actionLabel}
            </Button>
        </div>
    )
}
