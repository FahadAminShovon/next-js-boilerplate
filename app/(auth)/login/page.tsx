'use client';
import { Alert } from '@/components/custom/Alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActionState } from 'react';
import { loginAction } from './action';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, {
    message: '',
  });

  return (
    <div className="space-y-4">
      <form className="space-y-4" action={formAction}>
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
      {state.message && !state.user && (
        <Alert variant={'destructive'} title={state.message} />
      )}
    </div>
  );
}
