// hoc/withAuth.tsx
"use client";

import { useRouter } from "next/navigation";
import { ComponentType, useEffect, useState } from "react";
import { message } from "antd";
import { LocalUrl } from "@/config";
import { useSelector } from "react-redux";
import { schoolAdminStore } from "@/store/schoolAdminSlice";

// Define permission type
interface Permission {
  action: string;
  subject: string;
}

export default function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  permissions: Permission[] = [] // Provide default empty array
) {
  return function AuthenticatedComponent(props: P) {
    const router = useRouter();
    const userInfo = useSelector(schoolAdminStore);

    const [isReady, setIsReady] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      let mounted = true;

      const checkAuth = async () => {
        // Check authentication first
        if (!userInfo?.token) {
          if (mounted) {
            message.error("Please log in to continue");
            router.push(LocalUrl.LOGIN);
          }
          return;
        }

        // If no specific permissions are required, authorize access
        if (permissions.length === 0) {
          if (mounted) {
            setIsAuthorized(true);
            setIsReady(true);
          }
          return;
        }

        // TODO: Implement permission checks if needed
        // For now, we'll just authorize if token exists
        if (mounted) {
          setIsAuthorized(true);
          setIsReady(true);
        }
      };

      checkAuth();

      return () => {
        mounted = false;
      };
    }, [userInfo?.token, router]);

    // Show loading until we're ready
    if (!isReady) {
      return <div>Loading...</div>;
    }

    // Only render if authorized
    if (isAuthorized) {
      return <WrappedComponent {...props} />;
    }

    // Show loading while redirecting
    return (
      <div className="flex justify-center items-center h-screen">
        <h3 className="text-2xl font-bold text-gray-300">Redirecting...</h3>
      </div>
    );
  };
}
