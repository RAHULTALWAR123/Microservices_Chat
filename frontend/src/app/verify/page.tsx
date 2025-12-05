"use client"
import { useUserStore } from '@/stores/useUserStore'
import { ArrowRight, Mail, Sparkles } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { CgPassword } from 'react-icons/cg'

function Page() {


const params = useSearchParams();
const email = params.get("email");
const [otp,setOtp] = React.useState<string>("");
const {verify} = useUserStore();

const router = useRouter();

const [timer, setTimer] = React.useState<number>(60);


useEffect(() => {
    // let interval;
    if(timer > 0) {

        const interval = setInterval(() =>{
            setTimer((prev) => prev - 1);
        },1000)

        return () => {
            clearInterval(interval)
        }
    }
  

   
},[timer])

const handleSubmit = async(e : React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(otp,email);
    try { 
        await verify(email! , otp);
        alert("verification successful");
        router.push("/chat");
    } catch (error) {
        console.log("error", error);
    }

}

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Blobs for Atmosphere */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

      {/* Glassmorphic Card */}
      <div className="relative z-10 w-full max-w-md p-1">
        <div className="relative bg-slate-900/40 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl p-8 sm:p-10 animate-fade-in overflow-hidden">
          
          {/* Decorative shine effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>

          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-purple-600 to-pink-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center justify-center w-16 h-16 bg-slate-900 rounded-full border border-white/10 text-purple-400 shadow-inner">
                <Sparkles size={28} />
              </div>
            </div>
            <h1 className="mt-6 text-3xl font-bold text-transparent bg-clip-text bg-linear-to-br from-white to-white/60">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-slate-400 text-center">
              A 6 digit OTP has been sent to: <strong>{email}</strong>
            </p>
          </div>

          <form 
          onSubmit={handleSubmit}
           className="space-y-6">
            <div className="space-y-4">
              {/* Name Input */}
              

              {/* Email Input */}
              <div className="group relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                //   value={email} 
                //   onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-slate-950/50 border border-slate-700/50 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                  placeholder={email ? email : "Email Address"}
                  required
                />
              </div>

              <div className="group relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400 transition-colors">
                  <CgPassword size={18} />
                </div>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-slate-950/50 border border-slate-700/50 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
                  placeholder="OTP"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
            //   disabled={isLoading}
              className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-slate-900 transition-all duration-200 shadow-lg shadow-purple-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {/* Optional icon on left */}
              </span>
                  Enter Chat
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <button
            //   type="submit"
              disabled={timer > 0}
              className="group mt-5 relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-linear-to-r from-slate-900/40 to-slate-700/50 hover:from-slate-900 hover:to-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-slate-900 transition-all duration-200 shadow-lg shadow-purple-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {/* Optional icon on left */}
              </span>
              {timer > 0 ? `Resend after ${timer} seconds` : "Resend OTP"}
            </button>

          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-slate-500">
              By joining, you agree to our <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">Terms of Service</a> and <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
