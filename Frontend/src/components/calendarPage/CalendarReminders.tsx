import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Reminder } from "@/Types";
import { ArrowRight, Calendar } from "lucide-react";
import { CustomSelectWithCheckboxes } from "../ui/SelectDropdown";

export const CalendarReminders = () => {
  const navigate = useNavigate();

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
  const [filteredReminders, setRemindersFiltered] = useState<Reminder[]>([]);
  const [filters, setFilters] = useState({
    low: false,
    medium: false,
    high: false,
    date: "",
    customFilters: {
      school: false,
      work: false,
      health: false,
      personal: false,
      other: false,
    },
  });

  const apiURL = "http://localhost:4000/api/reminders";

  const getReminders = useCallback(async () => {
    const res = await axios.get(apiURL);
    const reminders = res.data;
    setReminders(reminders);
  }, [setReminders]);

  const checkDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  const filterRemainders = () => {
    const selectedPriorities : string[] = [];
    if (filters.low) selectedPriorities.push("Low");
    if (filters.medium) selectedPriorities.push("Medium");
    if (filters.high) selectedPriorities.push("High");

    const filtered = Array.isArray(reminders) ? reminders.filter((reminder) => {
      // Check priority filters
      const matchesPriority =
        selectedPriorities.length === 0 ||
        selectedPriorities.includes(reminder.priority);

      // Check date filter
      const matchesDate = !filters.date || reminder.dueDate === filters.date;

      // Combine all filters
      return matchesPriority && matchesDate;
    }): [];
    setRemindersFiltered(filtered || []); // Update the filtered reminders state
  };

  useEffect(() => {
    getReminders(); // Filter reminders whenever the reminders or filters change
  }, [getReminders]);

  useEffect(() => {
    filterRemainders(); // Filter reminders whenever the filters change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, reminders]);

  return (
    <>
      <div className="max-h-[540px] bg-white/10 rounded-2xl p-6 shadow-md backdrop-blur-md top-8 border border-white/10">
        <div className="flex max-h-15 pb-3 gap-1.5 border-b-white/10 border-b-1 mb-2">
          <Calendar className="text-primary-ta" size={40} />
          <h1 className="text-[1.8rem] text-primary-ta font-bold mb-4">
            Reminders
          </h1>
        </div>
        <div className="flex flex-col gap-2 p-2">
          <CustomSelectWithCheckboxes
            filters={filters}
            setFilters={setFilters}
          />
        </div>
        <div className="flex flex-col gap-2 p-2">
          <h5 className="text-white text-lg">Date</h5>
          <input
            type="date"
            id="date"
            title="dueDate"
            onChange={checkDate}
            className="bg-white/10 text-white rounded-md p-2"
          />
        </div>
        <div className="flex flex-col gap-2 p-2">
          <button
            className="flex flex-row justify-center items-center bg-primary-ta rounded-lg font-bold px-3 py-2"
            onClick={() => navigate("/calendar")}
          >
            Back to Calendar <ArrowRight size={20} />
          </button>
        </div>
      </div>
      <div className="md:max-h-[596px] h-full bg-white/5 rounded-lg py-6 px-8 border-1 border-white/10">
        <div className="flex justify-between items-baseline gap-2 mb-2 border-b-white/10 border-b-1 pb-3 h-[50px]">
          <h1 className="text-[1.4rem] sm:text-[1.8rem] text-white font-bold">
            Reminders
          </h1>
          <span className="text-white/70 text-[1.2rem] font-semibold">
            Reminders
          </span>
        </div>
        <div className="flex flex-col flex-nowrap gap-2 md:pt-3 md:pr-2 md:max-h-[500px] h-full ">
          <div className="grid grid-cols-2 gap-4 mb-4 h-fit md:px-1.5 md:overflow-y-scroll [&::-webkit-scrollbar-track]:bg-white/20  [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-[5px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-[5px]">
            {filteredReminders.map((reminder) => (
              <div
                key={reminder.id}
                className={
                  "p-4 rounded-lg bg-white/10 border border-white/10 shadow-md"
                }
              >
                <h3 className="text-white font-bold text-[1.3rem]">
                  {reminder.title}
                </h3>
                <p className="text-white/70">{reminder.description}</p>
                <div className="flex justify-between items-center my-1">
                  <span
                    className={`rounded-2xl py-0.5 px-1.5 text-[0.8rem] text-white ${
                      reminder.priority === "High"
                        ? "bg-wrong/50"
                        : reminder.priority === "Medium"
                        ? "bg-warning/50"
                        : "bg-correct/50"
                    }`}
                  >
                    {reminder.priority}
                  </span>
                </div>
                <p className="text-white/50">Due Date: {reminder.dueDate}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

/* <div className="flex flex-col flex-nowrap gap-4 pt-3 md:pr-2 md:max-h-[500px] h-full md:overflow-y-auto [&::-webkit-scrollbar-track]:bg-white/20  [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-[5px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-[5px]"></div> */

/*<div className="flex flex-col gap-2 p-2">
            <h5 className="text-white text-lg">Filters</h5>
            <div className="flex items-center gap-2 px-2 py-1 bg-correct/50 w-full rounded-md">
              <input
                type="checkbox"
                id="low"
                value="low"
                onChange={checkPriority}
                className="w-4 h-4 accent-gray-500"
              />
              <label htmlFor="low" className="text-white">
                Low
              </label>
            </div>
            <div className="flex items-center gap-2 px-2 py-1 bg-primary-ta/50 w-full rounded-md">
              <input
                type="checkbox"
                id="medium"
                value="medium"
                onChange={checkPriority}
                className="w-4 h-4 accent-gray-500"
              />
              <label htmlFor="medium" className="text-white">
                Medium
              </label>
            </div>
            <div className="flex items-center gap-2 px-2 py-1 bg-wrong/50 w-full rounded-md">
              <input
                type="checkbox"
                id="high"
                value="high"
                onChange={checkPriority}
                className="w-4 h-4 accent-gray-500"
              />
              <label htmlFor="high" className="text-white">
                High
              </label>
            </div>*/
