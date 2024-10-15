import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Audio from "./sections/Audio";
import Accessories from "./sections/Accessories";
import Footer from "./sections/Footer";
import Header from "./sections/Header";
import Hero from "./sections/Hero";
import LatestProduct from "./sections/LatestProduct";
import Products from "./sections/Products";
import Store from "./sections/Store";
import Offer from "./components/Offer";
import ProductDetails from "./sections/ProductDetails";
import Phones from "./sections/Phones";
import Watches from "./sections/Watches";
import MyCart from "./sections/MyCart";
import Tablets from "./sections/Tablets";
import BillingForm from "./components/BillingForm";
import Profile from "./sections/Profile";
import Login from "./sections/Login";
import Register from "./sections/Register";
import ActivateAccount from "./components/ActivateAccount";
import ForgetPassword from "./components/ForgetPassword";
import NewPassword from "./components/NewPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import All from "./sections/All";
import ProfileUpdate from "./components/ProfileUpdate";
import Assuarance from "./sections/Assuarance";
import Screens from "./sections/Screens";

const Home = () => (
  <>
    <Hero />
    <Assuarance />
    <Products />
    <Offer />
    <Phones />
    <LatestProduct />
    <Watches />
    <Tablets />
    <Screens />
    <Audio />
    <Accessories />
  </>
);
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/store" element={<Store />} />
        <Route exact path="/product-details/:id" element={<ProductDetails />} />
        <Route exact path="/billing" element={<BillingForm />} />
        <Route
          exact
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/mycart"
          element={
            <ProtectedRoute>
              <MyCart />
            </ProtectedRoute>
          }
        />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/auth/activate/" element={<ActivateAccount />} />
        <Route exact path="/forgetpassword" element={<ForgetPassword />} />
        <Route
          exact
          path="/password/reset/confirm/"
          element={<NewPassword />}
        />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/all" element={<All />} />
        <Route exact path="/profile/update" element={<ProfileUpdate />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
