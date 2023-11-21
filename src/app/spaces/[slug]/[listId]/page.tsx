'use client';

import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import TodoComponent from '~/components/Todo';
import { useCreateTodo, useFindManyTodo, useFindUniqueList } from '~/lib/hooks';

export default function TodoList() {
    const { listId } = useParams<{ listId: string }>();

    const { data: session } = useSession();

    const { data: list } = useFindUniqueList(
        {
            where: { id: listId },
        },
        { enabled: !!session?.user },
    );

    const { mutate: create } = useCreateTodo(undefined, true, true); // optimistic update
    const { data: todos } = useFindManyTodo(
        {
            where: { listId },
            orderBy: { createdAt: 'desc' as const },
        },
        { enabled: !!session?.user },
    );

    const [title, setTitle] = useState('');

    function onCreate() {
        create({
            data: {
                title,
                owner: { connect: { id: session?.user.id } },
                list: { connect: { id: listId } },
            },
        });
        setTitle('');
    }

    if (!session?.user || !list) {
        return <></>;
    }

    return (
        <div>
            <div className="container mx-auto flex w-full flex-col items-center py-12">
                <h1 className="mb-4 text-2xl font-semibold">{list.title}</h1>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Type a title and press enter"
                        className="input input-bordered mt-2 w-72 max-w-xs"
                        value={title}
                        autoFocus
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                onCreate();
                            }
                        }}
                        onChange={(e) => {
                            setTitle(e.currentTarget.value);
                        }}
                    />
                </div>
                <ul className="flex w-auto flex-col space-y-4 py-8">
                    {todos?.map((todo) => <TodoComponent key={todo.id} value={todo} optimistic={todo.$optimistic} />)}
                </ul>
            </div>
        </div>
    );
}
