export interface RootLayoutProps {
    children: React.ReactNode;
};

export interface ProviderProps {
    children: React.ReactNode;
};

export interface LanguageSwitcherSelectProps {
    defaultValue: string;
    items: Array<{ value: string; label: string }>;
};