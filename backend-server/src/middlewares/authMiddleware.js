import { Usuario } from '../models/Usuario.js';
import { Rol } from '../models/Rol.js';
import jwt from 'jsonwebtoken';

const userHasPermission = async (userId, permission) => {
  const user = await Usuario.findByPk(userId, {include: Rol});
  return user.Rol.some(rol => rol.permisos.includes(permission));
};

export const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado, no hay token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido.' });
  }
};

export const superAdminAuthMiddleware = (req, res, next) => {
  if (!req.user || req.user.id !== 0) {
    return res.status(401).json({ message: 'Unauthorized' });
  } else {
    next();
  }
};

export const requireVerUsuarios = async (req, res, next) => {
  const hasPermission = await userHasPermission(req.user.id, 'ver-usuarios');
  if (hasPermission) next();
  else res.status(401).json({ message: 'Unauthorized' });
};

export const requireEditarUsuarios = async (req, res, next) => {
  const hasPermission = await userHasPermission(req.user.id, 'editar-usuarios');
  if (hasPermission) next();
  else res.status(401).json({ message: 'Unauthorized' });
};

export const requireEliminarUsuarios = async (req, res, next) => {
  const hasPermission = await userHasPermission(req.user.id, 'eliminar-usuarios');
  if (hasPermission) next();
  else res.status(401).json({ message: 'Unauthorized' });
};

export const requireVerRoles = async (req, res, next) => {
  const hasPermission = await userHasPermission(req.user.id, 'ver-roles');
  if (hasPermission) next();
  else res.status(401).json({ message: 'Unauthorized' });
};

export const requireAsignarRoles = async (req, res, next) => {
  const hasPermission = await userHasPermission(req.user.id, 'asignar-roles');
  if (hasPermission) next();
  else res.status(401).json({ message: 'Unauthorized' });
};

export const requireCrearProductos = async (req, res, next) => {
  const hasPermission = await userHasPermission(req.user.id, 'crear-productos');
  if (hasPermission) next();
  else res.status(401).json({ message: 'Unauthorized' });
};

export const requireEliminarProductos = async (req, res, next) => {
  const hasPermission = await userHasPermission(req.user.id, 'eliminar-productos');
  if (hasPermission) next();
  else res.status(401).json({ message: 'Unauthorized' });
};

export const requireEditarProductos = async (req, res, next) => {
  const hasPermission = await userHasPermission(req.user.id, 'editar-productos');
  if (hasPermission) next();
  else res.status(401).json({ message: 'Unauthorized' });
};

export const requireAdministrarCarrito = async (req, res, next) => {
  const hasPermission = await userHasPermission(req.user.id, 'administrar-carrito');
  if (hasPermission) next();
  else res.status(401).json({ message: 'Unauthorized' });
};

export const requireRealizarPedidos = async (req, res, next) => {
  const hasPermission = await userHasPermission(req.user.id, 'realizar-pedidos');
  if (hasPermission) next();
  else res.status(401).json({ message: 'Unauthorized' });
};

export const requireVerPedidos = async (req, res, next) => {
  const hasPermission = await userHasPermission(req.user.id, 'ver-pedidos');
  if (hasPermission) next();
  else res.status(401).json({ message: 'Unauthorized' });
};

export const requireVerPagos = async (req, res, next) => {
  const hasPermission = await userHasPermission(req.user.id, 'ver-pagos');
  if (hasPermission) next();
  else res.status(401).json({ message: 'Unauthorized' });
};

export const requireAdministrarPedidos = async (req, res, next) => {
  const hasPermission = await userHasPermission(req.user.id, 'administrar-pedidos');
  if (hasPermission) next();
  else res.status(401).json({ message: 'Unauthorized' });
};

export const requireProcesarPagos = async (req, res, next) => {
  const hasPermission = await userHasPermission(req.user.id, 'procesar-pagos');
  if (hasPermission) next();
  else res.status(401).json({ message: 'Unauthorized' });
};

export const requireAsignarPermisoRol = async (req, res, next) => {
  const hasPermission = await userHasPermission(req.user.id, 'asignar-permiso-rol');
  if (hasPermission) next();
  else res.status(401).json({ message: 'Unauthorized' });
};

export const requireQuitarPermisoRol = async (req, res, next) => {
  const hasPermission = await userHasPermission(req.user.id, 'quitar-permiso-rol');
  if (hasPermission) next();
  else res.status(401).json({ message: 'Unauthorized' });
};

export const requireCrearRol = async (req, res, next) => {
  const hasPermission = await userHasPermission(req.user.id, 'crear-rol');
  if (hasPermission) next();
  else res.status(401).json({ message: 'Unauthorized' });
};

export const requireEliminarRol = async (req, res, next) => {
  const hasPermission = await userHasPermission(req.user.id, 'eliminar-rol');
  if (hasPermission) next();
  else res.status(401).json({ message: 'Unauthorized' });
};

export const requireVerPermisos = async (req, res, next) => {
  const hasPermission = await userHasPermission(req.user.id, 'ver-permisos');
  if (hasPermission) next();
  else res.status(401).json({ message: 'Unauthorized' });
};
