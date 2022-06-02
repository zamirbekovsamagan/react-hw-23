import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import { useContext, useState } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false)
  const cartCtx = useContext(CartContext)
  console.log(cartCtx);

  const cartItemRemoveHandler = (id)=>{
    cartCtx.removeItem(id)
  }

  const cartItemAddHandler = (item)=>{
    cartCtx.addItem({...item,amount:1})
  }

  const orderHandler = ()=>{
    setIsCheckout(true)
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
         key={item.id} 
         name={item.name}
         price={item.price}
         amount={item.amount} 
         onRemove={cartItemRemoveHandler.bind(null,item.id)}
         onAdd={()=> cartItemAddHandler(item)}
         />
      ))}
    </ul>
  );

  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`
  const hasItem = cartCtx.items.length > 0
  return (
    <Modal onCloseCart={props.onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onCloseCart} items={cartCtx.items}/>}
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCart}>
          Close
        </button>
        {hasItem && <button className={classes.button} onClick={orderHandler}>Order</button>}
      </div>
    </Modal>
  );
};
export default Cart;
