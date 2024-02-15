export default function DisplayBox({ label, content }) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <div className="w-full px-2 py-1 border rounded border-slate-200">
        {content}
      </div>
    </div>
  );
}
