import { useState } from 'react';

export const useOcr = () => {
  const [isLoading, setIsLoading] = useState(false);

  const startOcr = async () => {
    setIsLoading(true);
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
    setIsLoading(false);
  };

  return { isLoading, startOcr };
};
