import { LaserFormSurface } from "@/components/register/form/LaserFormSurface";
import Link from "next/link";
import { Asterisk, ShieldCheck } from "lucide-react";
import { RegisterForm } from "@/components/register/form/RegisterForm";

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

      <main className="grid items-center flex-1 w-full max-w-xl min-h-0 grid-rows-1 pt-14 pb-3 lg:pt-10 mx-auto lg:max-w-6xl lg:grid-cols-2 lg:gap-16">
        <section className="relative hidden max-h-full overflow-y-auto lg:block">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-semibold tracking-widest text-primary">
            <span className="size-1.5 rounded-full bg-primary" /> A FRESH START, MADE SIMPLE
          </div>
          <h1 className="max-w-lg text-5xl font-semibold leading-none tracking-tighter sm:text-6xl">
            Big possibilities.
            <br />A little more <span className="italic font-normal text-primary hero-accent">you.</span>
          </h1>
          <p className="max-w-sm mt-6 text-base leading-7 text-muted-foreground">
            Good things start with a hello. Create your profile and make space for what’s next.
          </p>
          <div className="flex items-center gap-3 mt-10 text-xs text-muted-foreground">
            <ShieldCheck className="text-primary size-5" />
            <span>Your details. Your control. Always.</span>
          </div>
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
