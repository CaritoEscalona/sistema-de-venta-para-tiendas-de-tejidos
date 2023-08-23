import { Permiso } from './Permiso.js';
import { Rol } from './Rol.js';
import { Usuario } from './Usuario.js';
import { Carrito } from './Carrito.js';
import { Pago } from './Pago.js';
import { Producto } from './Producto.js';
import { Categoria } from './Categoria.js';
import { Tienda } from './Tienda.js';
import { Red_Social } from './Red_Social.js';


// Fromat =
// "Entity (Cardinality) Relation (Cardinality) Entity" + (if is many-to-many) ", through Table"
// By convention in a one-to-one relationship, the entity on the right is the weak one.
export function associateModels() {
  // ------------------------------------------------------
  // -------------------- one-to-one ----------------------
  // ------------------------------------------------------

  // Usuario (1) Dispone (1) Carrito
  Usuario.hasOne(Carrito, {
    foreignKey: 'id_usuario',
    sourceKey: 'id'
  });

  Carrito.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    targetId: 'id'
  });


  // Carrito (1) Asociado (1) Pago
  Carrito.hasOne(Pago, {
    foreignKey: 'id_carrito',
    sourceKey: 'id'
  });

  Pago.belongsTo(Carrito, {
    foreignKey: 'id_carrito',
    targetId: 'id'
  });


  // Usuario (1) Administra (1) Tienda
  Usuario.hasOne(Tienda, {
    foreignKey: 'id_usuario',
    sourceKey: 'id'
  });

  Tienda.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    targetId: 'id'
  });

  // ------------------------------------------------------
  // -------------------- one-to-many ---------------------
  // ------------------------------------------------------

  // Usuario (N) Tiene (1) Rol
  Rol.hasMany(Usuario, {
    foreignKey: 'id_rol',
    sourceKey: 'id'
  });

  Usuario.belongsTo(Rol, {
    foreignKey: 'id_rol',
    targetId: 'id'
  });


  // Producto (N) Pertenece (1) Categoria
  Categoria.hasMany(Producto, {
    foreignKey: 'id_categoria',
    sourceKey: 'id'
  });

  Producto.belongsTo(Categoria, {
    foreignKey: 'id_categoria',
    targetId: 'id'
  });


  // Tienda (1) Publica (N) Producto
  Tienda.hasMany(Producto, {
    foreignKey: 'id_tienda',
    sourceKey: 'id'
  });

  Producto.belongsTo(Tienda, {
    foreignKey: 'id_tienda',
    targetId: 'id'
  });

  // ------------------------------------------------------
  // -------------------- many-to-many --------------------
  // ------------------------------------------------------

  // Rol (N) Domina (N) Permiso, through Rol_Permiso
  Rol.belongsToMany(Permiso, {
    through: 'Rol_Permisos',
    foreignKey: 'id_rol',
    targetKey: 'id'
  });

  Permiso.belongsToMany(Rol, {
    through: 'Rol_Permisos',
    foreignKey: 'id_permiso',
    targetKey: 'id'
  });


  // Carrito (N) Contiene (N) Producto, through Carrito_Producto
  Carrito.belongsToMany(Producto, {
    through: 'Carrito_Productos',
    foreignKey: 'id_carrito',
    targetKey: 'id'
  });

  Producto.belongsToMany(Carrito, {
    through: 'Carrito_Productos',
    foreignKey: 'id_producto',
    targetKey: 'id'
  });


  // Tienda (N) Posee (N) Red_Social, through Tienda_Red_Social
  Tienda.belongsToMany(Red_Social, {
    through: 'Tienda_Red_Socials',
    foreignKey: 'id_tienda',
    targetKey: 'id'
  });

  Red_Social.belongsToMany(Tienda, {
    through: 'Tienda_Red_Socials',
    foreignKey: 'id_red_social',
    targetKey: 'id'
  });
}
