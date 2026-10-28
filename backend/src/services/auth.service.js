import bcrypt from "bcryptjs";
import {
    findAdminByEmail,
    findActiveAdminById,
} from "../repositories/admin.repository.js";
export async function authenticateAdmin(email, password) {
    const admin = await findAdminByEmail(email);

    if (!admin || !admin.is_active) {
        return null;
    }

    const passwordMatches = await bcrypt.compare(
        password,
        admin.password_hash
    );

    if (!passwordMatches) {
        return null;
    }
    return {
        id: admin.id,
        name: admin.name,
        email: admin.college_email,
        role: admin.role,
    };
}

export async function getAuthenticatedAdmin(adminId) {
    if (!adminId) {
        return null;
    }

    const admin = await findActiveAdminById(adminId);

    if (!admin) {
        return null;
    }

    return {
        id: admin.id,
        name: admin.name,
        email: admin.college_email,
        role: admin.role,
    };
}
