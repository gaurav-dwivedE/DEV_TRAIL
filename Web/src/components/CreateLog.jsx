import React from "react";
import { useForm } from "react-hook-form";
import axios from "../api/axios";

const CreateLog = ({ isOpen, setIsOpen }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors },reset } = useForm();

  const isPrivate = watch("isPrivate");
  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/logs", data, {withCredentials: true});
      console.log(res.data);

      alert("Log Created Successfully 🚀");
      reset();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div
      className={`w-[calc(100%-30px)] bg-black/30 backdrop-blur-3xl shadow-lg rounded-3xl  border border-white/10 p-8 
      ${isOpen ? "translate-x-1" : "translate-x-[1500px]"}  
      absolute z-50 transition-transform duration-500`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">
          Create New Log
        </h2>

        <button
          onClick={() => setIsOpen(false)}
          className="text-white/60 hover:text-red-400 text-sm"
        >
          Close ✕
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <label className="block">
          <span className="text-xs text-white/60">Title</span>
          <input
            type="text"
            placeholder="Refactored Leaderboard API"
            className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
            {...register("title", { required: "Title is required", 
                minLength:{
                value: 5,
                message: "Title should be minimum 4 characters long"
              }
            })}
          />
          {errors.title && (
            <p className="text-xs text-red-400 mt-1">
              {errors.title.message}
            </p>
          )}
        </label>

        {/* Description */}
        <label className="block">
          <span className="text-xs text-white/60">Description</span>
          <textarea
            rows="3"
            placeholder="Improved MongoDB aggregation for weekly, monthly and yearly filtering"
            className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white outline-none resize-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
            {...register("description", {
              required: "Description is required",
              minLength:{
                value: 10,
                message: "Description should be minimum 10 characters long"
              }
            })}
          />
          {errors.description && (
            <p className="text-xs text-red-400 mt-1">
              {errors.description.message}
            </p>
          )}
        </label>

        {/* Toggle Button */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/60">
            Private Log
          </span>

          <button
            type="button"
            onClick={() => setValue("isPrivate", !isPrivate)}
            className={`relative w-14 h-7 rounded-full transition ${
              isPrivate ? "bg-cyan-400" : "bg-white/20"
            }`}
          >
            <div
              className={`absolute top-1 left-1 h-5 w-5 bg-white rounded-full transition-transform ${
                isPrivate ? "translate-x-7" : ""
              }`}
            />
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-xl bg-cyan-400/20 border border-cyan-400/40 px-4 py-3 text-sm font-semibold text-cyan-200 hover:bg-cyan-400/30 transition"
        >
          Create Log
        </button>
      </form>
    </div>
  );
};

export default CreateLog;
