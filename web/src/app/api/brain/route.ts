import { NextRequest, NextResponse } from 'next/server';
import { storeEmbedding, searchEmbedding } from '@/lib/brain';

export async function POST(req: NextRequest) {
  const { text, metadata } = await req.json();
  await storeEmbedding(text, metadata || {});
  return NextResponse.json({ status: 'ok' });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  const k = parseInt(searchParams.get('k') || '5', 10);
  const results = await searchEmbedding(q, k);
  return NextResponse.json(results);
}
