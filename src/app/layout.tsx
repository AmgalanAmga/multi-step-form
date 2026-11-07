import "./globals.css";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/sonner";
import { MotionProvider } from "@/components/motion-provider";

export const metadata: Metadata = {
  title: "Join Orbit · A little more you",
  description: "Your next chapter starts here. Set up your Orbit profile in three simple steps.",
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body className="m-0 bg-background bg-[radial-gradient(ellipse_at_10%_40%,#dbe6ce55,transparent_50%)] font-sans text-foreground antialiased [color-scheme:light] [&_button]:cursor-pointer [&_button:disabled]:cursor-wait [&_select]:cursor-pointer">
        <MotionProvider>
          {children}
          <Toaster richColors position="bottom-right" />
        </MotionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
