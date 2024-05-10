import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Products from './pages/products';
import HomePage from './pages/homePage';
import PrivateRoute from './routes/privateRoute';
import LoginPage from './pages/loginPage';
import NotFoundPage from './pages/notFound';
import { Provider } from 'react-redux';
import store from './redux/store';
import ProductPage from './pages/productPage';
import PublicRoute from './routes/publicRoute';
import MainLayout from './components/MainLayout';

const App = () => {
  /* handled the public and private routing and the layout */
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/product"
              element={
                <PrivateRoute>
                  <ProductPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <Products />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/product/:productId"
              element={
                <PrivateRoute>
                  <ProductPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
