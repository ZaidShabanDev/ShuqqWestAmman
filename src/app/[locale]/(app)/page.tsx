import { useTranslations } from 'next-intl';

const Home = () => {
  const t = useTranslations();
  return (
    <div>
      <h1>{t('hello_world')}</h1>
      <p>{t('greeting')}</p>
    </div>
  );
};

export default Home;
