import { TRACK_GROUPS } from "../constants/roulette-map";

export const normalizeGroupName = (value?: string) => {
  if (!value) return "";
  return value
    .toLowerCase()
    .replace(/[\s/]+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

export const findGroupNumbers = (rawName?: string) => {
  if (!rawName) return undefined;

  const normalized = normalizeGroupName(rawName);

  return (
    TRACK_GROUPS[normalized] ||
    TRACK_GROUPS[normalized.replace(/-/g, "")] ||
    TRACK_GROUPS[rawName.toLowerCase()]
  );
};

export const buildGroupTargets = (
  groupName: string,
  groupNumbers: number[]
) => [groupName, ...groupNumbers.map(String)];
