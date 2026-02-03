import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { LayoutGrid, Eye, EyeOff, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useNavigate } from 'react-router-dom';

const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const RegisterPage: React.FC = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        window.console.log('Register submitted:', values);
        navigate('/login');
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

            {/* Register Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto w-full my-auto"
            >
                <Card className="bg-[#1c2127]/80 backdrop-blur-xl border-slate-700/50 shadow-2xl">
                    <CardHeader className="space-y-1 pt-8 pb-6">
                        <CardTitle className="text-3xl font-bold text-white">Create Account</CardTitle>
                        <CardDescription className="text-slate-400 text-base">
                            Start your journey to organized life today.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-slate-200">Full Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="John Doe"
                                                    {...field}
                                                    className="h-12 bg-[#1c2127]/50 border-slate-700 text-white placeholder:text-slate-600 focus:ring-blue-600 focus:border-blue-600 rounded-xl"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-400" />
                                        </FormItem>
                                    )}
                                />

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
                                                    className="h-12 bg-[#1c2127]/50 border-slate-700 text-white placeholder:text-slate-600 focus:ring-blue-600 focus:border-blue-600 rounded-xl"
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
                                            <FormLabel className="text-slate-200">Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type={showPassword ? 'text' : 'password'}
                                                        placeholder="Create a password"
                                                        {...field}
                                                        className="h-12 bg-[#1c2127]/50 border-slate-700 text-white placeholder:text-slate-600 focus:ring-blue-600 focus:border-blue-600 rounded-xl pr-12"
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

                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-slate-200">Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Confirm your password"
                                                    {...field}
                                                    className="h-12 bg-[#1c2127]/50 border-slate-700 text-white placeholder:text-slate-600 focus:ring-blue-600 focus:border-blue-600 rounded-xl"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-400" />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-blue-600/20 mt-4"
                                >
                                    Create Account
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Footer */}
            <div className="mt-auto pt-8 pb-4 text-center">
                <p className="text-slate-400 text-sm">
                    Already have an account?
                    <Button
                        variant="link"
                        className="p-0 h-auto text-blue-500 font-semibold ml-1 hover:text-blue-400"
                        onClick={() => navigate('/login')}
                    >
                        Sign In
                    </Button>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
