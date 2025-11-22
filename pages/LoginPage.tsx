
import React, { useState } from 'react';
import { 
    User, 
    Lock, 
    Eye, 
    EyeOff, 
    ArrowRight, 
    Phone, 
    ShieldCheck, 
    CheckCircle, 
    ChevronLeft, 
    KeyRound,
    Leaf
} from 'lucide-react';

interface LoginPageProps {
  onLogin: (username: string, pass: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [view, setView] = useState<'login' | 'forgot' | 'otp' | 'success'>('login');
  
  // Form States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handlers
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
        setIsLoading(false);
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }
        onLogin(username, password);
    }, 800);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
        setError('Please enter a valid phone number.');
        return;
    }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        setView('otp');
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length !== 4) {
        setError('Please enter the 4-digit code.');
        return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        // Mock verification
        if (code === '1234') {
            setView('success');
        } else {
            setError('Invalid code. Try 1234.');
        }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-aqua-900 flex items-center justify-center p-4 transition-colors duration-300">
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-aqua-200/20 dark:bg-aqua-500/5 blur-3xl"></div>
          <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-200/20 dark:bg-blue-500/5 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md bg-white dark:bg-aqua-800 border border-gray-200 dark:border-aqua-700 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300">
        
        {/* Brand Header */}
        <div className="p-8 text-center bg-gradient-to-b from-aqua-50/50 to-transparent dark:from-aqua-900/50">
            <div className="mx-auto h-16 w-16 bg-gradient-to-br from-aqua-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-aqua-500/20 mb-4">
                <Leaf className="text-white h-8 w-8" />
            </div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">AquaERP Solutions</h1>
            <p className="text-sm text-gray-500 dark:text-aqua-200 mt-2">Enterprise Resource Planning</p>
        </div>

        <div className="px-8 pb-8">
            
            {/* --- LOGIN VIEW --- */}
            {view === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 dark:text-aqua-100 uppercase mb-1.5">Username</label>
                            <div className="relative group">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-aqua-500 transition-colors" size={18} />
                                <input 
                                    type="text" 
                                    className="w-full bg-gray-50 dark:bg-aqua-900/50 border border-gray-200 dark:border-aqua-700 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-aqua-500 focus:ring-1 focus:ring-aqua-500 transition-all"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-xs font-bold text-gray-700 dark:text-aqua-100 uppercase">Password</label>
                                <button 
                                    type="button"
                                    onClick={() => setView('forgot')}
                                    className="text-xs text-aqua-600 dark:text-aqua-400 hover:text-aqua-700 dark:hover:text-aqua-300 font-medium"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-aqua-500 transition-colors" size={18} />
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    className="w-full bg-gray-50 dark:bg-aqua-900/50 border border-gray-200 dark:border-aqua-700 rounded-xl py-3 pl-10 pr-10 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-aqua-500 focus:ring-1 focus:ring-aqua-500 transition-all"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium flex items-center gap-2 animate-in fade-in">
                            <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                            {error}
                        </div>
                    )}

                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-aqua-500 hover:bg-aqua-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-aqua-500/30 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                            <>Login to Dashboard <ArrowRight size={18} /></>
                        )}
                    </button>
                </form>
            )}

            {/* --- FORGOT PASSWORD: PHONE INPUT --- */}
            {view === 'forgot' && (
                <form onSubmit={handleSendOtp} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="text-center space-y-2">
                        <div className="mx-auto h-12 w-12 bg-aqua-50 dark:bg-aqua-900/50 rounded-full flex items-center justify-center text-aqua-600 dark:text-aqua-400 mb-2">
                            <KeyRound size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Reset Password</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Enter your registered phone number to receive a verification code.</p>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-xs font-bold text-gray-700 dark:text-aqua-100 uppercase mb-1.5">Phone Number</label>
                        <div className="relative group">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-aqua-500 transition-colors" size={18} />
                            <input 
                                type="tel" 
                                className="w-full bg-gray-50 dark:bg-aqua-900/50 border border-gray-200 dark:border-aqua-700 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-aqua-500 focus:ring-1 focus:ring-aqua-500 transition-all"
                                placeholder="+1 (555) 000-0000"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        {error && <p className="text-red-500 text-xs mt-1 pl-1">{error}</p>}
                    </div>

                    <div className="space-y-3">
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-aqua-500 hover:bg-aqua-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-aqua-500/30 transition-all flex justify-center items-center gap-2"
                        >
                             {isLoading ? <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : 'Send Code'}
                        </button>
                        <button 
                            type="button"
                            onClick={() => { setView('login'); setError(''); }}
                            className="w-full text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white font-medium py-2 text-sm transition-colors flex items-center justify-center gap-1"
                        >
                            <ChevronLeft size={16} /> Back to Login
                        </button>
                    </div>
                </form>
            )}

            {/* --- FORGOT PASSWORD: OTP --- */}
            {view === 'otp' && (
                <form onSubmit={handleVerifyOtp} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="text-center space-y-2">
                        <div className="mx-auto h-12 w-12 bg-aqua-50 dark:bg-aqua-900/50 rounded-full flex items-center justify-center text-aqua-600 dark:text-aqua-400 mb-2">
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Verify Identity</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Enter the 4-digit code sent to <br/><span className="font-medium text-gray-900 dark:text-white">{phone}</span></p>
                    </div>

                    <div className="flex justify-center gap-3">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                className="w-12 h-12 text-center text-xl font-bold bg-gray-50 dark:bg-aqua-900/50 border border-gray-200 dark:border-aqua-700 rounded-xl focus:outline-none focus:border-aqua-500 focus:ring-1 focus:ring-aqua-500 transition-all text-gray-900 dark:text-white"
                            />
                        ))}
                    </div>
                    {error && <p className="text-red-500 text-xs text-center mt-1">{error}</p>}

                    <div className="space-y-3">
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-aqua-500 hover:bg-aqua-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-aqua-500/30 transition-all flex justify-center items-center gap-2"
                        >
                            {isLoading ? <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : 'Verify Code'}
                        </button>
                        <div className="flex justify-between items-center text-xs px-1">
                            <button type="button" onClick={() => setView('forgot')} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">Change Number</button>
                            <button type="button" className="text-aqua-600 hover:text-aqua-700 dark:text-aqua-400 font-medium">Resend Code</button>
                        </div>
                    </div>
                </form>
            )}

            {/* --- SUCCESS VIEW --- */}
            {view === 'success' && (
                <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-300 py-4">
                    <div className="mx-auto h-20 w-20 bg-green-100 dark:bg-green-500/10 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-4 shadow-lg shadow-green-500/20">
                        <CheckCircle size={40} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Verified Successfully!</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Your identity has been verified. A temporary password has been sent to your phone.</p>
                    </div>
                    <button 
                        onClick={() => { setView('login'); setError(''); setUsername(''); setPassword(''); }}
                        className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-aqua-900 dark:hover:bg-gray-100 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2"
                    >
                        Back to Login
                    </button>
                </div>
            )}

        </div>
        
        {/* Footer */}
        <div className="p-4 bg-gray-50 dark:bg-aqua-900/30 border-t border-gray-100 dark:border-aqua-700/50 text-center">
            <p className="text-xs text-gray-400 dark:text-gray-500">&copy; 2024 AquaERP Solutions Inc.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
