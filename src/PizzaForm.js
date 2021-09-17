import React from 'react'

export default function PizzaForm(props) {

// " Add to Order" BUTTON!!

const {
    values,
    submit,
    change,
    disabled,
    errors,
  } = props

  const onSubmit = evt => {
    evt.preventDefault()
    submit()
  }

  const onChange = evt => {
    const { name, value, checked, type } = evt.target;
    const valueToUse = type === 'checkbox' ? checked : value;
    change(name, valueToUse);
  }

  return (
    <form className='form container' onSubmit={onSubmit}>
      <div className='form-group submit'>
        <h2>Build Your Own Pizza</h2>
        <button disabled={disabled}>Add to Order</button>
        <div className='errors'>
          <div>{errors.name}</div>
          <div>{errors.size}</div>
          <div>{errors.sauce}</div>
          <div>{errors.special}</div>
        </div>
      </div>

      <div className='form-group inputs'>
        {/* <h4>Make It Happen, Captain</h4> */}
        <label>Name&nbsp;
          <input
            value={values.name}
            onChange={onChange}
            name='name'
            type='text'
          />
        </label>

        <label>Sauce
          <input
            value={values.sauce}
            onChange={onChange}
            name='sauce'
            type='text'
          />
        </label>

        <label>Size
          <select
            onChange={onChange}
            value={values.size}
            name='size'
          >
            <option value=''>- ☠︎ Pick a Size Or Die ☠︎ -</option>
            <option value='small'>Fat Lip</option>
            <option value='medium'>Black Eye</option>
            <option value='large'>Broke Nose</option>
          </select>
        </label>

        <label>Choice of Sauce</label>
        <label>
        <h5>Original Red</h5>
          <input 
            type="radio"
            name="sauce"
            value="Original Red"
            onChange={onChange}
            checked={values.civil === 'Original Red'}
          />
          <h5>Garlic Ranch</h5>
          <input 
            type="radio"
            name="sauce"
            value="Garlic Ranch"
            onChange={onChange}
            checked={values.civil === 'Garlic Ranch'}
          />
          <h5>BBQ Sauce</h5>
          <input 
            type="radio"
            name="sauce"
            value="BBQ Sauce"
            onChange={onChange}
            checked={values.civil === 'BBQ Sauce'}
          />
          <h5>Spinach Alfredo</h5>
          <input
            type="radio"
            name="sauce"
            value="Spinach Alfredo"
            onChange={onChange}
            checked={values.civil === 'Spinach Alfredo'}
          />
        </label>
      </div>

      <div className='form-group checkboxes'>
        <h4>Toppings</h4>
        <label>Pepperoni
          <input
            type="checkbox"
            name="pepperoni"
            checked={values.pepperoni}
            onChange={onChange}
          />
        </label>
        <label>Sausage
          <input
            type="checkbox"
            name="sausage"
            checked={values.sausage}
            onChange={onChange}
          />
        </label>
        <label>Canadian Bacon
          <input
            type="checkbox"
            name="canadian-bacon"
            checked={values.canadianBacon}
            onChange={onChange}
          />
        </label>
        <label>Spicy Italian Sausage
          <input
            type="checkbox"
            name="spicy-italian-sausage"
            checked={values.spicyItalianSausage}
            onChange={onChange}
          />
        </label>
      </div>
    </form>
  )
}

