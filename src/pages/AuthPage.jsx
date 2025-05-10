import Header from "@/components/Navbar/Header";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Separator } from "@/components/ui/separator";
import { useLoginMutation, useRegisterMutation } from "@/redux/auth/authApi";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


const AuthPage = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const toggleForm = () => setIsSignUp(!isSignUp);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMsg,setErrorMsg] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const [register, {data,isLoading,error:responseError}] = useRegisterMutation(); 
  const [login, { data:dataLogin, isLoading:loadingLogin, error: responseErrorLogin }] =useLoginMutation();

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) newErrors.email = "Email is required";
    if (isSignUp && !name.trim()) newErrors.name = "Name is required";
    if (!password.trim()) newErrors.password = "Password is required";
    if (isSignUp && password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if(responseErrorLogin?.data){
      setErrorMsg("Email or Password Incorrect")
    }
    if (dataLogin?.token && dataLogin?.user) {
        navigate("/");
    }
    if (data?.token && data?.user) {
      navigate("/");
  }
}, [dataLogin,data,responseErrorLogin,navigate]);


const handleSubmit = (e) => {
  setErrorMsg("");
  e.preventDefault();
  if (!validateForm()) return;
  
  if (isSignUp) {
    register({
      name: name,
      email: email,
      password: password,
      password_confirmation: confirmPassword
    });
  } else {
    login({
      email,
      password
    });
  }
};


  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };


  return (
    <>
      <Header />
      <div className="min-h-full py-20 flex sm:px-0 px-2 justify-center bg-gray-200 dark:bg-background">
        <div className="bg-white sm:w-1/3 w-full dark:bg-gray-800 p-8 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
         {
          errorMsg && !isSignUp && (
            <Alert variant="destructive" className="mb-4">
            {/* <AlertCircle className="h-4 w-4" /> */}
            {/* <AlertTitle>Error</AlertTitle> */}
            <AlertDescription>
              {errorMsg}
            </AlertDescription>
          </Alert>
      
          )
         }
          <form className="space-y-6" onSubmit={handleSubmit}>

          {isSignUp && (
              <div className="relative">
                <div className="absolute left-2.5 top-3.5 h-4 w-4 text-muted-foreground">
                  <Icon
                    icon="mingcute:phone-fill"
                    className="font-bold text-2xl text-gray-400"
                  />
                </div>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full rounded-lg bg-background px-12 py-6"
                />
                 {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>
            )}

            <div className="relative">
              <div className="absolute left-2.5 top-3.5 h-4 w-4 text-muted-foreground">
                <Icon
                  icon="mdi:email"
                  className="font-bold text-2xl text-gray-400"
                />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-background px-12 py-6"
              />
               {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            

            <div className="relative">
              <div className="absolute left-2.5 top-3.5 h-4 w-4 text-muted-foreground">
                <Icon
                  icon="ri:lock-password-fill"
                  className="font-bold text-2xl text-gray-400"
                />
              </div>
              <Input
                id="password"
                type={showPassword.password ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-background px-12 py-6"
              />
              <div className="absolute right-4 top-3.5 h-4 w-4 text-muted-foreground">
                <Icon
                  onClick={() => togglePasswordVisibility("password")}
                  icon={
                    showPassword.password ? "eva:eye-fill" : "eva:eye-off-fill"
                  }
                  className="font-bold text-2xl text-gray-400 cursor-pointer"
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {isSignUp && (
              <div className="relative">
                <div className="absolute left-2.5 top-3.5 h-4 w-4 text-muted-foreground">
                  <Icon
                    icon="ri:lock-password-fill"
                    className="font-bold text-2xl text-gray-400"
                  />
                </div>
                <Input
                  id="confirm-password"
                  type={showPassword.confirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg bg-background px-12 py-6"
                />
                <div className="absolute right-4 top-3.5 h-4 w-4 text-muted-foreground">
                  <Icon
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    icon={
                      showPassword.confirmPassword
                        ? "eva:eye-fill"
                        : "eva:eye-off-fill"
                    }
                    className="font-bold text-2xl text-gray-400 cursor-pointer"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {
              loadingLogin ? (
                <button
                type="submit"
                className="w-full bg-[#00026E] dark:bg-gray-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
              >
               Loading....
              </button>
              ):(
                <button
                type="submit"
                className="w-full bg-[#00026E] dark:bg-gray-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
              )
            }

           

            {!isSignUp && (
              <div className="flex justify-center items-center space-x-1">
                <Separator className="my-2 w-36 dark:bg-gray-400" />
                <p className="text-gray-400 text-sm">If want to a host</p>
                <Separator className="my-2 w-36 dark:bg-gray-400" />
              </div>
            )}

            {!isSignUp && (
              <button
                type="button"
                className="flex space-x-3 justify-center w-full bg-yellow-700 dark:bg-gray-600 text-gray-200 border p-3 rounded-lg font-semibold transition duration-300"
                onClick={() =>
                  window.open("https://backend.dayfuna.com/login", "_blank")
                }
              >
                
                <p className="dark:text-white text-sm">Become a host</p>
              </button>
            )}
          </form>

          <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              onClick={toggleForm}
              className="text-blue-500 dark:text-yellow-400 ml-2 cursor-pointer hover:underline"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
