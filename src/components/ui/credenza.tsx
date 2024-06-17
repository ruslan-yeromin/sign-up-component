"use client";

import React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import QouteSlider from "./qoute-slider";
import { ProfileForm } from "./sign-up-form";
import Image from "next/image";
import { useTheme } from "@/context/theme-context";

export function DrawerDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { theme } = useTheme();

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="lg" className="text-xl" variant="outline">
            Start trial
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[1200px]">
          <div className="w-1/2 p-6 lg:p-12">
            <DialogHeader className="mb-6">
              {theme === "light" ? (
                <Image src="/logo.svg" width={75} height={25} alt="Logo" />
              ) : (
                <Image src="/logo-dark.svg" width={75} height={25} alt="Logo" />
              )}
            </DialogHeader>
            <ProfileForm />
          </div>

          {/* Quotes section */}
          <div className="w-1/2">
            <QouteSlider />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Start trial</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          {theme === "light" ? (
            <Image src="/logo.svg" width={75} height={25} alt="Logo" />
          ) : (
            <Image src="/logo-dark.svg" width={75} height={25} alt="Logo" />
          )}
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2"></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
