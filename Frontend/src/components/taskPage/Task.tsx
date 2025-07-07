import { useState } from "react";
import { Trash2, FilePen, Check } from "lucide-react";
import axios from "axios";
import { useTaskContext } from "@/contexts/Task Context/UseTaskContext";
import { useNavigate } from "react-router-dom";
import type { Task } from "@/Types";

function Status({ isDone, classes }: { isDone: boolean; classes?: string }) {
  if (isDone) {
    return (
      <span className={`bg-correct/20 text-correct ${classes}`}>Completed</span>
    );
  } else {
    return (
      <span className={`bg-primary-ta/20 text-primary-ta ${classes}`}>
        Pending
      </span>
    );
  }
}

export function Task({
  title,
  description,
  id,
  status,
  getTasks,
}: Task ) {

  const { setSelectedTask } = useTaskContext();
  const [state, setState] = useState(status);
  const navigate = useNavigate();

  const changeStatus = async (id: string) => {
    await axios.put(`http://localhost:4000/api/tasks/${id}`, {
      status: !state,
    });
    setState(!state);
    getTasks();
  };

  const deleteTask = async (id: string) => {
    await axios.delete(`http://localhost:4000/api/tasks/${id}`);
    getTasks();
  };

  const editTask = async (id: string) => {
    setSelectedTask({ id, title, description, status });
    navigate(`/tasks/${id}/edit`)
  };

  return (
    <div className="bg-white/5 max-w-[920px] w-full rounded-[12px] p-4 mb-4 border-1 border-white/10 transition-all duration-200 ease-in-out hover:-translate-y-2.5 hover:border-gypsum ">
      <div>
        <h3 className="text-white mb-2 text-[1.2rem] font-bold">{title}</h3>
        <p className="text-white/70 mb-4 text-sm w-full max-w-[675px] overflow-hidden text-ellipsis whitespace-nowrap ">{description}</p>
        <Status
          isDone={state}
          classes="inline-block py-1 px-3 rounded-xl font-medium text-[0.85rem] mb-[5px]"
        ></Status>
      </div>
      <div className="flex gap-1 mt-4">
        <button
          title="Complete"
          className="w-auto py-2 px-4 bg-correct/20 text-correct hover:bg-correct/30 active:bg-correct/25 rounded-lg"
          onClick={() => changeStatus(id)}
        >
          <Check size={20} strokeWidth={2.4} />
        </button>
        <button
          title="Edit"
          disabled={!!state}
          className="w-auto py-2 px-4 bg-white/20 text-white hover:bg-white/30 active:bg-white/25 rounded-lg"
          onClick={() => editTask(id)}
        >
          <FilePen size={20} strokeWidth={2.4} />
        </button>
        <button
          title="Delete"
          className="w-auto py-2 px-4 bg-wrong/20 text-wrong hover:bg-wrong/30 active:bg-wrong/25 rounded-lg"
          onClick={() => deleteTask(id)}
        >
          <Trash2 size={20} strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}
