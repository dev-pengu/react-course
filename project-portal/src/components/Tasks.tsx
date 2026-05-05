import type { Task } from "../App";
import NewTask from "./NewTask";

export type TasksProps = {
  tasks: Task[];
  onTaskAdd: (text: string) => void;
  onTaskDelete: (id: number) => void;
};

export default function Tasks({ tasks, onTaskAdd, onTaskDelete }: TasksProps) {

    let taskContent = <p className="text-stone-800 my-4">
          This project does not have any tasks yet.
        </p>;

    if (tasks.length > 0) {
        taskContent = <ul className="p-4 mt-8 rounded-md bg-stone-100">
            {tasks.map(task => 
                <li key={task.id} className="flex justify-between my-4">
                    <div>{task.text}</div>
                    <button className="text-stone-700 hover:text-red-500" onClick={() => onTaskDelete(task.id)}>Clear</button>
                </li>
            )}
        </ul>
    }

  return (
    <>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask onTaskAdd={onTaskAdd} />
      {taskContent}
    </>
  );
}
