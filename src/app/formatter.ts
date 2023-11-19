import moment from "dayjs";

export const toDisplayAmount = (v: any, currency = "RM", empty = "-") => {
    const value = Number(v);
    if (!Number.isNaN(value)) {
        const amount = value.toLocaleString(undefined, {
            minimumFractionDigits: 2
        });
        return amount !== undefined ? `${currency} ${amount}` : empty;
    }
    return empty;
};

export const toDisplayNumber = (v: any, minimumFractionDigits = 2, empty = "-") => {
    if (v !== null && v !== undefined) {
        return `${v.toFixed(minimumFractionDigits)}`.toLocaleString();
    }
    return empty;
};
export const toDisplayNumberValue = (v: any, unit: string, minimumFractionDigits = 2) => {
    return v !== null && v !== undefined ? `${toDisplayNumber(v, minimumFractionDigits)}${unit ? ` ${unit}` : ""}` : "-";
};

export const toDisplayTime = (date: any) => {
    return date ? moment(date).format("M/D LT") : "";
};

export const toDisplayDate = (date: any) => {
    return date ? moment(date).format("YYYY-MM-DD") : "";
};

export const toDisplayDatetime = (date: any, empty = "-") => {
    return date ? moment(date).format("YYYY-MM-DD h:mma") : empty;
};

export const toDisplayDateTimeIn12WithTimeZone = (date: any, GMT: string, empty = "-") => {
    return date ? moment(date).format(`dddd MMM d h:mm:ss a ${GMT} YYYY`) : empty;
};

export const toDisplayDateTimeIn24WithTimeZone = (date: any, GMT: string, empty = "-") => {
    return date ? moment(date).format(`dddd MMM d H:mm:ss a ${GMT} YYYY`) : empty;
};
export const toDisplayDatetimeNoSec = (date: any, empty: string = "-") => {
    return date ? moment(date).format("YYYY-MM-DD HH:mm") : empty;
};

export const toDisplayUserType = (type: string) => {
    return type;
};
