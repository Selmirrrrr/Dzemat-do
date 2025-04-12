import { type NextRequest, NextResponse } from "next/server"
import { getContentBySlug, getAllContent } from "@/lib/markdown"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const slug = searchParams.get("slug")
  const type = searchParams.get("type")
  const locale = searchParams.get("locale") || "fr"

  if (slug) {
    const content = getContentBySlug(slug, locale)
    return NextResponse.json(content)
  }

  if (type) {
    const contents = getAllContent(type, locale)
    return NextResponse.json(contents)
  }

  return NextResponse.json({ error: "Missing slug or type parameter" }, { status: 400 })
}
