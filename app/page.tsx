import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to employees page cause a/c to task , no need of  Homepg
  redirect('/employees');
}
