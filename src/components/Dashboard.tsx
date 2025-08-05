import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { BusinessRecord } from './BusinessForm';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Dashboard = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState<BusinessRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<BusinessRecord | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = () => {
    const savedRecords = JSON.parse(localStorage.getItem('businessRecords') || '[]');
    setRecords(savedRecords);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      const updatedRecords = records.filter(record => record.id !== id);
      localStorage.setItem('businessRecords', JSON.stringify(updatedRecords));
      setRecords(updatedRecords);
      toast.success('Record deleted successfully');
    }
  };

  const handleEdit = (record: BusinessRecord) => {
    // Store the record to edit in localStorage and navigate to form
    localStorage.setItem('editingRecord', JSON.stringify(record));
    navigate('/form');
    toast.info('Record loaded for editing');
  };

  const handleView = (record: BusinessRecord) => {
    setSelectedRecord(record);
    setIsViewDialogOpen(true);
  };

  const handleLogout = () => {
    navigate('/');
    toast.info('Logged out successfully');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-between items-center bg-card rounded-lg shadow-lg p-4">
          <div className="flex items-center space-x-4">
            <img 
              src="" // Removed Lovable image
              alt="Eventus Consulting Group Logo" 
              className="h-12 w-auto object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-foreground">The EventUs Consulting Group</h1>
              <p className="text-sm text-muted-foreground">Business Development Dashboard</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={() => navigate('/form')}
              className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Record
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="bg-card hover:bg-accent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Business Records Dashboard</CardTitle>
            <CardDescription>
              Manage and view all business development records
            </CardDescription>
          </CardHeader>
          <CardContent>
            {records.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No records found</p>
                <Button
                  onClick={() => navigate('/form')}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Record
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Submitted By</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {records.map((record) => (
                      <TableRow key={record.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{record.fullName}</TableCell>
                        <TableCell>{record.email}</TableCell>
                        <TableCell>{record.companyName}</TableCell>
                        <TableCell>{record.title}</TableCell>
                        <TableCell>{record.submittedBy}</TableCell>
                        <TableCell>{record.region}</TableCell>
                        <TableCell>{formatDate(record.createdAt)}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center space-x-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleView(record)}
                              className="bg-card hover:bg-accent"
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(record)}
                              className="bg-card hover:bg-accent"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(record.id)}
                              className="bg-card hover:bg-destructive hover:text-destructive-foreground"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* View Record Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-card border-border shadow-xl max-w-md">
          <DialogHeader>
            <DialogTitle>Record Details</DialogTitle>
            <DialogDescription>
              View complete information for this record
            </DialogDescription>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                  <p className="text-sm">{selectedRecord.fullName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-sm">{selectedRecord.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p className="text-sm">{selectedRecord.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Company</p>
                  <p className="text-sm">{selectedRecord.companyName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Title</p>
                  <p className="text-sm">{selectedRecord.title}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Submitted By</p>
                  <p className="text-sm">{selectedRecord.submittedBy}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Region</p>
                  <p className="text-sm">{selectedRecord.region}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Created</p>
                  <p className="text-sm">{formatDate(selectedRecord.createdAt)}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
