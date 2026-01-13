'use client';

import { useParams } from "next/navigation";
import UserForm from "../../UserForm";

export default function ViewUserPage() {
  const params = useParams();
    if(!params?.id) {
      return <div>User ID is missing</div>;
    }
  return <UserForm userId={params.id as string} />;
}
