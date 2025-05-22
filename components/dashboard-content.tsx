"use client"

import { ArrowUp, UsersIcon, Clock, UserPlus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"

export function DashboardContent() {
  // Sample data for charts
  const pieData = [
    { name: "Cash", value: 65, color: "#a9bd4f" },
    { name: "D17", value: 35, color: "#2563EB" },
  ]

  const lineData = [
    { day: "Mon", deposits: 4200 },
    { day: "Tue", deposits: 3800 },
    { day: "Wed", deposits: 5000 },
    { day: "Thu", deposits: 4700 },
    { day: "Fri", deposits: 6200 },
    { day: "Sat", deposits: 5800 },
    { day: "Sun", deposits: 4900 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome, Agent Mehdi</h2>
        <p className="text-muted-foreground">Here's an overview of your activity today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Deposits Today */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deposits Today</CardTitle>
            <div className="rounded-full bg-[#a9bd4f]/10 p-1">
              <ArrowUp className="h-4 w-4 text-[#a9bd4f]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,450 TND</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-[#a9bd4f]">+18%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        {/* Users Served Today */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users Served Today</CardTitle>
            <div className="rounded-full bg-[#2563EB]/10 p-1">
              <UsersIcon className="h-4 w-4 text-[#2563EB]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-[#2563EB]">+5</span> from yesterday
            </p>
          </CardContent>
        </Card>

        {/* New Accounts Created */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Accounts Created</CardTitle>
            <div className="rounded-full bg-purple-100 p-1">
              <UserPlus className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-purple-600">+3</span> from yesterday
            </p>
          </CardContent>
        </Card>

        {/* Pending Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Transactions</CardTitle>
            <div className="rounded-full bg-amber-100 p-1">
              <Clock className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-amber-600">Requires attention</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Transaction Distribution */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Transaction Distribution</CardTitle>
            <CardDescription>Breakdown by payment method</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-[300px] w-full max-w-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Deposit Trends */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Deposit Trends</CardTitle>
            <CardDescription>Last 7 days deposit activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  deposits: {
                    label: "Deposits",
                    color: "hsl(69, 47%, 52%)",
                  },
                }}
              >
                <LineChart
                  data={lineData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} />
                  <YAxis tickFormatter={(value) => `${value} TND`} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="deposits"
                    stroke="var(--color-deposits)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-deposits)" }}
                    activeDot={{ r: 6, fill: "var(--color-deposits)" }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your most recent transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Client</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Amount</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Method</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {[
                    {
                      date: "May 11, 2025",
                      client: "Amine Ben Ali",
                      amount: "350 TND",
                      method: "Cash",
                      status: "Validated",
                    },
                    {
                      date: "May 11, 2025",
                      client: "Sarra Mansour",
                      amount: "120 TND",
                      method: "D17",
                      status: "Pending",
                    },
                    {
                      date: "May 10, 2025",
                      client: "Youssef Trabelsi",
                      amount: "500 TND",
                      method: "Cash",
                      status: "Validated",
                    },
                    {
                      date: "May 10, 2025",
                      client: "Nour Bouazizi",
                      amount: "75 TND",
                      method: "D17",
                      status: "Failed",
                    },
                    {
                      date: "May 9, 2025",
                      client: "Karim Mejri",
                      amount: "200 TND",
                      method: "Cash",
                      status: "Validated",
                    },
                  ].map((transaction, i) => (
                    <tr key={i} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle">{transaction.date}</td>
                      <td className="p-4 align-middle">{transaction.client}</td>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
