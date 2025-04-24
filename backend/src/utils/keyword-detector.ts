export function detectKeywords(summary: string): {
  hasTachycardia: boolean;
  hasArrhythmia: boolean;
} {
  return {
    hasTachycardia: summary.toLowerCase().includes("tachycardia"),
    hasArrhythmia: summary.toLowerCase().includes("arrhythmia"),
  };
}
