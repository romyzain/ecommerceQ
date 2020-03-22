export const addToCart = (data) => { //subuah funct yang me return object type harus sama dengan di reducer
    return{ //selalu harus punya type karena supaya dia bisa masuk ke case yang mana
        type : 'ADD_TO_CART',
        payload : data //data ini dari axios api bentuk object 
    }
}
