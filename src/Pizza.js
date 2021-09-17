import React from 'react'

  function Pizza({ details }) {
    if (!details) {
      return <h3>Getting your order&apos;s details...</h3>
    }
  
    return (
      <div className='pizza container'>
        <h2>{details.name}</h2>
        <p>Choice of Size {details.size}</p>
        <p>Sauce: {details.sauce}</p>
        <p>special: {details.civil}</p>
  
        {
          !!details.toppings && !!details.toppings.length &&
          <div>
            Toppings:
            <ul>
              {details.toppings.map((like, idx) => <li key={idx}>{like}</li>)}
            </ul>
          </div>
        }
      </div>
    )
  }
  export default Pizza;
  
  
