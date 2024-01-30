import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="text-red-500">
      Hello
      <UserButton />
    </div>
  );
}
