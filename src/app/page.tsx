import Link from "next/link";
import { Asterisk, ShieldCheck } from "lucide-react";
import { RegisterForm } from "@/components/register/form/RegisterForm";

const Home = () => {
  return (
    <div className="grid h-dvh grid-rows-[auto_minmax(0,1fr)_auto] overflow-clip px-4 sm:px-10">
      <header className="flex items-center justify-between h-12 w-full mx-auto max-w-7xl lg:h-16">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <span className="grid rounded-full size-8 place-items-center bg-emerald-700 text-white">
            <Asterisk size={25} />
          </span>
          Firstleaf
        </Link>
      </header>

      <main className="mx-auto grid min-h-0 w-full max-w-xl grid-rows-[minmax(0,1fr)] items-center py-2 lg:max-w-6xl lg:grid-cols-[1fr_1.12fr] lg:gap-16">
        <section className="relative hidden lg:block [@media(max-height:520px)]:max-h-full [@media(max-height:520px)]:overflow-hidden">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 border-emerald-700/15 bg-emerald-700/5 px-3 py-1.5 text-[11px] font-semibold tracking-[.13em] text-emerald-700">
            <span className="size-1.5 rounded-full bg-emerald-700" /> A FRESH START, MADE SIMPLE
          </div>
          <h1 className="max-w-lg text-5xl leading-[1.08] font-semibold tracking-[-.055em] sm:text-6xl">
            Big possibilities.
            <br />A little more <span className="font-serif italic font-normal text-emerald-700">you.</span>
          </h1>
          <p className="max-w-sm mt-6 text-base leading-7 text-slate-600">
            Good things start with a hello. Create your profile and make space for what’s next.
          </p>
          <div className="flex items-center gap-3 mt-10 text-xs text-slate-600">
            <ShieldCheck className="size-5 text-emerald-700" />
            <span>Your details. Your control. Always.</span>
          </div>
        </section>

        <RegisterForm />
      </main>

      <footer className="mx-auto hidden w-full lg:flex max-w-7xl flex-wrap justify-between gap-3 border-t border-slate-200 py-2 text-[11px] text-slate-600">
        <span>© {new Date().getFullYear()} Firstleaf.</span>
        <span>Thoughtfully simple. Uniquely you.</span>
      </footer>
    </div>
  );
};

export default Home;
