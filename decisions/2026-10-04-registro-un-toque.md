# 2026-10-04 — Registro en un toque

**Decisión:** En `inicio`, si no hay cuenta, una tarjeta con tres toques: Gmail (principal), Apple y WhatsApp. El mismo toque registra o entra. No hay formulario. La cuenta vive en estado de App (`signIn.ts`), no en el `Trip`. Cerrar sesión en perfil la borra y abre `landing`. El botón de Gmail del landing usa el mismo camino.

**Por qué:** Monik quiere que entrar sea directo, con Gmail y otras cuentas que la gente ya tiene a mano. En Colombia, Apple y WhatsApp evitan pedir correo y clave.

**Consecuencia:** No es OAuth. Recargar pierde la cuenta. No conectar Google de verdad sin que Monik lo pida.
