"use client"

import { useState } from "react"
import { DashboardContent } from "@/components/dashboard-content"
import { DepositForm } from "@/components/deposit-form"
import { CreateAccountForm } from "@/components/create-account-form"
import { TransactionHistory } from "@/components/transaction-history"
import { UsersList } from "@/components/users-list"
import { Analytics } from "@/components/analytics"
import { DashboardLayout } from "@/components/dashboard-layout"

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === "dashboard" && <DashboardContent />}
      {activeTab === "deposit" && <DepositForm />}
      {activeTab === "create-account" && <CreateAccountForm />}
      {activeTab === "transactions" && <TransactionHistory />}
      {activeTab === "users" && <UsersList />}
      {activeTab === "analytics" && <Analytics />}
    </DashboardLayout>
  )
}
