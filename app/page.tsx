import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ResearchMap from "@/components/ResearchMap";
import Timeline from "@/components/Timeline";
import Impact from "@/components/Impact";
import Featured from "@/components/Featured";
import Explorer from "@/components/Explorer";
import Universe from "@/components/Universe";
import CoAuthorNetwork from "@/components/CoAuthorNetwork";
import Record from "@/components/Record";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { SectionTransitionProvider } from "@/components/SectionTransition";
import { PublicationProvider } from "@/components/PublicationModal";

export default function Page() {
  return (
    <SectionTransitionProvider>
      <PublicationProvider>
        <Preloader />
        <Cursor />
        <Nav />
        <main>
          <Hero />
          <About />
          <ResearchMap />
          <Timeline />
          <Impact />
          <Featured />
          <Explorer />
          <Universe />
          <CoAuthorNetwork />
          <Record />
          <Contact />
        </main>
        <Footer />
      </PublicationProvider>
    </SectionTransitionProvider>
  );
}