/**
 * Obfuscated support address. Never store the full mailto string in source
 * as a single contiguous email literal — assemble only at call time.
 */
const PARTS = ["beachpatrol", "whitebeautyfm", "com"] as const;

export function supportEmailAddress() {
  return `${PARTS[0]}@${PARTS[1]}.${PARTS[2]}`;
}

export function supportMailto(subject?: string) {
  const address = supportEmailAddress();
  if (!subject) return `mailto:${address}`;
  return `mailto:${address}?subject=${encodeURIComponent(subject)}`;
}
