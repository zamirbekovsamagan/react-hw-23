import { useReducer } from 'react';
import classes from './Checkout.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initState = {
    name: '',
    nameIsValid: true,
    street: '',
    streetIsValid: true,
    postal: '',
    postalIsValid: true,
    city: '',
    cityIsValid: true,
}

function reducer(prevState, action) {
    switch (action.type) {
        case 'NAME':
            return {
                ...prevState,
                name: action.name,
                nameIsValid: /^[a-zA-Z]+$/.test(action.name)
            }
        case 'STREET':
            return {
                ...prevState,
                street: action.street,
                streetIsValid: /[0-9]+$/.test(action.street)
            }
        case 'POSTAL':
            return {
                ...prevState,
                postal: action.postal,
                postalIsValid: /\d+$/.test(action.postal)
            }
        case 'CITY':
            return {
                ...prevState,
                city: action.city,
                cityIsValid: /^[A-Z]/.test(action.city)
            }
        case 'CLEAR':
            return initState
        default:
            return prevState
    }
}

const Checkout = props => {
    const [state, dispatch] = useReducer(reducer, initState)

    function nameChangeHandler(event) {
        dispatch({ type: 'NAME', name: event.target.value })
    }
    function streetChangeHandler(event) {
        dispatch({ type: 'STREET', street: event.target.value })
    }
    function postalChangeHandler(event) {
        dispatch({ type: 'POSTAL', postal: event.target.value })
    }
    function cityChangeHandler(event) {
        dispatch({ type: 'CITY', city: event.target.value })
    }

    const data = {
        name: state.name,
        street: state.street,
        postal: state.postal,
        city: state.city,
        foods: props.items
    }

    const confirmHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://food-order-460dc-default-rtdb.firebaseio.com/order.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                toast('Customer data sent successfully', {
                    position: 'top-center',
                    theme: 'dark',
                    autoClose: 1000
                })
            }
        } catch (error) {
            toast(error.message || 'Something went wrong', {
                position: 'top-center',
                theme: 'dark',
                autoClose: 1000
            })
        }
        dispatch({type:'CLEAR'})
    }

    return <form onSubmit={confirmHandler}>
        <ToastContainer />
        <div className={classes.control}>
            <label htmlFor="name">Your name</label>
            <input 
            type="text" 
            id="name"
            value={state.name} 
            onChange={nameChangeHandler} />
            {!state.nameIsValid && <span>Write only letters</span>}
        </div>
        <div className={classes.control}>
            <label htmlFor="street">Street</label>
            <input 
            type="text" 
            id="street"
            value={state.street} 
            onChange={streetChangeHandler} />
            {!state.streetIsValid && <span>Must end with numbers</span>}
        </div>
        <div className={classes.control}>
            <label htmlFor="postal">Postal code</label>
            <input 
            type="text" 
            id="postal"
            value={state.postal} 
            onChange={postalChangeHandler} />
            {!state.postalIsValid && <span>Write only number</span>}
        </div>
        <div className={classes.control}>
            <label htmlFor="city">City</label>
            <input 
            type="text" 
            id="city"
            value={state.city} 
            onChange={cityChangeHandler} />
            {!state.cityIsValid && <span>Must start with capital letter</span>}
        </div>
        <button type='button' onClick={props.onCancel}>Cancel</button>
        <button>Confirm</button>
    </form>
}

export default Checkout;