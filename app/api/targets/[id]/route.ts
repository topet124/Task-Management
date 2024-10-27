import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { Target } from "@/lib/types";

const dataFilePath = path.join(process.cwd(), "data", "targets.json");

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await fs.readFile(dataFilePath, "utf8");
    const targets = JSON.parse(data);

    const target = targets.find(
      (t: { id: string | number }) => t.id.toString() === params.id
    );

    if (!target) {
      return NextResponse.json({ error: "Target not found" }, { status: 404 });
    }

    return NextResponse.json(target);
  } catch (error) {
    console.error("Error fetching target:", error);
    return NextResponse.json(
      { error: "Failed to fetch target" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, pipelineStatus } = await request.json();
    const data = await fs.readFile(dataFilePath, "utf8");
    const targets = JSON.parse(data);

    const targetIndex = targets.findIndex(
      (target: Target) => target.id.toString() === id.toString()
    );

    if (targetIndex === -1) {
      return NextResponse.json({ error: "Target not found" }, { status: 404 });
    }

    targets[targetIndex].pipelineStatus = pipelineStatus;
    targets[targetIndex].lastUpdated = new Date().toISOString();

    await fs.writeFile(dataFilePath, JSON.stringify(targets, null, 2));

    return NextResponse.json({ message: "Target updated successfully" });
  } catch (error) {
    console.error("Error updating target:", error);
    return NextResponse.json(
      { error: "Failed to update target" },
      { status: 500 }
    );
  }
}

// Add this function to handle unsupported methods
export async function OPTIONS() {
  return NextResponse.json(
    { message: "Allowed methods: GET, PATCH, POST" },
    { status: 200, headers: { Allow: "GET, PATCH, POST" } }
  );
}
