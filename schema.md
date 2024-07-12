# My Awesome Todo App
    
A multi-tenant Todo application built with ZenStack.
    
- [Space](#Space)
- [SpaceUser](#SpaceUser)
- [User](#User)
- [List](#List)
- [Todo](#Todo)
    
## Space

- CREATE
  - ❌ auth() == null
  - ✅ true
- READ
  - ❌ auth() == null
  - ✅ members?[user == auth()]
- UPDATE
  - ❌ auth() == null
  - ✅ members?[user == auth() && role == 'ADMIN']
- DELETE
  - ❌ auth() == null
  - ✅ members?[user == auth() && role == 'ADMIN']

## SpaceUser

- CREATE
  - ❌ auth() == null
  - ✅ space.owner == auth() || space.members?[user == auth() && role == 'ADMIN']
- READ
  - ❌ auth() == null
  - ✅ space.owner == auth() || space.members?[user == auth() && role == 'ADMIN']
  - ✅ space.members?[user == auth()]
- UPDATE
  - ❌ auth() == null
  - ✅ space.owner == auth() || space.members?[user == auth() && role == 'ADMIN']
- DELETE
  - ❌ auth() == null
  - ✅ space.owner == auth() || space.members?[user == auth() && role == 'ADMIN']

## User

- CREATE
  - ✅ true
  - ✅ auth() == this
- READ
  - ✅ auth() == this
  - ✅ spaces?[space.members?[user == auth()]]
- UPDATE
  - ✅ auth() == this
- DELETE
  - ✅ auth() == this

## List

- CREATE
  - ❌ auth() == null
  - ✅ owner == auth() && space.members?[user == auth()]
- READ
  - ❌ auth() == null
  - ✅ owner == auth() || (space.members?[user == auth()] && !private)
- UPDATE
  - ❌ auth() == null
  - ✅ owner == auth() && space.members?[user == auth()]
- DELETE
  - ❌ auth() == null
  - ✅ owner == auth()

## Todo

- CREATE
  - ✅ check(list, 'read')
- READ
  - ✅ check(list, 'read')
- UPDATE
  - ✅ check(list, 'read')
- DELETE
  - ✅ check(list, 'read')
    