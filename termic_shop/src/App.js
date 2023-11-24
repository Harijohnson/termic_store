import { Container } from 'react-bootstrap'
import Header from "./components/Header";
import Footer from "./components/Footer";
import  HomeScreen from './screens/HomeScreen'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import  ProductScreen from './screens/ProductScreen'
import  CartScreen from './screens/CartScreen'
import  LoginScreen from './screens/LoginScreen'

function App() {
  return (
    <Router >
      <Header />
        <main className = 'py-5'>
          <Container>
            <Routes>
              <Route  path='/' element={ <HomeScreen />} exact />
              <Route  path='/product/:id' element={ <ProductScreen />} />
              <Route  path='/cart/:id?' element={ <CartScreen />} />
              <Route  path='/login' element={ <LoginScreen />} />
            </Routes>
          </Container>
        </main>
      <Footer />
    </Router>
  );
}

export default App;



