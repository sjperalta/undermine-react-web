import { Player, LineupSlot, Position } from "@/data/types";

export interface LineupValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
}

export const SALARY_CAP = 100000;
export const MAX_PLAYERS_FROM_TEAM = 3;

export const POSITION_REQUIREMENTS = {
    GK: { min: 1, max: 1 },
    DEF: { min: 3, max: 5 },
    MID: { min: 3, max: 5 },
    FWD: { min: 1, max: 3 },
};

export const TOTAL_PLAYERS = 11;

export function validateLineup(slots: LineupSlot[], salaryCap: number = SALARY_CAP): LineupValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    const players = slots.map(s => s.player).filter((p): p is Player => p !== null);

    // 1. Player Count
    if (players.length !== TOTAL_PLAYERS) {
        errors.push(`Lineup must have exactly ${TOTAL_PLAYERS} players (currently ${players.length})`);
    }

    // 2. Salary Cap
    const totalSalary = players.reduce((sum, p) => sum + p.salary, 0);
    if (totalSalary > salaryCap) {
        errors.push(`Salary cap exceeded by $${(totalSalary - salaryCap).toLocaleString()}`);
    }

    // 3. Position Requirements
    const counts = {
        GK: 0,
        DEF: 0,
        MID: 0,
        FWD: 0,
    };

    players.forEach(p => {
        if (p.position in counts) {
            counts[p.position as keyof typeof counts]++;
        }
    });

    if (counts.GK !== 1) errors.push(`Must have exactly 1 Goalkeeper (${counts.GK})`);
    if (counts.DEF < 3) errors.push(`Must have at least 3 Defenders (${counts.DEF})`);
    if (counts.DEF > 5) errors.push(`Cannot have more than 5 Defenders (${counts.DEF})`);
    if (counts.MID < 3) errors.push(`Must have at least 3 Midfielders (${counts.MID})`);
    if (counts.MID > 5) errors.push(`Cannot have more than 5 Midfielders (${counts.MID})`);
    if (counts.FWD < 1) errors.push(`Must have at least 1 Forward (${counts.FWD})`);
    if (counts.FWD > 3) errors.push(`Cannot have more than 3 Forwards (${counts.FWD})`);

    // 4. Team Constraints
    const teamCounts: Record<string, number> = {};
    players.forEach(p => {
        teamCounts[p.team] = (teamCounts[p.team] || 0) + 1;
    });

    Object.entries(teamCounts).forEach(([team, count]) => {
        if (count > MAX_PLAYERS_FROM_TEAM) {
            errors.push(`Maximum ${MAX_PLAYERS_FROM_TEAM} players allowed from ${team} (${count})`);
        }
    });

    // 5. Unique Players (Implicit check, but good to be explicit)
    const playerIds = new Set(players.map(p => p.id));
    if (playerIds.size !== players.length) {
        errors.push("Duplicate players found in lineup");
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings,
    };
}

export function getRemainingSalary(slots: LineupSlot[], cap: number = SALARY_CAP): number {
    return cap - slots.reduce((sum, s) => sum + (s.player?.salary || 0), 0);
}

export function getPositionCounts(slots: LineupSlot[]) {
    const counts = { GK: 0, DEF: 0, MID: 0, FWD: 0 };
    slots.forEach(s => {
        if (s.player) {
            counts[s.player.position]++;
        }
    });
    return counts;
}
