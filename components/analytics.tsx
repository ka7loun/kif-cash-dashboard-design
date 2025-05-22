"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Analytics() {
  const [timeRange, setTimeRange] = useState("week")

  // Sample data for charts
  const transactionData = [
    { day: "Mon", deposits: 4200, withdrawals: 3100 },
    { day: "Tue", deposits: 3800, withdrawals: 2800 },
    { day: "Wed", deposits: 5000, withdrawals: 3500 },
    { day: "Thu", deposits: 4700, withdrawals: 3200 },
    { day: "Fri", deposits: 6200, withdrawals: 4100 },
    { day: "Sat", deposits: 5800, withdrawals: 3900 },
    { day: "Sun", deposits: 4900, withdrawals: 3300 },
  ]

  const userActivityData = [
    { name: "New Users", value: 35, color: "#1CB774" },
    { name: "Returning Users", value: 65, color: "#2563EB" },
  ]

  const locationData = [
    { name: "Tunis", value: 40 },
    { name: "Sfax", value: 20 },
    { name: "Sousse", value: 15 },
    { name: "Kairouan", value: 10 },
    { name: "Other", value: 15 },
  ]

  const agentPerformanceData = [
    { name: "Mehdi A.", transactions: 78, revenue: 12500 },
    { name: "Leila B.", transactions: 65, revenue: 9800 },
    { name: "Ahmed C.", transactions: 82, revenue: 13200 },
    { name: "Sonia D.", transactions: 58, revenue: 8700 },
    { name: "Karim E.", transactions: 70, revenue: 10500 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="agents">Agent Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Transaction Overview */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Transaction Overview</CardTitle>
                <CardDescription>Deposits vs Withdrawals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ChartContainer
                    config={{
                      deposits: {
                        label: "Deposits",
                        color: "hsl(142, 76%, 45%)",
                      },
                      withdrawals: {
                        label: "Withdrawals",
                        color: "hsl(221, 83%, 53%)",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={transactionData}
                        margin={{
                          top: 5,
                          right: 10,
                          left: 10,
                          bottom: 20,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" tickLine={false} axisLine={false} />
                        <YAxis tickFormatter={(value) => `${value} TND`} tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="deposits" fill="var(--color-deposits)" radius={[4, 4, 0, 0]} name="Deposits" />
                        <Bar
                          dataKey="withdrawals"
                          fill="var(--color-withdrawals)"
                          radius={[4, 4, 0, 0]}
                          name="Withdrawals"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* User Activity */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>New vs Returning Users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userActivityData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {userActivityData.map((entry, index) => (
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

            {/* Location Distribution */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Location Distribution</CardTitle>
                <CardDescription>User distribution by city</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={locationData}
                      layout="vertical"
                      margin={{
                        top: 5,
                        right: 10,
                        left: 60,
                        bottom: 20,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                      <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} />
                      <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                      <Bar dataKey="value" fill="#1CB774" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Agent Performance */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Top Performing Agents</CardTitle>
                <CardDescription>By transaction volume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={agentPerformanceData}
                      margin={{
                        top: 5,
                        right: 10,
                        left: 10,
                        bottom: 20,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="transactions" fill="#2563EB" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Transaction Trends</CardTitle>
                <CardDescription>Daily transaction volume and value</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ChartContainer
                    config={{
                      deposits: {
                        label: "Deposits",
                        color: "hsl(142, 76%, 45%)",
                      },
                      withdrawals: {
                        label: "Withdrawals",
                        color: "hsl(221, 83%, 53%)",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={transactionData}
                        margin={{
                          top: 5,
                          right: 10,
                          left: 10,
                          bottom: 20,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" tickLine={false} axisLine={false} />
                        <YAxis tickFormatter={(value) => `${value} TND`} tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="deposits"
                          stroke="var(--color-deposits)"
                          strokeWidth={2}
                          dot={{ fill: "var(--color-deposits)" }}
                          activeDot={{ r: 6, fill: "var(--color-deposits)" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="withdrawals"
                          stroke="var(--color-withdrawals)"
                          strokeWidth={2}
                          dot={{ fill: "var(--color-withdrawals)" }}
                          activeDot={{ r: 6, fill: "var(--color-withdrawals)" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>New user registrations over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: "Jan", users: 120 },
                        { month: "Feb", users: 150 },
                        { month: "Mar", users: 180 },
                        { month: "Apr", users: 220 },
                        { month: "May", users: 280 },
                        { month: "Jun", users: 310 },
                      ]}
                      margin={{
                        top: 5,
                        right: 10,
                        left: 10,
                        bottom: 20,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#2563EB"
                        strokeWidth={2}
                        dot={{ fill: "#2563EB" }}
                        activeDot={{ r: 6, fill: "#2563EB" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agents" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Agent Performance</CardTitle>
                <CardDescription>Transactions and revenue by agent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ChartContainer
                    config={{
                      transactions: {
                        label: "Transactions",
                        color: "hsl(221, 83%, 53%)",
                      },
                      revenue: {
                        label: "Revenue (TND)",
                        color: "hsl(142, 76%, 45%)",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={agentPerformanceData}
                        margin={{
                          top: 5,
                          right: 10,
                          left: 10,
                          bottom: 20,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} />
                        <YAxis yAxisId="left" tickLine={false} axisLine={false} />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          tickFormatter={(value) => `${value} TND`}
                          tickLine={false}
                          axisLine={false}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar
                          yAxisId="left"
                          dataKey="transactions"
                          fill="var(--color-transactions)"
                          radius={[4, 4, 0, 0]}
                          name="Transactions"
                        />
                        <Bar
                          yAxisId="right"
                          dataKey="revenue"
                          fill="var(--color-revenue)"
                          radius={[4, 4, 0, 0]}
                          name="Revenue"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
