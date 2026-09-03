import AboutSection from "../../components/sections/AboutSection";
import ClientsSection from "../../components/sections/ClientsSection";
import CTASection from "../../components/sections/CTASection";
import FooterSection from "../../components/sections/FooterSection";
import Hero from "../../components/sections/Hero";
import ProcessSection from "../../components/sections/ProcessSection";
import ProjectsSection from "../../components/sections/ProjectSections";
import ServicesSection from "../../components/sections/ServiceSection";
import StatsSection from "../../components/sections/StatsSection";
import WhyChooseUs from "../../components/sections/WhyChooseUs";


function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <WhyChooseUs />
      <StatsSection />
      <ProcessSection />
      <ProjectsSection />
      <ServicesSection />
      <ClientsSection />
      <CTASection />
      <FooterSection />
    </>
  );
}

export default Home;