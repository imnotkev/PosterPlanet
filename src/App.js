import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Search from "./components/Search";
import Poster from "./pages/Poster";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import { CartProvider } from "./CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Nav />
        <main className="app">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/search/:term" element={<Search />}></Route>
            <Route path="/poster/:id" element={<Poster />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
        </main>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
