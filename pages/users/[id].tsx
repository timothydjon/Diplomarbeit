import { GetServerSideProps } from 'next'
import Profile from '../../components/profile/profile';

// Define the props expected for your page
interface PageProps {
  id: string;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ params }) => {
  const id = params?.id as string;
  
  return { props: { id } };
};

const IdPage = ({ id }: PageProps) => {
  // Now you can use `id` inside your component or pass it to the Profile component
  return <Profile id={id} />
};

export default IdPage;
