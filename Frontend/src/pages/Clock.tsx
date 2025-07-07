import { ArrowLeft, Clock } from "lucide-react";
import { useState } from "react";
import { Timer } from "../components/clockPage/Timer";
import { Countdown } from "../components/clockPage/Countdown";

function useDisplayTime() {
  const [time, setTime] = useState(() => {
    const date = new Date();
    return {
      time: date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      date: date.toLocaleDateString([], {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
  });

  useState(() => {
    const interval = setInterval(() => {
      const newDate = new Date();
      setTime({
        time: newDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        date: newDate.toLocaleDateString([], {
          weekday: "short",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  });

  return time;
}

export function ClockPage() {
  const { time, date } = useDisplayTime();
  const [tool, setTool] = useState("noTool");

  return (
    <div className="max-w-[1200px] max-h-[var(--mainDiv-h)] mx-auto p-8 md:grid md:grid-cols-[300px_1fr] gap-8 flex flex-col overflow-y-scroll md:overflow-hidden [&::-webkit-scrollbar-track]:bg-white/20  [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-xs [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-xs">
      <div className="max-h-[363px] bg-white/10 rounded-2xl p-6 shadow-md backdrop-blur-md top-8 border border-white/10">
        <div className="flex max-h-15 pb-3 gap-2.5 border-b-white/10 border-b-1 mb-4">
          <Clock className="text-primary-ta" size={40} />
          <h1 className="text-[1.8rem] text-primary-ta font-bold mt-1">
            Clock
          </h1>
        </div>
        <div>
          <h2 className="text-[3rem] text-white font-bold mb-4">{time}</h2>
          <p className="text-white/90 text-xl">Actual date</p>
          <p className="text-white/70 text-lg mt-2">{date}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 pt-6 border-t-white/10 border-t-1">  
          <button className="bg-primary-ta rounded-lg h-10 font-bold text-blackrich-800" onClick={() => {setTool('timer')}}>Timer</button>
          <button className="bg-primary-ta rounded-lg h-10 font-bold text-blackrich-800" onClick={() => {setTool('countdown')}}>Countdown</button>
        </div>
      </div>
      <div className={`max-h-[596px] ${tool === "noTool" ? "flex flex-col justify-center items-center" : "h-fit"} bg-white/10 rounded-2xl p-6 shadow-md backdrop-blur-md top-8 border border-white/10`}>
        {tool === 'timer' ? (
          <Timer />
        ) : tool === 'countdown' ? (
          <Countdown />
        ) : (
          <>
            <h1 className="text-white text-5xl">Select a Tool</h1>
            <ArrowLeft className="text-primary-ta" size={60}/>
          </>
        )}
      </div>
    </div>
  );
}
