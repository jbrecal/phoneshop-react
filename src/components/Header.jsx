//Esto es un componente

import { useMemo } from "react"   // es un hooks que no hará render completo de la app hasta que no hagas algo que yo te voy a decir que es


//como el componente debe de set exportado ponemos export default delante del componente function Header
export default function Header({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }) { //los props creados en el Header de App.jsx

    //State derivado

    //esta funcion va a revisar si el carrito está vacio con el state derivado complementando la lógica de la linea 34
    const isEmpty = useMemo(() => cart.length === 0, [cart]) // vuelve a ejecutar el codigo cuando el carrito cambie, no hagas render hasta que cambie el carrito
    //esta funcion es para calcular el total del carrito, useMemo es un hook enfocado al performance ya que evita que el codigo no se ejecute si algunas de las dependencias no han cambiado
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])

    return (  // esto es lo que se mostrará en pantalla de este componente llamado Header
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="logo" src="/img/logo.png" alt="imagen logo" />

                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div
                            className="carrito"
                        >
                            <img className="cart" src="/img/carrito.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">

                                {isEmpty ? (  // si el carrito está vacio muestra <p>
                                    <p className="text-center">El carrito esta vacio</p>
                                ) : (   //si no muestra el carrito sin el texto
                                    <>

                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map(phone => (  // va a retornar todo el tr para mostrarlo en el carrito

                                                    //siempre que iteremos tenemos que añadirle un key con un id unico
                                                    <tr key={phone.id}>
                                                        <td>
                                                            <img className="img-fluid"
                                                                src={`/img/${phone.image}.jpg`}
                                                                alt="imagen guitarra"
                                                            />
                                                        </td>
                                                        <td>{phone.name}</td>
                                                        <td className="fw-bold">
                                                            {phone.price}
                                                        </td>
                                                        <td className="flex align-items-start gap-4">
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => decreaseQuantity(phone.id)}
                                                            >
                                                                -
                                                            </button>
                                                            {phone.quantity}
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={() => increaseQuantity(phone.id)}
                                                            >
                                                                +
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-danger"
                                                                type="button"
                                                                onClick={() => removeFromCart(phone.id)} //con el id identificamo que elemento estamos seleccionando para eliminarlo del carrito
                                                            >
                                                                X
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>


                                        <p className="text-end">Total pagar: <span className="fw-bold">{cartTotal}€</span></p>
                                    </>
                                )}
                                <button className="btn btn-dark w-100 mt-3 p-2"
                                    onClick={clearCart}
                                >Vaciar Carrito</button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>

    )
}