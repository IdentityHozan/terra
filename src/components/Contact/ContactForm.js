"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [status, setStatus] = useState("idle");

  const onSubmit = async (data) => {
    setStatus("submitting");
    try {
      const response = await fetch("https://formspree.io/f/xrbqzeyv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.details,
        }),
      });

      if (response.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-12 text-base xs:text-lg sm:text-xl font-medium leading-relaxed font-in"
    >
      Hello! My name is{" "}
      <input
        type="text"
        placeholder="your name"
        {...register("name", { required: true, maxLength: 80 })}
        className="outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center placeholder:text-lg border-b border-gray focus:border-gray bg-transparent"
      />
      and I want to share a story. You can email me at
      <input
        type="email"
        placeholder="your@email"
        {...register("email", { required: true })}
        className="outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center placeholder:text-lg border-b border-gray focus:border-gray bg-transparent"
      />
      Here are some details about my story: <br />
      <textarea
        {...register("details", {})}
        placeholder="My story is about..."
        rows={3}
        className="w-full outline-none border-0 p-0 mx-0 focus:ring-0  placeholder:text-lg border-b border-gray focus:border-gray bg-transparent"
      />
      <input
        type="submit"
        value="send request"
        className="mt-8 font-medium inline-block capitalize text-lg sm:text-xl py-2 sm:py-3 px-6 sm:px-8 border-2 border-solid border-dark dark:border-light rounded cursor-pointer"
      />
      {status === "success" && (
        <p className="mt-4 text-green-600">Your story was sent successfully!</p>
      )}
      {status === "error" && (
        <p className="mt-4 text-red-600">There was a problem submitting.</p>
      )}
    </form>
  );
}
