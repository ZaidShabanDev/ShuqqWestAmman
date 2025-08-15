import { authConfig } from '@/lib/auth';
import Logo from '@/shared/Logo';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import CredentialsFormProps from './credentialsFormProps';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

const Page = async () => {
  const session = await getServerSession(authConfig);
  if (session) return redirect('/admin/dashboard');

  return (
    <div className="container">
      <div className="my-16 flex justify-center">
        <Logo className="w-32" />
      </div>
      <CredentialsFormProps />
    </div>
  );
};

export default Page;
