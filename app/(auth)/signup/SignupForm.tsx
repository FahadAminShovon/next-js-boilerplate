'use client';
import { FormInput } from '@/components/hook-form-components';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { type InsertUserSchemaType, insertUserSchema } from '@/db/schema/user';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useActionState, useRef, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { signupAction } from './actions';

const SignupForm = () => {
  const [state, formAction] = useActionState(signupAction, { message: '' });
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<InsertUserSchemaType>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = async (data: InsertUserSchemaType) => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('confirmPassword', data.confirmPassword);
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    startTransition(() => formAction(formData));
  };

  return (
    <Form {...form}>
      <div>{state.message}</div>
      <form
        ref={formRef}
        className="space-y-8"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormInput control={form.control} name="username" label="Username" />
        <FormInput control={form.control} name="firstName" label="First Name" />
        <FormInput control={form.control} name="lastName" label="Last Name" />
        <FormInput control={form.control} name="email" label="Email" />
        <FormInput control={form.control} name="password" label="Password" />
        <FormInput
          control={form.control}
          name="confirmPassword"
          label="Confirm Password"
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </Form>
  );
};

export default SignupForm;
