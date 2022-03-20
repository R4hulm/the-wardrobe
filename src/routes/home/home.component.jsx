import { Outlet } from 'react-router-dom';
import Directory from "../../components/directory/directory.component";

const Home = ({categories}) => {
  return (
    <div>
      <Outlet />
      <Directory categories={categories} />
    </div>
  );

};

export default Home;