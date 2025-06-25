"use client";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center space-y-6 px-4">
        <div className="space-y-2">
          <h1 className="text-9xl font-black text-gray-900 tracking-tight">
            404
          </h1>
          <h2 className="text-2xl font-bold text-gray-700">
            Page Not Found
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            The page you're looking for doesn't exist or has
            been moved.
          </p>
        </div>

        <div className="pt-4">
          {/* <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
