import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './components/HomePage/Home'
import Header from './components/Header/Header'
import About from './components/About/About'
import CurrWeekProducts from './components/productsDetails/CurrWeekProducts';
import ShoppingCart from './components/ShoppingCart/ShoppingCart'
import { getUserByEmail } from './services/UserService'
import ExtensiveProductDetails from './components/productsDetails/ExtensiveProductDetails'
import NextWeek from './components/ManageProducts/NextWeek'
import OrderCompletion from './components/ShoppingCart/OrderCompletion'
import ModalForm from './components/Login&Register/ModalForm'
import SetNextWeek from './components/ManageProducts/SetNextWeek'
import UpdateWeeks from './components/ManageProducts/UpdateWeeks'

function App() {

  const [userDetails, setUserDetails] = useState(null)
  const [reload, setReload] = useState(false)

  const updateReload = () => {
    setReload(!reload)
  }

  useEffect(() => {
    if (localStorage.getItem("user")) {
      getUserByEmail(JSON.parse(localStorage.getItem("user")).email)
        .then(res => {
          setUserDetails(res)
        })
    }
    else {
      setUserDetails(null)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("user"), reload])


  return (
    <div className="App">
      <Header userDetails={userDetails} updateReload={updateReload} />
      <Switch>
        <Route exact path="/" ><Home /></Route>
        <Route path="/about" ><About /></Route>
        <Route path="/login" render={(props) => <ModalForm {...props} updateReload={updateReload} />}></Route>
        <Route exact path="/productsList" ><CurrWeekProducts userDetails={userDetails} /></Route>
        <Route path="/cart" render={(props) => <ShoppingCart {...props} userDetails={userDetails} />}></Route>
        <Route path="/productsList/product-details" render={(props) => <ExtensiveProductDetails {...props} />} />
        <Route path="/complete-order" component={OrderCompletion} />
        <Route path="/next-week" render={(props) => <NextWeek {...props} />}></Route>
        <Route path="/set-next-week" render={(props) => <SetNextWeek {...props} updateReload={updateReload} />}></Route>
        <Route path="/update-products" render={(props) => <UpdateWeeks {...props} updateReload={updateReload} />}></Route>
      </Switch>

    </div>

  );
}

export default App;
