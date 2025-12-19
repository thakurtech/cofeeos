import { cn } from "@/lib/utils"

interface SkeletonProps {
    className?: string
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]",
                "skeletal-shimmer",
                className
            )}
        />
    )
}

export function SkeletonText({ className, lines = 3 }: { className?: string; lines?: number }) {
    return (
        <div className={cn("space-y-3", className)}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton key={i} className={cn("h-4", i === lines - 1 && "w-3/4")} />
            ))}
        </div>
    )
}

export function SkeletonCard() {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
            <div className="flex justify-between items-start">
                <Skeleton className="w-12 h-12 rounded-2xl" />
                <Skeleton className="w-16 h-6 rounded-full" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-24" />
            </div>
        </div>
    )
}

export function SkeletonChart() {
    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-10 w-32 rounded-xl" />
            </div>
            <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-end gap-2 h-24">
                        {Array.from({ length: 6 }).map((_, j) => (
                            <Skeleton
                                key={j}
                                className="flex-1"
                                style={{ height: `${Math.random() * 100}%` }}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
