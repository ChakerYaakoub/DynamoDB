import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import appRoutes from "./Routes/appRoutes";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="main">
          <div className="section">
            <Routes>
              {appRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </div>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
