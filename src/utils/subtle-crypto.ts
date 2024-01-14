export type Algorithms = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

export async function hash(algorithm: Algorithms, message?: string): Promise<string> {
  if (!message) return null;

  const msgBuffer = new TextEncoder().encode(message);

  // hash the message
  const hashBuffer = await crypto.subtle.digest(algorithm, msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
