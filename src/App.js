import './App.css';
import { Routes, Route } from 'react-router-dom'
import routes from './pages/router'
import { useSelector } from 'react-redux'
import Dashbord from './components/dashbord/Dashbord';
import Login from './pages/Login';
import Addcar from './components/layouts/creacte-item/Addcar';
import Selectitem from './components/layouts/creacte-item/Selectitem';
import Userlisting from './components/dashbord/Userlisting';
import Addlimited from './components/layouts/creacte-item/Addlimited';
import Updateproduct from './components/dashbord/Updateproduct';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {


    return (
        <Routes >
            {
                routes.map((data, index) => (
                    <Route exact={true} path={data.path} element={data.component} key={index} />
                ))
            }
            <Route path='dash' element={<Dashbord />}>
                <Route path='addpost' element={<Selectitem />} />
                {/* <Route path='addpost' element={<Selectitem />} /> */}
                <Route path='mylisting/:id/:id' element={<Updateproduct />} />
                <Route path='car' element={<Addcar />} />
                <Route path='limited' element={<Addlimited />} />
                <Route path='select' element={<Selectitem />} />
                <Route path='mylisting' element={<Userlisting />} />
            </Route>
        </Routes>
    );
}

export default App;
