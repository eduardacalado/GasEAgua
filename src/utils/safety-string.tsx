export function safetyString(input?: string | null, returnNotInformedText = "") {
    if (!input) {
        return returnNotInformedText;
    }

    return String(input);
}