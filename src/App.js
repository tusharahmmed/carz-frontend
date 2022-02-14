import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import AuthProvider from './context/AuthProvider';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { Route, Switch } from 'react-router-dom';
import { DashboardPage, DetailsPage, LoginPage, RegisterPage } from './components/pages';
import OrderPage from './components/pages/OrderPage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Switch>

            <Route exact path="/">
              <Header />
              <Home />
            </Route>

            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/overview/:id">
              <DetailsPage />
            </Route>
            <PrivateRoute path="/place-order/:id">
              <OrderPage />
            </PrivateRoute>

            <PrivateRoute path="/myaccount">
              <DashboardPage />
            </PrivateRoute>
           

          </Switch>

        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
