import { Usuario } from "../models/Usuario.js";
import { Carrito } from "../models/Carrito.js";
import { Carrito_Producto } from "../models/Carrito_Producto.js";
import { Producto } from "../models/Producto.js";
import { Categoria } from "../models/Categoria.js";
import { Pago } from "../models/Pago.js";
import mercadopago from 'mercadopago';
import nodemailer from 'nodemailer';
import pdf from 'html-pdf';

// Configurar el transporter (proveedor de servicios de correo)
const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});


mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN
});

function formatDate(date) {
    return date.toISOString().substring(0, 10) + 'T' + date.toLocaleTimeString() + '.000'
        + date.toTimeString().substring(12, 15) + ":" + date.toTimeString().substring(15, 17);
}

export const getPagoUsuarioAuthenticado = async (req, res) => {
    const { minutesToPay, cuotas, description, detail, redirection } = req.body;

    const timeAviableToPay = minutesToPay != null ? minutesToPay*60000 : 5*60000;
    const cantidadCuotas = cuotas != null ? cuotas : 12;
    const descripcion = description != null ? description : 'Compra tejidos.'
    const detalle = detail != null ? detail : `Compra tejidos.`

    let total = 0;

    try {
        //Obtener usuario authenticado
        const usuario = await Usuario.findByPk(req.user.id);

        //Obtener Carrito de usuario authenticado
        if (usuario) {
            const carrito = await Carrito.findOne({ where: { id_usuario: req.user.id } });
            if (carrito) {
                //Obtener Productos de carrito
                const productos = await Carrito_Producto.findAll({
                    where: {
                        id_carrito: carrito.id
                    },
                });

                // Preparar body del Preference
                let productListPreference = [];
                for (const productoCarrito of productos) {
                    const productoDetail = await Producto.findByPk(productoCarrito.id_producto);
                    const categoria = await Categoria.findByPk(productoDetail.id_categoria);
                    productListPreference.push({
                        "id": productoDetail.id,
                        "title": productoDetail.nombre,
                        "currency_id": "CLP",
                        "picture_url": productoDetail.img_url,
                        "description": productoDetail.descripcion,
                        "category_id": categoria.nombre,
                        "quantity": productoCarrito.cantidad,
                        "unit_price": productoDetail.precio * 1
                    });
                    total += productoDetail.precio * 1;
                }
                const dateNow = new Date(Date(Date.now()));
                const fromDate = new Date(dateNow.getTime() - 60000);
                const endDate = new Date(dateNow.getTime() + timeAviableToPay);

                const newPago = await Pago.create({
                    total,
                    id_mercadoPago: -1, // Actualizar en la repsuesta de MercadoPago
                    fecha: endDate,
                    id_carrito: carrito.id,
                });

                // LLenar body del Preference
                const preference = {
                    items: productListPreference,
                    payer: {
                        "email": usuario.correo
                    },
                    back_urls: {
                        "success": `${redirection}/${newPago.id}`,
                        "failure": `${redirection}/${newPago.id}`,
                        "pending": `${redirection}/${newPago.id}`
                    },
                    auto_return: "approved",
                    payment_methods: {
                        "installments": cantidadCuotas
                    },
                    "binary_mode": true,
                    "statement_descriptor": detalle,
                    "external_reference": descripcion,
                    "expires": false
                };

                // Crear Preference
                mercadopago.preferences.create(preference).then(async function (response) {
                    await newPago.update({
                        total,
                        id_mercadoPago: response.body.preference_id, // Actualizar en la repsuesta de MercadoPago
                        fecha: endDate,
                        id_carrito: carrito.id,
                      });
                    res.status(201).json({ 
                        body: response.body,
                        pagoModel: newPago
                    });
                }).catch(function (error) {
                    console.log(error);
                    console.log(error.message);
                    res.status(500).json({ message: "Error al obtener pago del producto" });
                });
            }
        } else {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        console.log(error);
        console.log(error.message);
        res.status(500).json({ message: "Error al obtener pago del producto" });
    }
}

export const sendBoleta = async (req, res) => {
    const contenidoHTML = `
    <!DOCTYPE html>
<html>

<head>
  <title>PDF generado</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
  html, body {
    background-color: white;
    font-family: Roboto, Arial;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: 0;
    background-repeat: repeat;
  }
  h1 {
    text-align: center;
    color: #333;
  }
  .status-message {
    text-align: center;
    margin-bottom: 20px;
  }
  .table {
    margin: 0 auto;
    width: 80%;
    border-collapse: collapse;
  }
  .table td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  .table tr:nth-child(even){background-color: #f2f2f2;}
  .table tr:hover {background-color: #ddd;}
</style>
  </head>

<body>
    ${req.body.contenido}
</body>

</html>

  `;
console.log(contenidoHTML);

    // Configura las opciones para generar el PDF (puedes ajustar según tus necesidades)
    const opcionesPDF = { format: 'Letter' };

    // Genera el PDF a partir del contenido HTML
    pdf.create(contenidoHTML, opcionesPDF).toBuffer((err, buffer) => {
        if (err) {
            console.error('Error al generar el PDF:', err);
            res.status(500).send('Error al generar el PDF');
        } else {
            const mensajeDeEnvio = `
¡Hola ${req.user.nombre}!

!Gracias por preferir "Sistema de tiendas de tejidos"!.
Te adjuntamos un pdf con el detalle de tu compra.
                
¡Ojalá que tengas un excelente día!
Atentamente,
El Equipo del Sistema de Tiendas de Tejidos.
            `;
            const mailOptions = {
                from: process.env.MAIL_USER,
                to: req.user.correo,
                subject: '¡Sistema Tiendas de Tejidos! - ¡Boleta de tu compra!',
                text: mensajeDeEnvio,
                attachments: [
                    {
                        filename: 'boleta.pdf',
                        content: buffer
                    }
                ]
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ message: "Error al enviar correo" });
                } else {
                    console.log('Correo enviado: ' + info.response);
                    res.status(200).json({ message: 'Correo enviado correctamente' });
                }
            });
        }
    });
}