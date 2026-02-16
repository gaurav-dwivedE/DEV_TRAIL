import { useForm } from "react-hook-form";
import axios  from "../api/axios";
import { AuthContext } from "../context/AuthProvider";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const {user, setUser} = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors }} = useForm();
  const navigate = useNavigate()

  useEffect(() => {
      if(user){
        navigate('/', {replace: true})
      } 
     },[user, navigate])

  const onSubmit = async (data) => {
  try {
    // Combine both requests into one flow
    const registerFlow = async () => {
      const res = await axios.post(
        "/users/register",
        data,
        { withCredentials: true }
      );

      const result = await axios.get(
        "/users/me",
        { withCredentials: true }
      );

      setUser(result.data.user);

      return res; // so toast knows it succeeded
    };

    await toast.promise(registerFlow(), {
      loading: "Registering user...",
      success: "Account created successfully 🎉",
      error: (err) =>
        err.response?.data?.message || "Registration failed",
    });
  navigate("/", { replace: true });
  } catch (error) {
    setUser(null);
  }
};


  return (
    <div className="min-h-screen bg-[#0b0f14] text-white flex items-center justify-center px-6">
      <div className="relative w-full max-w-4xl">
        <div className="absolute inset-0" />
        <div className="absolute inset-0 opacity-20" />

        <div className="relative z-10 grid grid-cols-12 gap-6 bg-white/5 border border-white/10 rounded-3xl p-6 lg:p-10 backdrop-blur-xl shadow-2xl">
          <div className="col-span-12 lg:col-span-5 p-6 rounded-2xl ">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-cyan-400/20 flex items-center justify-center">
                <span className="text-cyan-300 font-bold">D</span>
              </div>
              <div className="text-xl font-semibold tracking-wide">DevTrail</div>
            </div>
            <div className="text-2xl font-semibold">Create account</div>
            <div className="text-white/60 text-sm mt-2">
              Start tracking your growth with DevTrail.
            </div>
            <div className="mt-8 h-28 rounded-2xl" />
          </div>

          <div className="col-span-12 lg:col-span-7 p-4 lg:p-8">
            <div className="text-3xl font-semibold">Register</div>
            <div className="text-white/60 text-sm mt-2">
              Create your account in seconds.
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
              <label className="block">
                <span className="text-xs text-white/60">Name</span>
                <input
                  type="text"
                  placeholder="gaurav"
                  className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>
                )}
              </label>

              <label className="block">
                <span className="text-xs text-white/60">Email</span>
                <input
                  type="email"
                  placeholder="gaurav12@gmail.com"
                  className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
                )}
              </label>

              <label className="block">
                <span className="text-xs text-white/60">Password</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                  {...register("password", { required: "Password is required" })}
                />
                {errors.password && (
                  <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>
                )}
              </label>

              <button
                type="submit"
                className="w-full rounded-xl bg-cyan-400/20 border border-cyan-400/40 px-4 py-3 text-sm font-semibold text-cyan-200 hover:bg-cyan-400/30 transition"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
