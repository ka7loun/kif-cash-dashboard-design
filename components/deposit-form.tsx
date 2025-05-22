"use client"

import type React from "react"

import { useState } from "react"
import { Check, CreditCard, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DepositForm() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [method, setMethod] = useState("cash")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [userFound, setUserFound] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [userData, setUserData] = useState<{
    name: string
    phone: string
    lastTransaction: string
    accountType: string
  } | null>(null)

  const handleSearch = () => {
    if (phoneNumber.trim() === "") return

    setIsSearching(true)
    // Simulate API call to search for user
    setTimeout(() => {
      setIsSearching(false)
      setUserFound(true)
      setUserData({
        name: "Amine Ben Ali",
        phone: phoneNumber,
        lastTransaction: "May 8, 2025",
        accountType: "Standard",
      })
    }, 1000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirmation(true)
  }

  const handleConfirm = () => {
    // Process the deposit
    setShowConfirmation(false)
    // Reset form
    setPhoneNumber("")
    setAmount("")
    setMethod("cash")
    setUserFound(false)
    setUserData(null)
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Money Deposit</CardTitle>
          <CardDescription>Enter client details to process a deposit</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="phone">Client Phone Number</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="phone"
                  placeholder="+216 XX XXX XXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleSearch}
                disabled={isSearching || phoneNumber.trim() === ""}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {userFound && userData && (
            <Card className="border border-[#a9bd4f]/20 bg-[#a9bd4f]/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border">
                    <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={userData.name} />
                    <AvatarFallback>
                      {userData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="font-medium">{userData.name}</h3>
                    <p className="text-xs text-muted-foreground">Account Type: {userData.accountType}</p>
                    <p className="text-xs text-muted-foreground">Last Transaction: {userData.lastTransaction}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Deposit Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">TND</span>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    className="pl-14"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    disabled={!userFound}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Payment Method</Label>
                <RadioGroup
                  value={method}
                  onValueChange={setMethod}
                  className="grid grid-cols-2 gap-4"
                  disabled={!userFound}
                >
                  <div>
                    <RadioGroupItem value="cash" id="cash" className="peer sr-only" />
                    <Label
                      htmlFor="cash"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[#a9bd4f] [&:has([data-state=checked])]:border-[#a9bd4f]"
                    >
                      <CreditCard className="mb-3 h-6 w-6" />
                      Cash
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="d17" id="d17" className="peer sr-only" />
                    <Label
                      htmlFor="d17"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[#a9bd4f] [&:has([data-state=checked])]:border-[#a9bd4f]"
                    >
                      <CreditCard className="mb-3 h-6 w-6" />
                      D17
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#a9bd4f] hover:bg-[#a9bd4f]/90"
                disabled={!userFound || !amount}
              >
                Validate Deposit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deposit</DialogTitle>
            <DialogDescription>Please verify the deposit information before confirming.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Client:</span>
              <span className="font-medium">{userData?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone:</span>
              <span className="font-medium">{phoneNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-medium">{amount} TND</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Method:</span>
              <span className="font-medium capitalize">{method}</span>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm} className="bg-[#a9bd4f] hover:bg-[#a9bd4f]/90">
              <Check className="mr-2 h-4 w-4" /> Confirm Deposit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
