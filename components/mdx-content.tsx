"use client"

import { useState, useEffect } from "react"
import { serialize } from "next-mdx-remote/serialize"
import { MDXRemote } from "next-mdx-remote"

export default function MdxContent({ content }: { content: string }) {
  const [mdxSource, setMdxSource] = useState<any>(null)

  useEffect(() => {
    async function serializeContent() {
      if (!content) return
      try {
        const serialized = await serialize(content)
        setMdxSource(serialized)
      } catch (error) {
        console.error("Error serializing MDX content:", error)
      }
    }

    serializeContent()
  }, [content])

  if (!mdxSource) {
    return null
  }

  return <MDXRemote {...mdxSource} />
}
