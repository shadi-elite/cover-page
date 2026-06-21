"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "cover-page-generator-user-data";

type StoredData = Record<string, string>;

/**
 * Custom hook to persist student info in localStorage.
 * Only stores fields marked as `persistent` in the template config.
 */
export function useLocalStorage() {
  const [storedData, setStoredData] = useState<StoredData>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredData;
        setStoredData(parsed);
      }
    } catch {
      // Silently handle corrupted data
      localStorage.removeItem(STORAGE_KEY);
    }
    setIsLoaded(true);
  }, []);

  // Save specific fields to localStorage
  const saveFields = useCallback(
    (fieldNames: string[], formData: Record<string, string>) => {
      const toStore: StoredData = { ...storedData };
      fieldNames.forEach((name) => {
        if (formData[name] !== undefined && formData[name] !== "") {
          toStore[name] = formData[name];
        }
      });
      setStoredData(toStore);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
      } catch {
        // Storage full or unavailable — silently ignore
      }
    },
    [storedData]
  );

  // Get stored value for a field
  const getStoredValue = useCallback(
    (fieldName: string): string | undefined => {
      return storedData[fieldName];
    },
    [storedData]
  );

  // Clear all stored data
  const clearStoredData = useCallback(() => {
    setStoredData({});
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { storedData, isLoaded, saveFields, getStoredValue, clearStoredData };
}
