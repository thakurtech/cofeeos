'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    ArrowLeft,
    ArrowRight,
    Building2,
    User,
    Palette,
    Check,
    Loader2,
    Coffee,
    Smartphone,
    MapPin,
    Mail,
    Phone,
    CreditCard
} from 'lucide-react';
import { toast } from 'sonner';

const steps = [
    { id: 1, title: 'Cafe Details', icon: Building2 },
    { id: 2, title: 'Owner Account', icon: User },
    { id: 3, title: 'Branding', icon: Palette },
    { id: 4, title: 'Review', icon: Check },
];

export default function NewCafePage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const [cafeData, setCafeData] = useState({
        // Step 1: Cafe Details
        name: '',
        slug: '',
        address: '',
        phone: '',
        email: '',

        // Step 2: Owner Account
        ownerName: '',
        ownerEmail: '',
        ownerPhone: '',
        ownerPassword: '',

        // Step 3: Branding
        themeColor: '#BF5700',
        tagline: '',
        upiId: '',
        gstNumber: '',
    });

    const updateField = (field: string, value: string) => {
        setCafeData(prev => ({ ...prev, [field]: value }));

        // Auto-generate slug from name
        if (field === 'name') {
            const slug = value.toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');
            setCafeData(prev => ({ ...prev, slug }));
        }
    };

    const validateStep = (step: number): boolean => {
        switch (step) {
            case 1:
                if (!cafeData.name || !cafeData.slug) {
                    toast.error('Cafe name and slug are required');
                    return false;
                }
                return true;
            case 2:
                if (!cafeData.ownerName || !cafeData.ownerEmail || !cafeData.ownerPassword) {
                    toast.error('Owner name, email and password are required');
                    return false;
                }
                if (cafeData.ownerPassword.length < 6) {
                    toast.error('Password must be at least 6 characters');
                    return false;
                }
                return true;
            case 3:
                return true; // Optional fields
            default:
                return true;
        }
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 4));
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        console.log("🚀 Starting cafe creation...");

        try {
            const token = localStorage.getItem('auth_token');
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

            console.log("📦 Payload:", {
                name: cafeData.name,
                slug: cafeData.slug,
                ownerEmail: cafeData.ownerEmail
            });

            // Single API call to create shop with owner
            const response = await fetch(`${API_URL}/shops/with-owner`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    // Shop data
                    name: cafeData.name,
                    slug: cafeData.slug,
                    address: cafeData.address,
                    phone: cafeData.phone,
                    email: cafeData.email,
                    themeColor: cafeData.themeColor,
                    upiId: cafeData.upiId,
                    // Owner data
                    ownerName: cafeData.ownerName,
                    ownerEmail: cafeData.ownerEmail,
                    ownerPhone: cafeData.ownerPhone || cafeData.phone,
                    ownerPassword: cafeData.ownerPassword,
                }),
            });

            console.log("📡 Response status:", response.status);

            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                console.error("❌ API Error:", error);
                throw new Error(error.message || 'Failed to create cafe');
            }

            console.log("✅ Success!");
            toast.success('Cafe created successfully! Owner can now login with their email and password.');
            router.push('/super-admin/cafes');

        } catch (error: any) {
            console.error('❌ Error creating cafe:', error);
            toast.error(error.message || 'Failed to create cafe');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fef9f3] to-white p-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Cafes
                    </Button>
                    <h1 className="text-3xl font-bold text-[#2B1A12]">Create New Cafe</h1>
                    <p className="text-[#5C4033] mt-2">Set up a new cafe with owner account</p>
                </div>

                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex justify-between">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex-1 relative">
                                <div className="flex items-center">
                                    <div className={`
                                        w-10 h-10 rounded-full flex items-center justify-center z-10
                                        ${currentStep >= step.id
                                            ? 'bg-[#BF5700] text-white'
                                            : 'bg-[#e8dfd6] text-[#5C4033]'
                                        }
                                    `}>
                                        {currentStep > step.id ? (
                                            <Check className="w-5 h-5" />
                                        ) : (
                                            <step.icon className="w-5 h-5" />
                                        )}
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`
                                            flex-1 h-1 mx-2
                                            ${currentStep > step.id ? 'bg-[#BF5700]' : 'bg-[#e8dfd6]'}
                                        `} />
                                    )}
                                </div>
                                <p className={`text-xs mt-2 ${currentStep >= step.id ? 'text-[#2B1A12] font-medium' : 'text-[#5C4033]'}`}>
                                    {step.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Content */}
                <Card className="p-6 border-2 border-[#e8dfd6]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {currentStep === 1 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-[#BF5700]/10 flex items-center justify-center">
                                            <Coffee className="w-6 h-6 text-[#BF5700]" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-[#2B1A12]">Cafe Details</h2>
                                            <p className="text-sm text-[#5C4033]">Basic information about the cafe</p>
                                        </div>
                                    </div>

                                    <div className="grid gap-4">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <Label>Cafe Name *</Label>
                                                <Input
                                                    value={cafeData.name}
                                                    onChange={e => updateField('name', e.target.value)}
                                                    placeholder="Cafe Noir"
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label>Slug (URL) *</Label>
                                                <div className="flex items-center mt-1">
                                                    <span className="text-sm text-[#5C4033] mr-2">cafeos.app/</span>
                                                    <Input
                                                        value={cafeData.slug}
                                                        onChange={e => updateField('slug', e.target.value)}
                                                        placeholder="cafe-noir"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <Label className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" /> Address
                                            </Label>
                                            <Textarea
                                                value={cafeData.address}
                                                onChange={e => updateField('address', e.target.value)}
                                                placeholder="123 Coffee Lane, Mumbai"
                                                className="mt-1"
                                            />
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <Label className="flex items-center gap-2">
                                                    <Phone className="w-4 h-4" /> Phone
                                                </Label>
                                                <Input
                                                    value={cafeData.phone}
                                                    onChange={e => updateField('phone', e.target.value)}
                                                    placeholder="+91 98765 43210"
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label className="flex items-center gap-2">
                                                    <Mail className="w-4 h-4" /> Email
                                                </Label>
                                                <Input
                                                    type="email"
                                                    value={cafeData.email}
                                                    onChange={e => updateField('email', e.target.value)}
                                                    placeholder="hello@cafenoir.com"
                                                    className="mt-1"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                                            <User className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-[#2B1A12]">Owner Account</h2>
                                            <p className="text-sm text-[#5C4033]">Create login credentials for the cafe owner</p>
                                        </div>
                                    </div>

                                    <div className="grid gap-4">
                                        <div>
                                            <Label>Full Name *</Label>
                                            <Input
                                                value={cafeData.ownerName}
                                                onChange={e => updateField('ownerName', e.target.value)}
                                                placeholder="Rahul Sharma"
                                                className="mt-1"
                                            />
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <Label>Email *</Label>
                                                <Input
                                                    type="email"
                                                    value={cafeData.ownerEmail}
                                                    onChange={e => updateField('ownerEmail', e.target.value)}
                                                    placeholder="rahul@cafenoir.com"
                                                    className="mt-1"
                                                />
                                            </div>
                                            <div>
                                                <Label>Phone</Label>
                                                <Input
                                                    value={cafeData.ownerPhone}
                                                    onChange={e => updateField('ownerPhone', e.target.value)}
                                                    placeholder="+91 98765 43210"
                                                    className="mt-1"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label>Password *</Label>
                                            <Input
                                                type="password"
                                                value={cafeData.ownerPassword}
                                                onChange={e => updateField('ownerPassword', e.target.value)}
                                                placeholder="Minimum 6 characters"
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
                                            <Palette className="w-6 h-6 text-pink-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-[#2B1A12]">Branding & Payments</h2>
                                            <p className="text-sm text-[#5C4033]">Customize appearance and payment settings</p>
                                        </div>
                                    </div>

                                    <div className="grid gap-4">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <Label>Theme Color</Label>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <input
                                                        type="color"
                                                        value={cafeData.themeColor}
                                                        onChange={e => updateField('themeColor', e.target.value)}
                                                        className="w-12 h-12 rounded-lg cursor-pointer border-2 border-[#e8dfd6]"
                                                    />
                                                    <Input
                                                        value={cafeData.themeColor}
                                                        onChange={e => updateField('themeColor', e.target.value)}
                                                        className="font-mono"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <Label>Tagline</Label>
                                                <Input
                                                    value={cafeData.tagline}
                                                    onChange={e => updateField('tagline', e.target.value)}
                                                    placeholder="Best Coffee in Town"
                                                    className="mt-1"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <Label className="flex items-center gap-2">
                                                    <Smartphone className="w-4 h-4" /> UPI ID
                                                </Label>
                                                <Input
                                                    value={cafeData.upiId}
                                                    onChange={e => updateField('upiId', e.target.value)}
                                                    placeholder="cafenoir@upi"
                                                    className="mt-1"
                                                />
                                                <p className="text-xs text-[#5C4033] mt-1">For QR payment generation</p>
                                            </div>
                                            <div>
                                                <Label className="flex items-center gap-2">
                                                    <CreditCard className="w-4 h-4" /> GST Number
                                                </Label>
                                                <Input
                                                    value={cafeData.gstNumber}
                                                    onChange={e => updateField('gstNumber', e.target.value)}
                                                    placeholder="29ABCDE1234F1Z5"
                                                    className="mt-1"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 4 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                                            <Check className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-[#2B1A12]">Review & Create</h2>
                                            <p className="text-sm text-[#5C4033]">Confirm the details before creating</p>
                                        </div>
                                    </div>

                                    <div className="grid gap-6">
                                        <div className="bg-[#fef9f3] p-4 rounded-xl">
                                            <h3 className="font-semibold text-[#2B1A12] mb-3">Cafe Details</h3>
                                            <div className="grid sm:grid-cols-2 gap-2 text-sm">
                                                <div><span className="text-[#5C4033]">Name:</span> {cafeData.name}</div>
                                                <div><span className="text-[#5C4033]">Slug:</span> {cafeData.slug}</div>
                                                <div><span className="text-[#5C4033]">Phone:</span> {cafeData.phone || '-'}</div>
                                                <div><span className="text-[#5C4033]">Email:</span> {cafeData.email || '-'}</div>
                                            </div>
                                        </div>

                                        <div className="bg-purple-50 p-4 rounded-xl">
                                            <h3 className="font-semibold text-[#2B1A12] mb-3">Owner Account</h3>
                                            <div className="grid sm:grid-cols-2 gap-2 text-sm">
                                                <div><span className="text-[#5C4033]">Name:</span> {cafeData.ownerName}</div>
                                                <div><span className="text-[#5C4033]">Email:</span> {cafeData.ownerEmail}</div>
                                            </div>
                                        </div>

                                        <div className="bg-pink-50 p-4 rounded-xl">
                                            <h3 className="font-semibold text-[#2B1A12] mb-3">Branding & Payments</h3>
                                            <div className="grid sm:grid-cols-2 gap-2 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[#5C4033]">Theme:</span>
                                                    <div
                                                        className="w-5 h-5 rounded-full border"
                                                        style={{ backgroundColor: cafeData.themeColor }}
                                                    />
                                                    {cafeData.themeColor}
                                                </div>
                                                <div><span className="text-[#5C4033]">UPI:</span> {cafeData.upiId || '-'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-[#e8dfd6]">
                        <Button
                            variant="outline"
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className="border-[#e8dfd6]"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Previous
                        </Button>

                        {currentStep < 4 ? (
                            <Button
                                onClick={nextStep}
                                className="bg-[#BF5700] hover:bg-[#A04000]"
                            >
                                Next
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        ) : (
                            <Button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <Check className="w-4 h-4 mr-2" />
                                        Create Cafe
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}
