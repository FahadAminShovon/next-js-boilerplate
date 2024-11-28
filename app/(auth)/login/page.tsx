'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';
import { loginAction } from './action';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, {
    message: '',
  });

  return (
    <form className="space-y-4" action={formAction}>
      {JSON.stringify(state)}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" name="password" />
      </div>
      <Button type="submit" disabled={isPending}>
        Login
      </Button>
    </form>
  );
}
