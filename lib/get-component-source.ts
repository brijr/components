import fs from 'fs';
import path from 'path';

export async function getComponentSource(filePath: string): Promise<string> {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    const source = await fs.promises.readFile(fullPath, 'utf-8');
    return source;
  } catch (error) {
    console.error('Error reading component source:', error);
    throw new Error('Failed to read component source');
  }
}