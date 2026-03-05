import React from 'react';
import { DashboardSidebar } from './Sidebar';
import { LanguageProvider } from '@/lib/language-context';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <LanguageProvider>
            <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-page-bg)' }}>
                <DashboardSidebar />
                <main style={{ flex: 1, padding: '32px', marginLeft: '0px', transition: 'margin 0.3s ease' }}>
                    <div className="dashboard-content" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        {children}
                    </div>
                </main>
                <style dangerouslySetInnerHTML={{
                    __html: `
        @media (min-width: 1024px) { main { margin-left: 256px !important; } }
        @media (max-width: 1023px) { main { padding-top: 80px !important; padding-left: 16px !important; padding-right: 16px !important; overflow-x: hidden !important; } .dashboard-content { overflow-x: hidden !important; max-width: 100% !important; } }
        @media (max-width: 480px) { main { padding: 70px 12px 24px !important; overflow-x: hidden !important; } body { overflow-x: hidden !important; } }
      `}} />
            </div>
        </LanguageProvider>
    );
}
