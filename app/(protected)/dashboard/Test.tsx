'use client';
import { useUser } from '@/app/(auth)/provider/AuthProvider';
import React from 'react';

const Test = () => {
  const user = useUser();
  return <div>{JSON.stringify(user)}</div>;
};

export default Test;
