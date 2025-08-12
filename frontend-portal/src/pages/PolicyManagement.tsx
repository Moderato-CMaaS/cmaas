import { useState } from 'react';
import { 
  Plus, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Edit3, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2,
  Clock,
  Settings,
  Filter,
  Search
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/toast-provider';

type PolicyStatus = 'active' | 'inactive' | 'draft';
type PolicySeverity = 'low' | 'medium' | 'high' | 'critical';

interface Policy {
  id: string;
  name: string;
  description: string;
  status: PolicyStatus;
  severity: PolicySeverity;
  category: string;
  rules: number;
  lastModified: string;
  createdBy: string;
  detections: number;
}

const mockPolicies: Policy[] = [
  {
    id: '1',
    name: 'Hate Speech Detection',
    description: 'Automatically detects and flags hate speech content across all platforms',
    status: 'active',
    severity: 'high',
    category: 'Content Safety',
    rules: 15,
    lastModified: '2024-01-15',
    createdBy: 'John Doe',
    detections: 1247
  },
  {
    id: '2', 
    name: 'Spam Filter',
    description: 'Identifies and blocks spam content and suspicious URLs',
    status: 'active',
    severity: 'medium',
    category: 'Anti-Spam',
    rules: 8,
    lastModified: '2024-01-10',
    createdBy: 'Jane Smith',
    detections: 3421
  },
  {
    id: '3',
    name: 'PII Protection',
    description: 'Detects and redacts personally identifiable information',
    status: 'active',
    severity: 'critical',
    category: 'Privacy',
    rules: 12,
    lastModified: '2024-01-08',
    createdBy: 'Mike Johnson',
    detections: 856
  },
  {
    id: '4',
    name: 'Violence Detection',
    description: 'Identifies violent content and threats in user submissions',
    status: 'draft',
    severity: 'high',
    category: 'Content Safety',
    rules: 6,
    lastModified: '2024-01-12',
    createdBy: 'Sarah Wilson',
    detections: 0
  }
];

export default function PolicyManagement() {
  const [policies, setPolicies] = useState<Policy[]>(mockPolicies);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<PolicyStatus | 'all'>('all');
  const [loading] = useState(false);
  const { toast } = useToast();

  // Filter policies based on search and status
  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || policy.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const togglePolicyStatus = (policyId: string) => {
    setPolicies(prev => prev.map(policy => 
      policy.id === policyId 
        ? { ...policy, status: policy.status === 'active' ? 'inactive' : 'active' as PolicyStatus }
        : policy
    ));
    
    const policy = policies.find(p => p.id === policyId);
    toast({
      title: 'Policy Updated',
      description: `${policy?.name} has been ${policy?.status === 'active' ? 'deactivated' : 'activated'}`,
      variant: 'success'
    });
  };

  const deletePolicy = (policyId: string) => {
    const policy = policies.find(p => p.id === policyId);
    setPolicies(prev => prev.filter(p => p.id !== policyId));
    
    toast({
      title: 'Policy Deleted',
      description: `${policy?.name} has been permanently deleted`,
      variant: 'success'
    });
  };

  const getStatusIcon = (status: PolicyStatus) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'inactive':
        return <EyeOff className="w-4 h-4 text-gray-500" />;
      case 'draft':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getSeverityColor = (severity: PolicySeverity) => {
    switch (severity) {
      case 'low':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">Policy Management</h2>
        <p className="text-sm text-muted-foreground">
          Create and manage content moderation policies to protect your platform
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between pb-2">
              <h3 className="tracking-tight text-sm font-medium">Total Policies</h3>
              <ShieldCheck className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{policies.length}</div>
            <p className="text-xs text-muted-foreground">
              {policies.filter(p => p.status === 'active').length} active
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between pb-2">
              <h3 className="tracking-tight text-sm font-medium">Total Detections</h3>
              <AlertTriangle className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">
              {policies.reduce((sum, p) => sum + p.detections, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between pb-2">
              <h3 className="tracking-tight text-sm font-medium">Critical Policies</h3>
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-2xl font-bold">
              {policies.filter(p => p.severity === 'critical').length}
            </div>
            <p className="text-xs text-muted-foreground">Requiring immediate attention</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between pb-2">
              <h3 className="tracking-tight text-sm font-medium">Draft Policies</h3>
              <Clock className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">
              {policies.filter(p => p.status === 'draft').length}
            </div>
            <p className="text-xs text-muted-foreground">Pending activation</p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search policies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                {statusFilter === 'all' ? 'All Status' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                All Status
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setStatusFilter('active')}>
                Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('inactive')}>
                Inactive
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('draft')}>
                Draft
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Policy
        </Button>
      </div>

      {/* Policies List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Policies</CardTitle>
          <CardDescription>
            Manage all your content moderation policies in one place
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center p-6">
              <p>Loading policies...</p>
            </div>
          ) : filteredPolicies.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <ShieldCheck className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'No policies match your search criteria.' 
                  : 'You don\'t have any policies yet.'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Policy
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPolicies.map((policy) => (
                <div 
                  key={policy.id} 
                  className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 border rounded-md hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(policy.status)}
                      <span className="font-medium">{policy.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(policy.severity)}`}>
                        {policy.severity}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{policy.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span>Category: {policy.category}</span>
                      <span>Rules: {policy.rules}</span>
                      <span>Detections: {policy.detections.toLocaleString()}</span>
                      <span>Modified: {new Date(policy.lastModified).toLocaleDateString()}</span>
                      <span>By: {policy.createdBy}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => togglePolicyStatus(policy.id)}
                    >
                      {policy.status === 'active' ? 
                        <EyeOff className="h-4 w-4" /> : 
                        <Eye className="h-4 w-4" />
                      }
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deletePolicy(policy.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
