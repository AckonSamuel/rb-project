import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const date = new Date(dateString);

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  // Get the suffix for the day
  const daySuffix = (day: number) => {
      if (day > 3 && day < 21) return 'th'; // Special case for 11th to 13th
      switch (day % 10) {
          case 1: return 'st';
          case 2: return 'nd';
          case 3: return 'rd';
          default: return 'th';
      }
  };

  return `${month} ${day}${daySuffix(day)} ${year}`;
}

