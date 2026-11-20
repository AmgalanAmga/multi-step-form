import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { MotionProvider } from "@/components/animated/MotionProvider";

export const metadata: Metadata = {
  title: "Astra",
  description: "Create your profile in three simple steps.",
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html lang="en">
      <body className="laser-page m-0 font-sans text-foreground antialiased scheme-dark">
        <MotionProvider>
          {children}
          <Toaster richColors position="bottom-right" />
        </MotionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
