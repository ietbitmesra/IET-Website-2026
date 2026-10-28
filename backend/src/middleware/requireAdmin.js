import { findActiveAdminById } from "../repositories/admin.repository.js";
export async function requireAdmin(req, res, next) {
    try {
        const adminId = req.session?.adminId;
        if (!adminId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
        }
        const admin = await findActiveAdminById(adminId);
        if (!admin) {
            return req.session.destroy((error) => {
                if (error) return next(error);

                res.clearCookie("connect.sid", {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.COOKIE_SAME_SITE || "lax",
                    path: "/",
                });

                return res.status(401).json({
                    success: false,
                    message: "Authentication required.",
                });
            });
        }

        if (admin.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: "Access forbidden. Admin role required.",
            });
        }

        req.admin = {
            id: admin.id,
            name: admin.name,
            email: admin.college_email,
            role: admin.role,
        };
        return next();
    } catch (error) {
        return next(error);
    }
}
