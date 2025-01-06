"use client";
import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";

const TodoList = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingTask, setEditingTask] = useState<string>(""); // Task being edited

  // Add a new task
  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, task.trim()]);
    setTask("");
  };

  // Remove a task by index
  const removeTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Open the modal for editing a specific task
  const startEditingTask = (index: number) => {
    setEditingIndex(index);
    setEditingTask(tasks[index]);
  };

  // Update the task being edited
  const updateTask = () => {
    if (editingIndex !== null && editingTask.trim()) {
      const updatedTasks = tasks.map((t, i) =>
        i === editingIndex ? editingTask.trim() : t
      );
      setTasks(updatedTasks);
      setEditingIndex(null); // Reset editing index
      setEditingTask(""); // Clear editing task
    }
  };

  // Remove all tasks
  const removeAllTasks = () => {
    setTasks([]);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Decentralized To-Do List</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-1 p-2 border rounded uppercase"
          placeholder="Add a new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <ul className="list-disc pl-5 space-y-2">
        {tasks.map((t, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
          >
            <span className="text-gray-700">{t}</span>
            <div className="flex gap-2 items-center">
              {/* Edit Button */}
              <Modal>
                <ModalTrigger>
                  <span
                    className="bg-black inline-block text-white px-2 py-1 rounded hover:bg-gray-800"
                    onClick={() => startEditingTask(index)}
                  >
                    Edit
                  </span>
                </ModalTrigger>

                {editingIndex === index && (
                  <ModalBody>
                    <ModalContent>
                      <input
                        type="text"
                        value={editingTask}
                        onChange={(e) => setEditingTask(e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </ModalContent>
                    <ModalFooter className="gap-4">
                      <button
                        className="px-2 py-1 bg-gray-200 text-black rounded-md w-28"
                        onClick={() => setEditingIndex(null)} // Close modal
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded-md w-28"
                        onClick={updateTask}
                      >
                        Save
                      </button>
                    </ModalFooter>
                  </ModalBody>
                )}
              </Modal>

              {/* Delete Button */}
              <button
                onClick={() => removeTask(index)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          disabled
        >
          Undo
        </button>
        <button
          onClick={removeAllTasks}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete All
        </button>
      </div>
    </div>
  );
};

export default TodoList;
