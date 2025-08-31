"use client";

import React, { useState, useEffect } from "react";
import { detectLoop, getAdvice } from "../lib/aiService";
import { assessRisk } from "../lib/riskService";
import { getManiaRisk } from "../lib/maniaService";
import { spacing, typography, colors } from "@/design-system";
import PersonalizedContentPlayer from "./components/PersonalizedContentPlayer";

export default function Home() {
  const [text, setText] = useState("");
  const [steps, setSteps] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [crisis, setCrisis] = useState(false);
  const [mediaQueue, setMediaQueue] = useState<string[]>([]);

  useEffect(() => {
    async function checkMania() {
      try {
        const risk = await getManiaRisk();
        if (risk > 0.7) {
          setCrisis(true);
          try {
            const res = await fetch('/api/settings');
            const prefs = await res.json();
            setMediaQueue(prefs.favoriteTracks || []);
          } catch (err) {
            console.error('Failed to load preferences', err);
          }
          alert("Elevated mania risk detected. Support resources have been shown.");
        }
      } catch (e) {
        console.error(e);
      }
    }
    checkMania();
    const id = setInterval(checkMania, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  async function onCheck() {
    setError(null);
    setSteps([]);
    setCrisis(false);
    try {
      const { score } = await assessRisk(text);
      if (score > 0.8) {
        setCrisis(true);
        return;
      }

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
      {crisis ? (
        <div style={{ color: colors.danger, marginBottom: spacing.md }}>
          <p>If you're in crisis, please reach out:</p>
          <ul className="list-disc" style={{ paddingLeft: spacing.md }}>
            <li><a href="tel:988">Call 988 Suicide & Crisis Lifeline</a></li>
            <li><a href="https://www.crisistextline.org/">Text HOME to 741741</a></li>
          </ul>
        </div>
      ) : (
        <ul className="list-disc" style={{ paddingLeft: spacing.md }}>
          {steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}
      {crisis && mediaQueue.length > 0 && (
        <div style={{ marginTop: spacing.lg }}>
          <PersonalizedContentPlayer queue={mediaQueue} />
        </div>
      )}
    </main>
  );
}
