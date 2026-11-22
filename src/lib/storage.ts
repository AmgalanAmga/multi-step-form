import type { z } from "zod";

export const readStorage = <T>(key: string, schema: z.ZodType<T>): T | null => {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(key);

    if (!raw) return null;

    const parsed = schema.safeParse(JSON.parse(raw));

    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
};

export const writeStorage = <T>(key: string, value: T): boolean => {
  if (typeof window === "undefined") return false;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

export const removeStorage = (key: string): void => {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(key);
};
