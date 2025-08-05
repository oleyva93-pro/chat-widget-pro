import { SearchIcon } from "lucide-react";

import { Input } from "./input";
import { cn } from "../../lib/utils";

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <search className="bg-gray-200 px-3 border-b border-gray-200 flex justify-center items-center rounded-2xl">
      <SearchIcon className="w-4 h-4" color="black" />
      <Input
        placeholder="Search by RO#, YMM or VIN"
        className={cn(
          "bg-transparent border-none focus:outline-none! focus:ring-0!",
          className
        )}
        {...props}
      />
    </search>
  );
}
