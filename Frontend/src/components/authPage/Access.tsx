import { Link, useLocation } from "react-router-dom"; 
import { useEffect, useState } from "react";

export const Access = () => {
  const location = useLocation();
  const { pathname } = location;
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setShowPassword(false)
  }, [pathname])

  const LogIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {pathname == "/signin" ? (
        <div className="flex flex-col py-6 px-8 border rounded-xl w-105 h-fit text-white">
          <div className="flex flex-row items-center justify-between border-b border-white mb-3 pb-2.5">
            <span className="text-3xl font-semibold">
              Sign In
            </span>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 px-3 rounded-lg focus:outline-none focus:shadow-outline">
              <Link to={"/"}>
                Home
              </Link>
            </button>
          </div>  
          <form className="flex flex-col gap-3 mt-2 border-b" onSubmit={LogIn}>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                placeholder=""
                pattern="^[\w\.-]+@[\w\.-]+\.\w{2,}$"
                className="block p-2.5 pt-4 w-full text-sm text-white bg-transparent h-11 border border-white/20 rounded-lg appearance-none focus:border-blue-500 focus:ring-0 focus:outline-none peer"
                required
              ></input>
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#050b2c] px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Enter your email:
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder=""
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':\\|,.<>\/?]).{8,}$"
                className="block p-2.5 pt-4 w-full text-sm text-white bg-transparent h-11 border border-white/20 rounded-lg appearance-none focus:border-blue-500 focus:ring-0 focus:outline-none peer"
                required
              ></input>
              <label
                htmlFor="password"
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#050b2c] px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Enter your password:
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="showPassword"
                title="showPassword"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2 size-3.5  accent-info bg-gray-700"
              />
              <label htmlFor="showPassword" className="text-sm">Show password</label>
            </div>
            <div className="flex flex-row-reverse gap-4 my-2">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              >
                Sign In
              </button>
              <button>
                <span className="text-blue-500 hover:underline">
                  Forgot password?
                </span>
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center mt-4">
            <span className="text-gray-400">Don't have an account?</span>
            <a href="/signup" className="text-blue-500 hover:underline ml-2">
              Sign Up
            </a>
          </div>
        </div>
      ) : (
        <div className="flex flex-col py-6 px-8 border rounded-xl w-105 h-fit text-white">
          <div className="flex flex-row items-center justify-between border-b border-white mb-3 pb-2.5">
            <span className="text-3xl font-semibold">
              Sign Up
            </span>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 px-3 rounded-lg focus:outline-none focus:shadow-outline">
              <Link to={"/"}>
                Home
              </Link>
            </button>
          </div> 
          <form className="flex flex-col gap-3 mt-2 border-b">
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                placeholder=""
                className="block p-2.5 pt-4 w-full text-sm text-white bg-transparent h-11 border border-white/20 rounded-lg appearance-none focus:border-blue-500 focus:ring-0 focus:outline-none peer"
                required
              ></input>
              <label
                htmlFor="name"
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#050b2c] px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2  peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Enter your name:
              </label>
            </div>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                placeholder=""
                pattern="^[\w\.-]+@[\w\.-]+\.\w{2,}$"
                className="block p-2.5 pt-4 w-full text-sm text-white bg-transparent h-11 border border-white/20 rounded-lg appearance-none focus:border-blue-500 focus:ring-0 focus:outline-none peer"
                required
              ></input>
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#050b2c] px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Enter your email:
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder=""
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':\\|,.<>\/?]).{8,}$"
                className="block p-2.5 pt-4 w-full text-sm text-white bg-transparent h-11 border border-white/20 rounded-lg appearance-none focus:border-blue-500 focus:ring-0 focus:outline-none peer"
                required
              ></input>
              <label
                htmlFor="password"
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#050b2c] px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Enter your password:
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder=""
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':\\|,.<>\/?]).{8,}$"
                className="block p-2.5 pt-4 w-full text-sm text-white bg-transparent h-11 border border-white/20 rounded-lg appearance-none focus:border-blue-500 focus:ring-0 focus:outline-none peer"
                required
              ></input>
              <label
                htmlFor="confirmPassword"
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#050b2c] px-2 peer-focus:px-2 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Confirm your password:
              </label>
            </div>
            <div className="flex flex-row justify-between mb-2">
              <div>
                <input
                  type="checkbox"
                  name="showPassword"
                  title="showPassword"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="mr-2 bg-transparent border border-white/20 rounded-lg focus:ring-0 focus:outline-none"
                />
                <label htmlFor="showPassword" className="text-sm">Show password</label>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold mt-2 py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center mt-4">
            <span className="text-gray-400">Already have an account?</span>
            <a href="/signin" className="text-blue-500 hover:underline ml-2">
              Sign In
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
