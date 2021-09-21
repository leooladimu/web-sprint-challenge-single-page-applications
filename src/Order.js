import React from 'react';

function Order({ details }) {
  if (!details) {
    return <h3>Getting your order&apos;s details...</h3>
  }

  return (
    <div className='order container'>
      <h2>{details.name}</h2>
      <p>Size: {details.size}</p>
      <p>Original Red: {details.originalRed}</p>
      <p>Garlic Ranch: {details.garlicRanch}</p>
      <p>BBQ Sauce: {details.bbqSauce}</p>
      <p>Spinach Alfredo: {details.spinachAlfredo}</p>
      <p>special: {details.special}</p>
      {
        !!details.toppings && !!details.toppings.length &&
        <div>
          toppings:
          <ul>
            {details.toppings.map((like, idx) => <li key={idx}>{like}</li>)}
          </ul>
        </div>
      }
    </div>
  )
}

export default Order;
