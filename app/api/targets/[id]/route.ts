import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { Target } from "@/lib/types";

const dataFilePath = path.join(process.cwd(), "data", "targets.json");

// GET request handler
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

// PATCH request handler with CORS headers
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

    const response = NextResponse.json({ message: "Target updated successfully" });
    response.headers.set("Access-Control-Allow-Origin", "*"); // Replace "*" with specific origin in production
    response.headers.set("Access-Control-Allow-Methods", "GET, PATCH, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error) {
    console.error("Error updating target:", error);
    return NextResponse.json(
      { error: "Failed to update target" },
      { status: 500 }
    );
  }
}

// OPTIONS request handler to handle CORS preflight
export async function OPTIONS() {
  return NextResponse.json(
    { message: "Allowed methods: GET, PATCH, POST" },
    {
      status: 200,
      headers: {
        "Allow": "GET, PATCH, POST, OPTIONS",
        "Access-Control-Allow-Origin": "*", // Replace "*" with specific origin in production
        "Access-Control-Allow-Methods": "GET, PATCH, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
