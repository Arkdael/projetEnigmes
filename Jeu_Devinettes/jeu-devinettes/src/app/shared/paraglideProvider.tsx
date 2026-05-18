"use client";

import { useRef } from "react";
import { overwriteGetLocale, type Locale, assertIsLocale } from "../../paraglide/runtime";

/**
 * Workaround for paraglide-js hydration mismatch in Next.js.
 *
 * In Next.js, server and client components get separate module instances
 * of @/paraglide/runtime. The layout (server component) calls
 * overwriteGetLocale() on its instance, but that doesn't affect the
 * client instance — so m.xxx() in client components returns the base
 * locale during SSR, causing hydration mismatches.
 *
 * This provider bridges the gap by calling overwriteGetLocale() on the
 * CLIENT module instance with the locale passed from the server layout.
 * Place it as the outermost wrapper in your layout's <body>.
 *
 * See: https://github.com/opral/paraglide-js/issues/524
 *
 * @example
 * // app/layout.tsx (server component)
 * import { ParaglideProvider } from '@/components/ParaglideProvider'
 * import { getLocale } from '@/paraglide/runtime'
 *
 * export default async function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <ParaglideProvider locale={getLocale()}>
 *           {children}
 *         </ParaglideProvider>
 *       </body>
 *     </html>
 *   )
 * }
 */
export function ParaglideProvider({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const initialized = useRef(false);

  if (!initialized.current) {
    overwriteGetLocale(() => assertIsLocale(locale as Locale));
    initialized.current = true;
  }

  return children;
}