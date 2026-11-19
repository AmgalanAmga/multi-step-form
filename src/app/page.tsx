import Link from "next/link";
import { Asterisk, ShieldCheck } from "lucide-react";
import { RegisterForm } from "@/components/register/form/RegisterForm";

const Home = () => {
  return (
    <div className="min-h-screen px-5 sm:px-10">
      <header className="flex items-center justify-between h-24 mx-auto max-w-7xl">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <span className="grid rounded-full size-8 place-items-center bg-primary text-primary-foreground">
            <Asterisk size={25} />
          </span>
          Firstleaf
        </Link>
      </header>

      <main className="mx-auto grid max-w-6xl items-center gap-12 pb-16 pt-8 lg:min-h-[calc(100vh-176px)] lg:grid-cols-[1fr_1.12fr] lg:gap-20 lg:pt-0">
        <section className="relative">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border border-primary/15 bg-primary/5 px-3 py-1.5 text-[11px] font-semibold tracking-[.13em] text-primary">
            <span className="size-1.5 rounded-full bg-primary" /> A FRESH START, MADE SIMPLE
          </div>
          <h1 className="max-w-lg text-5xl leading-[1.08] font-semibold tracking-[-.055em] sm:text-6xl">
            Big possibilities.
            <br />A little more <span className="font-serif italic font-normal text-primary">you.</span>
          </h1>
          <p className="max-w-sm mt-6 text-base leading-7 text-muted-foreground">
            Good things start with a hello. Create your profile and make space for what’s next.
          </p>
          <div className="flex items-center gap-3 mt-10 text-xs text-muted-foreground">
            <ShieldCheck className="size-5 text-primary" />
            <span>Your details. Your control. Always.</span>
          </div>
        </section>

        <RegisterForm />
      </main>

      <footer className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 border-t border-border py-6 text-[11px] text-muted-foreground">
        <span>© {new Date().getFullYear()} Firstleaf.</span>
        <span>Thoughtfully simple. Uniquely you.</span>
      </footer>
    </div>
  );
};

export default Home;
