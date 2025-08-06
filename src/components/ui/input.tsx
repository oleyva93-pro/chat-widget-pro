import { cn } from "../../lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full p-2 border border-gray-200 rounded-xl bg-gray-200 h-9 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none",
        className
      )}
      {...props}
    />
  );
}
