import '~/styles/globals.css';

import { Inter } from 'next/font/google';
import QueryClientProvider from '~/components/QueryClientProvider';
import NextAuthSessionProvider from '~/components/SessionProvider';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
});

export const metadata = {
    title: 'Create T3 App',
    description: 'Generated by create-t3-app',
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`font-sans ${inter.variable}`}>
                <QueryClientProvider>
                    <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
                </QueryClientProvider>
            </body>
        </html>
    );
}
