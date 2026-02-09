import { ContestEntry, UserLineupSubmission } from "@/data/types";

const ENTRIES_KEY = "fantasy_contest_entries";
const LINEUPS_KEY = "fantasy_lineups";

export function getEntries(): ContestEntry[] {
    const stored = localStorage.getItem(ENTRIES_KEY);
    return stored ? JSON.parse(stored) : [];
}

export function saveEntries(entries: ContestEntry[]) {
    localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
}

export function getLineups(): UserLineupSubmission[] {
    const stored = localStorage.getItem(LINEUPS_KEY);
    return stored ? JSON.parse(stored) : [];
}

export function saveLineups(lineups: UserLineupSubmission[]) {
    localStorage.setItem(LINEUPS_KEY, JSON.stringify(lineups));
}
