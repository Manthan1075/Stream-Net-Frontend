import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../services/auth/authAPI.js';
import { loginUser as userLogin } from '../../services/auth/authService.js'
import LoginImage from '../../assets/SignupPage.png';
import Logo from '../../shared/components/Logo.jsx';
import Spinner from '../../shared/Loaders/Spinner.jsx';
import { NavLink, useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    console.log("User Data ::", useSelector(state => state.user));


    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await loginUser({ login: data.login, password: data.password });

            if (!response?.success) {
                toast.error(response?.message || "Login Failed");
                return;
            }
            dispatch(userLogin(response?.data))
            toast.success(response?.message || "Login Successful");
            navigate('/');
        } catch (error) {
            toast.error(error?.message || "An error occurred while logging in");
            console.error("Login Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white p-4">
            <div className="w-full max-w-4xl bg-white/5 backdrop-blur-md shadow-lg rounded-2xl flex flex-col md:flex-row overflow-hidden border border-white/10">

                <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 bg-slate-900/80 relative flex flex-col justify-center">
                    <div className="absolute top-2 right-2 w-16 h-16 bg-violet-700/20 rounded-full blur-lg z-0"></div>

                    <div className="flex justify-center mb-4 z-10">
                        <Logo isDarkMode={true} size='lg' />
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-white z-10">Welcome Back</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 z-10 relative">

                        <div className="flex flex-col gap-1">
                            <Label htmlFor="login" className="text-white/80 text-sm font-medium">Email or Username</Label>
                            <Input
                                id="login"
                                type="text"
                                placeholder="Enter your email or username"
                                {...register("login", { required: "Email or username is required" })}
                                className={`w-full px-3 py-2 rounded-md bg-white/5 border text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 transition-all duration-150 text-sm ${errors.login ? 'border-red-500' : 'border-white/20'}`}
                            />
                            {errors.login && (
                                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                                    <AlertCircle size={14} /> {errors.login.message}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label htmlFor="password" className="text-white/80 text-sm font-medium">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Minimum 6 characters required" },
                                })}
                                className={`w-full px-3 py-2 rounded-md bg-white/5 border text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 transition-all duration-150 text-sm ${errors.password ? 'border-red-500' : 'border-white/20'}`}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                                    <AlertCircle size={14} /> {errors.password.message}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full mt-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 rounded-md transition duration-200 text-base"
                            disabled={loading}
                        >
                            {loading ? <Spinner /> : "Login"}
                        </Button>

                        <div className="text-center mt-3 text-white/60 text-base">
                            Don't have an account? <NavLink to="/signup" className="text-violet-400 hover:underline font-medium">Sign up</NavLink>
                        </div>
                    </form>
                </div>

                {/* Image Side */}
                <div className="hidden md:block md:w-1/2">
                    <img src={LoginImage} alt="Login" className="h-full w-full object-cover" />
                </div>
            </div>
        </div>
    );
}

export default Login;
