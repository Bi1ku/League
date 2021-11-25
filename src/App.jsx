import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Champion from './components/champion';
import AllChampions from './components/allChampions';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<AllChampions />} />
        <Route path='/champion/:champion' element={<Champion />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
