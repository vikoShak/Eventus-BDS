import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (loginId === 'Me_Eventus' && password === 'TECG_2025@') {
      toast.success('Login successful! Welcome to Eventus Consulting Group.');
      navigate('/form');
    } else {
      toast.error('Invalid credentials. Please check your Login ID and password.');
    }

    setIsLoading(false);
  };

  const handleForgotPassword = () => {
    const emailAddress = 'vsharma2016a@icloud.com';
    const subject = encodeURIComponent('Password Reset Request for Eventus Consulting Group');
    const body = encodeURIComponent('Dear Administrator,\n\nI would like to request a password reset for my account. Please provide instructions on how to proceed.\n\nThank you.');
    
    const mailtoLink = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    
    window.open(mailtoLink, '_blank');
    toast.info('Your email client should open shortly to send a password reset request.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo Section */}
        <div className="text-center">
          <h1 className="text-4xl font-cursive text-primary animate-sparkle-entrance">The EventUs Consulting Group</h1>
        </div>

        {/* Login Form */}
        <Card className="shadow-xl border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="loginId">Login ID</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="loginId"
                    type="text"
                    placeholder="Enter your Login ID"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <Button 
                  type="button" 
                  variant="link" 
                  className="p-0 h-auto text-sm text-primary hover:text-primary/80 transition-colors duration-200"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </Button>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>© 2025 Eventus Consulting Group. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
