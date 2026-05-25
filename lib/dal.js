import { parse } from 'cookie';
import { decrypt } from '@/lib/session';
import dbConnect from '@/utils/database';

export async function verifySession(req) {
    const cookies = parse(req.headers.cookie || '');
    const sessionCookie = cookies.session;

    if (!sessionCookie) {
        return null;
    }

    const payload = await decrypt(sessionCookie);

    if (!payload?.userId) {
        return null;
    }

    return { isAuth: true, userId: payload.userId };
}

export async function getUser(req) {
    const session = await verifySession(req);

    if (!session) {
        return null;
    }

    try {
        await dbConnect();
        const User = (await import('@/models/User')).default;
        return User.findById(session.userId).lean();
    } catch (error) {
        console.log('failed to get user', error);
        return null;
    }
}
