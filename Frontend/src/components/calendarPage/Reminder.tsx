import { useEffect, useState, useRef } from "react";

export const ReminderCalendar = ({
  title,
  description,
  dueDate,
  priority,
}: {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
}) => {
  const [reminder, setReminder] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const divRef = useRef<HTMLDivElement>(null); // Reference to the white div
  const popupRef = useRef<HTMLDivElement>(null); // Reference to the pop-up

  useEffect(() => {
    if (reminder && divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      const popupHeight = popupRef.current ? popupRef.current.offsetHeight : 0;
      setPopupPosition({
        top: rect.top + window.scrollY - popupHeight, // Adjust the vertical position
        left: rect.left + window.scrollX, // Adjust the horizontal position
      });
    }
  }, [reminder]);

  return (
    <>
      {/* White div */}
      <div
        ref={divRef}
        className={`h-full w-3 rounded-lg ${
          priority === "High"
            ? "bg-wrong/50"
            : priority === "Medium"
            ? "bg-warning/50"
            : "bg-correct/50"
        }`}
        onMouseEnter={() => setReminder(true)}
        onMouseLeave={() => setReminder(false)}
      ></div>

      {/* Pop-up */}
      {reminder && (
        <div
          ref={popupRef}
          title="pop-up"
          className="absolute w-fit max-w-70 p-3 h-fit flex flex-col items-start justify-start bg-gray-800 text-white rounded shadow-lg"
          style={{ top: popupPosition.top, left: popupPosition.left }}
          onMouseEnter={() => setReminder(true)}
          onMouseOver={() => setReminder(true)}
          onMouseLeave={() => setReminder(false)}
          //TODO Añadir un onClick
        >
          <h3 className="text-[1.3rem]">{title}</h3>
          <p>{description}</p>
          <p>Due Date: {dueDate}</p>
          <span
            className={`rounded-md border px-1 ${
              priority === "High"
                ? "text-wrong/70 border-wrong/70"
                : priority === "Medium"
                ? "text-warning/70 border-warning/70"
                : "text-correct/70 border-correct/70"
            }`}
          >
            {priority}
          </span>
        </div>
      )}
    </>
  );
};

export const ListReminder = ({
  title,
  index,
  dueDate = "",
  priority = "",
}: {
  title: string;
  index: number;
  dueDate: string;
  priority: string;
}) => {
  if (priority !== "") {
    return (
      <>
        <li
          key={index}
          className={`${
            priority === "High"
              ? "text-wrong"
              : priority === "Medium"
              ? "text-warning"
              : "text-correct"
          } text-sm h-5 overflow-y-hidden text-ellipsis`}
        >
          {title}: {priority}
        </li>
      </>
    );
  }
  if (dueDate !== "") {
    return (
      <>
        <li
          key={index}
          className="h-5 text-white/70 text-sm overflow-y-hidden text-ellipsis"
        >
          {title}: {dueDate}
        </li>
      </>
    );
  }
};

const ReminderFilter = () => {
  return (
    <>
      <span>

      </span>
    </>
  )
}