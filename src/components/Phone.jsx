export default function Phone({phone, addToCart}) { // aqui añadimos los props o funciones

    //aplicamos destructuring a phone
    const{id, name, image, description, price} = phone
  

    return (

        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen telefono" />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">{price}€</p>
                <button
                    type="button"
                    className="btn btn-dark w-100"
                    // onClick={() =>setCart(prevCart =>[...prevCart, phone])}
                    onClick={() =>addToCart(phone)} // y le decimos que va a agregar el telefono que elijamos
                >Agregar al Carrito</button>
            </div>
        </div>
    )
}