import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { LayoutGrid, Eye, EyeOff, Apple, Chrome, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

const LoginPage: React.FC = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const { setUser } = useAuthStore();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: 'alex.growth@lifeos.me',
            password: 'password123',
        },
    });

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        // Mocking login for now
        window.console.log('Login submitted:', values);
        setUser({
            id: '1',
            name: 'Alex Growth',
            email: values.email,
        });
        navigate('/sports');
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col bg-[#101922] overflow-hidden p-6 font-sans">
            {/* Background Gradients */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] -z-10" />

            {/* Header */}
            <div className="flex items-center justify-between pt-4 pb-8 max-w-md mx-auto w-full">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                        <LayoutGrid className="text-white w-6 h-6" />
                    </div>
                    <h2 className="text-white text-2xl font-bold tracking-tight">LifeOS</h2>
                </div>
                <Button variant="ghost" className="text-blue-400 font-medium hover:text-blue-300 hover:bg-blue-400/5">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Help
                </Button>
            </div>

            {/* Quote */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10 text-center px-4 max-w-md mx-auto"
            >
                <p className="text-slate-400 text-sm italic font-light leading-relaxed">
                    "The secret of getting ahead is getting started."
                </p>
                <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-2 opacity-60">— Mark Twain</p>
            </motion.div>

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="max-w-md mx-auto w-full"
            >
                <Card className="bg-[#1c2127]/80 backdrop-blur-xl border-slate-700/50 shadow-2xl">
                    <CardHeader className="space-y-1 pt-8 pb-6">
                        <CardTitle className="text-3xl font-bold text-white">Welcome Back</CardTitle>
                        <CardDescription className="text-slate-400 text-base">
                            Focus mode is ready for you.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-slate-200">Email Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="name@example.com"
                                                    {...field}
                                                    className="h-14 bg-[#1c2127]/50 border-slate-700 text-white placeholder:text-slate-600 focus:ring-blue-600 focus:border-blue-600 rounded-xl"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-400" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex justify-between items-center mb-1">
                                                <FormLabel className="text-slate-200">Password</FormLabel>
                                                <Button variant="link" className="p-0 h-auto text-blue-500 text-xs font-medium hover:text-blue-400">
                                                    Forgot?
                                                </Button>
                                            </div>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type={showPassword ? 'text' : 'password'}
                                                        placeholder="Enter your password"
                                                        {...field}
                                                        className="h-14 bg-[#1c2127]/50 border-slate-700 text-white placeholder:text-slate-600 focus:ring-blue-600 focus:border-blue-600 rounded-xl pr-12"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                                    >
                                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-red-400" />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-blue-600/20 mt-2"
                                >
                                    Sign In
                                </Button>
                            </form>
                        </Form>

                        <div className="flex items-center my-8 gap-4">
                            <div className="h-[1px] flex-1 bg-slate-800" />
                            <span className="text-slate-500 text-[10px] font-medium uppercase tracking-widest">Or connect via</span>
                            <div className="h-[1px] flex-1 bg-slate-800" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="h-12 border-slate-700 bg-transparent hover:bg-slate-800 text-white rounded-xl">
                                <Apple className="w-5 h-5 mr-2" />
                                Apple
                            </Button>
                            <Button variant="outline" className="h-12 border-slate-700 bg-transparent hover:bg-slate-800 text-white rounded-xl">
                                <Chrome className="w-5 h-5 mr-2" />
                                Google
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Footer */}
            <div className="mt-auto pt-8 pb-4 text-center">
                <p className="text-slate-400 text-sm">
                    Don't have an account?
                    <Button variant="link" className="p-0 h-auto text-blue-500 font-semibold ml-1 hover:text-blue-400">
                        Join the waitlist
                    </Button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
