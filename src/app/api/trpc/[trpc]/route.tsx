import { appRouter } from '@/trpc';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

// that's the demo in nextjs
// const handler = async (req: Request) => {
//   console.log('from nextjs route');
//   await fetchRequestHandler({
//     endpoint: '/api/trpc',
//     req,
//     router: appRouter,
//     // @ts-expect-error
//     createContext: () => ({}),
//   });
// }

// export {
//   handler as GET, handler as POST,
// };