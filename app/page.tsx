import { Home } from "@/components/Home";
import { getReadMinutes } from "@/lib/content";

export default function Page() {
  return <Home minutes={getReadMinutes()} />;
}
