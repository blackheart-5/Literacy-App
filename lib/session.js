import { SignJWT, jwtVerify } from 'jose';
import { serialize } from 'cookie';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey);
}

export async function decrypt(session) {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch {
        return null;
    }
}

export async function createSession(userId) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const token = await encrypt({ userId, expiresAt });
    const cookie = serialize('session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
    return { token, cookie };
}

export function deleteSession(res) {
    const cookie = serialize('session', '', {
        httpOnly: true,
        expires: new Date(0),
        path: '/',
    });
    res.setHeader('Set-Cookie', cookie);
}
