"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { UserAvatar } from "./user-avatar";

const MAX_SHOWN_USERS = 2;

export const Participants = () => {
  const currentUser = useSelf();
  const otherUser = useOthers();
  const hasMoreUsers = otherUser.length > MAX_SHOWN_USERS;
  return (
    <div className="absolute top-2 right-2 bg-white p-1.5 rounded-md shadow-md flex items-center h-12">
      <div className="flex gap-x-2">
        {otherUser.slice(0, MAX_SHOWN_USERS).map((user) => {
          return (
            <UserAvatar
              key={user.connectionId}
              src={user.info.picture}
              name={user.info.name}
              fallback={user.info.name?.[0] || "T"}
            />
          );
        })}
        {currentUser && (
          <UserAvatar
            src={currentUser.info.picture}
            name={`${currentUser.info.name} (You)`}
            fallback={currentUser.info.name?.[0]}
            borderColor="blue"
          />
        )}
        {hasMoreUsers && (
          <UserAvatar
            name={`${otherUser.length - MAX_SHOWN_USERS} more`}
            fallback={`+${otherUser.length - MAX_SHOWN_USERS}`}
          />
        )}
      </div>
    </div>
  );
};

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute top-2 right-2 bg-muted p-1.5 rounded-md shadow-md flex items-center h-12 w-[120px]">
      <Skeleton className="w-full h-full" />
    </div>
  );
};
