import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';
import { registerUser } from '../../services/auth/authAPI.js';
import SignupImage from '../../assets/SignupPage.png';
import Logo from '../../shared/components/Logo.jsx'

function Signup() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch("password");

    const formFields = [
        {
            name: 'username',
            label: 'Username',
            type: 'text',
            placeholder: 'username',
            rules: {
                required: 'Username is required',
                minLength: {
                    value: 3,
                    message: 'Username must be at least 3 characters',
                }
            }
        },
        {
            name: 'fullName',
            label: 'Full Name',
            type: 'text',
            placeholder: 'Full Name ',
            rules: { required: 'Full name is required' }
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'e.g. you@example.com',
            rules: {
                required: 'Email is required',
                pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address'
                }
            }
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
            placeholder: 'Minimum 6 characters',
            rules: {
                required: 'Password is required',
                minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                }
            }
        },
        {
            name: 'confirmPassword',
            label: 'Confirm Password',
            type: 'password',
            placeholder: 'Re-enter your password',
            rules: {
                required: 'Confirm Password is required',
                validate: (value) => value === password || 'Passwords do not match'
            }
        },
    ];

    const onSubmit = async (data) => {
        try {
            const res = await registerUser(data);
            console.log("Signup error response:", res);
            if (!res?.success) {

                toast.error(res?.message || "Signup failed!");
                return;
            }
            toast.success(res?.message || "Signup successful!");
            console.log("Signup response:", res);
        } catch (error) {
            toast.error("An unexpected error occurred during signup.");
            console.error("Signup error:", error);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white p-4">
            <div className="w-full max-w-4xl bg-white/5 backdrop-blur-md shadow-lg rounded-2xl flex flex-col md:flex-row overflow-hidden border border-white/10">
                {/* Left image section */}
                <div className="hidden md:block md:w-1/2">
                    <img src={SignupImage} alt="Signup" className="h-full w-full object-cover" />
                </div>

                {/* Form section */}
                <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 bg-slate-900/80 relative flex flex-col justify-center">
                    {/* Subtle background accent */}
                    <div className="absolute top-2 right-2 w-16 h-16 bg-violet-700/20 rounded-full blur-lg z-0"></div>
                    {/* Logo at the top of the form */}
                    <div className="flex justify-center mb-4 z-10">
                        <Logo isDarkMode={true} size='lg' />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-white z-10">
                        Create Your Account
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 z-10 relative">
                        {formFields.map((field) => (
                            <div key={field.name} className="flex flex-col gap-1">
                                <Label htmlFor={field.name} className="text-white/80 text-sm font-medium">{field.label}</Label>
                                <Input
                                    id={field.name}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    autoComplete={field.type === "password" ? "new-password" : "off"}
                                    {...register(field.name, field.rules)}
                                    className={`w-full px-3 py-2 rounded-md bg-white/5 border text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 transition-all duration-150 text-sm ${errors[field.name] ? 'border-red-500' : 'border-white/20'}`}
                                />
                                {errors[field.name] && (
                                    <p className="text-sm text-red-500 mt-1 flex items-center gap-1 ">
                                        <AlertCircle size={14} /> {errors[field.name]?.message}
                                    </p>
                                )}
                            </div>
                        ))}
                        <Button
                            type="submit"
                            className="w-full mt-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 rounded-md transition duration-200 text-base"
                        >
                            Sign Up
                        </Button>
                        <div className="text-center mt-3 text-white/60 text-base">
                            Already have an account? <a href="/login" className="text-violet-400 hover:underline font-medium">Log in</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
