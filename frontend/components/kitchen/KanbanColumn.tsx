import { OrderTicket } from "./OrderTicket"

interface KanbanColumnProps {
    title: string
    color: string
    titleColor: string
    orders: any[]
    onMove: (id: string) => void
    nextLabel: string
}

export function KanbanColumn({ title, color, titleColor, orders, onMove, nextLabel }: KanbanColumnProps) {
    return (
        <div className={`rounded-xl border ${color} flex flex-col h-full`}>
            <div className={`p-4 border-b ${color} flex justify-between items-center`}>
                <h2 className={`text-lg font-bold uppercase tracking-wider ${titleColor}`}>{title}</h2>
                <span className="bg-white/10 px-2 py-1 rounded text-xs font-mono">{orders.length}</span>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto flex-1">
                {orders.map(order => (
                    <OrderTicket
                        key={order.id}
                        order={order}
                        onAction={() => onMove(order.id)}
                        actionLabel={nextLabel}
                    />
                ))}
            </div>
        </div>
    )
}
