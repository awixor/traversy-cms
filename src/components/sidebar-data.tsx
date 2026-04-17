import { getPayload } from "payload";
import configPromise from "@payload-config";
import { SidebarContent } from "./sidebar-content";

export async function SidebarData() {
  const payload = await getPayload({ config: configPromise });

  const { docs: topics } = await payload.find({
    collection: "topics",
    limit: 50,
    sort: "order",
  });

  return <SidebarContent topics={topics} />;
}
