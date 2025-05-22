"use client"

import type React from "react"

import { useState } from "react"
import { Check, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function CreateAccountForm() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [idType, setIdType] = useState("cin")
  const [idNumber, setIdNumber] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [verificationStep, setVerificationStep] = useState("basic")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirmation(true)
  }

  const handleConfirm = () => {
    // Process the account creation
    setShowConfirmation(false)
    // Reset form
    setFirstName("")
    setLastName("")
    setPhoneNumber("")
    setEmail("")
    setIdType("cin")
    setIdNumber("")
    setAddress("")
    setCity("")
    setVerificationStep("basic")
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Create New User Account</CardTitle>
          <CardDescription>Register a new client for KifCash services</CardDescription>
        </CardHeader>

        <Tabs defaultValue="basic" value={verificationStep} onValueChange={setVerificationStep}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="verification">Identity Verification</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit}>
            <TabsContent value="basic">
              <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+216 XX XXX XXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="button"
                    className="bg-[#a9bd4f] hover:bg-[#a9bd4f]/90"
                    onClick={() => setVerificationStep("verification")}
                  >
                    Next: Identity Verification
                  </Button>
                </div>
              </CardContent>
            </TabsContent>

            <TabsContent value="verification">
              <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="idType">ID Type</Label>
                    <Select value={idType} onValueChange={setIdType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ID type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cin">National ID Card (CIN)</SelectItem>
                        <SelectItem value="passport">Passport</SelectItem>
                        <SelectItem value="driver">Driver's License</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idNumber">ID Number</Label>
                    <Input
                      id="idNumber"
                      placeholder="Enter ID number"
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter full address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Select value={city} onValueChange={setCity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tunis">Tunis</SelectItem>
                        <SelectItem value="sfax">Sfax</SelectItem>
                        <SelectItem value="sousse">Sousse</SelectItem>
                        <SelectItem value="kairouan">Kairouan</SelectItem>
                        <SelectItem value="bizerte">Bizerte</SelectItem>
                        <SelectItem value="gabes">Gabes</SelectItem>
                        <SelectItem value="ariana">Ariana</SelectItem>
                        <SelectItem value="gafsa">Gafsa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>ID Document Upload</Label>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center">
                      <FileText className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Drag and drop or click to upload</p>
                      <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG, PDF (Max 5MB)</p>
                      <Button variant="outline" size="sm" className="mt-4">
                        Upload Document
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setVerificationStep("basic")}>
                    Back
                  </Button>
                  <Button type="submit" className="bg-[#a9bd4f] hover:bg-[#a9bd4f]/90">
                    Create Account
                  </Button>
                </div>
              </CardContent>
            </TabsContent>
          </form>
        </Tabs>
      </Card>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Account Creation</DialogTitle>
            <DialogDescription>Please verify the account information before confirming.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Name:</p>
                <p className="text-sm text-muted-foreground">
                  {firstName} {lastName}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Phone:</p>
                <p className="text-sm text-muted-foreground">{phoneNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium">ID Type:</p>
                <p className="text-sm text-muted-foreground capitalize">{idType}</p>
              </div>
              <div>
                <p className="text-sm font-medium">ID Number:</p>
                <p className="text-sm text-muted-foreground">{idNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium">City:</p>
                <p className="text-sm text-muted-foreground capitalize">{city}</p>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm} className="bg-[#a9bd4f] hover:bg-[#a9bd4f]/90">
              <Check className="mr-2 h-4 w-4" /> Confirm Account Creation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
