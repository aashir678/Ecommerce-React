import Home from "./pages/Home";
import Nav from "./components/Nav";
import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import {  BrowserRouter as Router ,Route } from "react-router-dom"
import Books from "./pages/Books";
import { books } from "./data";
import BookInfo from "./pages/BookInfo";
import Cart from "./pages/Cart";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart (book) {
    setCart([...cart, {...book, quantity:1}])
  }

  function changeQuantity (book, quantity) {
    setCart(cart.map(item =>{
       if (item.id === book.id) {
        return {
          ...item,
          quantity: +quantity   
        }
       }
       else {
        return item
       }
    }))
  }

  function removeItem (item) {
    setCart(cart.filter(book => book.id !== item.id))
  }

  function numberOfItems () {
    let counter = 0;
    cart.forEach(item => {
      counter += item.quantity
    })
    return counter;
  }

  useEffect(() => {
    console.log(cart)
  }, [cart])
  return (
    <Router>
       <div className="App">
       <Nav numberOfItems={numberOfItems()}></Nav>
     <Route path="/" exact component={Home} />
     <Route path="/books" exact render={() => <Books books={books} />} />
     <Route path="/books/:id" render={() => <BookInfo books={books} addToCart={addToCart} cart={cart} /> } />   
     <Route path="/cart" render={() => ( <Cart book={books} cart={cart} changeQuantity={changeQuantity} removeItem={removeItem} />)}/>
     <Footer></Footer>
    </div>
    </Router>
  );
}

export default App;
