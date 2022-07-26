import { useRouter } from 'next/router';
import Footer from '../../../../components/Footer/Index';
import Village from '../../../../components/Village/Index';
import Navbar from '../../../../components/NavBar/Index';
import Page from '../../../../components/Page';
import { getVillage } from '../../../../adapters/requests';

const village = () => {
  const router = useRouter();
  const { village } = router.query;

  return (
    <div>
      <Page
        title={
          village === 'undefinded' ? 'loading...' : `Village || ${village}`
        }
      >
        {/* <Navbar /> */}
        <Village village_name={village} />
        {/* <Footer /> */}
      </Page>
    </div>
  );
};

export default village;
