import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/Sonner";
import { MotionProvider } from "@/components/MotionProvider";

export const metadata: Metadata = {
  title: "Firstleaf",
  description: "Create your profile in three simple steps.",
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html lang="en">
      <body className="m-0 bg-background bg-[radial-gradient(ellipse_at_10%_40%,#dbe6ce55,transparent_50%)] font-sans text-foreground antialiased scheme-light [&_button]:cursor-pointer [&_button:disabled]:cursor-wait [&_select]:cursor-pointer">
        <MotionProvider>
          {children}
          <Toaster richColors position="bottom-right" />
        </MotionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
