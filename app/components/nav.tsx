// Nav.tsx
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Nav = () => {
  const NavContent = () => (
    <div>
      <div className="space-y-1">
        <h1 className="text-4xl font-medium leading-none">BBlog world</h1>
        <p className="text-sm text-muted-foreground">
          Photographic Works
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex md:h-5 items-center md:space-x-4 text-sm md:flex-row flex-col space-y-4 md:space-y-0">
        <Button variant="link" className="w-full md:w-auto justify-start">
          <Link href="/SelectedWorks">Selected Works</Link>
        </Button>
        <Separator orientation="vertical" className="hidden md:block" />
        <Separator className="md:hidden" />

        <Button variant="link" className="w-full md:w-auto justify-start">
          <Link href="/about">About</Link>
        </Button>
        <Separator orientation="vertical" className="hidden md:block" />
        <Separator className="md:hidden" />
        
        <Button variant="link" className="w-full md:w-auto justify-start">
          <Link href="/Social">Socials</Link>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              size="lg"
              variant="outline"
              className=" w-12 h-12 "
            >
              Menu
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Menu</DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              <NavContent />
            </div>
            <div className="p-4">
              <DrawerClose asChild>
                <Button variant="outline" className="w-full">
                  Close
                </Button>
              </DrawerClose>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <NavContent />
      </div>
    </>
  );
};

export default Nav;