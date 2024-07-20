"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { LayoutDashboardIcon, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

const font = Poppins({
  subsets: ["latin"],
  weight: "600",
});

export const OrgSideBar = () => {
  const params = useSearchParams();
  const isFavorites = params.get("favorites");

  return (
    <div className="hidden lg:flex flex-col gap-y-6 w-[206px] pl-5 pt-5">
      <Link href={"/"}>
        <div className="flex items-center gap-x-2">
          <Image src="./logo.svg" alt="logo" height={60} width={60} />
          <p className={cn("font-semibold text-2xl", font.className)}>boardy</p>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              width: "100%",
              justifyContent: "space-between",
              paddingLeft: "8px",
              paddingRight: "8px",
              paddingTop: "12px",
              paddingBottom: "12px",
              backgroundColor: "white",
            },
            organizationPreviewMainIdentifier__organizationSwitcherTrigger: {
              fontWeight: "600",
              fontSize: "16px",
            },
          },
        }}
      />
      <div className="space-y-1 w-full">
        <Button
          variant={isFavorites ? "ghost" : "secondary"}
          asChild
          size="lg"
          className="flex justify-start w-full font-normal px-2"
        >
          <Link href={"/"}>
            <LayoutDashboardIcon className="h-4 w-4 mr-2" />
            <p>Team Board</p>
          </Link>
        </Button>
        <Button
          variant={isFavorites ? "secondary" : "ghost"}
          asChild
          size="lg"
          className="flex justify-start w-full font-normal px-2"
        >
          <Link
            href={{
              pathname: "/",
              query: { favorites: true },
            }}
          >
            <Star className="h-4 w-4 mr-2" />
            <p>Favorite Board</p>
          </Link>
        </Button>
      </div>
    </div>
  );
};
