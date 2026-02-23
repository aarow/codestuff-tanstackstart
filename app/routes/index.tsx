import { createFileRoute } from '@tanstack/react-router';
import Navbar from '~/components/Navbar';
import Hero from '~/components/Hero';
// import Projects from '~/components/Projects';
import Skills from '~/components/Skills';
import Experience from '~/components/Experience';
import Footer from '~/components/Footer';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="[view-transition-name:main-content]">
      <Navbar />
      <main>
          <Hero />
          {/* <Projects /> */}
          <Skills />
          <Experience />
      </main>
      <Footer />
    </div>
  );
}
