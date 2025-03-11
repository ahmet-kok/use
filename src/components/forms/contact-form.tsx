"use client";

import { CheckCheckIcon } from "lucide-react";

import { useContactForm } from "@/hooks/useContactForm";

import { Button } from "../ui/button";

export function ContactForm() {
  const {
    formState,
    setFormState,
    isSubmitting,
    error,
    success,
    handleSubmit,
  } = useContactForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-8 rounded-lg">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-600 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400">
          <div className="flex items-center gap-2">
            <CheckCheckIcon className="size-5 shrink-0" />
            <p className="text-sm">{success}</p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="input"
            placeholder="John Doe"
            value={formState.name}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, name: e.target.value }))
            }
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="input"
            placeholder="john.doe@example.com"
            value={formState.email}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, email: e.target.value }))
            }
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            className="input"
            placeholder="Acme Corp"
            value={formState.companyName}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, companyName: e.target.value }))
            }
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="companyWebsite">Company Website</label>
          <input
            type="url"
            id="companyWebsite"
            name="companyWebsite"
            className="input"
            placeholder="https://"
            value={formState.companyWebsite}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                companyWebsite: e.target.value,
              }))
            }
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            className="input resize-none"
            placeholder="I need help with..."
            value={formState.message}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, message: e.target.value }))
            }
            disabled={isSubmitting}
          />
        </div>
      </div>

      <Button
        type="submit"
        /*         className="button w-full disabled:cursor-not-allowed disabled:opacity-50"
         */ className="w-full"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
