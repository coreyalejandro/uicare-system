"use client";

import React, { useState } from "react";
import { detectLoop, getAdvice } from "../lib/aiService";
import { spacing, typography, colors } from "@/design-system";

export default function Home() {
  const [text, setText] = useState("");
  const [steps, setSteps] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function onCheck() {
    setError(null);
    setSteps([]);
    try {
      const { loopDetected, details } = await detectLoop(text);
      if (loopDetected) {
        const advice = await getAdvice(details);
        setSteps(advice);
      } else {
        setSteps(["No loop detected. Keep going!"]);
      }
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <main className="max-w-xl mx-auto" style={{ padding: spacing.md }}>
      <h1 className="font-bold" style={{ fontSize: typography.h1, marginBottom: spacing.md }}>
        MoodRING Loop Checker
      </h1>
      <textarea
        aria-label="Work text"
        className="w-full border rounded text-black dark:text-white bg-white dark:bg-gray-800"
        style={{ padding: spacing.sm, marginBottom: spacing.md }}
        value={text}
        onChange={e => setText(e.target.value)}
        rows={6}
        placeholder="Paste your work here…"
      />
      <button
        aria-label="Check for loop"
        className="bg-accent text-accent-foreground rounded hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-ring"
        style={{ padding: `${spacing.sm} ${spacing.md}`, marginBottom: spacing.md }}
        onClick={onCheck}
      >
        Check for Loop
      </button>
      {error && (
        <p style={{ color: colors.danger, marginBottom: spacing.md }}>
          {error}
        </p>
      )}
      <ul className="list-disc" style={{ paddingLeft: spacing.md }}>
        {steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </main>
  );
}
