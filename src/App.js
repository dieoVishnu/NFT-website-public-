import './App.css';
import { Routes , Route } from 'react-router-dom'
import routes from './pages/router'
import {useSelector} from 'react-redux'
import Dashbord from './components/dashbord/Dashbord';
import Login from './pages/Login';
import Addcar from './components/layouts/creacte-item/Addcar';

function App() {

   
    return (
        <Routes >
            {
            routes.map((data,index) => (
                <Route exact={true} path={data.path} element={data.component} key={index} />
            ))
            }
            <Route path='dash' element={<Dashbord />}>
                <Route path='addpost' element={<Addcar />} />
            </Route>
      </Routes>
    );
}

export default App;
