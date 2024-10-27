import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "targets.json");

export async function GET() {
  try {
    const data = await fs.readFile(dataFilePath, "utf8");
    const targets = JSON.parse(data);
    return NextResponse.json(targets);
  } catch (error) {
    console.error("Error fetching targets:", error);
    return NextResponse.json(
      { error: "Failed to fetch targets" },
      { status: 500 }
    );
  }
}
