

export enum ELogSeverity {
    Info,
    Warning,
    Error,
    Debug
}

export enum ELogType {
    System,
    Interaction,
}

export interface ILog {
    severity: ELogSeverity;
    type: ELogType;
    message: string;
}

export function log(log: ILog) {
    // get the current timestamp as unix time in milliseconds
    const timestamp: string = new Date().toISOString();

    // convert the severity to a string
    let severity: string;
    switch (log.severity) {
        case ELogSeverity.Info:
            severity = "INFO";
            break;
        case ELogSeverity.Warning:
            severity = "WARNING";
            break;
        case ELogSeverity.Error:
            severity = "ERROR";
            break;
        case ELogSeverity.Debug:
            severity = "DEBUG";
            break;
        default:
            severity = "UNKNOWN";
    }

    // convert the type to a string
    let type: string;
    switch (log.type) {
        case ELogType.System:
            type = "SYSTEM";
            break;
        case ELogType.Interaction:
            type = "INTERACTION";
            break;
        default:
            type = "UNKNOWN";
    }

    // log the message
    const message = `[${timestamp}] [${severity}] [${type}] ${log.message}`;

    console.log(message);

    // TODO: add db shit
}