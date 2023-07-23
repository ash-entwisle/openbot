
export function memory() {
    return process.memoryUsage();
}

export function uptime() {
    const uptime = process.uptime();
    const seconds = uptime % 60;
    const minutes = Math.floor(uptime / 60) % 60;
    const hours = Math.floor(uptime / 3600) % 24;
    const days = Math.floor(uptime / 86400);

    return `${days}d ${hours}h ${minutes}m ${seconds.toFixed(0)}s`;
}

export function cpu() {
    return process.cpuUsage();
}

export function platform() {
    return process.platform;
}

export function arch() {
    return process.arch;
}

export function latency(interaction: any) {
    return Date.now() - interaction.createdTimestamp;
}