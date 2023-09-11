import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProtectedComponent from '@components/protected-component';
import Index from '@pages/index';
import Login from './login';
import Register from './register';
import SideNavigation from '@root/components/side-navigation/side-navigation';

export default function App() {
  return (
    <div className="flex flex-row">
      <BrowserRouter>
        {window.location.pathname !== '/login' &&
          window.location.pathname !== '/register' && <SideNavigation />}

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedComponent>
                <Index />
              </ProtectedComponent>
            }
          />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
