import {Routes,Route, Outlet} from 'react-router-dom';
import Home from './routes/home/home.component';

const Shop =() =>{
  return (
  <h1>Shop page</h1>
  );
}

const Navigation = () =>{

  return (
    <div>
      <div>
        <h1> navigation</h1>
      </div>
      <Outlet />
    </div>
  );
}

const App = () => {
  return (
    <Routes>
      <Route path='/' element= {<Navigation />} >
        <Route index element= {<Home />} />
        <Route path='shop' element= {<Shop />} />
      </Route>
    </Routes>
  
  );
}
export default App;