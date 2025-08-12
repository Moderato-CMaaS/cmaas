import { useState } from 'react';
import { 
  CreditCard, 
  DollarSign, 
  Download, 
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  Edit
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface BillingPlan {
  name: string;
  price: number;
  period: 'month' | 'year';
  requests: number;
  features: string[];
  popular?: boolean;
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  period: string;
  downloadUrl?: string;
}

interface UsageQuota {
  name: string;
  used: number;
  limit: number;
  unit: string;
}

const plans: BillingPlan[] = [
  {
    name: 'Starter',
    price: 29,
    period: 'month',
    requests: 10000,
    features: [
      '10K API requests/month',
      'Basic content moderation',
      'Email support',
      'Standard SLA'
    ]
  },
  {
    name: 'Professional',
    price: 99,
    period: 'month',
    requests: 50000,
    features: [
      '50K API requests/month',
      'Advanced content moderation',
      'Priority support',
      'Custom policies',
      'Analytics dashboard'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 299,
    period: 'month',
    requests: 250000,
    features: [
      '250K API requests/month',
      'Full content moderation suite',
      '24/7 dedicated support',
      'Custom integrations',
      'Advanced analytics',
      'SLA guarantees'
    ]
  }
];

const mockInvoices: Invoice[] = [
  {
    id: 'INV-2024-001',
    date: '2024-01-01',
    amount: 99.00,
    status: 'paid',
    period: 'January 2024',
    downloadUrl: '#'
  },
  {
    id: 'INV-2023-012',
    date: '2023-12-01',
    amount: 99.00,
    status: 'paid',
    period: 'December 2023',
    downloadUrl: '#'
  },
  {
    id: 'INV-2023-011',
    date: '2023-11-01',
    amount: 99.00,
    status: 'paid',
    period: 'November 2023',
    downloadUrl: '#'
  },
  {
    id: 'INV-2023-010',
    date: '2023-10-01',
    amount: 99.00,
    status: 'failed',
    period: 'October 2023'
  }
];

const currentUsage: UsageQuota[] = [
  { name: 'API Requests', used: 32450, limit: 50000, unit: 'requests' },
  { name: 'Storage', used: 2.3, limit: 10, unit: 'GB' },
  { name: 'Team Members', used: 3, limit: 10, unit: 'users' }
];

export default function Billing() {
  const [currentPlan] = useState('Professional');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'failed':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getUsagePercentage = (used: number, limit: number) => {
    return Math.min((used / limit) * 100, 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">Billing & Usage</h2>
        <p className="text-sm text-muted-foreground">
          Manage your subscription, view usage, and download invoices
        </p>
      </div>

      {/* Current Plan & Usage Overview */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Current Plan */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>You're currently on the {currentPlan} plan</CardDescription>
              </div>
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Change Plan
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
              <div>
                <h3 className="font-semibold text-lg">{currentPlan}</h3>
                <p className="text-sm text-muted-foreground">50,000 API requests/month</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">$99</div>
                <div className="text-sm text-muted-foreground">/month</div>
              </div>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="text-sm font-medium">Next billing date</div>
                <div className="text-sm text-muted-foreground">February 1, 2024</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Payment method</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CreditCard className="w-4 h-4" />
                  •••• •••• •••• 1234
                  <Button variant="ghost" size="sm">
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>This Month</CardTitle>
            <CardDescription>Your usage summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Spent</span>
                <span className="font-medium">$99.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>API Requests</span>
                <span className="font-medium">32,450</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Overage</span>
                <span className="font-medium text-green-600">$0.00</span>
              </div>
            </div>
            <Button className="w-full" variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Usage Quotas */}
      <Card>
        <CardHeader>
          <CardTitle>Current Usage</CardTitle>
          <CardDescription>Monitor your plan limits and usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {currentUsage.map((quota) => {
              const percentage = getUsagePercentage(quota.used, quota.limit);
              return (
                <div key={quota.name} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{quota.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {quota.used.toLocaleString()} / {quota.limit.toLocaleString()} {quota.unit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getUsageColor(percentage)}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {percentage.toFixed(1)}% used
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
          <CardDescription>Upgrade or downgrade your plan anytime</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <div 
                key={plan.name} 
                className={`relative p-6 border rounded-lg transition-all duration-200 hover:shadow-md ${
                  plan.name === currentPlan 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                } ${plan.popular ? 'ring-2 ring-primary' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    <div className="mt-2">
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full" 
                    variant={plan.name === currentPlan ? "secondary" : "default"}
                    disabled={plan.name === currentPlan}
                  >
                    {plan.name === currentPlan ? 'Current Plan' : 'Upgrade'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>Download your invoices and payment history</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                All Time
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Last 3 months</DropdownMenuItem>
              <DropdownMenuItem>Last 6 months</DropdownMenuItem>
              <DropdownMenuItem>Last year</DropdownMenuItem>
              <DropdownMenuItem>All time</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockInvoices.map((invoice) => (
              <div 
                key={invoice.id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(invoice.status)}
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">{invoice.id}</div>
                    <div className="text-sm text-muted-foreground">{invoice.period}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-medium">${invoice.amount.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(invoice.date).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                    
                    {invoice.downloadUrl && invoice.status === 'paid' && (
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Button variant="outline">
              <ExternalLink className="w-4 h-4 mr-2" />
              View All Invoices
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
