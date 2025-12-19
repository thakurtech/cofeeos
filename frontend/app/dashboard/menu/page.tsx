'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
    Plus,
    Pencil,
    Trash2,
    Coffee,
    GripVertical,
    ChevronDown,
    ChevronUp,
    X,
    Save,
    Loader2,
    ImagePlus
} from 'lucide-react';
import { useAuth, useShop } from '@/lib/auth-context';
import { toast } from 'sonner';

interface MenuItem {
    id: string;
    name: string;
    description?: string;
    price: number;
    image?: string;
    isAvailable: boolean;
}

interface MenuCategory {
    id: string;
    name: string;
    sortOrder: number;
    items: MenuItem[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function MenuManagementPage() {
    const { user } = useAuth();
    const shop = useShop();
    const [categories, setCategories] = useState<MenuCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    // Modal states
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showItemModal, setShowItemModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<MenuCategory | null>(null);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    // Form states
    const [categoryName, setCategoryName] = useState('');
    const [itemForm, setItemForm] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        isAvailable: true,
    });
    const [isSaving, setIsSaving] = useState(false);

    // Fetch categories
    useEffect(() => {
        async function fetchMenu() {
            if (!shop?.id) return;

            try {
                const token = localStorage.getItem('auth_token');
                const res = await fetch(`${API_URL}/menu/categories?shopId=${shop.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.ok) {
                    const data = await res.json();
                    setCategories(data);
                    if (data.length > 0) {
                        setExpandedCategory(data[0].id);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch menu:', error);
                toast.error('Failed to load menu');
            } finally {
                setLoading(false);
            }
        }

        fetchMenu();
    }, [shop?.id]);

    // Category CRUD
    const handleSaveCategory = async () => {
        if (!categoryName.trim() || !shop?.id) return;
        setIsSaving(true);

        try {
            const token = localStorage.getItem('auth_token');
            const url = editingCategory
                ? `${API_URL}/menu/categories/${editingCategory.id}`
                : `${API_URL}/menu/categories`;

            const res = await fetch(url, {
                method: editingCategory ? 'PATCH' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: categoryName,
                    shopId: shop.id,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                if (editingCategory) {
                    setCategories(prev => prev.map(c => c.id === data.id ? data : c));
                    toast.success('Category updated');
                } else {
                    setCategories(prev => [...prev, data]);
                    toast.success('Category created');
                }
                closeModals();
            }
        } catch (error) {
            toast.error('Failed to save category');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteCategory = async (categoryId: string) => {
        if (!confirm('Delete this category and all its items?')) return;

        try {
            const token = localStorage.getItem('auth_token');
            const res = await fetch(`${API_URL}/menu/categories/${categoryId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.ok) {
                setCategories(prev => prev.filter(c => c.id !== categoryId));
                toast.success('Category deleted');
            }
        } catch (error) {
            toast.error('Failed to delete category');
        }
    };

    // Item CRUD
    const handleSaveItem = async () => {
        if (!itemForm.name.trim() || !itemForm.price || !selectedCategoryId) return;
        setIsSaving(true);

        try {
            const token = localStorage.getItem('auth_token');
            const url = editingItem
                ? `${API_URL}/menu/items/${editingItem.id}`
                : `${API_URL}/menu/items`;

            const res = await fetch(url, {
                method: editingItem ? 'PATCH' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...itemForm,
                    price: parseFloat(itemForm.price),
                    categoryId: selectedCategoryId,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                setCategories(prev => prev.map(c => {
                    if (c.id === selectedCategoryId) {
                        if (editingItem) {
                            return { ...c, items: c.items.map(i => i.id === data.id ? data : i) };
                        } else {
                            return { ...c, items: [...c.items, data] };
                        }
                    }
                    return c;
                }));
                toast.success(editingItem ? 'Item updated' : 'Item created');
                closeModals();
            }
        } catch (error) {
            toast.error('Failed to save item');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteItem = async (categoryId: string, itemId: string) => {
        if (!confirm('Delete this item?')) return;

        try {
            const token = localStorage.getItem('auth_token');
            const res = await fetch(`${API_URL}/menu/items/${itemId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.ok) {
                setCategories(prev => prev.map(c => {
                    if (c.id === categoryId) {
                        return { ...c, items: c.items.filter(i => i.id !== itemId) };
                    }
                    return c;
                }));
                toast.success('Item deleted');
            }
        } catch (error) {
            toast.error('Failed to delete item');
        }
    };

    const handleToggleAvailability = async (categoryId: string, item: MenuItem) => {
        try {
            const token = localStorage.getItem('auth_token');
            const res = await fetch(`${API_URL}/menu/items/${item.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ isAvailable: !item.isAvailable }),
            });

            if (res.ok) {
                setCategories(prev => prev.map(c => {
                    if (c.id === categoryId) {
                        return {
                            ...c,
                            items: c.items.map(i =>
                                i.id === item.id ? { ...i, isAvailable: !i.isAvailable } : i
                            ),
                        };
                    }
                    return c;
                }));
                toast.success(item.isAvailable ? 'Marked as out of stock' : 'Marked as available');
            }
        } catch (error) {
            toast.error('Failed to update availability');
        }
    };

    const closeModals = () => {
        setShowCategoryModal(false);
        setShowItemModal(false);
        setEditingCategory(null);
        setEditingItem(null);
        setCategoryName('');
        setItemForm({ name: '', description: '', price: '', image: '', isAvailable: true });
    };

    const openEditCategory = (category: MenuCategory) => {
        setEditingCategory(category);
        setCategoryName(category.name);
        setShowCategoryModal(true);
    };

    const openAddItem = (categoryId: string) => {
        setSelectedCategoryId(categoryId);
        setEditingItem(null);
        setItemForm({ name: '', description: '', price: '', image: '', isAvailable: true });
        setShowItemModal(true);
    };

    const openEditItem = (categoryId: string, item: MenuItem) => {
        setSelectedCategoryId(categoryId);
        setEditingItem(item);
        setItemForm({
            name: item.name,
            description: item.description || '',
            price: item.price.toString(),
            image: item.image || '',
            isAvailable: item.isAvailable,
        });
        setShowItemModal(true);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-[#BF5700]" />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#2B1A12]">Menu Management</h1>
                    <p className="text-[#5C4033]">Manage your cafe's menu categories and items</p>
                </div>
                <Button
                    onClick={() => {
                        setEditingCategory(null);
                        setCategoryName('');
                        setShowCategoryModal(true);
                    }}
                    className="bg-[#BF5700] hover:bg-[#A04000]"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                </Button>
            </div>

            {/* Categories */}
            <div className="space-y-4">
                {categories.length === 0 ? (
                    <Card className="p-12 text-center border-2 border-dashed border-[#e8dfd6]">
                        <Coffee className="w-12 h-12 mx-auto mb-4 text-[#e8dfd6]" />
                        <h3 className="font-semibold text-[#2B1A12] mb-2">No menu categories yet</h3>
                        <p className="text-[#5C4033] mb-4">Start by adding a category like "Coffee" or "Snacks"</p>
                        <Button onClick={() => setShowCategoryModal(true)} className="bg-[#BF5700]">
                            <Plus className="w-4 h-4 mr-2" />
                            Add First Category
                        </Button>
                    </Card>
                ) : (
                    categories.map(category => (
                        <Card key={category.id} className="border-2 border-[#e8dfd6] overflow-hidden">
                            <div
                                className="flex items-center justify-between p-4 bg-[#fef9f3] cursor-pointer"
                                onClick={() => setExpandedCategory(
                                    expandedCategory === category.id ? null : category.id
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <GripVertical className="w-5 h-5 text-[#5C4033]/50" />
                                    <h3 className="font-bold text-[#2B1A12]">{category.name}</h3>
                                    <span className="text-sm text-[#5C4033] bg-white px-2 py-0.5 rounded-full">
                                        {category.items.length} items
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => { e.stopPropagation(); openEditCategory(category); }}
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => { e.stopPropagation(); handleDeleteCategory(category.id); }}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    {expandedCategory === category.id ? (
                                        <ChevronUp className="w-5 h-5 text-[#5C4033]" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-[#5C4033]" />
                                    )}
                                </div>
                            </div>

                            <AnimatePresence>
                                {expandedCategory === category.id && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: 'auto' }}
                                        exit={{ height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-4 border-t border-[#e8dfd6]">
                                            {category.items.length === 0 ? (
                                                <p className="text-center text-[#5C4033] py-4">No items in this category</p>
                                            ) : (
                                                <div className="space-y-3">
                                                    {category.items.map(item => (
                                                        <div
                                                            key={item.id}
                                                            className={`flex items-center gap-4 p-3 rounded-xl ${item.isAvailable ? 'bg-white' : 'bg-gray-100 opacity-75'
                                                                }`}
                                                        >
                                                            {item.image ? (
                                                                <img
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    className="w-14 h-14 rounded-lg object-cover shrink-0"
                                                                />
                                                            ) : (
                                                                <div className="w-14 h-14 rounded-lg bg-[#fef9f3] flex items-center justify-center shrink-0">
                                                                    <Coffee className="w-6 h-6 text-[#5C4033]/50" />
                                                                </div>
                                                            )}
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className="font-semibold text-[#2B1A12]">{item.name}</h4>
                                                                <p className="text-sm text-[#5C4033] truncate">{item.description || 'No description'}</p>
                                                            </div>
                                                            <div className="text-right shrink-0">
                                                                <div className="font-bold text-[#BF5700]">₹{item.price}</div>
                                                                <div className="flex items-center gap-1 mt-1">
                                                                    <Switch
                                                                        checked={item.isAvailable}
                                                                        onCheckedChange={() => handleToggleAvailability(category.id, item)}
                                                                        className="scale-75"
                                                                    />
                                                                    <span className="text-xs text-[#5C4033]">
                                                                        {item.isAvailable ? 'In Stock' : 'Out'}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-1 shrink-0">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => openEditItem(category.id, item)}
                                                                >
                                                                    <Pencil className="w-4 h-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => handleDeleteItem(category.id, item.id)}
                                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            <Button
                                                variant="outline"
                                                className="w-full mt-4 border-dashed border-[#BF5700] text-[#BF5700]"
                                                onClick={() => openAddItem(category.id)}
                                            >
                                                <Plus className="w-4 h-4 mr-2" />
                                                Add Item
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Card>
                    ))
                )}
            </div>

            {/* Category Modal */}
            <AnimatePresence>
                {showCategoryModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                        onClick={closeModals}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="bg-white rounded-2xl p-6 w-full max-w-md"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-[#2B1A12]">
                                    {editingCategory ? 'Edit Category' : 'New Category'}
                                </h2>
                                <button onClick={closeModals} className="p-2">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="mb-6">
                                <Label>Category Name</Label>
                                <Input
                                    value={categoryName}
                                    onChange={e => setCategoryName(e.target.value)}
                                    placeholder="e.g., Hot Beverages"
                                    className="mt-1"
                                    autoFocus
                                />
                            </div>

                            <div className="flex gap-3">
                                <Button variant="outline" className="flex-1" onClick={closeModals}>
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1 bg-[#BF5700]"
                                    onClick={handleSaveCategory}
                                    disabled={isSaving}
                                >
                                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                                    Save
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Item Modal */}
            <AnimatePresence>
                {showItemModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                        onClick={closeModals}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-[#2B1A12]">
                                    {editingItem ? 'Edit Item' : 'New Item'}
                                </h2>
                                <button onClick={closeModals} className="p-2">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <Label>Item Name *</Label>
                                    <Input
                                        value={itemForm.name}
                                        onChange={e => setItemForm(f => ({ ...f, name: e.target.value }))}
                                        placeholder="e.g., Cappuccino"
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label>Description</Label>
                                    <Textarea
                                        value={itemForm.description}
                                        onChange={e => setItemForm(f => ({ ...f, description: e.target.value }))}
                                        placeholder="Rich espresso with steamed milk..."
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label>Price (₹) *</Label>
                                    <Input
                                        type="number"
                                        value={itemForm.price}
                                        onChange={e => setItemForm(f => ({ ...f, price: e.target.value }))}
                                        placeholder="150"
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label>Image URL</Label>
                                    <div className="flex gap-2 mt-1">
                                        <Input
                                            value={itemForm.image}
                                            onChange={e => setItemForm(f => ({ ...f, image: e.target.value }))}
                                            placeholder="https://..."
                                        />
                                        <Button variant="outline" size="icon">
                                            <ImagePlus className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <Label>Available</Label>
                                    <Switch
                                        checked={itemForm.isAvailable}
                                        onCheckedChange={checked => setItemForm(f => ({ ...f, isAvailable: checked }))}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button variant="outline" className="flex-1" onClick={closeModals}>
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1 bg-[#BF5700]"
                                    onClick={handleSaveItem}
                                    disabled={isSaving}
                                >
                                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                                    Save
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
