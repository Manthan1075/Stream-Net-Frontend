import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';
import { AlertCircle, ImagePlus } from 'lucide-react';
import { registerUser } from '../../services/auth/authAPI.js';
import SignupImage from '../../assets/SignupPage.png';
import Logo from '../../shared/components/Logo.jsx';
import Spinner from '../../shared/Loaders/Spinner.jsx';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [step, setStep] = useState(1);
    const { register, handleSubmit, watch, getValues, formState: { errors } } = useForm();
    const password = watch("password");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

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
            placeholder: 'Full Name',
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

    const onSubmitStep1 = (data) => {
        setStep(2);
    };

    const onSubmitStep2 = async (imageData) => {
        const userData = getValues();
        const finalData = {
            ...userData,
            avatar: imageData.avatar[0],
            coverImg: imageData.coverImg[0],
        };

        try {
            setLoading(true)
            const res = await registerUser(finalData);
            if (!res?.success) {
                toast.error(res?.message || "Signup failed!");
                return;
            }
            toast.success(res?.message || "Signup successful!");
            navigate('/login');

        } catch (error) {
            toast.error("An unexpected error occurred during signup.");
            console.error("Signup error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white p-4">
            <div className="w-full max-w-4xl bg-white/5 backdrop-blur-md shadow-lg rounded-2xl flex flex-col md:flex-row overflow-hidden border border-white/10">
                <div className="hidden md:block md:w-1/2">
                    <img src={SignupImage} alt="Signup" className="h-full w-full object-cover" />
                </div>

                <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 bg-slate-900/80 relative flex flex-col justify-center">
                    <div className="absolute top-2 right-2 w-16 h-16 bg-violet-700/20 rounded-full blur-lg z-0"></div>

                    <div className="flex justify-center mb-4 z-10">
                        <Logo isDarkMode={true} size='lg' />
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-white z-10">
                        {step === 1 ? "Create Your Account" : "Upload Your Images"}
                    </h2>

                    <form onSubmit={handleSubmit(step === 1 ? onSubmitStep1 : onSubmitStep2)} className="space-y-5 z-10 relative">

                        {step === 1 && formFields.map((field) => (
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

                        {step === 2 && (
                            <>
                                <div className="flex flex-col gap-2">
                                    <Label className="text-white/80 text-lg font-medium">Avatar</Label>
                                    <div className="border border-white/20 bg-white/5 p-4 rounded-md flex items-center gap-4 cursor-pointer hover:border-violet-500 transition" onClick={() => document.getElementById("avatarInput").click()}>
                                        <div className="w-14 h-14 flex items-center justify-center bg-white/10 rounded-md overflow-hidden">
                                            {watch("avatar")?.[0] ? (
                                                <img src={URL.createObjectURL(watch("avatar")[0])} alt="Avatar Preview" className="object-cover w-full h-full rounded" />
                                            ) : (
                                                <ImagePlus className="text-white/60" size={28} />
                                            )}
                                        </div>
                                        <div className="text-white/70 text-sm">
                                            {watch("avatar")?.[0]?.name || "Click to upload Avatar image"}
                                        </div>
                                        <input
                                            id="avatarInput"
                                            type="file"
                                            accept="image/*"
                                            {...register("avatar")}
                                            className="hidden"
                                        />
                                    </div>
                                    {errors.avatar && (
                                        <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                                            <AlertCircle size={14} /> {errors.avatar.message}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2 mt-4">
                                    <Label className="text-white/80 text-lg font-medium">Cover Image</Label>
                                    <div className="border border-white/20 bg-white/5 p-4 rounded-md flex items-center gap-4 cursor-pointer hover:border-violet-500 transition" onClick={() => document.getElementById("coverImgInput").click()}>
                                        <div className="w-14 h-14 flex items-center justify-center bg-white/10 rounded-md overflow-hidden">
                                            {watch("coverImg")?.[0] ? (
                                                <img src={URL.createObjectURL(watch("coverImg")[0])} alt="Cover Preview" className="object-cover w-full h-full rounded" />
                                            ) : (
                                                <ImagePlus className="text-white/60" size={28} />
                                            )}
                                        </div>
                                        <div className="text-white/70 text-sm">
                                            {watch("coverImg")?.[0]?.name || "Click to upload Cover image"}
                                        </div>
                                        <input
                                            id="coverImgInput"
                                            type="file"
                                            accept="image/*"
                                            {...register("coverImg")}
                                            className="hidden"
                                        />
                                    </div>
                                    {errors.coverImg && (
                                        <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                                            <AlertCircle size={14} /> {errors.coverImg.message}
                                        </p>
                                    )}
                                </div>
                            </>
                        )}


                        <Button
                            type="submit"
                            className="w-full mt-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 rounded-md transition duration-200 text-base"
                            disabled={loading}
                        >

                            {loading ? <Spinner /> : step === 1 ? "Next" : "Submit"}
                        </Button>

                        {step === 2 && (
                            <p className="text-center text-white/50 text-sm hover:underline cursor-pointer" onClick={() => setStep(1)}>
                                ← Back to Info
                            </p>
                        )}

                        {step === 1 && (
                            <div className="text-center mt-3 text-white/60 text-base">
                                Already have an account? <a href="/login" className="text-violet-400 hover:underline font-medium">Log in</a>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
