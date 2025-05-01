import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { fileName: string } }
) {
  const fileName = params.fileName;
  let filePath = path.join(process.cwd(), '../memory-bank', `${fileName}.md`);
  
  // Handle .clinerules file which doesn't have .md extension
  if (fileName === '.clinerules') {
    filePath = path.join(process.cwd(), '../memory-bank', fileName);
  }

  console.log('Attempting to read file:', filePath);
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return NextResponse.json({ content: fileContent });
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}
