import TechText from "@/components/TechText";
import { LaserFormSurface } from "@/components/register/form/LaserFormSurface";
import Link from "next/link";
import { Asterisk } from "lucide-react";
import { RegisterForm } from "@/components/register/form/RegisterForm";

const headline = "Every great story\nbegins with a name.\nLet this be the start\nof yours.";

const Home = () => {
  return (
    <div className="flex flex-col px-4 h-dvh overflow-clip sm:px-10">
      <header className="flex items-center justify-between w-full h-12 mx-auto shrink-0 max-w-7xl lg:h-16">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <span className="grid text-primary-foreground bg-primary rounded-full size-8 place-items-center">
            <Asterisk size={25} />
          </span>
          Firstleaf
        </Link>
      </header>

      <main className="grid items-center flex-1 w-full max-w-xl min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-2 pt-2 pb-3 lg:grid-rows-1 lg:pt-10 mx-auto lg:max-w-6xl lg:grid-cols-2 lg:gap-16">
        <section className="relative z-10 min-w-0">
          <h1 aria-label={headline.replaceAll("\n", " ")} className="headline-panel h-36 w-full sm:h-44 lg:h-72">
            <TechText
              text={headline}
              fontSize={72}
              align="left"
              intro="type"
              introDuration={2.8}
              accentColor="#c8baff"
              draggable={false}
              labels={false}
              sweep={false}
            />
          </h1>
          <p className="mx-[5%] mt-4 hidden max-w-sm border-l-2 border-primary/60 pl-4 text-sm leading-6 text-muted-foreground lg:block">
            Create your Firstleaf profile in three steps. Your progress is saved each time you select Continue.
          </p>
        </section>

        <LaserFormSurface>
          <RegisterForm />
        </LaserFormSurface>
      </main>

      <footer className="flex-wrap justify-between hidden w-full gap-3 py-2 mx-auto text-xs border-t shrink-0 lg:flex max-w-7xl border-border text-muted-foreground">
        <span>© {new Date().getFullYear()} Firstleaf.</span>
        <span>Thoughtfully simple. Uniquely you.</span>
      </footer>
    </div>
  );
};

export default Home;
