import { getSettings } from "@/lib/kv";
import SettingsEditor from "./SettingsEditor";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSettings();
  return <SettingsEditor initial={settings} />;
}
