// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react'
// import SignupImage from '../../assets/signup.jpg';
// import { API_BASE_URL } from '../../apiConfig';

// const Signup = () => {
//     const [formData, setFormData] = useState({
//         username: "",
//         // fullName: "",
//         email: "",
//         phoneNumber: "",
//         password: "",
//         confirm_password: "",
//     });

//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const navigate = useNavigate();

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setErrorMessage('');

//         if (formData.password !== formData.confirm_password) {
//             setErrorMessage("Passwords do not match.");
//             return;
//         }

//         setIsSubmitting(true);

//         try {
//             const response = await fetch(`${API_BASE_URL}api/register/`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             });

//             if (response.ok) {
//                 setSuccessMessage("User created successfully! Please log in.");
//                 setTimeout(() => setSuccessMessage(''), 5000);
//                 navigate('/choose-role');
//             } else {
//                 const errorData = await response.json();
//                 setErrorMessage(errorData.detail || "An error occurred. Please try again.");
//             }
//         } catch (error) {
//             console.log("An error occurred while submitting data:", error);
//             setErrorMessage("An error occurred. Please try again.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <Card className="w-full max-w-4xl">
//                 <div className="flex flex-col lg:flex-row">
//                     <div className="hidden lg:block lg:w-1/2">
//                         <img 
//                             src={SignupImage} 
//                             alt="SmartAgrimarket illustration" 
//                             className="w-full h-full object-cover rounded-l-lg" 
//                         />
//                     </div>
//                     <div className="lg:w-1/2 p-8">
//                         <CardHeader>
//                             <CardTitle className="text-3xl font-bold text-center">Karibu SmartAgrimarket</CardTitle>
//                             <CardDescription className="text-center">Create your account to get started</CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                             <form onSubmit={handleSubmit} className="space-y-4">
//                             <div className="space-y-2">
//                                     <Label htmlFor="fullName">Full Name</Label>
//                                     <div className="relative">
//                                         <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                                         <Input
//                                             id="username"
//                                             name="username"
//                                             type="text"
//                                             placeholder="Enter your Full name"
//                                             className="pl-10"
//                                             value={formData.username}
//                                             onChange={handleChange}
//                                             required
//                                         />
//                                     </div>
//                                 </div>
//                                 {/* <div className="space-y-2">
//                                     <Label htmlFor="fullName">Full Name</Label>
//                                     <div className="relative">
//                                         <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                                         <Input
//                                             id="fullName"
//                                             name="fullName"
//                                             type="text"
//                                             placeholder="Enter your Full Name"
//                                             className="pl-10"
//                                             value={formData.fullName}
//                                             onChange={handleChange}
//                                             required
//                                         />
//                                     </div>
//                                 </div> */}
//                                 <div className="space-y-2">
//                                     <Label htmlFor="email">Email</Label>
//                                     <div className="relative">
//                                         <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                                         <Input
//                                             id="email"
//                                             name="email"
//                                             type="email"
//                                             placeholder="Enter your Email address"
//                                             className="pl-10"
//                                             value={formData.email}
//                                             onChange={handleChange}
//                                             required
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="space-y-2">
//                                     <Label htmlFor="phoneNumber">Phone Number</Label>
//                                     <div className="relative">
//                                         <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                                         <Input
//                                             id="phoneNumber"
//                                             name="phoneNumber"
//                                             type="tel"
//                                             placeholder="Enter your phone number"
//                                             className="pl-10"
//                                             value={formData.phoneNumber}
//                                             onChange={handleChange}
//                                             required
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="space-y-2">
//                                     <Label htmlFor="password">Password</Label>
//                                     <div className="relative">
//                                         <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                                         <Input
//                                             id="password"
//                                             name="password"
//                                             type={showPassword ? "text" : "password"}
//                                             placeholder="Password"
//                                             className="pl-10 pr-10"
//                                             value={formData.password}
//                                             onChange={handleChange}
//                                             required
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={() => setShowPassword(!showPassword)}
//                                             className="absolute right-3 top-1/2 transform -translate-y-1/2"
//                                         >
//                                             {showPassword ? <EyeOff className="text-gray-400" /> : <Eye className="text-gray-400" />}
//                                         </button>
//                                     </div>
//                                 </div>
//                                 <div className="space-y-2">
//                                     <Label htmlFor="confirm_password">Confirm Password</Label>
//                                     <div className="relative">
//                                         <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                                         <Input
//                                             id="confirm_password"
//                                             name="confirm_password"
//                                             type={showConfirmPassword ? "text" : "password"}
//                                             placeholder="Confirm Password"
//                                             className="pl-10 pr-10"
//                                             value={formData.confirm_password}
//                                             onChange={handleChange}
//                                             required
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                                             className="absolute right-3 top-1/2 transform -translate-y-1/2"
//                                         >
//                                             {showConfirmPassword ? <EyeOff className="text-gray-400" /> : <Eye className="text-gray-400" />}
//                                         </button>
//                                     </div>
//                                 </div>
//                                 {errorMessage && (
//                                     <Alert variant="destructive">
//                                         <AlertDescription>{errorMessage}</AlertDescription>
//                                     </Alert>
//                                 )}
//                                 {successMessage && (
//                                     <Alert>
//                                         <AlertDescription>{successMessage}</AlertDescription>
//                                     </Alert>
//                                 )}
//                                 <Button type="submit" className="w-full bg-red-600" disabled={isSubmitting}>
//                                     {isSubmitting ? 'Signing Up...' : 'Sign Up'}
//                                 </Button>
//                             </form>
//                         </CardContent>
//                         <CardFooter className="flex justify-center">
//                             <p className="text-sm text-gray-600">
//                                 Already have an account?{" "}
//                                 <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
//                                     Login
//                                 </Link>
//                             </p>
//                         </CardFooter>
//                     </div>
//                 </div>
//             </Card>
//         </div>
//     );
// };

