import { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Copy, EyeOff, Eye, AlertCircle, CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ConfirmDialog } from '@/components/ui/dialog';
import { apiKeyService, type ApiKey, type ApiKeyCreationResponse } from '@/services/api';
import { useToast } from '@/components/toast-provider';

export default function ApiKeyManagement() {
  // State for API keys
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for API key creation
  const [isCreatingKey, setIsCreatingKey] = useState(false);
  const [newKey, setNewKey] = useState<ApiKeyCreationResponse | null>(null);
  
  // State for key deletion
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // State for key visibility
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});

  // Fetch API keys on component mount
  useEffect(() => {
    fetchApiKeys();
  }, []);
  
  // Function to fetch API keys
  const fetchApiKeys = async () => {
    try {
      setLoading(true);
      setError(null); // Clear any previous errors
      const keys = await apiKeyService.getApiKeys();
      setApiKeys(keys);
    } catch (err: any) {
      setError('Failed to fetch API keys. Please try again later.');
      console.error('Error fetching API keys:', err);
      toast({
        title: 'Error',
        description: err.message || 'Failed to fetch API keys',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Function to create a new API key
  const createNewApiKey = async () => {
    try {
      setIsCreatingKey(true);
      setError(null); // Clear any previous errors
      
      const keyName = `key-${new Date().toISOString().slice(0, 10)}`; // Simple naming convention
      const response = await apiKeyService.createApiKey(keyName);
      
      setNewKey(response);
      toast({
        title: 'Success',
        description: 'New API key created successfully',
        variant: 'success',
      });
      
      // Update the keys list
      await fetchApiKeys();
    } catch (err: any) {
      setError('Failed to create API key. Please try again later.');
      console.error('Error creating API key:', err);
      toast({
        title: 'Error',
        description: err.message || 'Failed to create API key',
        variant: 'destructive',
      });
    } finally {
      setIsCreatingKey(false);
    }
  };
  
  // Function to delete an API key
  const deleteApiKey = async (id: string) => {
    try {
      setError(null); // Clear any previous errors
      await apiKeyService.deleteApiKey(id);
      
      // Update the list after successful deletion
      setApiKeys(prevKeys => prevKeys.filter(key => key.id !== id));
      
      toast({
        title: 'Success',
        description: 'API key deleted successfully',
        variant: 'success',
      });
    } catch (err: any) {
      setError('Failed to delete API key. Please try again later.');
      console.error('Error deleting API key:', err);
      toast({
        title: 'Error',
        description: err.message || 'Failed to delete API key',
        variant: 'destructive',
      });
    }
  };
  
  // Get toast function
  const { toast } = useToast();
  
  // Function to copy API key to clipboard
  const copyApiKey = (key: string) => {
    navigator.clipboard.writeText(key)
      .then(() => {
        toast({
          title: 'Success',
          description: 'API key copied to clipboard',
          variant: 'success',
        });
      })
      .catch((err) => {
        console.error('Failed to copy to clipboard:', err);
        toast({
          title: 'Error',
          description: 'Failed to copy to clipboard',
          variant: 'destructive',
        });
      });
  };

  // Function to toggle key visibility
  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Format the creation date and last used date
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Function to mask API key
  const maskApiKey = (key: string, visible: boolean) => {
    if (visible) return key;
    const firstFour = key.slice(0, 4);
    const lastFour = key.slice(-4);
    return `${firstFour}${'•'.repeat(10)}${lastFour}`;
  };

  // Confirm dialog for deleting a key
  const handleDeleteClick = (id: string) => {
    setKeyToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  // Confirm deletion
  const confirmDelete = () => {
    if (keyToDelete) {
      deleteApiKey(keyToDelete);
      setKeyToDelete(null);
    }
  };

  return (
    <div className="flex-1 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">API Key Management</h2>
        <p className="text-sm text-muted-foreground">
          Manage your API keys and access tokens here. API keys provide authentication for your API requests.
        </p>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={createNewApiKey} 
          disabled={isCreatingKey}
        >
          <PlusCircle className="mr-1 h-4 w-4" />
          Generate New Key
        </Button>
      </div>
      
      {/* Newly created API key alert */}
      {newKey && (
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-green-600 dark:text-green-400">New API Key Generated</CardTitle>
            <CardDescription>
              Make sure to copy your API key now. You won't be able to see it again!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between rounded-md bg-green-100 dark:bg-green-900/40 p-3">
              <code className="text-sm font-mono">{newKey.key}</code>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => copyApiKey(newKey.key)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4 flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setNewKey(null)}
              >
                I've copied my key
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Error message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-md">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}
      
      {/* API Keys list */}
      <Card>
        <CardHeader>
          <CardTitle>Your API Keys</CardTitle>
          <CardDescription>
            These are all your available API keys. Keep them secure!
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center p-6">
              <p>Loading API keys...</p>
            </div>
          ) : apiKeys.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <p className="text-muted-foreground mb-4">You don't have any API keys yet.</p>
              <Button onClick={createNewApiKey} disabled={isCreatingKey}>
                <PlusCircle className="mr-1 h-4 w-4" />
                Generate Your First Key
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <div 
                  key={apiKey.id} 
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-md"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{apiKey.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono bg-muted p-1 px-2 rounded">
                        {maskApiKey(apiKey.key, visibleKeys[apiKey.id] || false)}
                      </code>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                      >
                        {visibleKeys[apiKey.id] ? 
                          <EyeOff className="h-3 w-3" /> : 
                          <Eye className="h-3 w-3" />
                        }
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyApiKey(apiKey.key)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      <span>Created: {formatDate(apiKey.createdAt)}</span>
                      {apiKey.lastUsed && (
                        <span className="ml-4">Last used: {formatDate(apiKey.lastUsed)}</span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteClick(apiKey.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Delete confirmation dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete API Key"
        description="Are you sure you want to delete this API key? This action cannot be undone and any applications using this key will stop working."
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        onConfirm={confirmDelete}
        confirmButtonVariant="destructive"
      />
    </div>
  );
}
