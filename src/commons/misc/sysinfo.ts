
/**
 * Returns an object describing the memory usage of the Node.js process.
 * @returns An object describing the memory usage of the Node.js process.
 */
export function memory() {
    return process.memoryUsage();
}

/**
 * Returns a string representing the uptime of the Node.js process in days, hours, minutes, and seconds.
 * @returns A string representing the uptime of the Node.js process in days, hours, minutes, and seconds.
 */
export function uptime() {
    const uptime = process.uptime();
    const seconds = uptime % 60;
    const minutes = Math.floor(uptime / 60) % 60;
    const hours = Math.floor(uptime / 3600) % 24;
    const days = Math.floor(uptime / 86400);

    return `${days}d ${hours}h ${minutes}m ${seconds.toFixed(0)}s`;
}

/**
 * Returns an object describing the CPU usage of the Node.js process.
 * @returns An object describing the CPU usage of the Node.js process.
 */
export function cpu() {
    return process.cpuUsage();
}

/**
 * Returns a string representing the operating system platform of the Node.js process.
 * @returns A string representing the operating system platform of the Node.js process.
 */
export function platform() {
    return process.platform;
}

/**
 * Returns a string representing the operating system CPU architecture of the Node.js process.
 * @returns A string representing the operating system CPU architecture of the Node.js process.
 */
export function arch() {
    return process.arch;
}

/**
 * Returns the latency between the time the interaction was created and the current time.
 * @param interaction - The interaction object received from Discord.
 * @returns The latency between the time the interaction was created and the current time.
 */
export function latency(interaction: any) {
    return Date.now() - interaction.createdTimestamp;
}