import { Fragment,useContext} from 'react';
import {Link, Outlet} from 'react-router-dom';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import {ReactComponent as Logo } from '../../assets/wardrobe-logo.svg';
import { UserContext } from '../../context/user.context';
import { CartContext } from '../../context/cart.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import './navigation.styles.scss';

const Navigation = () =>{
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);
    return (
        <Fragment>
            <div className='navigation'>
                < Link className='logo-container' to='/'>
                <Logo className='logo' />
                </Link>

                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                    SHOP
                    </Link>
                    {
                        currentUser ? (<span className='nav-link' onClick={signOutUser}>{' '}SIGN OUT{' '}</span>
                        ) : (<Link className='nav-link' to='/auth'>
                        SIGN IN
                        </Link>)
                    }
                    <CartIcon />
                </div>
                {isCartOpen && <CartDropdown />}
            </div>
            <Outlet />
        </Fragment>
    );
  };

  export default Navigation;