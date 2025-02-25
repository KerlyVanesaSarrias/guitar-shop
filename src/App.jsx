import { useEffect, useState } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"

function App() {

    const initalCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data, ] = useState(db)
    const [cart, setCart] = useState(initalCart)

    const minItems = 1
    const maxItems = 5

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
        }, [cart])

    const addToCart = (item) => {
        const itemExist = cart.findIndex(guitar => guitar.id === item.id)
            if (itemExist >= 0) {
                if (cart[itemExist].quantity >= maxItems)
                    return
                const updatedCart = [...cart]
                updatedCart[itemExist].quantity++
                setCart(updatedCart)
            } else {
                item.quantity = minItems
                setCart([...cart, item])
            }
            }

    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    const decreaseQuantity = (id) => {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity > minItems) {
                item.quantity--
            }
            return item
        })
        setCart(updatedCart)
    }

    const increaseQuantity = (id) => {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity < maxItems) {
                item.quantity++
            }
            return item
        })
        setCart(updatedCart)
    }

    const clearCart = () => {
        setCart([])
    }


    return (
        <>
            <Header
                cart={cart}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCart={clearCart}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {data.map((guitar) => (
                        <Guitar
                            key={guitar.id}
                            guitar={guitar}
                            setCart={setCart}
                            addToCart={addToCart}
                        />
                    ))}
                </div>
            </main>


            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>
        </>

    )
}

export default App
