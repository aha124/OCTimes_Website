import { getAdminEmails } from "@/lib/kv";
import UsersEditor from "./UsersEditor";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const emails = await getAdminEmails();
  return <UsersEditor initialEmails={emails} />;
}
