import { authConfig } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .middleware(async () => {
      const session = await getServerSession(authConfig);
      if (!session) throw new UploadThingError('Unauthorized');

      return { userId: session?.user.email };
    })
    .onUploadComplete(async ({ metadata }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
