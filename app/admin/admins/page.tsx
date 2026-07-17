"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { AddAdminModal } from "@/components/admin/AddAdminModal";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminsTable } from "@/components/admin/AdminsTable";
import { UpdatePasswordForm } from "@/components/admin/UpdatePasswordForm";
import { UpdateProfileForm } from "@/components/admin/UpdateProfileForm";
import { fetchAdmins } from "@/store/features/admins/adminsSlice";
import { hydrateAuth } from "@/store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function AdminsPage() {
  const dispatch = useAppDispatch();
  const { hydrated } = useAppSelector((state) => state.auth);
  const pageSize = useAppSelector((state) => state.admins.pageSize);

  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!hydrated) return;

    void dispatch(fetchAdmins({ pageNumber: 1, pageSize }));
  }, [dispatch, hydrated, pageSize]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8fb] text-transfer-dark">
        <Loader2 className="mr-3 h-5 w-5 animate-spin text-transfer-green" />
        Preparing admins...
      </div>
    );
  }

  return (
    <AdminLayout>
      <AdminNotice />
      <AdminsTable />
      <div className="grid gap-6 xl:grid-cols-2">
        <UpdateProfileForm />
        <UpdatePasswordForm />
      </div>
      <AddAdminModal />
    </AdminLayout>
  );
}
