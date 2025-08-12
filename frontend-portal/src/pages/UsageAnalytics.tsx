import { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Clock,
  ChevronDown,
  Download,
  Filter,
  Calendar
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
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
  XAxis,
  YAxis,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

type TimePeriod = 'today' | 'week' | 'month' | 'year';
type MetricType = 'requests' | 'moderated' | 'blocked' | 'flagged';

// Sample data for different time periods
const analyticsData = {
  today: [
    { time: '00:00', requests: 45, moderated: 12, blocked: 3, flagged: 1 },
    { time: '04:00', requests: 32, moderated: 8, blocked: 2, flagged: 0 },
    { time: '08:00', requests: 156, moderated: 42, blocked: 8, flagged: 3 },
    { time: '12:00', requests: 298, moderated: 89, blocked: 15, flagged: 5 },
    { time: '16:00', requests: 234, moderated: 67, blocked: 12, flagged: 4 },
    { time: '20:00', requests: 178, moderated: 45, blocked: 9, flagged: 2 }
  ],
  week: [
    { time: 'Mon', requests: 1200, moderated: 342, blocked: 68, flagged: 15 },
    { time: 'Tue', requests: 1456, moderated: 398, blocked: 82, flagged: 18 },
    { time: 'Wed', requests: 1678, moderated: 445, blocked: 95, flagged: 22 },
    { time: 'Thu', requests: 1534, moderated: 412, blocked: 89, flagged: 19 },
    { time: 'Fri', requests: 1789, moderated: 498, blocked: 105, flagged: 25 },
    { time: 'Sat', requests: 987, moderated: 256, blocked: 45, flagged: 12 },
    { time: 'Sun', requests: 756, moderated: 198, blocked: 32, flagged: 8 }
  ],
  month: [
    { time: 'Week 1', requests: 8500, moderated: 2340, blocked: 468, flagged: 125 },
    { time: 'Week 2', requests: 9200, moderated: 2598, blocked: 523, flagged: 142 },
    { time: 'Week 3', requests: 8800, moderated: 2456, blocked: 495, flagged: 134 },
    { time: 'Week 4', requests: 9500, moderated: 2689, blocked: 547, flagged: 156 }
  ],
  year: [
    { time: 'Jan', requests: 35000, moderated: 9800, blocked: 1960, flagged: 520 },
    { time: 'Feb', requests: 38000, moderated: 10640, blocked: 2128, flagged: 564 },
    { time: 'Mar', requests: 42000, moderated: 11760, blocked: 2352, flagged: 624 },
    { time: 'Apr', requests: 39000, moderated: 10920, blocked: 2184, flagged: 580 },
    { time: 'May', requests: 45000, moderated: 12600, blocked: 2520, flagged: 669 },
    { time: 'Jun', requests: 48000, moderated: 13440, blocked: 2688, flagged: 714 }
  ]
};

const categoryData = [
  { name: 'Hate Speech', value: 35, color: '#ef4444' },
  { name: 'Spam', value: 28, color: '#f97316' },
  { name: 'Violence', value: 18, color: '#eab308' },
  { name: 'PII', value: 12, color: '#22c55e' },
  { name: 'Other', value: 7, color: '#6366f1' }
];

const chartConfig = {
  requests: {
    label: "Total Requests",
    color: "hsl(var(--chart-1))",
  },
  moderated: {
    label: "Moderated",
    color: "hsl(var(--chart-2))",
  },
  blocked: {
    label: "Blocked",
    color: "hsl(var(--chart-3))",
  },
  flagged: {
    label: "Flagged",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export default function UsageAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('week');
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('requests');

  const getCurrentData = () => analyticsData[selectedPeriod];
  
  const getPeriodLabel = () => {
    switch (selectedPeriod) {
      case 'today': return 'Today';
      case 'week': return 'This Week';
      case 'month': return 'This Month';
      case 'year': return 'This Year';
      default: return 'This Week';
    }
  };

  // Calculate totals for current period
  const currentData = getCurrentData();
  const totals = currentData.reduce((acc, item) => ({
    requests: acc.requests + item.requests,
    moderated: acc.moderated + item.moderated,
    blocked: acc.blocked + item.blocked,
    flagged: acc.flagged + item.flagged
  }), { requests: 0, moderated: 0, blocked: 0, flagged: 0 });

  const moderationRate = ((totals.moderated / totals.requests) * 100).toFixed(1);
  const blockRate = ((totals.blocked / totals.requests) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Usage Analytics</h2>
          <p className="text-sm text-muted-foreground">
            Monitor your API usage and content moderation performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                {getPeriodLabel()}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSelectedPeriod('today')}>
                Today
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedPeriod('week')}>
                This Week
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedPeriod('month')}>
                This Month
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedPeriod('year')}>
                This Year
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between pb-2">
              <h3 className="tracking-tight text-sm font-medium">Total Requests</h3>
              <Activity className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{totals.requests.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              +12.5% from last period
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between pb-2">
              <h3 className="tracking-tight text-sm font-medium">Content Moderated</h3>
              <Filter className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{totals.moderated.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {moderationRate}% of total requests
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between pb-2">
              <h3 className="tracking-tight text-sm font-medium">Blocked Content</h3>
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-2xl font-bold">{totals.blocked.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {blockRate}% block rate
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between pb-2">
              <h3 className="tracking-tight text-sm font-medium">Flagged for Review</h3>
              <Clock className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{totals.flagged.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Requiring manual review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Analytics Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Usage Trends</CardTitle>
              <CardDescription>Track your API usage patterns over time</CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSelectedMetric('requests')}>
                  Total Requests
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelectedMetric('moderated')}>
                  Moderated
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedMetric('blocked')}>
                  Blocked
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedMetric('flagged')}>
                  Flagged
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <AreaChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <ChartTooltip
                    cursor={{ stroke: `var(--color-${selectedMetric})`, strokeWidth: 2 }}
                    content={<ChartTooltipContent />}
                  />
                  <Area
                    dataKey={selectedMetric}
                    type="monotone"
                    fill={`var(--color-${selectedMetric})`}
                    fillOpacity={0.2}
                    stroke={`var(--color-${selectedMetric})`}
                    strokeWidth={3}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Detection Categories</CardTitle>
            <CardDescription>Breakdown by content type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {categoryData.map((category) => (
                <div key={category.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span>{category.name}</span>
                  </div>
                  <span className="font-medium">{category.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Metrics</CardTitle>
          <CardDescription>Comprehensive view of all moderation activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart data={currentData} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="requests" fill="var(--color-requests)" name="Total Requests" />
                <Bar dataKey="moderated" fill="var(--color-moderated)" name="Moderated" />
                <Bar dataKey="blocked" fill="var(--color-blocked)" name="Blocked" />
                <Bar dataKey="flagged" fill="var(--color-flagged)" name="Flagged" />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
