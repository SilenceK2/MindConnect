import {
  Routes,
  Route,
  BrowserRouter as Router,
  BrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
           <Route path="/*" Component={Home} /> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
