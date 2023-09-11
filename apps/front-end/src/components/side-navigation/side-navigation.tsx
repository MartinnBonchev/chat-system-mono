import { useLogout } from '@root/hooks/use-auth';
import { useNavigate } from 'react-router-dom';

export default function SideNavigation() {
  const [, logout] = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    navigate('/login');
  };

  return (
    <div className="h-screen w-64 bg-slate-300">
      <button
        type="button"
        className="absolute bottom-4 left-2 border-solid border-slate-500 border-2 rounded-md bg-slate-400 py-2 px-4 text-white text-lg"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
