import './App.css';
import { Routes, Route } from 'react-router-dom'
import routes from './pages/router'
import { useSelector } from 'react-redux'
import Dashbord from './components/dashbord/Dashbord';
import Login from './pages/Login';
import Addcar from './components/layouts/creacte-item/Addcar';
import Selectitem from './components/layouts/creacte-item/Selectitem';
import Userlisting from './components/dashbord/Userlisting';

function App() {


    return (
        <Routes >
            {
                routes.map((data, index) => (
                    <Route exact={true} path={data.path} element={data.component} key={index} />
                ))
            }
            <Route path='dash' element={<Dashbord />}>
                <Route path='addpost' element={<Addcar />} />
                <Route path='select' element={<Selectitem />} />
                <Route path='mylisting' element={<Userlisting />} />
            </Route>
        </Routes>
    );
}

export default App;
