import React, { useState, useEffect } from "react";
import PizzaForm from './PizzaForm';
import Pizza from './Pizza';
import * as yup from 'yup';
import "./index.css";
import {Route, Switch} from "react-dom";
import axios from 'axios';
import schema from './formSchema';
import Nav from './nav';
// const App = () => {}

//   const [pizza, setPizza] = useState([]);

const initialFormValues = 
  {
    name: '',    // text, 'name-input'
    size: '',    // dropdown, 'size-dropdown'
    topping1: false, // checkbox, 'toppings'
    topping2: false, // checkbox
    topping3: false, // checkbox
    topping4: false, // checkbox
    sauce: '', // radio button
    special: '' // text, "special-text"
}
 
const initialFormErrors = {
  name: '',    // text, 'name-input'
  size: '', 
  sauce: '',
  special: ''
}

const initialOrders = []
const initialDisabled = true

export default function App() {

  const [orders, setOrders] = useState(initialOrders)  

  const [formValues, setFormValues] = useState(initialFormValues) // object
  const [formErrors, setFormErrors] = useState(initialFormErrors) // object
  const [disabled, setDisabled] = useState(initialDisabled)       // boolean

  const getOrders = () => {
    axios.get('https://reqres.in/api/orders')
    .then(res => {
      setOrders(res.data);
    }).catch(err => console.error(err))
  }

  const postNewOrder = newOrder => {
    axios.post('https://reqres.in/api/orders', newOrder)
    .then(res => {
      console.log(res.data)
      setOrders([res.data, ...orders]);
      setFormValues(initialFormValues);
    }).catch(err => {
      console.error(err);
      setFormValues(initialFormValues);
    })
  }

  //   const validate = (name, value) => {
  //   yup.reach(schema, name)
  //     .validate(value)
  //     .then(() => setFormErrors({ ...formErrors, [name]: '' }))
  //     .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
  // }

  // const inputChange = (name, value) => {
  //   validate(name, value);
  //   setFormValues({
  //     ...formValues,
  //     [name]: value 
  //   })
  // }

  const inputChange = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => {setFormErrors({
        ...formErrors, [name]: ''})})
      .catch(err => {setFormErrors({
        ...formErrors, [name]: err.errors[0]})})
    setFormValues({
      ...formValues,
      [name]: value
    })
  }
    
  const orderButton = () => {
    const newOrder = {
      name: formValues.name.trim(),
      special: formValues.special.trim(),
      size: formValues.size.trim(),
      sauce: formValues.sauce.trim(),
      toppings: ['pepperoni',
       'sausage',
       'canadian-bacon', 'spicy-italian-sausage'].filter(topping => !!formValues[topping])
    }
    postNewOrder(newOrder);
    
    // {orders.map(getOrders => {return (<Pizza key={data.id} details={data} />)})}

  }
   
  useEffect(() => {
    getOrders()
  }, [])

  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  return (
    <div className='container'>
      <header >
      <button>Pizza?</button>
        <h1>Lambda Eats</h1>
      </header>
    <>
    <Switch>
    <Route path="/pizza">
    <Nav />
      <PizzaForm
        values={formValues}
        change={inputChange}
        submit={orderButton}
        disabled={disabled}
        errors={formErrors}
      />
    </Route>
    <Route id='order-pizza' path="/">
    <Nav />
{/* <HomePage /> */}
    </Route>
    </Switch>
    </>
    </div>
  )
}