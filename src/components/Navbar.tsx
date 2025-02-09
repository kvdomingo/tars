import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { signIn } from "@/lib/auth";
import Link from "next/link";
import { DarkModeToggle } from "./DarkModeToggle";

export function Navbar() {
  return (
    <NavigationMenu className="p-2">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <form
              action={async () => {
                "use server";

                await signIn("google");
              }}
            >
              <Button type="submit" className="border border-white">
                Login
              </Button>
            </form>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <DarkModeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
