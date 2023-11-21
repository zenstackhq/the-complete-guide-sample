/* eslint-disable */
const metadata = {
    fields: {
        space: {
            id: {
                name: 'id',
                type: 'String',
                isId: true,
                attributes: [{ name: '@default', args: [] }],
            },
            createdAt: {
                name: 'createdAt',
                type: 'DateTime',
                attributes: [{ name: '@default', args: [] }],
            },
            updatedAt: {
                name: 'updatedAt',
                type: 'DateTime',
                attributes: [{ name: '@updatedAt', args: [] }],
            },
            name: {
                name: 'name',
                type: 'String',
            },
            slug: {
                name: 'slug',
                type: 'String',
            },
            members: {
                name: 'members',
                type: 'SpaceUser',
                isDataModel: true,
                isArray: true,
                backLink: 'space',
            },
            lists: {
                name: 'lists',
                type: 'List',
                isDataModel: true,
                isArray: true,
                backLink: 'space',
            },
            owner: {
                name: 'owner',
                type: 'User',
                isDataModel: true,
                backLink: 'ownedSpaces',
                isRelationOwner: true,
                foreignKeyMapping: { id: 'ownerId' },
            },
            ownerId: {
                name: 'ownerId',
                type: 'String',
                isForeignKey: true,
            },
        },
        spaceUser: {
            id: {
                name: 'id',
                type: 'String',
                isId: true,
                attributes: [{ name: '@default', args: [] }],
            },
            createdAt: {
                name: 'createdAt',
                type: 'DateTime',
                attributes: [{ name: '@default', args: [] }],
            },
            updatedAt: {
                name: 'updatedAt',
                type: 'DateTime',
                attributes: [{ name: '@updatedAt', args: [] }],
            },
            space: {
                name: 'space',
                type: 'Space',
                isDataModel: true,
                backLink: 'members',
                isRelationOwner: true,
                foreignKeyMapping: { id: 'spaceId' },
            },
            spaceId: {
                name: 'spaceId',
                type: 'String',
                isForeignKey: true,
            },
            user: {
                name: 'user',
                type: 'User',
                isDataModel: true,
                backLink: 'spaces',
                isRelationOwner: true,
                foreignKeyMapping: { id: 'userId' },
            },
            userId: {
                name: 'userId',
                type: 'String',
                isForeignKey: true,
            },
            role: {
                name: 'role',
                type: 'String',
                attributes: [{ name: '@default', args: [{ value: 'USER' }] }],
            },
        },
        user: {
            id: {
                name: 'id',
                type: 'String',
                isId: true,
                attributes: [{ name: '@default', args: [] }],
            },
            createdAt: {
                name: 'createdAt',
                type: 'DateTime',
                attributes: [{ name: '@default', args: [] }],
            },
            updatedAt: {
                name: 'updatedAt',
                type: 'DateTime',
                attributes: [{ name: '@updatedAt', args: [] }],
            },
            email: {
                name: 'email',
                type: 'String',
            },
            password: {
                name: 'password',
                type: 'String',
                isOptional: true,
            },
            name: {
                name: 'name',
                type: 'String',
                isOptional: true,
            },
            spaces: {
                name: 'spaces',
                type: 'SpaceUser',
                isDataModel: true,
                isArray: true,
                backLink: 'user',
            },
            lists: {
                name: 'lists',
                type: 'List',
                isDataModel: true,
                isArray: true,
                backLink: 'owner',
            },
            todos: {
                name: 'todos',
                type: 'Todo',
                isDataModel: true,
                isArray: true,
                backLink: 'owner',
            },
            ownedSpaces: {
                name: 'ownedSpaces',
                type: 'Space',
                isDataModel: true,
                isArray: true,
                backLink: 'owner',
            },
        },
        list: {
            id: {
                name: 'id',
                type: 'String',
                isId: true,
                attributes: [{ name: '@default', args: [] }],
            },
            createdAt: {
                name: 'createdAt',
                type: 'DateTime',
                attributes: [{ name: '@default', args: [] }],
            },
            updatedAt: {
                name: 'updatedAt',
                type: 'DateTime',
                attributes: [{ name: '@updatedAt', args: [] }],
            },
            space: {
                name: 'space',
                type: 'Space',
                isDataModel: true,
                backLink: 'lists',
                isRelationOwner: true,
                foreignKeyMapping: { id: 'spaceId' },
            },
            spaceId: {
                name: 'spaceId',
                type: 'String',
                isForeignKey: true,
            },
            owner: {
                name: 'owner',
                type: 'User',
                isDataModel: true,
                backLink: 'lists',
                isRelationOwner: true,
                foreignKeyMapping: { id: 'ownerId' },
            },
            ownerId: {
                name: 'ownerId',
                type: 'String',
                isForeignKey: true,
            },
            title: {
                name: 'title',
                type: 'String',
            },
            private: {
                name: 'private',
                type: 'Boolean',
                attributes: [{ name: '@default', args: [{ value: false }] }],
            },
            todos: {
                name: 'todos',
                type: 'Todo',
                isDataModel: true,
                isArray: true,
                backLink: 'list',
            },
        },
        todo: {
            id: {
                name: 'id',
                type: 'String',
                isId: true,
                attributes: [{ name: '@default', args: [] }],
            },
            createdAt: {
                name: 'createdAt',
                type: 'DateTime',
                attributes: [{ name: '@default', args: [] }],
            },
            updatedAt: {
                name: 'updatedAt',
                type: 'DateTime',
                attributes: [{ name: '@updatedAt', args: [] }],
            },
            owner: {
                name: 'owner',
                type: 'User',
                isDataModel: true,
                backLink: 'todos',
                isRelationOwner: true,
                foreignKeyMapping: { id: 'ownerId' },
            },
            ownerId: {
                name: 'ownerId',
                type: 'String',
                isForeignKey: true,
            },
            list: {
                name: 'list',
                type: 'List',
                isDataModel: true,
                backLink: 'todos',
                isRelationOwner: true,
                foreignKeyMapping: { id: 'listId' },
            },
            listId: {
                name: 'listId',
                type: 'String',
                isForeignKey: true,
            },
            title: {
                name: 'title',
                type: 'String',
            },
            completedAt: {
                name: 'completedAt',
                type: 'DateTime',
                isOptional: true,
            },
        },
    },
    uniqueConstraints: {
        space: {
            id: {
                name: 'id',
                fields: ['id'],
            },
            slug: {
                name: 'slug',
                fields: ['slug'],
            },
        },
        spaceUser: {
            userId_spaceId: {
                name: 'userId_spaceId',
                fields: ['userId', 'spaceId'],
            },
            id: {
                name: 'id',
                fields: ['id'],
            },
        },
        user: {
            id: {
                name: 'id',
                fields: ['id'],
            },
            email: {
                name: 'email',
                fields: ['email'],
            },
        },
        list: {
            id: {
                name: 'id',
                fields: ['id'],
            },
        },
        todo: {
            id: {
                name: 'id',
                fields: ['id'],
            },
        },
    },
    deleteCascade: {
        space: ['SpaceUser', 'List'],
        user: ['Space', 'SpaceUser', 'List', 'Todo'],
        list: ['Todo'],
    },
    authModel: 'User',
};
export default metadata;
