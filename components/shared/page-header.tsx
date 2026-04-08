import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  desc: string;
  mobile: boolean;
}

export function PageHeader({ title, desc, mobile }: PageHeaderProps) {
  return (
    <div className={cn(mobile ? "mb-8" : "mb-12")}>
      <h1
        className={cn(
          "font-brand font-normal text-hub-t1 leading-tight tracking-tight",
          mobile ? "text-[28px] mb-2" : "text-[34px] mb-3"
        )}
      >
        {title}
      </h1>
      <p className={cn("text-hub-t2 leading-relaxed max-w-[540px]", mobile ? "text-[14px]" : "text-[15px]")}>
        {desc}
      </p>
    </div>
  );
}
