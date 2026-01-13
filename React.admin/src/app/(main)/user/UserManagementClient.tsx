"use client";

import {
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Stack,
  TablePagination,
  Box,
} from "@mui/material";
import { useState } from "react";
import { Search } from "@mui/icons-material";
import UserCard, { User } from "./UserCard";
import { CiFilter } from "react-icons/ci";
import { BiPlus } from "react-icons/bi";

export function UserManagementClient({ users }: { users: User[] }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  // const totalPages = Math.ceil(users.length / rowsPerPage);
  const startIndex = page * rowsPerPage;
  const displayedUsers = users.slice(startIndex, startIndex + rowsPerPage);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => {
    event?.stopPropagation();
    setPage(page);
  };
  const handleChangeRowsPerPage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(Number(e.target.value));
    setPage(0);
  };

  return (
    <>
      <Stack
        direction={"row"}
        px={2}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={2}
        component={"header"}
      >
        <TextField
          placeholder="Search User"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "1.5rem",
              fontSize: "0.875rem",
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />

        <div className="filterSorting flex gap-3 items-center">
          <IconButton aria-label="Sort users">
            <CiFilter className="text-[var(--text-primary)]" />
          </IconButton>
          <Button
            LinkComponent={"a"}
            href="/user/create-user"
            variant="contained"
            color="primary"
            startIcon={<BiPlus />}
          >
            Add New User
          </Button>
        </div>
      </Stack>

      <Box component={"section"} px={2} className="flex-1 overflow-auto">
        {displayedUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </Box>

      <div className="flex justify-between items-center mt-1 text-sm bg-white text-gray-600 sticky bottom-0 backdrop-blur-2xl">
        <p className="ps-3">
          Showing {startIndex + 1} to {startIndex + displayedUsers.length} of{" "}
          {users.length}
        </p>
        <TablePagination
          component="div"
          labelRowsPerPage="Result per page:"
          count={users.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
}
