"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { BarChart3, CreditCard, History, Home, LogOut, Menu, Plus, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent } from "@/components/ui/sheet"

interface DashboardLayoutProps {
  children: React.ReactNode
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function DashboardLayout({ children, activeTab, setActiveTab }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "deposit", label: "Money Deposit", icon: CreditCard },
    { id: "create-account", label: "New User", icon: Plus },
    { id: "transactions", label: "Transaction History", icon: History },
    { id: "users", label: "Users", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ]

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200">
        <div className="p-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/kifcash-logo.png"
              alt="KifCash Logo"
              width={140}
              height={50}
              className="h-auto"
              priority
            />
          </Link>
        </div>
        <nav className="flex-1 px-4 py-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full px-4 py-3 text-sm rounded-lg transition-colors ${
                  activeTab === item.id ? "bg-[#a9bd4f]/10 text-[#a9bd4f]" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 ${activeTab === item.id ? "text-[#a9bd4f]" : "text-gray-500"}`} />
                {item.label}
              </button>
            )
          })}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer">
            <LogOut className="h-5 w-5 text-gray-500" />
            Logout
          </div>
        </div>
      </aside>

      {/* Mobile Menu Button and Sheet */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <div className="p-6 border-b">
            <Image
              src="/images/kifcash-logo.png"
              alt="KifCash Logo"
              width={120}
              height={40}
              className="h-auto"
              priority
            />
          </div>
          <nav className="flex-1 px-4 py-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`flex items-center w-full px-4 py-3 text-sm rounded-lg transition-colors ${
                    activeTab === item.id ? "bg-[#a9bd4f]/10 text-[#a9bd4f]" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className={`mr-3 h-5 w-5 ${activeTab === item.id ? "text-[#a9bd4f]" : "text-gray-500"}`} />
                  {item.label}
                </button>
              )
            })}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer">
              <LogOut className="h-5 w-5 text-gray-500" />
              Logout
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
            <h1 className="text-xl font-semibold text-gray-800">
              {navItems.find((item) => item.id === activeTab)?.label}
            </h1>
          </div>
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="Agent" />
                    <AvatarFallback>MA</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
