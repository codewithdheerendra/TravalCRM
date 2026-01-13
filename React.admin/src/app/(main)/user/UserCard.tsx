"use client";

import { Delete, Edit, MoreVert, Visibility } from "@mui/icons-material";
import { Avatar, Paper, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { AppMenu } from "@/components/ui/AppMenu";
import { DeleteDialog } from "@/components/ui/DeleteDialog";
import { useState } from "react";

export interface UserCardActions {
  viewPath?: string;
  editPath?: string;
  canDelete?: boolean;
}

export interface User extends UserCardActions {
  id: number;
  name: string;
  email: string;
  phone: string;
  userType: string;
  totalBookings: number;
  lastLogin: string;
  status: "Active" | "Inactive" | "Pending";
  avatar: string;
}

export default function UserCard({ user }: { user: User }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const statusColors: Record<User["status"], string> = {
    Active: "text-green-600",
    Inactive: "text-red-600",
    Pending: "text-yellow-500",
  };

  const statusDotColors: Record<User["status"], string> = {
    Active: "bg-green-500",
    Inactive: "bg-red-500",
    Pending: "bg-yellow-500",
  };

  const handleDelete = () => {
    console.log("Deleting user:", user.id);
  };

  return (
    <Paper variant="outlined" color="secondary" component={"article"} sx={{borderColor: "#E5E5E5", backgroundColor: "#fff", boxShadow: "0 8px 16px #00000014"}} className="rounded-xl mb-2">
      <div className="p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-1/6 items-center justify-between w-full lg:w-auto gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <Avatar src={user.avatar} alt={user.name} className="w-12 h-12" />
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
          </div>

          {/* Mobile: Direct buttons */}
          <div className="flex gap-2 lg:hidden">
            {user.viewPath && (
              <IconButton size="small" onClick={() => router.push(user.viewPath!)}>
                <Visibility fontSize="small" />
              </IconButton>
            )}
            {user.editPath && (
              <IconButton size="small" onClick={() => router.push(user.editPath!)}>
                <Edit fontSize="small" />
              </IconButton>
            )}
            {user.canDelete && (
              <IconButton size="small" onClick={handleDelete}>
                <Delete fontSize="small" className="text-red-500" />
              </IconButton>
            )}
          </div>
        </div>

        <div className="grid grid-cols-5 flex-2/3 text-sm text-gray-700">
          <p className="px-3">
            <span className="text-gray-500">Phone</span><br/>
            <strong>{user.phone}</strong>
          </p>
          <p className="px-3">
            <span className="text-gray-500">User Type</span><br/>
            <strong>{user.userType}</strong>
          </p>
          <p className="px-3">
            <span className="text-gray-500">Bookings</span><br/>
            <strong>{user.totalBookings}</strong>
          </p>
          <p className="px-3">
            <span className="text-gray-500">Last Login</span><br/>
            <strong>{user.lastLogin}</strong>
          </p>
          <div className="flex items-center justify-end gap-2 ps-2">
            <p className="flex-1">
              <span className="text-gray-500">Status</span><br/>
              <span className={`w-2 h-2 rounded-full inline-block mr-2 ${statusDotColors[user.status]}`}></span>
              <span className={`font-semibold ${statusColors[user.status]}`}>{user.status}</span>
            </p>
            {/* Desktop: MoreVert menu */}
            {(user.viewPath || user.editPath || user.canDelete) && (
              <div className="hidden lg:block">
                <AppMenu menuId={'menu_'+user.id}
                  trigger={<IconButton aria-label="Menu"><MoreVert /></IconButton>}
                  options={[
                    {label: "View", icon: <Visibility fontSize="small"/>, onClick() { router.push(user.viewPath!)},},
                    {label: "Edit", icon: <Edit fontSize="small"/>, onClick() { router.push(user.editPath!)},},
                    {label: "Delete", icon: <Delete fontSize="small"/>, onClick() { setIsOpen(true)},},
                  ]}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <DeleteDialog isOpen={isOpen} onAction={(val) => {
        setIsOpen(false);
        if(val === 'yes') handleDelete();
      }} />
    </Paper>
  );
}
