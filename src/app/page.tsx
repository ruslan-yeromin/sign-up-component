import ThemeToggleButton from "@/components/theme-toggle-button";
import { DrawerDialogDemo } from "@/components/ui/credenza";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col space-y-6 justify-center w-screen h-screen items-center">
      <ThemeToggleButton />
      <DrawerDialogDemo />
    </main>
  );
}
