import fs from "fs"
import path from "path"
import matter from "gray-matter"

const contentDirectory = path.join(process.cwd(), "content")

// Helper function to check if a directory exists
function directoryExists(dirPath: string): boolean {
  try {
    return fs.statSync(dirPath).isDirectory()
  } catch (error) {
    return false
  }
}

// Helper function to ensure a directory exists
function ensureDirectoryExists(dirPath: string): void {
  if (!directoryExists(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

export function getContentBySlug(slug: string, locale = "fr") {
  // Ensure the content directory exists
  ensureDirectoryExists(contentDirectory)

  const fullPath = path.join(contentDirectory, locale, `${slug}.md`)

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      frontmatter: data,
      content,
    }
  } catch (error) {
    console.error(`Error reading file ${fullPath}:`, error)
    return {
      slug,
      frontmatter: {},
      content: "",
    }
  }
}

export function getAllContent(type: string, locale = "fr") {
  const directory = path.join(contentDirectory, locale, type)

  // Check if directory exists
  if (!directoryExists(directory)) {
    console.warn(`Directory ${directory} does not exist. Creating it.`)
    ensureDirectoryExists(directory)
    return []
  }

  try {
    const filenames = fs.readdirSync(directory)

    const allContent = filenames
      .filter((filename) => filename.endsWith(".md"))
      .map((filename) => {
        const slug = filename.replace(/\.md$/, "")
        const fullPath = path.join(directory, filename)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)

        return {
          slug,
          frontmatter: data,
          content,
        }
      })
      .sort((a, b) => {
        // Sort by date if available
        if (a.frontmatter.date && b.frontmatter.date) {
          return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
        }
        return 0
      })

    return allContent
  } catch (error) {
    console.error(`Error reading directory ${directory}:`, error)
    return []
  }
}
