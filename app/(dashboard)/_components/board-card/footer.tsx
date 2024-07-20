import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface FooterProps {
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  isFavorite: boolean;
  onClick: () => void;
  disabled: boolean;
}

export const Footer = ({
  title,
  authorLabel,
  createdAtLabel,
  isFavorite,
  onClick,
  disabled,
}: FooterProps) => {
  return (
    <div className="relative bg-white p-3">
      <p className="max-w-[calc(100%-20px)] text-[13px] truncate">{title}</p>
      <p className="group opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
        {authorLabel}, {createdAtLabel}
      </p>
      <button
        className={cn(
          "absolute top-[14px] right-3 group opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-blue-600",
          disabled && "cursor-not-allowed"
        )}
        onClick={onClick}
      >
        <Star
          className={cn("w-4 h-4", isFavorite && "fill-blue-600 text-blue-600")}
        />
      </button>
    </div>
  );
};
