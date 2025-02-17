import {fetchUsers, UsersList} from "@/users";

export default async function Users () {
  const initialUsers = await fetchUsers()

  return (
      <>
            <UsersList initialUsers={initialUsers} />
      </>
  );
}
