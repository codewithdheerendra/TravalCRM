import { User } from "./UserCard";
import { UserManagementClient } from "./UserManagementClient";

async function getUsers(): Promise<User[]> {
  return Array.from({ length: 20 }, (_, i) => {
    const id = i + 1;
    return {
      id,
      name: `User ${id}`,
      email: `user${id}@example.com`,
      phone: "+1 234 567 890",
      userType: id % 2 === 0 ? "B2C (Individual)" : "B2B (Agent)",
      totalBookings: 12 + i,
      lastLogin: `${(i % 5) + 1} days ago`,
      status: (id % 3 === 0
        ? "Active"
        : id % 3 === 1
        ? "Inactive"
        : "Pending") as "Active" | "Inactive" | "Pending",
      avatar: `https://randomuser.me/api/portraits/${
        id % 2 === 0 ? "men" : "women"
      }/${30 + i}.jpg`,

      // Actions
      viewPath: `/user/user-details/${id}`,
      editPath: `/user/edit/${id}`,
      canDelete: id % 2 === 0, // ✅ only even IDs deletable
    };
  });
}

export default async function Page() {
  const users = await getUsers();
  return <UserManagementClient users={users} />;
}
