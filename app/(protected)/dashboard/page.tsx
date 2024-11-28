import { logoutAndRedirect } from '@/app/(auth)/actions';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  return (
    <>
      <div>Dashboard</div>
      <form action={logoutAndRedirect}>
        <Button type="submit">log out</Button>
      </form>
    </>
  );
}
