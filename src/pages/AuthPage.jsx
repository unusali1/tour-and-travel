import Header from "@/components/Navbar/Header";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Separator } from "@/components/ui/separator";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const toggleForm = () => setIsSignUp(!isSignUp);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      const signUpData = {
        email,
        password,
        confirmPassword,
        phone
      };
      console.log("SignUp Data:", signUpData);
    } else {
      const signInData = {
        email,
        password
      };
      console.log("SignIn Data:", signInData);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-full py-20 flex sm:px-0 px-2 justify-center bg-gray-200 dark:bg-background">
        <div className="bg-white sm:w-1/3 w-full dark:bg-gray-800 p-8 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <div className="absolute left-2.5 top-3.5 h-4 w-4 text-muted-foreground">
                <Icon icon="mdi:email" className="font-bold text-2xl text-gray-400" />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-background px-12 py-6"
              />
            </div>

            {isSignUp && (
              <div className="relative">
                <div className="absolute left-2.5 top-3.5 h-4 w-4 text-muted-foreground">
                  <Icon icon="mingcute:phone-fill" className="font-bold text-2xl text-gray-400" />
                </div>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  className="w-full rounded-lg bg-background px-12 py-6"
                />
              </div>
            )}

            <div className="relative">
              <div className="absolute left-2.5 top-3.5 h-4 w-4 text-muted-foreground">
                <Icon icon="ri:lock-password-fill" className="font-bold text-2xl text-gray-400" />
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-background px-12 py-6"
              />
            </div>

            {isSignUp && (
              <div className="relative">
                <div className="absolute left-2.5 top-3.5 h-4 w-4 text-muted-foreground">
                  <Icon icon="ri:lock-password-fill" className="font-bold text-2xl text-gray-400" />
                </div>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg bg-background px-12 py-6"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#00026E] dark:bg-gray-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>

            {!isSignUp && (
              <div className="flex justify-center items-center space-x-1">
                <Separator className="my-2 w-48 dark:bg-gray-400" />
                <p className="text-gray-400 text-sm">OR</p>
                <Separator className="my-2 w-48 dark:bg-gray-400" />
              </div>
            )}

            {!isSignUp && (
              <button
                type="button"
                className="flex space-x-3 justify-center w-full bg-white dark:bg-gray-600 text-gray-500 border p-3 rounded-lg font-semibold transition duration-300"
              >
                <Icon icon="devicon:google" className="font-bold text-2xl text-gray-400" />
                <p className="dark:text-white text-sm">Login With Google</p>
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
