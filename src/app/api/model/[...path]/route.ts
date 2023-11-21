import { enhance } from '@zenstackhq/runtime';
import { NextRequestHandler } from '@zenstackhq/server/next';
import { getServerSession } from 'next-auth';
import { authOptions } from '~/server/auth';
import { db } from '~/server/db';

async function getPrisma() {
    const session = await getServerSession(authOptions);
    return enhance(db, { user: session?.user });
}

const handler = NextRequestHandler({ getPrisma, useAppDir: true });

export { handler as DELETE, handler as GET, handler as PATCH, handler as POST, handler as PUT };
