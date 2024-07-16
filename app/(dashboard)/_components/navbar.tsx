"use client";

import {
  OrganizationSwitcher,
  SignInButton,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { SearchInput } from "./search-input";
import { InviteButton } from "./invite-button";

export const Navbar = () => {
  return (
    <div className="flex p-5 gap-x-5">
      <div className="hidden lg:flex lg:flex-1">
        <SearchInput />
      </div>
      <div className="block flex-1 lg:hidden">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                maxWidth: "376px",
              },
              organizationSwitcherTrigger: {
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                width: "100%",
                justifyContent: "space-between",
                paddingLeft: "8px",
                paddingRight: "8px",
                paddingTop: "8px",
                paddingBottom: "8px",
                backgroundColor: "white",
              },
              organizationPreviewMainIdentifier__organizationSwitcherTrigger: {
                fontWeight: "600",
                fontSize: "16px",
              },
            },
          }}
        />
      </div>
      <InviteButton />
      <UserButton />
    </div>
  );
};
