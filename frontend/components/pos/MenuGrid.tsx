'use client';

import { useEffect, useState } from 'react';
import { MenuCategory, MenuItem } from '@/lib/types';
import { fetchMenu } from '@/lib/api';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCart } from '@/lib/store';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export function MenuGrid() {
    const [categories, setCategories] = useState<MenuCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const addItem = useCart((state) => state.addItem);

    useEffect(() => {
        fetchMenu()
            .then((data) => {
                setCategories(data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, []);

    if (loading) return <div className="p-8 text-center text-[#5C4033]">Loading Menu...</div>;

    return (
        <div className="h-full flex flex-col bg-[#fef9f3]">
            <Tabs defaultValue={categories[0]?.name} className="flex-1 flex flex-col">
                <div className="px-8 pt-6 pb-4">
                    <TabsList className="w-full justify-start h-12 bg-white border border-[#e8dfd6] p-1.5 rounded-2xl shadow-sm">
                        {categories.map((cat) => (
                            <TabsTrigger
                                key={cat.id}
                                value={cat.name}
                                className="text-md px-6 py-2 rounded-xl data-[state=active]:bg-[#BF5700] data-[state=active]:text-white data-[state=active]:shadow-lg font-medium transition-all"
                            >
                                {cat.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                <ScrollArea className="flex-1 px-8 pb-6">
                    {categories.map((cat) => (
                        <TabsContent key={cat.id} value={cat.name} className="mt-0">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {cat.items.map((item) => (
                                    <MenuItemCard key={item.id} item={item} onAdd={() => addItem(item, 1)} />
                                ))}
                            </div>
                        </TabsContent>
                    ))}
                </ScrollArea>
            </Tabs>
        </div>
    );
}

function MenuItemCard({ item, onAdd }: { item: MenuItem; onAdd: () => void }) {
    return (
        <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
            <Card className="overflow-hidden border border-[#e8dfd6] shadow-sm hover:shadow-xl transition-all cursor-pointer group h-full flex flex-col bg-white">
                <div className="aspect-[4/3] relative overflow-hidden bg-[#fef9f3]">
                    <img
                        src={item.image || `https://placehold.co/400x300/f5ede4/5c3d2e?text=${encodeURIComponent(item.name)}`}
                        alt={item.name}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-3 right-3">
                        <Button
                            size="icon"
                            className="h-10 w-10 rounded-full shadow-lg bg-[#BF5700] hover:bg-[#A04000] text-white"
                            onClick={(e) => { e.stopPropagation(); onAdd(); }}
                        >
                            <Plus className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base font-semibold line-clamp-1 text-[#2B1A12]">{item.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-1 flex-1">
                    <p className="text-xs text-[#5C4033] line-clamp-2">{item.description}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <span className="font-bold text-lg text-[#BF5700]">₹{item.price}</span>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
