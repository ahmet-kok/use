"use client";

import { FilloutStandardEmbed } from "@fillout/react";

import "@fillout/react/style.css";

interface FilloutFormProps {
  formId: string;
}

export default function FilloutForm({ formId }: FilloutFormProps) {
  return <FilloutStandardEmbed filloutId={formId} dynamicResize />;
}
