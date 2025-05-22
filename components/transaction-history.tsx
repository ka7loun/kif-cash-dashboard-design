"use client"

import { useState } from "react"
import { Calendar, Download, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

// Sample transaction data
const transactions = [
  {
    id: "TX-1234",
    date: "May 11, 2025",
    client: "Amine Ben Ali",
    phone: "+216 55 123 456",
    amount: "350 TND",
    method: "Cash",
    status: "Validated",
  },
  {
    id: "TX-1235",
    date: "May 11, 2025",
    client: "Sarra Mansour",
    phone: "+216 55 234 567",
    amount: "120 TND",
    method: "D17",
    status: "Pending",
  },
  {
    id: "TX-1236",
    date: "May 10, 2025",
    client: "Youssef Trabelsi",
    phone: "+216 55 345 678",
    amount: "500 TND",
    method: "Cash",
    status: "Validated",
  },
  {
    id: "TX-1237",
    date: "May 10, 2025",
    client: "Nour Bouazizi",
    phone: "+216 55 456 789",
    amount: "75 TND",
    method: "D17",
    status: "Failed",
  },
  {
    id: "TX-1238",
    date: "May 9, 2025",
    client: "Karim Mejri",
    phone: "+216 55 567 890",
    amount: "200 TND",
    method: "Cash",
    status: "Validated",
  },
  {
    id: "TX-1239",
    date: "May 9, 2025",
    client: "Leila Gharbi",
    phone: "+216 55 678 901",
    amount: "150 TND",
    method: "D17",
    status: "Validated",
  },
  {
    id: "TX-1240",
    date: "May 8, 2025",
    client: "Mehdi Khelifi",
    phone: "+216 55 789 012",
    amount: "300 TND",
    method: "Cash",
    status: "Validated",
  },
  {
    id: "TX-1241",
    date: "May 8, 2025",
    client: "Fatma Riahi",
    phone: "+216 55 890 123",
    amount: "90 TND",
    method: "D17",
    status: "Pending",
  },
  {
    id: "TX-1242",
    date: "May 7, 2025",
    client: "Slim Abidi",
    phone: "+216 55 901 234",
    amount: "250 TND",
    method: "Cash",
    status: "Validated",
  },
  {
    id: "TX-1243",
    date: "May 7, 2025",
    client: "Rania Nasri",
    phone: "+216 55 012 345",
    amount: "180 TND",
    method: "D17",
    status: "Failed",
  },
]

export function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [methodFilter, setMethodFilter] = useState("all")
  const [date, setDate] = useState<Date | undefined>(undefined)

  // Filter transactions based on search term and filters
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.phone.includes(searchTerm) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || transaction.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesMethod =
      methodFilter === "all" ||
      (methodFilter === "d17" && transaction.method === "D17") ||
      (methodFilter === "cash" && transaction.method === "Cash")

    return matchesSearch && matchesStatus && matchesMethod
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>View and filter all transaction records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by client name, phone or ID..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="validated">Validated</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="d17">D17</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[150px] justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? date.toLocaleDateString() : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>

              <Button
                variant="outline"
                size="icon"
                title="Reset Filters"
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                  setMethodFilter("all")
                  setDate(undefined)
                }}
              >
                <Filter className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="icon" title="Export Data">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <div className="w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">ID</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Client</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Phone</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Amount</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Method</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle font-medium">{transaction.id}</td>
                        <td className="p-4 align-middle">{transaction.date}</td>
                        <td className="p-4 align-middle">{transaction.client}</td>
                        <td className="p-4 align-middle">{transaction.phone}</td>
                        <td className="p-4 align-middle">{transaction.amount}</td>
                        <td className="p-4 align-middle">{transaction.method}</td>
                        <td className="p-4 align-middle">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              transaction.status === "Validated"
                                ? "bg-green-100 text-green-800"
                                : transaction.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </td>
                        <td className="p-4 align-middle">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <Filter className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View details</DropdownMenuItem>
                              <DropdownMenuItem>Print receipt</DropdownMenuItem>
                              {transaction.status === "Pending" && <DropdownMenuItem>Validate</DropdownMenuItem>}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="h-24 text-center">
                        No transactions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
