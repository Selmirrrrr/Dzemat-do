import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "content", "data", "prayers.json")
    const fileContents = fs.readFileSync(filePath, "utf8")
    const prayers = JSON.parse(fileContents)

    return NextResponse.json(prayers)
  } catch (error) {
    console.error("Error reading prayer times:", error)
    return NextResponse.json({ error: "Failed to load prayer times" }, { status: 500 })
  }
}
