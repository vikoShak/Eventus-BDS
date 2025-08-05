import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { LogOut, Save, X } from 'lucide-react';

export interface BusinessRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  title: string;
  submittedBy: string;
  region: string;
  createdAt: string;
}

const BusinessForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    title: '',
    submittedBy: '',
    region: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone || !formData.companyName || 
        !formData.title || !formData.submittedBy || !formData.region) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Create new record
    const newRecord: BusinessRecord = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const existingRecords = JSON.parse(localStorage.getItem('businessRecords') || '[]');
    existingRecords.push(newRecord);
    localStorage.setItem('businessRecords', JSON.stringify(existingRecords));

    toast.success('Record saved successfully!');
    
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      companyName: '',
      title: '',
      submittedBy: '',
      region: ''
    });
  };

  const handleCancel = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
    companyName: '',
      title: '',
      submittedBy: '',
      region: ''
    });
    toast.info('Form cleared');
  };

  const handleLogout = () => {
    navigate('/');
    toast.info('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex justify-between items-center bg-card rounded-lg shadow-lg p-4">
          <div className="flex items-center space-x-4">
            {/* Removed Lovable image */}
            <div>
              <h1 className="text-xl font-bold text-foreground">The EventUs Consulting Group</h1>
              <p className="text-sm text-muted-foreground">Business Development Tool</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="bg-card hover:bg-accent"
            >
              View Dashboard
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

      {/* Form */}
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Business Development Entry</CardTitle>
            <CardDescription className="text-center">
              Enter business contact details and information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  placeholder="Enter company name"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter job title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>

              {/* Submitted By */}
              <div className="space-y-2">
                <Label htmlFor="submittedBy">Submitted by *</Label>
                <Select value={formData.submittedBy} onValueChange={(value) => handleInputChange('submittedBy', value)}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select submitter" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border shadow-xl z-50">
                    <SelectItem value="Raghav Hubert">Raghav Hubert</SelectItem>
                    <SelectItem value="Vivek Sharma">Vivek Sharma</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Region */}
              <div className="space-y-2">
                <Label htmlFor="region">Region *</Label>
                <Select value={formData.region} onValueChange={(value) => handleInputChange('region', value)}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border shadow-xl z-50">
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="USA">USA</SelectItem>
                    <SelectItem value="UK">UK</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 pt-6">
              <Button
                onClick={handleSave}
                className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="bg-card hover:bg-accent border-border"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessForm;
