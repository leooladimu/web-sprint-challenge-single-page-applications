import React, { useState, useEffect } from 'react';
 import Order from './Order';
import schema from './formSchema';
import axios from 'axios';
import * as yup from 'yup';

const initialFormValues = {
  ///// TEXT INPUTS ///// username
  name: '',
  ///// DROPDOWN /////  role
  size: '',
  ///// RADIO BUTTONS ///// civil
  originalRed: '',
  garlicRanch: '',
  bbqSauce: '',
  spinachAlfredo: '',
  ///// CHECKBOXES ///// hobbies
  pepperoni: false,
  sausage: false,
  canadianBacon: false,
  spiceyItalianSausage: false,
  // text input // email
  special: '',
}

const initialFormErrors = {
  name: '',
  size: '',
  pepperoni: '',
  sausage: '',
  canadianBacon: '',
  spiceyItalianSausage: '',
  special: '',
}

const initialOrders = []
const initialDisabled = true

export default function App() {

  const [orders, setOrders] = useState(initialOrders)          // array of friend objects
  const [formValues, setFormValues] = useState(initialFormValues) // object
  const [formErrors, setFormErrors] = useState(initialFormErrors) // object
  const [disabled, setDisabled] = useState(initialDisabled)       // boolean

  const getOrders = () => {
    // 🔥 STEP 5- IMPLEMENT! ON SUCCESS PUT FRIENDS IN STATE
    //    helper to [GET] all friends from `http://buddies.com/api/friends`
    axios.get('https://reqres.in/api/orders')
      .then(res => {
        setOrders(res.data);
      }).catch(err => console.error(err))
  }


  const postNewOrder = newOrder => {
    // 🔥 STEP 6- IMPLEMENT! ON SUCCESS ADD NEWLY CREATED FRIEND TO STATE
    //    helper to [POST] `newFriend` to `http://buddies.com/api/friends`
    //    and regardless of success or failure, the form should reset
    axios.post('https://reqres.in/api/orders`', newOrder)
      .then(res => {
        setOrders([res.data, ...orders]);
        setFormValues(initialFormValues);
      }).catch(err => {
        console.error(err);
        setFormValues(initialFormValues);
      })
  }

  //////////////// EVENT HANDLERS ////////////////
  //////////////// EVENT HANDLERS ////////////////
  //////////////// EVENT HANDLERS ////////////////
  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
  }

  const inputChange = (name, value) => {
    // 🔥 STEP 10- RUN VALIDATION WITH YUP
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value // NOT AN ARRAY
    })
  }

  const formSubmit = () => {
    const newOrder = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      role: formValues.role.trim(),
      civil: formValues.civil.trim(),
      // 🔥 STEP 7- WHAT ABOUT HOBBIES? // values[name-first] // formValuesblah]
      hobbies: ['hiking', 'reading', 'coding'].filter(hobby => !!formValues[hobby])
    }
    // 🔥 STEP 8- POST NEW FRIEND USING HELPER
    postNewOrder(newOrder);
  }

  useEffect(() => {
    getOrders()
  }, [])

  useEffect(() => {
    // 🔥 STEP 9- ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  return (
    <div className='container'>
      <header><h1>Build Your Own Pizza</h1></header>

      <Order
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

      {/* {
        orders.map(order => {
          return (
            <Order key={order.id} details={order} />
          )
        })
      } */}
    </div>
  )
}


//   return (
//     <>
//       <h1>Lambda Eats</h1>
//       <p>You can remove this code and create your own header</p>
//     </>
//   );
// };
// export default App;
