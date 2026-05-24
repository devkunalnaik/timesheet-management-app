"use client";

import { useState } from "react";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: {
    name: string;
    project: string;
    workType: string;
    description: string;
    hours: number;
  }) => void;
}

export default function AddTaskModal({
  isOpen,
  onClose,
  onAdd,
}: AddTaskModalProps) {
  const [project, setProject] = useState("");
  const [workType, setWorkType] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (project && workType && description) {
      onAdd({
        name: description.split("\n")[0],
        project,
        workType,
        description,
        hours,
      });
      setProject("");
      setWorkType("");
      setDescription("");
      setHours(1);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Add New Entry
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Project <span className="text-red-500">*</span>
            </label>
            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            >
              <option value="">Project Name</option>
              <option value="project1">Project 1</option>
              <option value="project2">Project 2</option>
              <option value="project3">Project 3</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type of Work <span className="text-red-500">*</span>
            </label>
            <select
              value={workType}
              onChange={(e) => setWorkType(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            >
              <option value="">Bug fixes</option>
              <option value="development">Development</option>
              <option value="testing">Testing</option>
              <option value="bugfix">Bug Fixes</option>
              <option value="documentation">Documentation</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write text here ..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              rows={4}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              A note for extra info
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hours <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setHours(Math.max(0, hours - 1))}
                className="px-3 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
              >
                −
              </button>
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-12 border border-gray-300 rounded-md px-2 py-2 text-center text-sm"
                min="0"
              />
              <button
                type="button"
                onClick={() => setHours(hours + 1)}
                className="px-3 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700"
            >
              Add entry
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-md font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
