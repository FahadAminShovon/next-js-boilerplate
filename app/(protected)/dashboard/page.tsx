import { logOut } from '@/app/(auth)/actions';
import { Button } from '@/components/ui/button';
import Test from './Test';

export default function DashboardPage() {
  return (
    <>
      <div>Dashboard</div>
      <form action={logOut}>
        <Button type="submit">log out</Button>
      </form>
      <Test />
    </>
  );
}
