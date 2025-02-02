import { useMemo } from "react";

export const useFilteredAudio = (list, filter) => {
  const filteredAudio = useMemo(() => {
    return list.filter((audio) =>
      audio.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [list, filter]);

  return filteredAudio;
};
