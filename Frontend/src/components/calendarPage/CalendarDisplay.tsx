import {
  Calendar,
  Plus,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { MonthDays, FillingDays } from "./Day";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ReminderCalendar, ListReminder } from "@/components/calendarPage/Reminder";
import { Reminder } from "@/Types";

export const CalendarDisplay = () => {
  const navigate = useNavigate();
  const currentDate = new Date();
  const apiURL = "http://localhost:4000/api/reminders";

  const [date, setDate] = useState(new Date());
  const month = date.getMonth();
  const year = date.getFullYear();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [reminders, setReminders] = useState<Reminder[]>([
    {
      title: "Buy groceries",
      description: "Hello",
      priority: "High",
      dueDate: "2025-05-23",
      id: "1",
    },
    {
      title: "Doctor appointment",
      description: "Hello",
      priority: "Medium",
      dueDate: "2025-05-22",
      id: "2",
    },
    {
      title: "Team meeting",
      description: "Hello",
      priority: "Low",
      dueDate: "2025-05-22",
      id: "3",
    },
    {
      title: "Call mom",
      description: "Hello",
      priority: "High",
      dueDate: "2025-05-23",
      id: "4",
    },
    {
      title: "Finish project",
      description: "Hello",
      priority: "Medium",
      dueDate: "2025-05-22",
      id: "5",
    },
  ]);
  const [remindersByDate, setRemindersByDate] = useState<Reminder[]>([]);
  const [remindersByPriority, setRemindersByPriority] = useState<Reminder[]>(
    []
  );

  const getReminders = /* async */ () => {
    //const res = await axios.get(apiURL);
    //const reminders = res.data;

    //setReminders(reminders);

    // Sort by date
    const sortedByDate = [...reminders].sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
    setRemindersByDate(sortedByDate);

    // Sort by priority
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    const sortedByPriority = [...reminders].sort(
      (a, b) =>
        priorityOrder[a.priority as "High" | "Medium" | "Low"] -
        priorityOrder[b.priority as "High" | "Medium" | "Low"]
    );
    setRemindersByPriority(sortedByPriority);
  };

  useEffect(() => {
    getReminders();
  }, []);

  const getRemindersForMonth = () => {
    // Filter reminders for the current month and year
    const filteredReminders = reminders.filter((reminder) => {
      const reminderDate = new Date(reminder.dueDate);
      return (
        reminderDate.getFullYear() === year && reminderDate.getMonth() === month
      );
    });

    // Group reminders by day
    const remindersByDay: { [key: number]: Reminder[] } = {};
    filteredReminders.forEach((reminder) => {
      const day = new Date(reminder.dueDate).getDate();
      if (!remindersByDay[day]) {
        remindersByDay[day] = [];
      }
      remindersByDay[day].push(reminder);
    });

    console.log(remindersByDay);
    return remindersByDay;
  };

  const displayCalendar = () => {
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    firstDayOfMonth = firstDayOfMonth === 0 ? 7 : firstDayOfMonth;
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDay();
    const lastDatePrevMonth = new Date(year, month, 0).getDate();
    const calendarDays = [];
    const remindersByDay = getRemindersForMonth();

    for (let i = firstDayOfMonth - 1; i > 0; i--) {
      calendarDays.push(
        <FillingDays
          date={lastDatePrevMonth - i + 1}
          key={`${lastDatePrevMonth - i + 1}/${month % 12}/${year}`}
        />
      );
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
      const isToday =
        i === currentDate.getDate() &&
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth()
          ? true
          : false;
      calendarDays.push(
        <MonthDays
          isToday={isToday}
          date={i}
          key={`${i}/${(month + 1) % 12}/${year}`}
        >
          {remindersByDay[i] &&
            remindersByDay[i].map((reminder, index) => (
              /*<div key={index} className="text-white/70 text-sm">
                {reminder.title}
              </div>*/
              <ReminderCalendar
                key={index}
                title={reminder.title}
                description={reminder.description}
                dueDate={reminder.dueDate}
                priority={reminder.priority}
              />
            ))}
        </MonthDays>
      );
    }

    for (let i = lastDayOfMonth; i <= 6; i++) {
      calendarDays.push(
        <FillingDays
          date={i - lastDayOfMonth + 1}
          key={`${i - lastDayOfMonth + 1}/${(month + 2) % 12}/${year}`}
        />
      );
    }

    return { calendarDays };
  };

  const { calendarDays } = displayCalendar();

  const changeMonth = (id: string) => {
    const newMonth = id === "backward" ? month - 1 : month + 1;
    const newDate = new Date(year, newMonth, 1);
    setDate(newDate);
  };

  return (
    <>
      <div className="max-h-[540px] bg-white/10 rounded-2xl p-6 shadow-md backdrop-blur-md top-8 border border-white/10">
        <div className="flex max-h-15 pb-3 gap-1.5 border-b-white/10 border-b-1 mb-4">
          <Calendar className="text-primary-ta" size={40} />
          <h1 className="text-[1.8rem] text-primary-ta font-bold mb-4">
            Calendar
          </h1>
        </div>
        <div className="mb-3">
          <h1
            className="text-primary-ta text-[1.5rem] font-semibold"
            onClick={() => {
              navigate("/calendar/reminders");
            }}
          >
            Reminders
          </h1>
          <div
            className="h-70 border border-white/10 rounded-lg bg-white/5 mt-2 p-3 md:p-2 grid grid-rows-[32px_1fr_32px_1fr] text-white"
            onClick={() => {
              navigate("/calendar/reminders");
            }}
          >
            <h5 className="underline underline-offset-2">By priority</h5>
            <ul className="pl-1 text-wrap overflow-ellipsis">
              {remindersByPriority.slice(0, 4).map((reminder, index) => (
                <ListReminder
                  index={index}
                  title={reminder.title}
                  dueDate=""
                  priority={reminder.priority}
                />
              ))}
            </ul>
            <h5 className="underline underline-offset-2">By due date</h5>
            <ul className="pl-1 text-wrap overflow-ellipsis">
              {remindersByDate.slice(0, 4).map((reminder, index) => (
                <ListReminder
                  index={index}
                  title={reminder.title}
                  dueDate={reminder.dueDate}
                  priority=""
                />
              ))}
            </ul>
          </div>
        </div>
        <div className="">
          <h1 className="text-primary-ta text-[1.5rem] font-semibold">
            Create a reminder
          </h1>
          <button
            title="Add reminder"
            className="flex flex-row justify-center items-center bg-primary-ta p-1 h-8 w-full rounded-lg"
            onClick={() => {
              navigate("calendar/createReminder");
            }}
          >
            <Plus size={20} />
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      <div className="md:max-h-[596px] h-full bg-white/5 rounded-lg py-6 px-8 border-1 border-white/10">
        <div className="flex justify-between items-baseline gap-2 mb-2 border-b-white/10 border-b-1 pb-3 h-[50px]">
          <h1 className="text-[1.4rem] sm:text-[1.8rem] text-white font-bold">
            {months[month]} {year}
          </h1>
          <div className="flex gap-2">
            <button
              className="bg-white/20 text-primary-ta size-8 rounded-md flex justify-center items-center"
              onClick={() => {
                changeMonth("backward");
              }}
              title="Month backward button"
            >
              <ChevronLeft />
            </button>
            <button
              className="bg-white/20 text-primary-ta size-8 rounded-md flex justify-center items-center"
              onClick={() => {
                changeMonth("forward");
              }}
              title="Month forward button"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
        <div className="flex flex-col flex-nowrap gap-2 md:pt-3 md:pr-2 md:max-h-[500px] h-full ">
          <div className="grid grid-cols-7 gap-4 md:pl-2 md:pr-4">
            <span className="text-center p-1 text-[0.9rem] text-white font-semibold">
              Lun
            </span>
            <span className="text-center p-1 text-[0.9rem] text-white font-semibold">
              Mar
            </span>
            <span className="text-center p-1 text-[0.9rem] text-white font-semibold">
              Mie
            </span>
            <span className="text-center p-1 text-[0.9rem] text-white font-semibold">
              Jue
            </span>
            <span className="text-center p-1 text-[0.9rem] text-white font-semibold">
              Vie
            </span>
            <span className="text-center p-1 text-[0.9rem] text-white font-semibold">
              Sab
            </span>
            <span className="text-center p-1 text-[0.9rem] text-white font-semibold">
              Dom
            </span>
          </div>
          <div className="grid grid-cols-7 gap-4 mb-4 h-fit md:px-1.5 md:overflow-y-scroll [&::-webkit-scrollbar-track]:bg-white/20  [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-[5px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-[5px]">
            {calendarDays}
          </div>
        </div>
      </div>
    </>
  );
};
