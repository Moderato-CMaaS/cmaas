import {
  ShieldCheck,
  EyeOff,
  FileKey,
  AlertTriangle,
  ChevronDown,
  Plus,
  KeyRound,
  UploadCloud,
  FlaskConical,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useState } from "react";

// Sample data
const weekData = [
  { day: "Mon", calls: 1200 },
  { day: "Tue", calls: 1900 },
  { day: "Wed", calls: 1600 },
  { day: "Thu", calls: 2100 },
  { day: "Fri", calls: 1800 },
  { day: "Sat", calls: 900 },
  { day: "Sun", calls: 700 },
];

const monthData = [
  { week: "Week 1", calls: 8500 },
  { week: "Week 2", calls: 9200 },
  { week: "Week 3", calls: 8800 },
  { week: "Week 4", calls: 9500 },
];

const yearData = [
  { month: "Jan", calls: 35000 },
  { month: "Feb", calls: 38000 },
  { month: "Mar", calls: 42000 },
  { month: "Apr", calls: 39000 },
  { month: "May", calls: 45000 },
  { month: "Jun", calls: 48000 },
  { month: "Jul", calls: 46000 },
  { month: "Aug", calls: 50000 },
  { month: "Sep", calls: 47000 },
  { month: "Oct", calls: 52000 },
  { month: "Nov", calls: 49000 },
  { month: "Dec", calls: 55000 },
];

const chartConfig = {
  calls: {
    label: "API Calls",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "year">("week");

  const getCurrentData = () => {
    switch (selectedPeriod) {
      case "week":
        return weekData;
      case "month":
        return monthData;
      case "year":
        return yearData;
      default:
        return weekData;
    }
  };

  const getCurrentDataKey = () => {
    switch (selectedPeriod) {
      case "week":
        return "day";
      case "month":
        return "week";
      case "year":
        return "month";
      default:
        return "day";
    }
  };

  const getPeriodLabel = () => {
    switch (selectedPeriod) {
      case "week":
        return "This Week";
      case "month":
        return "This Month";
      case "year":
        return "This Year";
      default:
        return "This Week";
    }
  };

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md hover:bg-muted transition duration-200 ease-in-out">
          <CardContent className="p-6">
            <div className="flex items-center justify-between pb-2">
              <h3 className="tracking-tight text-sm font-medium">Total API Calls</h3>
              <FileKey className="w-7 h-7 text-muted-foreground mt-5" />
            </div>
            <div className="text-2xl font-bold">12,543</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md hover:bg-muted transition duration-200 ease-in-out">
          <CardContent className="p-6">
            <div className="flex items-center justify-between pb-2">
              <h3 className="tracking-tight text-sm font-medium">Content Moderated</h3>
              <EyeOff className="w-7 h-7 text-muted-foreground mt-5" />
            </div>
            <div className="text-2xl font-bold">8,732</div>
            <p className="text-xs text-muted-foreground">+15.3% from last month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md hover:bg-muted transition duration-200 ease-in-out">
          <CardContent className="p-6">
            <div className="flex items-center justify-between pb-2">
              <h3 className="tracking-tight text-sm font-medium">Active Policies</h3>
              <ShieldCheck className="w-7 h-7 text-muted-foreground mt-5" />
            </div>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md hover:bg-muted transition duration-200 ease-in-out">
          <CardContent className="p-6">
            <div className="flex items-center justify-between pb-2">
              <h3 className="tracking-tight text-sm font-medium">Flagged Content</h3>
              <AlertTriangle className="w-7 h-7 text-muted-foreground mt-5" />
            </div>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">-5.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Content moderated: &quot;User comment blocked&quot;</span>
              <span className="text-xs text-muted-foreground">2 minutes ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">New policy created: &quot;Hate Speech Detection&quot;</span>
              <span className="text-xs text-muted-foreground">1 hour ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">API key generated for new client</span>
              <span className="text-xs text-muted-foreground">3 hours ago</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart + Quick Access */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* API Chart */}
        <Card className="flex-1 h-[450px]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>API Calls Analytics</CardTitle>
              <CardDescription>Track your API usage over time</CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {getPeriodLabel()}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSelectedPeriod("week")}>
                  This Week
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedPeriod("month")}>
                  This Month
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedPeriod("year")}>
                  This Year
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] w-full">
              <ChartContainer config={chartConfig} className="h-full w-full">
                {selectedPeriod === "week" ? (
                  <BarChart data={getCurrentData()} barCategoryGap="20%" width={600} height={200}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={getCurrentDataKey()} />
                    <YAxis />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar dataKey="calls" fill="var(--color-calls)" maxBarSize={40} />
                  </BarChart>
                ) : (
                  <LineChart data={getCurrentData()} width={600} height={200}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={getCurrentDataKey()} />
                    <YAxis />
                    <ChartTooltip
                      cursor={{ stroke: "var(--color-calls)", strokeWidth: 2 }}
                      content={<ChartTooltipContent />}
                      animationDuration={200}
                    />
                    <Line
                      dataKey="calls"
                      type="monotone"
                      stroke="var(--color-calls)"
                      strokeWidth={3}
                      dot={{
                        fill: "var(--color-calls)",
                        strokeWidth: 2,
                        r: 4,
                        cursor: "pointer",
                      }}
                      activeDot={{
                        r: 8,
                        stroke: "var(--color-calls)",
                        strokeWidth: 3,
                        fill: "#fff",
                        cursor: "pointer",
                      }}
                      connectNulls
                    />
                  </LineChart>
                )}
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick Access Card */}
        <Card className="w-full lg:w-1/3 h-[450px]">
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>Frequent actions at your fingertips</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="flex items-center gap-3 text-sm cursor-pointer hover:bg-muted p-2 rounded-md">
              <KeyRound className="w-5 h-5 text-muted-foreground" />
              Create API Key
            </div>
            <div className="flex items-center gap-3 text-sm cursor-pointer hover:bg-muted p-2 rounded-md">
              <Plus className="w-5 h-5 text-muted-foreground" />
              Add Rule
            </div>
            <div className="flex items-center gap-3 text-sm cursor-pointer hover:bg-muted p-2 rounded-md">
              <UploadCloud className="w-5 h-5 text-muted-foreground" />
              Upgrade Plan
            </div>
            <div className="flex items-center gap-3 text-sm cursor-pointer hover:bg-muted p-2 rounded-md">
              <FlaskConical className="w-5 h-5 text-muted-foreground" />
              Test API
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
