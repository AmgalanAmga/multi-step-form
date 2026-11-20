import SplashCursor from "@/components/animated/SplashCursor";
import GlassSurface from "@/components/animated/GlassSurface";
import TechText from "@/components/animated/TechText";
import { LaserFooter } from "@/components/animated/LaserFooter";
import Link from "next/link";
import Image from "next/image";
import { RegisterForm } from "@/components/register/form/RegisterForm";

const headline = "Every great story\nbegins with a name.\nLet this be the start\nof yours.";

const Home = () => {
  return (
    <div className="registration-shell">
      <SplashCursor colors={["#9955ff", "#ce96ff", "#7b72ff"]} rainbow={false} quality="low" glow={0.25} intro={false} zIndex={-1} style={{ opacity: 0.8 }} />
      <header className="registration-header">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <span className="grid text-primary-foreground brand-mark rounded-xl size-8 place-items-center">
            <Image src="/icon.svg" alt="" width={32} height={32} />
          </span>
          Veyra
        </Link>
      </header>

      <main className="registration-layout">
        <section className="relative z-10 min-w-0">
          <h1 aria-label={headline.replaceAll("\n", " ")} className="headline-panel">
            <TechText
              text={headline}
              fontSize={88}
              fontFamily="Georgia, serif"
              fontWeight={500}
              letterSpacing={-0.045}
              align="left"
              intro="type"
              introDuration={2.8}
              accentColor="#e6baff"
              draggable={false}
              labels={false}
              sweep={false}
            />
          </h1>
          <p className="registration-note">Create your Veyra profile in three steps. Your progress is saved each time you select Continue.</p>
        </section>

        <div className="registration-form">
          <GlassSurface width="100%" height="auto" className="registration-glass">
            <RegisterForm />
          </GlassSurface>
        </div>
      </main>

      <LaserFooter year={new Date().getFullYear()} />
    </div>
  );
};

export default Home;
