"use client";

import React, { useState, useEffect, useRef } from "react";
import { detectLoop, getAdvice } from "../lib/aiService";
import { assessRisk } from "../lib/riskService";
import { getManiaRisk } from "../lib/maniaService";
import { simulateFutureStates, FutureState } from "../lib/proactiveAgent";
import { spacing, typography, colors } from "@/design-system";
import PersonalizedContentPlayer from "./components/PersonalizedContentPlayer";
import FutureSimulations from "./components/FutureSimulations";
import { autosaveDraft, generateImprovedDraft } from "../lib/draftEnhancer";

export default function Home() {
  const [text, setText] = useState("");
  const [steps, setSteps] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [crisis, setCrisis] = useState(false);
  const [mediaQueue, setMediaQueue] = useState<string[]>([]);
  const keystrokes = useRef(0);
  const [showRecover, setShowRecover] = useState(false);
  const [drafts, setDrafts] = useState<{original:{name:string;content:string}[];improved:{name:string;content:string}[]}>({original:[], improved:[]});
  const [simulations, setSimulations] = useState<FutureState[]>([]);
  const [showFuture, setShowFuture] = useState(false);

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (text) {
        autosaveDraft(text);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    if (crisis && text) {
      generateImprovedDraft(text).catch(err => console.error(err));
    }
  }, [crisis, text]);

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
        onChange={e => {
          setText(e.target.value);
          keystrokes.current += 1;
          if (keystrokes.current >= 20) {
            autosaveDraft(e.target.value);
            keystrokes.current = 0;
          }
        }}
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
      <button
        aria-label="Improve draft"
        className="bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-ring"
        style={{ padding: `${spacing.sm} ${spacing.md}`, marginBottom: spacing.md, marginLeft: spacing.sm }}
        onClick={() => generateImprovedDraft(text)}
      >
        Improve Draft
      </button>
      <button
        aria-label="Recover drafts"
        className="bg-muted text-muted-foreground rounded hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-ring"
        style={{ padding: `${spacing.sm} ${spacing.md}`, marginBottom: spacing.md, marginLeft: spacing.sm }}
        onClick={async () => {
          try {
            const res = await fetch('/api/drafts');
            if (res.ok) {
              setDrafts(await res.json());
              setShowRecover(true);
            }
          } catch (err) {
            console.error(err);
          }
        }}
      >
        Recover Drafts
      </button>
      <button
        aria-label="Preview future"
        className="bg-accent text-accent-foreground rounded hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-ring"
        style={{ padding: `${spacing.sm} ${spacing.md}`, marginBottom: spacing.md, marginLeft: spacing.sm }}
        onClick={async () => {
          try {
            const sims = await simulateFutureStates('current repo snapshot');
            setSimulations(sims);
            setShowFuture(true);
          } catch (err) {
            console.error(err);
          }
        }}
      >
        Preview Future
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
      {showFuture && (
        <FutureSimulations simulations={simulations} onClose={() => setShowFuture(false)} />
      )}
      {showRecover && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white text-black p-4 rounded max-w-lg max-h-full overflow-auto">
            <h2 className="font-bold mb-2">Saved Drafts</h2>
            <h3 className="font-semibold">Original</h3>
            <ul className="list-disc pl-4 mb-4">
              {drafts.original.map(d => (
                <li key={d.name} className="mb-2"><pre>{d.content}</pre></li>
              ))}
            </ul>
            <h3 className="font-semibold">Improved</h3>
            <ul className="list-disc pl-4 mb-4">
              {drafts.improved.map(d => (
                <li key={d.name} className="mb-2"><pre>{d.content}</pre></li>
              ))}
            </ul>
            <button
              className="bg-accent text-accent-foreground rounded px-4 py-2"
              onClick={() => setShowRecover(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
