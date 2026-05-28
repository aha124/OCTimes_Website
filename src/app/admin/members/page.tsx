import { getMembers } from "@/lib/kv";
import MembersEditor from "./MembersEditor";

export const dynamic = "force-dynamic";

export default async function AdminMembersPage() {
  const members = await getMembers();
  return <MembersEditor initialMembers={members} />;
}
