"use client"

import { useState, useEffect } from "react"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkHtml from "remark-html"

export default function MarkdownContent({ content }: { content: string }) {
  const [html, setHtml] = useState<string>("")

  useEffect(() => {
    async function parseMarkdown() {
      if (!content) return

      try {
        const result = await unified().use(remarkParse).use(remarkHtml).process(content)

        setHtml(result.toString())
      } catch (error) {
        console.error("Error parsing markdown:", error)
      }
    }

    parseMarkdown()
  }, [content])

  if (!html) {
    return null
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
