
import AdminHome from "../../components/pages/admin_home";
import { redirect } from 'next/navigation';
import {checkForAdmin} from "@/../lib/actions/auth-actions"

const AdminHomePage = async () => {
 
  const isAdmin = await checkForAdmin()
  if (!isAdmin) {
    redirect('/login');
  }
  return <AdminHome/>;
};

export default AdminHomePage;