interface PageHeaderProps {
  title: string;
  desc: string;
  mobile: boolean;
}

export function PageHeader({ title, desc, mobile }: PageHeaderProps) {
  return (
    <div className={mobile ? "mb-6" : "mb-10"}>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-2 leading-tight">
        {title}
      </h1>
      <p className="text-[15px] text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
