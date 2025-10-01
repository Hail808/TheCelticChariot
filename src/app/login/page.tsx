import { headers } from 'next/headers';
import { auth } from '../../../lib/auth';
import Login from '../../components/pages/login';
import { redirect } from 'next/navigation';
const LoginPage = async () => {
   const session = await auth.api.getSession({
      headers: await headers(),
    })
  if(session)
  {
    redirect("/user_dashboard")
  }
  return <Login />;
};

export default LoginPage;