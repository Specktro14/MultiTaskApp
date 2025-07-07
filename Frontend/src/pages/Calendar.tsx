import { Outlet } from "react-router-dom";

export function CalendarPage() {
  return (
    <div className="max-w-[1200px] max-h-[var(--mainDiv-h)] mx-auto p-8 md:grid md:grid-cols-[300px_1fr] gap-8 flex flex-col overflow-y-scroll md:overflow-hidden [&::-webkit-scrollbar-track]:bg-white/20  [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-xs [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-xs">
      <Outlet/>
    </div>
  );
}
