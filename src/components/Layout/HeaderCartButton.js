import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext)
  const [btnHighlighted, setBtnHighlighted] = useState(false)
  const { items } = cartCtx

  const numberOfCartItems = cartCtx.items.reduce((currNumber, item) => {
    return currNumber + item.amount
  }, 0)

  const btnCalsses = `${classes.button} ${btnHighlighted ? classes.bump : ''}`

  useEffect(() => {
    if (items.length === 0) { return }
    setBtnHighlighted(true)
    const  timer = setTimeout(()=>{
      setBtnHighlighted(false)
    },300)

    return ()=> clearTimeout(timer)
  }, [items])

  return (
    <button className={btnCalsses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
