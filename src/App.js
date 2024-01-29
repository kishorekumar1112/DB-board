import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import Dashboard from './components/dashboard/dash.jsx';
import Posts from './components/posts/posts.jsx';
import Navbar from './components/navbar/nav.jsx';
import Details from './components/details/details.jsx';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/post' element={<Posts/>}></Route>
        <Route path='/details' element={<Details/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
