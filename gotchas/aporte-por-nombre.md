# Aporte casa mal el miembro

**Síntoma:** Tras aportar, el progreso del miembro incorrecto sube (o ninguno).

**Causa:** El modal tenía nombres fijos y `handleContributeSuccess` hacía `m.name.includes(donorName.split(' ')[0])`.

**Remedio:** El modal lista `trip.members` y el aporte suma solo por `member.id`. No volver a emparejar por substring del nombre.
