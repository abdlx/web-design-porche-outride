import Hero from "./components/Hero";
import AdditionalSections from "./components/AdditionalSections";

export default function Home() {
  return (
    <main style={{ backgroundColor: "#faf8f5", minHeight: "100vh" }}>
      <Hero />
      <AdditionalSections />
    </main>
  );
}
