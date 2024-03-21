'use client';

import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "@/trpc/client";
import { httpBatchLink } from "@trpc/react-query";

const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => {
    return new QueryClient();
  });
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trpc`,
          fetch: (url, options) => {
            return fetch(url, {
              ...options,
              credentials: 'include',
            });
          }
        })
      ]
    });
  });

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  )

}

export default Providers;