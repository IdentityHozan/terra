import InsightRoll from "@/src/components/About/InsightRoll";


const insights = [
  "6 Group Members Collaborated",
  "3 Types of Intelligence Combined",
  "1 Comprehensive Disaster Blog Launched",
  "5+ Articles & Guides on Preparedness",
  "Integrated Fire Drill Maps of Mapúa Makati",
  "Original Jingle & Alert Audio Produced 🎵",
  "Featured Student Experiences & Reflections 🧠",
  "Committed to Monthly DRRR Awareness Themes! 🌍"
];

export default function AboutLayout({ children }) {
  return (
    <main className="w-full flex flex-col items-center justify-between">
      <InsightRoll insights={insights} />
      {children}
    </main>
  );
}
