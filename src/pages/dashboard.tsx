import { destroyCookie } from 'nookies';
import { useContext, useEffect } from 'react';
import { Can } from '../components/Can';
import { AuthContext } from '../contexts/AuthContexts';
import { useCan } from '../hooks/useCan';
import { setupAPIClient } from '../services/api';
import { api } from '../services/apiClient';
import { AuthTokenError } from '../services/errors/AuthTokenError';
import { withSSRAuth } from '../utils/withSSRAuth';

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext);

  useEffect(() => {
    api
      .get('/me')
      .then((response: any) => console.log(response))
      .catch((error: any) => console.log(error));
  }, []);

  return (
    <>
      <h1>Dashboard {user?.email}</h1>

      <button onClick={signOut}>Sing out</button>
      <Can permissions={['metrics.list']}>
        <h1>Metricas</h1>
      </Can>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get('/me');

  console.log(response.data);

  return {
    props: {},
  };
});
