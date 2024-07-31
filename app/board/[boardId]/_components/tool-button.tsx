import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ToolButtonProps {
  label: string;
  onClick: () => void;
  icon: LucideIcon;
  isActive?: boolean;
  isDisabled?: boolean;
}

export const ToolButton = ({
  label,
  onClick,
  icon: Icon,
  isActive,
  isDisabled,
}: ToolButtonProps) => {
  return (
    <Hint label={label} side="right" sideOffset={14}>
      <Button
        onClick={onClick}
        disabled={isDisabled}
        variant={isActive ? "secondary" : "ghost"}
      >
        <Icon />
      </Button>
    </Hint>
  );
};
