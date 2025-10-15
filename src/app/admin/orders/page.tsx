import AdminOrders from "@/components/pages/admin_orders";
import { redirect } from 'next/navigation';
import {checkForAdmin} from "@/lib/actions/auth-actions"

const AdminOrdersPage = async () => {
  const isAdmin = await checkForAdmin()
  if (!isAdmin) {
    redirect('/login');
  }
  return <AdminOrders />;
};

export default AdminOrdersPage;