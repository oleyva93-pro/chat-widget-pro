import { cn } from "../../lib/utils";
import withRefDialog from "../../lib/with-ref";

type InnerDrawerRefProps = {
  open?: boolean;
  onClose?: () => void;
  className?: string;
  children: React.ReactNode;
};

export const InnerDrawerRef = withRefDialog(
  ({ children, className }: InnerDrawerRefProps) => {
    return (
      <div
        className={cn(
          "absolute top-0 right-0  w-full h-full bg-chw-overlay flex justify-end rounded-xl shadow-chw animate-fade-in",
          className
        )}
      >
        {children}
      </div>
    );
  }
);
