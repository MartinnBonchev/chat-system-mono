import { useAppContext } from '@store/store';
import { useSync } from '@hooks/use-auth';
import { useNavigate } from 'react-router-dom';

import ProtectedComponentProps from './protected-component.props';

import { Circles } from 'react-loader-spinner';

// 19 minutes
const SYNC_INTERVAL = 19 * 60 * 1000;
export default function ProtectedComponent({
  children,
}: ProtectedComponentProps) {
  const [state] = useAppContext();
  const navigate = useNavigate()
  const { loading } = useSync(SYNC_INTERVAL);

  if (loading) {

    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Circles />
      </div>
    );
  }

  if (state.auth.isAuthenticated) {
    return children;
  }

  if (!state.auth.isAuthenticated) {
    navigate('/login')

    return null;
  }

  return null;
}
