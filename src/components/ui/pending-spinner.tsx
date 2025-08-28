import { cn } from '@/lib/utils';

export function PendingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn("flex justify-center my-4", className)}>
      <span className="w-[3px] h-[3px] mr-[11px] rounded-full animate-skBouncedelay [animation-delay:-0.32s]" />
      <span className="w-[3px] h-[3px] mr-[11px] rounded-full animate-skBouncedelay [animation-delay:-0.16s]" />
      <span className="w-[3px] h-[3px] rounded-full animate-skBouncedelay" />
    </div>
  );
}
