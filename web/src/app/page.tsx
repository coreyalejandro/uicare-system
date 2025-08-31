"use client";

import React, { useEffect, useState } from "react";
import { detectLoop, getAdvice } from "../lib/aiService";
import { spacing, typography, colors } from "@/design-system";

export default function Home() {
  const [text, setText] = useState("");
  const [steps, setSteps] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const update = () => setIsOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  async function onCheck() {
    setError(null);
    setSteps([]);
    if (!isOnline) {
      setError("You are offline. Please reconnect and try again.");
      return;
    }
    setLoading(true);
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
    } finally {
      setLoading(false);
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
        disabled={loading}
      >
        {loading ? "Checking..." : "Check for Loop"}
      </button>
      {!isOnline && (
        <p style={{ color: colors.danger, marginBottom: spacing.md }}>
          You are offline. Results may be outdated.
        </p>
      )}
      {error && (
        <p style={{ color: colors.danger, marginBottom: spacing.md }}>
          {error}
        </p>
      )}
      {loading ? (
        <ul className="list-disc" style={{ paddingLeft: spacing.md }}>
          {[1, 2, 3].map(i => (
            <li
              key={i}
              className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 mb-2 rounded"
            ></li>
          ))}
        </ul>
      ) : (
        <ul className="list-disc" style={{ paddingLeft: spacing.md }}>
          {steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
