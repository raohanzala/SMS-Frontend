import Layout from './Layout';
import { adminNav } from '@/utils/navigationConfig';

const AdminLayout = () => {
  return (
    <Layout navigation={adminNav} />
  );
};

export default AdminLayout; 