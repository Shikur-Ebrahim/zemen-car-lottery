import { LotteryRound } from "../../types";

/**
 * Calculates the display number of sold tickets.
 * It uses a simulated growth of 1% per day since the start date,
 * but never less than the actual sold tickets.
 * 
 * @param lottery The lottery round data
 * @returns The number of sold tickets to display
 */
export const getDisplaySoldTickets = (lottery: LotteryRound): number => {
    const { startDate, totalTickets, soldTickets, initialSoldPercent = 0 } = lottery;
    
    // If no start date, return actual sold tickets
    if (!startDate) return soldTickets;

    const start = new Date(startDate).getTime();
    const now = new Date().getTime();
    
    // Calculate days passed since start
    const msPerDay = 24 * 60 * 60 * 1000;
    const daysPassed = Math.max(0, (now - start) / msPerDay);
    
    // Calculate simulated sales: Base % + (1% * days passed)
    const simulatedPercent = initialSoldPercent + daysPassed;
    const simulatedSales = Math.floor(totalTickets * (simulatedPercent / 100));
    
    // Return the maximum of actual and simulated, capped at total tickets
    return Math.min(totalTickets, Math.max(soldTickets, simulatedSales));
};

/**
 * Calculates the sales progress percentage based on simulated/actual sales.
 */
export const getSalesProgress = (lottery: LotteryRound): number => {
    if (lottery.totalTickets <= 0) return 0;
    const displaySold = getDisplaySoldTickets(lottery);
    return Math.min(100, Math.round((displaySold / lottery.totalTickets) * 100));
};
