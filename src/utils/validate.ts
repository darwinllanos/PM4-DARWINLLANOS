export function validateUser(user: any): boolean{
    const validUser = user.id !== undefined && user.name !== undefined && user.email !== undefined && user.password !== undefined && user.description !== undefined

    return validUser;
}

export function validateProduct(product: any): boolean{
    const validProduct = product.id !== undefined  && product.name !== undefined && product.description !== undefined
    
    return validProduct
}