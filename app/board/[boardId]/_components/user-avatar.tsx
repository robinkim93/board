import { Hint } from "@/components/hint";
import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";

interface UserAvatarProps {
  src?: string;
  fallback?: string;
  borderColor?: string;
  name?: string;
}

export const UserAvatar = ({
  src,
  fallback,
  borderColor,
  name,
}: UserAvatarProps) => {
  return (
    <Hint label={name || "TeamMate"} side="bottom" sideOffset={18}>
      <Avatar className="h-8 w-8 border-2" style={{ borderColor }}>
        <AvatarImage src={src} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
    </Hint>
  );
};
