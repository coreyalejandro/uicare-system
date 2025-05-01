"use client";

import React, { useState } from "react";
import { detectLoop, getAdvice } from "../lib/aiService";

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
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">MoodRING Loop Checker</h1>
      <textarea
        className="w-full border rounded p-2 mb-4 text-black dark:text-white bg-white dark:bg-gray-800"
        value={text}
        onChange={e => setText(e.target.value)}
        rows={6}
        placeholder="Paste your work here…"
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700"
        onClick={onCheck}
      >
        Check for Loop
      </button>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <ul className="list-disc pl-5 space-y-1">
        {steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </main>
  );
}
