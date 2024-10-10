import { useState, useEffect } from 'react'
import Phone from "./components/Phone"
import Header from "./components/Header"
import { db } from './data/db'


function App() {  

  //States

  //Esta funcion hace que carrito quede de manera persistente aunque recargues la página
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : [] // si tiene algo entonces convierte en string, sino lo iniciamos o seteamos como un arreglo vacio
  }

  const [data] = useState(db)  //como es un archivo local esta es la mejor manera
  const [cart, setCart] = useState(initialCart)  //le pasamos el inicalCart para que detecte lo que hay en el localStorare sobre nuestro carito
  const MAX_ITEMS = 5
  const MIN_ITEMS = 1




  useEffect(() => {  //cada vez que el cart cambie va  estar ejecutando todo lo que hay en el callback
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

 
 //Funcion para añadir un componente al carrito
  function addToCart(item) {

    //con esta funcion evitamos añadir registros duplicados al carrito y añadimos solo la cantidad
    //findIndex no tiene mutación y te va a retornar el indice del elemento en el array en caso de que lo encuentre de lo contrario te devuelve -1
    const itemExist = cart.findIndex(phone => phone.id === item.id)  //si estoy agregando un elemento nuevo es el mismo id que existe en mi state?
    // console.log(itemExist) cuando no existe te retorna -1, en caso de que si, te retorna la posicion del indice en el arreglo
    if (itemExist >= 0) {  // existe en el carrito
      if (cart[itemExist].quantity >= MAX_ITEMS) return  // en el caso de que exista, vamos a actualizar la cantidad
      const updatedCart = [...cart]  //toma una copia del arreglo
      updatedCart[itemExist].quantity++ //realiza los cambios en el carrito y despues
      setCart(updatedCart)  // los setea actualizando las nuevas unidades de ese elemento
    } else {  //si no existe
      item.quantity = 1 // agrega 1 unidad
      setCart([...cart, item])  // al carrito ya existente le añade el item
    }
  }

  //Función para remover un item del carrito

  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(phone => phone.id !== id)) //.filter accedemos al arreglo de forma individual, filtrame las guitarras que sean diferentes a las que estoy eliminando para que las muestre despues en el carrito
//pasamos como callback tenemos el valor previo del carrito llamado prevCart, accedemos con .filter y accedemos a los phone de forma individual
// y le decimos filtrame los phone cuyo id sea diferente al elemento que he clic y retornalo
  }

  /* usamos .map para generar una nueva copia del arreglo accediendo a item que son los elementos
  del carrito, queremos incrementar la cantidad del item segun el id de ese item
  retorno ...item tal y como esta pero modificamos la cantidad, de esa forma mantengo el resto
  de propiedades (imagen, precio) pero la cantidad la modifica*/

  function increaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < MAX_ITEMS) {   //tb limitamos el numero de items en 5
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }

      return item // para que resto de elemento donde no haga clic en cantidad los mantenga
    })
    setCart(updatedCart) //seteamos la funcion
  }


  function decreaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  //Función para eliminar todos los elementos del carrito
  function clearCart() {
    setCart([])  // Seteamos con un arreglo vacio para que vacie el carro
  }



  return (
    <>

      <Header  // aquí tenemos el componete Header que hemos importado
        cart={cart}  //pasamos nuestro carrito al Header mediante un prop
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra gama de iPhone</h2>

        <div className="row mt-5">
          {data.map((phone) => { //  accedemos a la data y creamos la expresión .map cada vez que lo utilizo genero un nuevo arreglo
            return (
              <Phone   // mostrará en pantalla componente Phone
                key={phone.id} //cada vez que itere .map debo de pasarle siempre este prop con un valor unico para eliminar errores
                phone={phone}  // prop, "nombre/valor"  (nombre es la forma de acceder a el desde el otro componente y el valor que le quieras pasar)

                setCart={setCart}  
                addToCart={addToCart} // aqui añadimos la funcion al componente para que cada componente tenga la funcionalidad de agregar ese componente al carrito
              />
            )
          })}


        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">PhoneStore - By Juan Brenes</p>
        </div>
      </footer>


    </>
  )
}

export default App
