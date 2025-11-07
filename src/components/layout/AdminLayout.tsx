import { useSelector } from 'react-redux';
import Layout from './Layout';
import { adminNav } from '@/utils/navigationConfig';

const AdminLayout = () => {

  const { user } = useSelector((state) => state.auth)

  return (
    <Layout user={user} navigation={adminNav} />
  );
};

export default AdminLayout; 