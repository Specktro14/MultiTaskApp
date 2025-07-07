import { useEffect, useState } from 'react'; 
import { Timer as IconTimer } from "lucide-react";

function useTimer() {
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    isRunning: false,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timer.isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => {
          const newSeconds = prev.seconds + 1;
          const newMinutes = newSeconds >= 60 ? prev.minutes + 1 : prev.minutes;
          const newHours = newMinutes >= 60 ? prev.hours + 1 : prev.hours;
          return {
            seconds: newSeconds % 60,
            minutes: newMinutes % 60,
            hours: newHours % 24,
            isRunning: prev.isRunning,
          };
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  return { timer, setTimer };
}

export function Timer() {
  const { timer, setTimer } = useTimer();

  return (
    <div>
      <div className="flex max-h-15 pb-3 gap-2.5 border-b-white/10 border-b-1 mb-4">
        <IconTimer className='text-primary-ta' size={40}/>
        <h1 className="text-[1.8rem] text-primary-ta font-bold mt-1">
          Timer
        </h1>
      </div>
      <div className="flex flex-col items-center h-32">
      {timer.isRunning ? (
        <h2 className="text-[5rem] text-white font-bold mb-4">
          {timer.hours.toString().padStart(2, "0")}:
          {timer.minutes.toString().padStart(2, "0")}:
          {timer.seconds.toString().padStart(2, "0")}
        </h2>
      ) : (
        <h2 className="text-[5rem] text-warning font-bold mb-4">
          {timer.hours.toString().padStart(2, "0")}:
          {timer.minutes.toString().padStart(2, "0")}:
          {timer.seconds.toString().padStart(2, "0")}
        </h2>
      )}
    </div>
    <div className="flex justify-center gap-4 mt-2">
      <button
        className="px-2 py-1.5 bg-white/70 rounded-lg"
        onClick={() => {
          setTimer({ ...timer, isRunning: true });
        }}
      >
        Start
      </button>
      <button
        className="px-2 py-1.5 bg-white/70 rounded-lg"
        onClick={() => {
          setTimer({
            ...timer,
            isRunning: false,
          });
        }}
      >
        Pause
      </button>
      <button
        className="px-2 py-1.5 bg-white/70 rounded-lg"
        onClick={() => {
          setTimer({
            seconds: 0,
            minutes: 0,
            hours: 0,
            isRunning: false,
          });
        }}
      >
        Reset
      </button>
    </div>
  </div>
  )
}