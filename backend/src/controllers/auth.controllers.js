import { validateLoginInput } from "../validators/auth.validator.js";
import {
    authenticateAdmin,
    getAuthenticatedAdmin,
} from "../services/auth.service.js";

export async function login(req, res, next) {
    try {
        const validation = validateLoginInput(req.body);
        if (!validation.valid) {
            return res.status(400).json({
                success: false,
                message: validation.errors[0],
                errors: validation.errors,
            });
        }

        const { email, password } = req.body;
        const normalizedEmail = email.trim().toLowerCase();

        const admin = await authenticateAdmin(normalizedEmail, password);

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        req.session.regenerate((error) => {
            if (error) return next(error);
            req.session.adminId = admin.id;
            req.session.save((saveError) => {
                if (saveError) return next(saveError);
                return res.status(200).json({
                    success: true,
                    message: "Login successful.",
                    admin: {
                        id: admin.id,
                        name: admin.name,
                        email: admin.email || admin.college_email,
                        role: admin.role,
                    },
                });
            });
        });
    } catch (error) {
        next(error);
    }
}

export async function logout(req, res, next) {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.COOKIE_SAME_SITE || "lax",
        path: "/",
    };

    if (!req.session) {
        res.clearCookie("connect.sid", cookieOptions);
        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    }

    req.session.destroy((error) => {
        if (error) return next(error);
        res.clearCookie("connect.sid", cookieOptions);
        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    });
}

export async function getCurrentAdmin(req, res, next) {
    try {
        if (req.admin) {
            return res.status(200).json({
                success: true,
                admin: req.admin,
            });
        }

        const adminId = req.session?.adminId;
        if (!adminId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
        }
        const admin = await getAuthenticatedAdmin(adminId);
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
        }
        return res.status(200).json({
            success: true,
            admin: {
                id: admin.id,
                name: admin.name,
                email: admin.college_email,
                role: admin.role,
            },
        });
    } catch (error) {
        next(error);
    }
}
