const timesheetDetail: { [key: string]: any } = {
  "1": {
    id: "1",
    week: 1,
    date: "1 - 5 January, 2024",
    startDate: "2024-01-01",
    endDate: "2024-01-05",
    hours: 40,
    status: "completed",
    tasks: [
      {
        id: "t1",
        date: "Jan 1",
        name: "Homepage Development",
        hours: 4,
        project: "Project Name",
      },
      {
        id: "t2",
        date: "Jan 1",
        name: "Homepage Development",
        hours: 4,
        project: "Project Name",
      },
      {
        id: "t3",
        date: "Jan 2",
        name: "Homepage Development",
        hours: 4,
        project: "Project Name",
      },
      {
        id: "t4",
        date: "Jan 2",
        name: "Homepage Development",
        hours: 4,
        project: "Project Name",
      },
    ],
  },
  "2": {
    id: "2",
    week: 2,
    date: "8 - 12 January, 2024",
    startDate: "2024-01-08",
    endDate: "2024-01-12",
    hours: 40,
    status: "completed",
    tasks: [],
  },
  "3": {
    id: "3",
    week: 3,
    date: "15 - 19 January, 2024",
    startDate: "2024-01-15",
    endDate: "2024-01-19",
    hours: 25,
    status: "incomplete",
    tasks: [],
  },
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const timesheet = timesheetDetail[id];
  if (!timesheet) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
    });
  }
  return Response.json(timesheet);
}
