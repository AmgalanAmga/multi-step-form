import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { MotionProvider } from "@/components/MotionProvider";

export const metadata: Metadata = {
  title: "Firstleaf",
  description: "Create your profile in three simple steps.",
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html lang="en">
      <body className="sketch-paper m-0 font-sans text-stone-900 antialiased scheme-light">
        <MotionProvider>
          {children}
          <Toaster richColors position="bottom-right" />
        </MotionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
