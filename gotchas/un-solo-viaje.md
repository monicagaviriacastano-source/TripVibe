# Un solo viaje en estado

**Síntoma:** Crear viaje reemplaza Costa Brava. Home, detalle, alcancía, parche y perfil muestran el mismo objeto.

**Causa:** `const [trip, setTrip] = useState<Trip>(MAIN_TRIP)`. `handleCreateTrip` sustituye ese objeto. El parche nuevo arranca vacío (quien lo crea, meta, saldo 0), sin copiar el ejemplo.

**Remedio:** Una lista de viajes es un cambio de modelo: tipos + App + decisión en `decisions/`. El modal ya dice que crear reemplaza.
