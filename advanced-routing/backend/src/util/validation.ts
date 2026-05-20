const isValidText = (value: unknown): boolean => {
    return typeof value === 'string' && value.trim().length > 0;
}

const isValidDate = (value: unknown): boolean => {
    const date = new Date(value as string);
    return !isNaN(date.getTime());
}

const isValidUrl = (value: unknown): boolean => {
    return typeof value === 'string' && value.trim().length > 0 && /^https?:\/\/\S+$/.test(value);
}

export { isValidText, isValidDate, isValidUrl };