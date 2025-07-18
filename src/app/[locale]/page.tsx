import SwitchDarkMode from '@/shared/SwitchDarkMode';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();

  const renderSwitchDarkMode = () => {
    return (
      <div className="mt-4">
        <span className="text-sm font-medium">Dark mode</span>
        <div className="mt-1.5">
          <SwitchDarkMode />
        </div>
      </div>
    );
  };

  return (
    <div>
      {t('hello_world')} {renderSwitchDarkMode()}
    </div>
  );
}
