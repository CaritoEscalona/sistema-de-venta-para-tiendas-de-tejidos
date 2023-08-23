export interface IUsuario {
  usuarioId: number,
  nombre: string,
  apellido: string,
  rut: string,
  correo: string,
  pass: string,
  id_rol: number
}
export interface IProducto {
  id: number,
  sku: string,
  nombre: string,
  descripcion: string,
  precio: number,
  id_categoria: number,
  id_tienda: number,
  img_url: string
}
export interface ITienda {
    id: number,
    nombre: string,
    descripcion: string,
    correo: string,
    img_url: string;
}
export interface ICategoria {
  id: number,
  nombre: string,
  img_url: string,
}
export interface IProductoCarrito {
  id_producto: number,
  cantidad: number,
}