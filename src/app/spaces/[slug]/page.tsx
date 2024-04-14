"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  useCreateList,
  useFindManyList,
  useFindUniqueSpace,
} from "~/lib/hooks";

export default function SpaceHome() {
  const { slug } = useParams<{ slug: string }>();

  const { data: session } = useSession();

  const { data: space } = useFindUniqueSpace(
    { where: { slug } },
    { enabled: !!session?.user },
  );

  const { data: lists } = useFindManyList(
    {
      where: { space: { slug } },
      include: { owner: true },
      orderBy: { updatedAt: "desc" },
    },
    { enabled: !!session?.user },
  );

  const { mutate: createList } = useCreateList();

  function onCreateList() {
    const title = prompt("Enter a title for your list");
    if (title) {
      createList({
        data: {
          title,
          space: { connect: { id: space?.id } },
        },
      });
    }
  }

  if (!session?.user || !space || !lists) return null;

  return (
    <div className="container mx-auto mt-16">
      <h1 className="text-center text-3xl">
        Welcome to Space <span className="italic">{space.name}</span>
      </h1>
      <div className="p-8">
        <button className="btn btn-primary btn-wide" onClick={onCreateList}>
          Create a list
        </button>

        <ul className="mt-8 flex flex-wrap gap-6">
          {lists?.map((list) => (
            <Link href={`/spaces/${slug}/${list.id}`} key={list.id}>
              <li className="flex h-32 w-72 items-center justify-center rounded-lg border text-2xl">
                {list.title}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
