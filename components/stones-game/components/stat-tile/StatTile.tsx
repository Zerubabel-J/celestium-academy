type StatTileProps = {
  label: string;
  value: string;
  subValue?: string;
  accent?: string;
};

export const StatTile = ({ label, value, subValue, accent }: StatTileProps) => (
  <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
    <span className="text-xs uppercase tracking-[0.3em] text-slate-500">
      {label}
    </span>
    <p
      className="mt-2 text-xl font-semibold text-slate-100"
      style={accent ? { color: accent } : undefined}
    >
      {value}
    </p>
    {subValue && <p className="text-xs text-slate-500">{subValue}</p>}
  </div>
);

