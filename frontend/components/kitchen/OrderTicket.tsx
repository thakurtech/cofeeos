import { Button } from "@/components/ui/button"
import { Clock, AlertTriangle } from "lucide-react"
import { useEffect, useState } from "react"

interface OrderTicketProps {
    order: any
    onAction: () => void
    actionLabel: string
}

export function OrderTicket({ order, onAction, actionLabel }: OrderTicketProps) {
    const [elapsed, setElapsed] = useState(0)

    // Update elapsed time every 30 seconds
    useEffect(() => {
        const updateElapsed = () => {
            setElapsed(Math.floor((Date.now() - new Date(order.createdAt).getTime()) / 60000))
        }
        updateElapsed()
        const interval = setInterval(updateElapsed, 30000)
        return () => clearInterval(interval)
    }, [order.createdAt])

    const isUrgent = elapsed >= 5
    const isCritical = elapsed >= 10

    return (
        <div className={`rounded-lg p-4 border shadow-lg transition-all duration-300 ${isCritical
                ? 'bg-red-900/30 border-red-500 animate-pulse'
                : isUrgent
                    ? 'bg-yellow-900/20 border-yellow-500/50'
                    : 'bg-[#2a2a2a] border-white/10'
            }`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-white">{order.shortId}</span>
                        {isUrgent && (
                            <AlertTriangle className={`w-5 h-5 ${isCritical ? 'text-red-400 animate-bounce' : 'text-yellow-400'}`} />
                        )}
                    </div>
                    <div className="text-xs text-gray-400">
                        {order.tableNumber ? `Table ${order.tableNumber} • Dine-in` : 'Takeaway'}
                    </div>
                </div>
                <div className={`flex items-center gap-1 text-xs font-mono px-2 py-1 rounded ${isCritical
                        ? 'bg-red-500 text-white font-bold'
                        : isUrgent
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-gray-700 text-gray-300'
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
                        {item.modifiers && item.modifiers.length > 0 && (
                            <div className="text-xs text-gray-500 pl-6">
                                {item.modifiers.join(", ")}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {order.notes && (
                <div className="mb-4 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded text-xs text-yellow-300">
                    📝 {order.notes}
                </div>
            )}

            <Button
                onClick={onAction}
                className={`w-full ${isCritical
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : isUrgent
                            ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                            : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                    }`}
            >
                {actionLabel}
            </Button>
        </div>
    )
}

