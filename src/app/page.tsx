'use client';

import { nanoid } from 'nanoid';
import type { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useCreateSpace, useFindManySpace } from '~/lib/hooks';

const Home: NextPage = () => {
    const { data: session } = useSession();
    const { mutate: createSpace } = useCreateSpace();
    const { data: spaces } = useFindManySpace({ orderBy: { createdAt: 'desc' } });

    function onCreateSpace() {
        const name = prompt('Enter a name for your space');
        if (name) {
            createSpace({
                data: {
                    name,
                    slug: nanoid(6),
                    // add the creating user as an admin member
                    members: {
                        create: {
                            user: { connect: { id: session?.user.id } },
                            role: 'ADMIN',
                        },
                    },
                },
            });
        }
    }

    return (
        <div className="container mx-auto flex justify-center">
            {session?.user ? (
                <div className="mt-8 flex w-full flex-col items-center">
                    <h1 className="text-center text-2xl">
                        Welcome {session.user.email}{' '}
                        <button
                            className="btn btn-ghost btn-xs mt-4"
                            onClick={() => signOut({ callbackUrl: '/signin' })}
                        >
                            Logout
                        </button>
                    </h1>

                    <div className="w-full p-8">
                        <h2 className="mb-8 text-xl">
                            Choose a space to start, or{' '}
                            <button className="btn btn-link p-0 text-xl" onClick={onCreateSpace}>
                                create a new one.
                            </button>
                        </h2>

                        <ul className="flex gap-4">
                            {spaces?.map((space) => (
                                <Link href={`/spaces/${space.slug}`} key={space.id}>
                                    <li className="flex h-32 w-72 items-center justify-center rounded-lg border text-2xl">
                                        {space.name}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <div>
                    Please{' '}
                    <Link href="/signin">
                        <button className="btn btn-link p-0">login</button>
                    </Link>{' '}
                    to get started
                </div>
            )}
        </div>
    );
};

export default Home;
