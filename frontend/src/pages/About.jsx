import { Button, Result } from 'antd';

import useLanguage from '@/locale/useLanguage';

const About = () => {
  const translate = useLanguage();
  return (
    <Result
      status="info"
      title={'Recamadas'}
      subTitle={translate('All in Recamadas custom Management system')}
      extra={
        <>
          <h1>Hallloooo World!</h1>
        </>
      }
    />
  );
};

export default About;
