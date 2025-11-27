"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Coffee } from "lucide-react"

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f8f5f2] to-[#fffcf8] flex items-center justify-center p-4">
            <div className="max-w-md text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#BF5700] to-[#8B4513] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Coffee className="w-10 h-10 text-white" />
                </div>

                <h1 className="text-4xl font-bold text-[#2B1A12] mb-4">Join CaféOS</h1>
                <p className="text-lg text-[#8B4513] mb-8">
                    Currently, cafe owners are onboarded through our platform team.
                </p>

                <div className="space-y-4">
                    <Link href="/table/1">
                        <Button className="w-full bg-[#BF5700] hover:bg-[#8B4513] text-white h-12">
                            Order as Customer
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>

                    <Link href="/login">
                        <Button variant="outline" className="w-full border-[#BF5700] text-[#BF5700] h-12">
                            Already have an account? Sign In
                        </Button>
                    </Link>
                </div>

                <p className="text-sm text-[#8B4513] mt-8">
                    Want to add your cafe to CaféOS? Contact us at{" "}
                    <a href="mailto:hello@cafeos.com" className="text-[#BF5700] hover:underline">
                        hello@cafeos.com
                    </a>
                </p>
            </div>
        </div>
    )
}
