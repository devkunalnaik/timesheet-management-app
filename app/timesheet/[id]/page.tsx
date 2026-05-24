"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AddTaskModal from "@/app/components/AddTaskModal";

interface Task {
  id: string;
  date: string;
  name: string;
  hours: number;
  project: string;
}

interface TimesheetDetail {
  id: string;
  week: number;
  date: string;
  startDate: string;
  endDate: string;
  hours: number;
  tasks: Task[];
}

export default function TimesheetDetail() {
  const params = useParams();
  const router = useRouter();
  const [timesheet, setTimesheet] = useState<TimesheetDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const fetchTimesheet = async () => {
      const res = await fetch(`/api/timesheets/${params.id}`);
      const data = await res.json();
      setTimesheet(data);
      setLoading(false);
    };
    fetchTimesheet();
  }, [params.id]);

  const handleAddTask = (task: {
    name: string;
    project: string;
    workType: string;
    description: string;
    hours: number;
  }) => {
    if (timesheet && selectedDate) {
      const newTask = {
        id: `t${Date.now()}`,
        date: selectedDate,
        name: task.name,
        hours: task.hours,
        project: task.project,
      };
      setTimesheet({
        ...timesheet,
        tasks: [...timesheet.tasks, newTask],
        hours: timesheet.hours + task.hours,
      });
      setIsModalOpen(false);
      setSelectedDate(null);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!timesheet) return <div>Timesheet not found</div>;

  const groupedTasks = (timesheet.tasks || []).reduce(
    (acc: { [key: string]: Task[] }, task) => {
      if (!acc[task.date]) acc[task.date] = [];
      acc[task.date].push(task);
      return acc;
    },
    {}
  );

  const progressPercent = (timesheet.hours / 40) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <button onClick={() => router.back()} className="text-blue-600">
              ← Back
            </button>
            <p className="text-gray-600">Timesheets</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                This week&apos;s timesheet
              </h1>
              <p className="text-sm text-gray-600">{timesheet.date}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold text-gray-900">
                {timesheet.hours}/40 hrs
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {progressPercent.toFixed(0)}%
              </div>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-orange-400 h-2 rounded-full"
              style={{ width: `${Math.min(progressPercent, 100)}%` }}
            ></div>
          </div>

          <div className="space-y-6">
            {Object.entries(groupedTasks).map(([date, tasks]) => (
              <div key={date}>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  {date}
                </h3>
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-gray-900">{task.name}</span>
                        <span className="text-sm text-gray-600">
                          {task.hours} hrs
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {task.project}
                        </span>
                      </div>
                      <button className="text-gray-400 hover:text-gray-900">
                        ⋯
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setSelectedDate(date);
                      setIsModalOpen(true);
                    }}
                    className="w-full p-3 border-2 border-dashed border-blue-300 rounded text-blue-600 text-sm font-medium hover:bg-blue-50"
                  >
                    + Add new task
                  </button>
                </div>
              </div>
            ))}
          </div>

          <AddTaskModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAdd={handleAddTask}
          />
        </div>
      </main>
    </div>
  );
}
