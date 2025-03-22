import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractMarkdownSectionContent(markdown: string, sectionName: string): string {
  // Escape special regex characters in the section name
  const escapedSectionName = sectionName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Define the regex pattern with the dynamic section name
  // This handles both \n and \r\n line breaks
  const pattern = new RegExp(
    `(?:^|\\r?\\n)##\\s*${escapedSectionName}\\s*(?:\\r?\\n|$)((?:\\r?\\n|.)*?)(?=\\r?\\n##|\\r?\\n#(?!#)|$)`,
    "i"
  );

  // Search for the pattern in the markdown text
  const match = markdown.match(pattern);

  // Return the content (capture group 1) or empty string if not found
  return match ? match[1].trim() : "";
}