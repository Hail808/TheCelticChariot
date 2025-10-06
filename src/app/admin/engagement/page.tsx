import { redirect } from 'next/navigation';
import {checkForAdmin} from "@/lib/actions/auth-actions"
import AdminEngagement from "@/components/pages/admin_engagement";

const AdminEngagementPage = async () => {
  const isAdmin = await checkForAdmin()
  if (!isAdmin) {
    redirect('/login');
  }
  return <AdminEngagement />;

};

export default AdminEngagementPage;