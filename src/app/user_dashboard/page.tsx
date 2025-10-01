import { headers } from 'next/headers';
import { auth } from '../../../lib/auth';
import UserDashboard from '../../components/pages/user_dashboard';
import { redirect } from 'next/navigation';

const UserDashboardPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    })
    if(!session)
    {
       redirect("/login")
    }
    return <UserDashboard />;
};
export default UserDashboardPage;