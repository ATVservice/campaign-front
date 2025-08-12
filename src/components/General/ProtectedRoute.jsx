import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/StateManegment/AuthProvider';
import Spinner from './Spinner';

function ProtectedRoute() {
  const { user, loading } = useAuth();
  console.log(user, loading);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (!loading && !user) {
      navigate('/login');
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return null; // Don't render anything until navigate redirects
  }

 return (
    <main className=''>
      <Outlet />             
    </main>
)
}


export default ProtectedRoute;
