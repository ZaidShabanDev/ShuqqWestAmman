import { notFound } from 'next/navigation';

export default function CatchAll(): void {
  // This function is used to handle catch-all routes
  notFound();
}
