
import AdminSales from "@/components/pages/admin_sales";
import { redirect } from 'next/navigation';
import {checkForAdmin} from "@/../lib/actions/auth-actions"

const AdminSalesPage = async() => {
  
    const isAdmin = await checkForAdmin()
    if (!isAdmin) {
      redirect('/login');
    }
  return <AdminSales />;
};

export default AdminSalesPage;