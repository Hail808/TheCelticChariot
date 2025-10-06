import { redirect } from 'next/navigation';
import {checkForAdmin} from "@/../lib/actions/auth-actions"
import AdminCatalogue from "@/components/pages/admin_catalogue";

const AdminCataloguePage = async () => {
  const isAdmin = await checkForAdmin()
  if (!isAdmin) {
    redirect('/login');
  }
  return <AdminCatalogue />;
};

export default AdminCataloguePage;