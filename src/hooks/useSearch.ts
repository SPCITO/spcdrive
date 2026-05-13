import { useState, useMemo } from 'react';

export function useSearch<T>(data: T[], searchFields: (keyof T)[]) {
  const [query, setQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!query) return data;

    return data.filter((item) =>
      searchFields.some((field) => {
        const value = item[field];
        return String(value).toLowerCase().includes(query.toLowerCase());
      })
    );
  }, [data, query, searchFields]);

  return {
    query,
    setQuery,
    filteredData,
    clear: () => setQuery(''),
  };
}