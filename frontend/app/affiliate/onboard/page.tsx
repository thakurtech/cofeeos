"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, ChevronRight, Store, User, Phone, Sparkles } from "lucide-react"
import Link from "next/link"

export default function OnboardCafePage() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        shopName: "",
        ownerName: "",
        phone: "",
    })

    const nextStep = () => setStep(step + 1)
    const prevStep = () => setStep(step - 1)

    return (
        <div className="max-w-2xl mx-auto py-12">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-serif font-bold text-[#2B1A12]">Add New Cafe</h2>
                <p className="text-[#8B4513]">Onboard a new partner and start earning commissions.</p>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-center mb-12">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step >= i ? 'bg-[#BF5700] text-white' : 'bg-[#e6dcc8] text-[#8B4513]'
                            }`}>
                            {step > i ? <Check className="w-5 h-5" /> : i}
                        </div>
                        {i < 3 && (
                            <div className={`w-16 h-1 bg-gray-200 mx-2 ${step > i ? 'bg-[#BF5700]' : 'bg-[#e6dcc8]'}`} />
                        )}
                    </div>
                ))}
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#e6dcc8] shadow-lg relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-[#BF5700]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Store className="w-8 h-8 text-[#BF5700]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#2B1A12]">Cafe Details</h3>
                            </div>
                            <div className="space-y-2">
                                <Label>Cafe Name</Label>
                                <Input
                                    placeholder="e.g. The Coffee House"
                                    value={formData.shopName}
                                    onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                                    className="h-12 text-lg"
                                />
                            </div>
                            <Button onClick={nextStep} className="w-full h-12 bg-[#BF5700] hover:bg-[#8B4513] text-white text-lg">
                                Next Step <ChevronRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-[#BF5700]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <User className="w-8 h-8 text-[#BF5700]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#2B1A12]">Owner Details</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Owner Name</Label>
                                    <Input
                                        placeholder="e.g. John Doe"
                                        value={formData.ownerName}
                                        onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                                        className="h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Phone Number</Label>
                                    <Input
                                        placeholder="+91 98765 43210"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="h-12"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Button variant="outline" onClick={prevStep} className="w-1/3 h-12">Back</Button>
                                <Button onClick={nextStep} className="w-2/3 h-12 bg-[#BF5700] hover:bg-[#8B4513] text-white">
                                    Review & Submit
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-6 py-8"
                        >
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                                <Sparkles className="w-12 h-12 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#2B1A12]">Success!</h3>
                            <p className="text-[#8B4513] max-w-md mx-auto">
                                <span className="font-bold">{formData.shopName}</span> has been added to your network.
                                An onboarding link has been sent to <span className="font-bold">{formData.phone}</span>.
                            </p>
                            <div className="p-4 bg-[#fffcf8] rounded-lg border border-[#e6dcc8] max-w-sm mx-auto mt-6">
                                <div className="text-xs text-[#8B4513] uppercase tracking-wide mb-1">Potential Earnings</div>
                                <div className="text-3xl font-bold text-[#BF5700]">+ ₹150<span className="text-sm text-[#8B4513] font-normal">/month</span></div>
                            </div>
                            <Link href="/affiliate/cafes">
                                <Button className="mt-8 bg-[#BF5700] hover:bg-[#8B4513] text-white px-8">
                                    Go to My Cafes
                                </Button>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
