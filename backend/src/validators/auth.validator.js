const COLLEGE_EMAIL_REGEX = /^[^\s@]+\.(24|25)@bitmesra\.ac\.in$/i;
export function validateLoginInput(body) {
    const errors = [];

    if (!body || typeof body !== "object" || Array.isArray(body)) {
        return {
            valid: false,
            errors: ["A JSON request body is required."],
        };
    }

    const { email, password } = body;

    if (typeof email !== "string" || !email.trim()) {
        errors.push("Email is required.");
    } else if (
        email.length > 254 ||
        !COLLEGE_EMAIL_REGEX.test(email.trim())
    ) {
        errors.push(
            "Only emails ending with .24@bitmesra.ac.in or .25@bitmesra.ac.in are allowed."
        );
    }

    if (typeof password !== "string" || password.length === 0) {
        errors.push("Password is required.");
    } else if (password.length > 1024) {
        errors.push("Password is too long.");
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}
