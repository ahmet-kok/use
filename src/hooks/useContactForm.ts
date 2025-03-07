"use client";
import { useState } from "react";

interface ContactFormData {
  name: string;
  email: string;
  companyName: string;
  companyWebsite: string;
  message: string;
}

interface UseContactFormReturn {
  formState: ContactFormData;
  setFormState: React.Dispatch<React.SetStateAction<ContactFormData>>;
  isSubmitting: boolean;
  error: string | null;
  success: string | null;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export function useContactForm(): UseContactFormReturn {
  const [formState, setFormState] = useState<ContactFormData>({
    name: "",
    email: "",
    companyName: "",
    companyWebsite: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          companyName: formState.companyName,
          companyWebsite: formState.companyWebsite,
          message: formState.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit form");
      }

      // Reset form on success
      setFormState({
        name: "",
        email: "",
        companyName: "",
        companyWebsite: "",
        message: "",
      });
      setSuccess(data.message || "Message sent successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formState,
    setFormState,
    isSubmitting,
    error,
    success,
    handleSubmit,
  };
}
