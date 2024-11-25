import { useLocale } from 'next-intl';
import { LanguageSwitcherSelect } from './LanguageSwitcherSelect';

export const LanguageSwitcher = () => {
    const locale = useLocale();

    return (
        <LanguageSwitcherSelect
            defaultValue={locale}
            items={[
                {
                    value: "uz",
                    label: "Uz",
                },
                {
                    value: "ru",
                    label: "Ru",
                },
                {
                    value: "en",
                    label: "En",
                }
            ]}
        />
    );
};