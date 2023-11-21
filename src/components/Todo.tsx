import type { Todo } from '@prisma/client';
import { useDeleteTodo, useUpdateTodo } from '~/lib/hooks';

type Props = {
    value: Todo;
    optimistic?: boolean;
};

export default function TodoComponent({ value, optimistic }: Props) {
    const update = useUpdateTodo(undefined, true, true); // optimistic update
    const del = useDeleteTodo(undefined, true, true); // optimistic update

    function onDelete() {
        del.mutate({ where: { id: value.id } });
    }

    function onToggleCompleted(completed: boolean) {
        if (completed === !!value.completedAt) {
            return;
        }
        update.mutate({
            where: { id: value.id },
            data: { completedAt: completed ? new Date() : null },
        });
    }

    return (
        <div className="flex w-96 flex-col items-center rounded-lg border px-8 py-4">
            <div className="flex w-full justify-between">
                <h3
                    className={`flex items-center text-xl
                        ${value.completedAt ? 'italic text-gray-400 line-through' : 'text-gray-700'}
                    }`}
                >
                    {value.title}
                    {optimistic && <span className="loading loading-spinner loading-sm ml-1"></span>}
                </h3>
                <div className="flex">
                    <input
                        type="checkbox"
                        className="checkbox mr-2"
                        checked={!!value.completedAt}
                        onChange={(e) => onToggleCompleted(e.currentTarget.checked)}
                    />
                    <button className="btn btn-ghost btn-xs" onClick={onDelete} disabled={optimistic}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
