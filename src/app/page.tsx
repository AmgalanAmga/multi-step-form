import Link from "next/link";
import { Asterisk, ShieldCheck } from "lucide-react";
import { RegisterForm } from "@/components/register/form/RegisterForm";

const Home = () => {
  return (
    <div className="flex h-dvh flex-col overflow-clip px-4 sm:px-10">
      <header className="flex items-center justify-between h-12 shrink-0 w-full mx-auto max-w-7xl lg:h-16">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <span className="grid rounded-full size-8 place-items-center bg-emerald-700 text-white">
            <Asterisk size={25} />
          </span>
          Firstleaf
        </Link>
      </header>

      <main className="mx-auto grid min-h-0 w-full max-w-xl flex-1 grid-rows-1 items-center py-2 lg:max-w-6xl lg:grid-cols-2 lg:gap-16">
        <section className="relative hidden lg:block max-h-full overflow-y-auto">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 border-emerald-700/15 bg-emerald-700/5 px-3 py-1.5 text-xs font-semibold tracking-widest text-emerald-700">
            <span className="size-1.5 rounded-full bg-emerald-700" /> A FRESH START, MADE SIMPLE
          </div>
          <h1 className="max-w-lg text-5xl leading-none font-semibold tracking-tighter sm:text-6xl">
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

      <footer className="mx-auto hidden w-full shrink-0 lg:flex max-w-7xl flex-wrap justify-between gap-3 border-t border-slate-200 py-2 text-xs text-slate-600">
        <span>© {new Date().getFullYear()} Firstleaf.</span>
        <span>Thoughtfully simple. Uniquely you.</span>
      </footer>
    </div>
  );
};

export default Home;
