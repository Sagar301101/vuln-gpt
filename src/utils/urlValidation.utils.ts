export function isValidUrl(url: string): boolean {
    // Regular expression to match URL structure with a TLD requirement
    const regex = new RegExp(
        '^(https?:\\/\\/)' + // Protocol (http or https)
        '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,})' + // Domain name with TLD
        '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // Optional port and path
        '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // Optional query string
        '(\\#[-a-zA-Z\\d_]*)?$', // Optional fragment
        'i'
    );

    // Check if the URL matches the regular expression
    if (!regex.test(url)) {
        return false;
    }

    try {
        // Attempt to create a new URL object
        const parsedUrl = new URL(url);
        return !!parsedUrl.protocol && !!parsedUrl.hostname;
    } catch (e) {
        // If URL constructor throws, it's not a valid URL
        return false;
    }
}