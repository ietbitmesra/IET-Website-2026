
CREATE TABLE IF NOT EXISTS public.admins (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    college_email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role VARCHAR(30) NOT NULL DEFAULT 'admin',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT admins_role_check
        CHECK (role = 'admin'),

    CONSTRAINT admins_email_check
        CHECK (
            college_email = LOWER(college_email)
            AND college_email LIKE '%@bitmesra.ac.in'
        )
);

CREATE TABLE IF NOT EXISTS public.admin_sessions (
    sid VARCHAR NOT NULL PRIMARY KEY,
    sess JSON NOT NULL,
    expire TIMESTAMP(6) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_admin_sessions_expire
    ON public.admin_sessions (expire);