// export default Signup;

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SignupImage from '../../assets/signup.jpg';
import { API_BASE_URL } from '../../apiConfig';
// import { empty } from "../../utils/empty"; // Ensure this is used or remove it if not needed

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        first_name: "",           
        last_name: "",        
        email: "",               
        password: "",
        confirm_password: "",
        // user_role: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        if (formData.password !== formData.confirm_password) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`${API_BASE_URL}api/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSuccessMessage("User created successfully! Please log in.");
                setTimeout(() => setSuccessMessage(''), 5000);
                // console.log("User created successfully");
                navigate('/choose-role');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.detail || "An error occurred. Please try again.");
            }
        } catch (error) {
            console.log("An error occurred while submitting data:", error);
            setErrorMessage("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg">
                    <div className="hidden lg:flex flex-1">
                        <img 
                            src={SignupImage} 
                            alt="SmartAgrimarket illustration" 
                            className="w-full h-full object-cover rounded-l-lg" 
                        />
                    </div>
                    {/* Form Section */}
                    <div className="flex-1 p-8">
                        <h2 className="text-3xl font-bold text-center mb-6">Karibu ;)</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                                <input 
                                    type="text" 
                                    name="username"  
                                    placeholder="User Name" 
                                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                                    required 
                                    value={formData.username}  
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <input 
                                    type="text" 
                                    name="first_name"  
                                    placeholder="First Name" 
                                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                                    required 
                                    value={formData.first_name}  
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <input 
                                    type="text" 
                                    name="last_name"  
                                    placeholder="Last Name" 
                                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                                    required 
                                    value={formData.last_name}  
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <input 
                                    type="email" 
                                    name="email"  
                                    placeholder="Email address..." 
                                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                                    required 
                                    value={formData.email}  
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <input 
                                    type="password" 
                                    name="password" 
                                    placeholder="Password..." 
                                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                                    required 
                                    value={formData.password}  
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <input 
                                    type="password" 
                                    name="confirm_password"  
                                    placeholder="Confirm Password..." 
                                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                                    required 
                                    value={formData.confirm_password}  
                                    onChange={handleChange}
                                />
                            </div>
                            {/* <div className="flex items-center space-x-4">
                                 <label>
                                    Farmer:
                                    <input
                                        type="checkbox"
                                        name="is_farmer"
                                        checked={formData.user_role}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    Buyer:
                                    <input
                                        type="checkbox"
                                        name="is_buyer"
                                        checked={formData.user_role}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    Vendor:
                                    <input
                                        type="checkbox"
                                        name="is_buyer"
                                        checked={formData.user_role}
                                        checked={formData.is_buyer}
                                        value={'buyer'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div> */}
                            
                            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                            <div>
                                <button 
                                    type="submit" 
                                    className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition duration-300"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                                </button>
                            </div>
                            <div className="text-center">
                                <span>Already have an account? </span>
                                <Link to="/login" className="text-indigo-600 hover:underline">
                                    Login
                                </Link>
                            </div>
                        </form>
                    </div>    
                </div>
            </div>   
        </>
    ); 
};

export default Signup;
