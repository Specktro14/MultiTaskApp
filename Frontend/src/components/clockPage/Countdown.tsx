import { History, ChevronUp, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

function useCountdown() {
  const [countdown, setCountdown] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    isDisplayed: false,
    isRunning: false,
    ended: false,
  });

  const increaseDigit = (digit: "seconds" | "minutes" | "hours") => {
    setCountdown((prev) => {
      switch (digit) {
        case "seconds":
          if (prev.seconds >= 59) {
            return { ...prev, seconds: 0, minutes: prev.minutes + 1 };
          } else {
            return { ...prev, seconds: prev.seconds + 1 };
          }
        case "minutes":
          if (prev.minutes >= 59) {
            return { ...prev, minutes: 0, hours: prev.hours + 1 };
          } else {
            return { ...prev, minutes: prev.minutes + 1 };
          }
        case "hours":
          if (prev.hours >= 23) {
            return { ...prev, hours: 0 };
          } else {
            return { ...prev, hours: prev.hours + 1 };
          }
        default:
          return prev;
      }
    });
  };

  const decreaseDigit = (digit: "seconds" | "minutes" | "hours") => {
    setCountdown((prev) => {
      if (prev[digit] <= 0) {
        return { ...prev, [digit]: 0 };
      } else {
        switch (digit) {
          case "seconds":
            return { ...prev, seconds: prev.seconds - 1 };
          case "minutes":
            return { ...prev, minutes: prev.minutes - 1 };
          case "hours":
            return { ...prev, hours: prev.hours - 1 };
          default:
            return prev;
        }
      }
    });
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    // Verifica si el contador ha llegado a cero
    if (
      countdown.isRunning &&
      countdown.seconds === 0 &&
      countdown.minutes === 0 &&
      countdown.hours === 0
    ) {
      if (countdown.isRunning) {
        setCountdown((prev) => ({
          ...prev,
          isRunning: false,
          ended: true,
        }));
      }
      return;
    }

    // Maneja el intervalo solo si está corriendo
    if (countdown.isRunning) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          const newSeconds = prev.seconds - 1;
          const newMinutes = newSeconds < 0 ? prev.minutes - 1 : prev.minutes;
          const newHours = newMinutes < 0 ? prev.hours - 1 : prev.hours;

          return {
            seconds: newSeconds < 0 ? 59 : newSeconds,
            minutes: newMinutes < 0 ? 59 : newMinutes,
            hours: newHours < 0 ? 0 : newHours,
            isDisplayed: prev.isDisplayed,
            isRunning: prev.isRunning,
            ended: false,
          };
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [countdown]);

  return { countdown, setCountdown, increaseDigit, decreaseDigit };
}

export function Countdown() {
  const { countdown, setCountdown, increaseDigit, decreaseDigit } = useCountdown();

  return (
    <div>
      <div className="flex max-h-15 pb-3 gap-2.5 border-b-white/10 border-b-1 mb-4">
        <History className="text-primary-ta" size={40} />
        <h1 className="text-[1.8rem] text-primary-ta font-bold mt-1">
          Countdown
        </h1>
      </div>
      {countdown.isDisplayed ? (
        <div className="flex flex-col items-center h-32">
          <h2
            className={`text-[5rem] ${
              countdown.ended ? "text-red-500 animate-shake" : "text-white animate-none"
            } font-bold mb-4`}
          >
            {countdown.hours.toString().padStart(2, "0")}:
            {countdown.minutes.toString().padStart(2, "0")}:
            {countdown.seconds.toString().padStart(2, "0")}
          </h2>
        </div>
      ) : (
        <div className="flex flex-row justify-center h-fit gap-2 pb-4 border-b-white/10 border-b-1">
          <div className="flex flex-col justify-center items-center gap-2">
            <button
              title="increaseHours"
              onClick={() => increaseDigit("hours")}
              className="bg-white/10 rounded-2xl shadow-md border border-white/10 w-full flex items-center justify-center"
            >
              <ChevronUp size={40} className="text-white" />
            </button>
            <span className="w-[80px] sm:w-[126px] flex justify-center text-[3rem] sm:text-[5rem] text-white font-bold h-fit sm:h-32 bg-white/10 rounded-2xl shadow-md backdrop-blur-md border border-white/10">
              {countdown.hours.toString().padStart(2, "0")}
            </span>
            <button
              title="decreaseHours"
              disabled={countdown.hours === 0}
              onClick={() => decreaseDigit("hours")}
              className="bg-white/10 rounded-2xl shadow-md border border-white/10 w-full flex items-center justify-center text-white disabled:text-gray-600"
            >
              <ChevronDown size={40} />
            </button>
          </div>
          <span className="text-white text-[5.2rem] sm:text-[7rem] pt-2.5">
            :
          </span>
          <div className="flex flex-col justify-center items-center gap-2">
            <button
              title="increaseMinutes"
              onClick={() => increaseDigit("minutes")}
              className="bg-white/10 rounded-2xl shadow-md border border-white/10 w-full flex items-center justify-center"
            >
              <ChevronUp size={40} className="text-white" />
            </button>
            <span className="w-[80px] sm:w-[126px] flex justify-center text-[3rem] sm:text-[5rem] text-white font-bold h-fit sm:h-32 bg-white/10 rounded-2xl shadow-md backdrop-blur-md border border-white/10">
              {countdown.minutes.toString().padStart(2, "0")}
            </span>
            <button
              title="decreaseMinutes"
              disabled={countdown.minutes === 0}
              onClick={() => decreaseDigit("minutes")}
              className="bg-white/10 rounded-2xl shadow-md border border-white/10 w-full flex items-center justify-center text-white disabled:text-gray-600"
            >
              <ChevronDown size={40} />
            </button>
          </div>
          <span className="text-white text-[5.2rem] sm:text-[7rem] pt-2.5">
            :
          </span>
          <div className="flex flex-col justify-center items-center gap-2">
            <button
              title="increaseSeconds"
              onClick={() => increaseDigit("seconds")}
              className="bg-white/10 rounded-2xl shadow-md border border-white/10 w-full flex items-center justify-center"
            >
              <ChevronUp size={40} className="text-white" />
            </button>
            <span className="w-[80px] sm:w-[126px] flex justify-center text-[3rem] sm:text-[5rem] text-white font-bold h-fit sm:h-32 bg-white/10 rounded-2xl shadow-md backdrop-blur-md border border-white/10">
              {countdown.seconds.toString().padStart(2, "0")}
            </span>
            <button
              title="decreaseSeconds"
              disabled={countdown.seconds === 0}
              onClick={() => decreaseDigit("seconds")}
              className="bg-white/10 rounded-2xl shadow-md border border-white/10 w-full flex items-center justify-center text-white disabled:text-gray-600"
            >
              <ChevronDown size={40} />
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-center gap-10 mt-6">
        <button
          className="w-[6.5rem] px-2 py-1.5 bg-white/70 rounded-lg"
          onClick={() =>
            setCountdown({ ...countdown, isRunning: true, isDisplayed: true })
          }
        >
          Start
        </button>
        <button
          className="w-[6.5rem] px-2 py-1.5 bg-white/70 rounded-lg"
          onClick={() => {
            setCountdown({
              ...countdown,
              isRunning: false,
            });
          }}
        >
          Pause
        </button>
        <button
          className="w-[6.5rem] px-2 py-1.5 bg-white/70 rounded-lg"
          onClick={() => {
            setCountdown({
              seconds: 0,
              minutes: 0,
              hours: 0,
              isDisplayed: false,
              isRunning: false,
              ended: false,
            });
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
