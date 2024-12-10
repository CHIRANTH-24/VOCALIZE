
import NewLesson from "./pages/NewLesson";
import ViewLesson from "./pages/ViewLesson";
import NavBar from "./pages/NavBar";
import {Route, Routes} from 'react-router-dom';
const App = () => {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/view' element={<ViewLesson />} />
        <Route path='/new' element={<NewLesson/>}/>
      </Routes>
    </div>
  );
}

export default App


