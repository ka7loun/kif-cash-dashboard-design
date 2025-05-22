"use client"

import { Search, Phone, Eye, UserCog } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample users data
const users = [
  {
    id: "U-1234",
    name: "Amine Ben Ali",
    phone: "+216 55 123 456",
    email: "amine.benali@example.com",
    transactions: 12,
    lastTransaction: "May 11, 2025",
    status: "active",
    accountType: "Standard",
  },
  {
    id: "U-1235",
    name: "Sarra Mansour",
    phone: "+216 55 234 567",
    email: "sarra.mansour@example.com",
    transactions: 8,
    lastTransaction: "May 10, 2025",
    status: "active",
    accountType: "Premium",
  },
  {
    id: "U-1236",
    name: "Youssef Trabelsi",
    phone: "+216 55 345 678",
    email: "youssef.trabelsi@example.com",
    transactions: 15,
    lastTransaction: "May 9, 2025",
    status: "active",
    accountType: "Standard",
  },
  {
    id: "U-1237",
    name: "Nour Bouazizi",
    phone: "+216 55 456 789",
    email: "nour.bouazizi@example.com",
    transactions: 5,
    lastTransaction: "May 8, 2025",
    status: "inactive",
    accountType: "Standard",
  },
  {
    id: "U-1238",
    name: "Karim Mejri",
    phone: "+216 55 567 890",
    email: "karim.mejri@example.com",
    transactions: 20,
    lastTransaction: "May 7, 2025",
    status: "active",
    accountType: "Business",
  },
  {
    id: "U-1239",
    name: "Leila Gharbi",
    phone: "+216 55 678 901",
    email: "leila.gharbi@example.com",
    transactions: 10,
    lastTransaction: "May 6, 2025",
    status: "active",
    accountType: "Standard",
  },
  {
    id: "U-1240",
    name: "Mehdi Khelifi",
    phone: "+216 55 789 012",
    email: "mehdi.khelifi@example.com",
    transactions: 7,
    lastTransaction: "May 5, 2025",
    status: "inactive",
    accountType: "Premium",
  },
  {
    id: "U-1241",
    name: "Fatma Riahi",
    phone: "+216 55 890 123",
    email: "fatma.riahi@example.com",
    transactions: 9,
    lastTransaction: "May 4, 2025",
    status: "active",
    accountType: "Standard",
  },
]

export function UsersList() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>

          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input placeholder="Search users..." className="pl-10 w-full sm:w-[250px]" />
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {users
              .filter((user) => user.status === "active")
              .map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="inactive" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {users
              .filter((user) => user.status === "inactive")
              .map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface UserCardProps {
  user: {
    id: string
    name: string
    phone: string
    email: string
    transactions: number
    lastTransaction: string
    status: string
    accountType: string
  }
}

function UserCard({ user }: UserCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{user.name}</CardTitle>
              <CardDescription className="text-xs">{user.email}</CardDescription>
            </div>
          </div>
          <Badge
            variant={user.status === "active" ? "default" : "secondary"}
            className={user.status === "active" ? "bg-[#1CB774]" : ""}
          >
            {user.status === "active" ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Phone:</span>
            <span>{user.phone}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Account Type:</span>
            <span>{user.accountType}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Transactions:</span>
            <span>{user.transactions}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Last transaction:</span>
            <span>{user.lastTransaction}</span>
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="mr-2 h-4 w-4" />
              Details
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Phone className="mr-2 h-4 w-4" />
              Call
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <UserCog className="mr-2 h-4 w-4" />
              Manage
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
