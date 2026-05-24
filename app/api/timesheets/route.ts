let timesheets: Array<{
  id: string;
  week: number;
  date: string;
  startDate: Date;
  endDate: Date;
  hours: number;
  status: "completed" | "incomplete" | "missing";
}> = [
  {
    id: "1",
    week: 1,
    date: "1 - 5 January, 2024",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-05"),
    hours: 40,
    status: "completed",
  },
  {
    id: "2",
    week: 2,
    date: "8 - 12 January, 2024",
    startDate: new Date("2024-01-08"),
    endDate: new Date("2024-01-12"),
    hours: 40,
    status: "completed",
  },
  {
    id: "3",
    week: 3,
    date: "15 - 19 January, 2024",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-01-19"),
    hours: 25,
    status: "incomplete",
  },
  {
    id: "4",
    week: 4,
    date: "22 - 26 January, 2024",
    startDate: new Date("2024-01-22"),
    endDate: new Date("2024-01-26"),
    hours: 40,
    status: "completed",
  },
  {
    id: "5",
    week: 5,
    date: "28 January - 1 February, 2024",
    startDate: new Date("2024-01-28"),
    endDate: new Date("2024-02-01"),
    hours: 0,
    status: "missing",
  },
];

export async function GET() {
  return Response.json(timesheets);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newTimesheet = {
    id: String(timesheets.length + 1),
    ...body,
  };
  timesheets.push(newTimesheet);
  return Response.json(newTimesheet, { status: 201 });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const index = timesheets.findIndex((ts) => ts.id === body.id);
  if (index > -1) {
    timesheets[index] = body;
    return Response.json(timesheets[index]);
  }
  return Response.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  timesheets = timesheets.filter((ts) => ts.id !== id);
  return Response.json({ success: true });
}
