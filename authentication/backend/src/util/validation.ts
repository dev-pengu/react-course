const isValidText = (value: unknown, minLength: number = 1): boolean => {
    return typeof value === 'string' && value.trim().length >= minLength;
}

const isValidDate = (value: unknown): boolean => {
    const date = new Date(value as string);
    return !isNaN(date.getTime());
}

const isValidUrl = (value: unknown): boolean => {
    return typeof value === 'string' && value.trim().length > 0 && /^https?:\/\/\S+$/.test(value);
}

const isValidEmail = (value: unknown): boolean => {
    return typeof value === 'string' && /^\S+@\S+\.\S+$/.test(value);
}

export { isValidText, isValidDate, isValidUrl, isValidEmail };