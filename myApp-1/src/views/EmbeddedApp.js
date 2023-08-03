import { useState } from 'react';
import Loading from '../components/Loading';

const embeddedAppURL = 'http://localhost:4000/';

export const EmbeddedApp = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loading />}
      <iframe
        title='EmbeddedApp'
        src={embeddedAppURL}
        width='100%'
        height='100%'
        style={{ border: '0px' }}
        className={{ invisible: loading }}
        onLoad={() => setLoading(false)}
      />
    </>
  );
};
