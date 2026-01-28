import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Función para enviar alerta a Telegram
async function sendTelegramAlert(leadName: string, leadId: string | number) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn("⚠️ Telegram no configurado.");
    return;
  }

  // Mensaje Híbrido: Privacidad + Utilidad
  const message = `
🚨 <b>NUEVO LEAD DENTAL</b> 🚨

🆔 <b>ID Referencia:</b> #${leadId}
👤 <b>Cliente:</b> ${leadName}
📅 <b>Fecha:</b> ${new Date().toLocaleDateString('es-ES', { hour: '2-digit', minute: '2-digit' })}

<i>🔒 Los datos de contacto completos se han enviado a tu email corporativo.</i>
`;

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });
  } catch (error) {
    console.error("Error enviando a Telegram:", error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Recibimos 'leadId' del frontend
    const { nombre, telefono, email, cp, consentCommercial, leadId } = body;

    if (!nombre || !telefono || !email) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    const idRef = leadId || 'N/A';

    // 1. Configurar Nodemailer (Email)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Web Dentisalud" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: `🦷 Nuevo Lead #${idRef}: ${nombre}`,
      text: `Nuevo lead (ID: ${idRef}). Nombre: ${nombre}. Tel: ${telefono}.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #849700;">Nuevo Lead DKV Dentisalud</h2>
          <div style="background-color: #F0EFED; padding: 10px; border-radius: 4px; margin-bottom: 20px;">
            <strong>🆔 ID DE REFERENCIA: #${idRef}</strong>
          </div>
          <ul style="list-style: none; padding: 0;">
            <li><strong>👤 Nombre:</strong> ${nombre}</li>
            <li><strong>📞 Teléfono:</strong> <a href="tel:${telefono}" style="color: #849700; text-decoration: none;">${telefono}</a></li>
            <li><strong>✉️ Email:</strong> ${email}</li>
            <li><strong>📍 Código Postal:</strong> ${cp}</li>
            <li><strong>📢 Acepta Publicidad:</strong> ${consentCommercial ? '✅ SÍ' : '❌ NO'}</li>
          </ul>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #666;">Mensaje automático. ID Base de Datos: ${idRef}</p>
        </div>
      `,
    };

    // 2. Enviar Email y Telegram en paralelo
    await Promise.all([
      transporter.sendMail(mailOptions),
      sendTelegramAlert(nombre, idRef)
    ]);

    return NextResponse.json({ success: true, message: 'Notificaciones enviadas' });

  } catch (error) {
    console.error('Error procesando notificación:', error);
    // Devolvemos éxito parcial para no asustar al usuario (el dato ya está en DB)
    return NextResponse.json({ success: true, warning: 'Fallo en notificaciones' });
  }
}