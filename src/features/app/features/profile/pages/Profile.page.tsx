import {Button} from "@/components/atoms";
import useSignOut from "../hooks/useSignOut";

export default function ProfilePage() {
  const {signOut} = useSignOut();
  return (
    <div>
      <Button onClick={signOut}>Sign Out</Button>
    </div>
  );
}
