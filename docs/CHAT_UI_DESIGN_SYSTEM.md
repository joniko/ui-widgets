# Chat Experience → UI Widgets

## Sistema de Diseño para Experiencias Conversacionales

## 1. Contexto

Buscamos ampliar el alcance de las experiencias conversacionales dentro de las aplicaciones, permitiendo que la persona usuaria resuelva más tareas —desde transferir dinero hasta gestionar un reclamo— en un mismo espacio.

Para esto incorporamos **micro-UIs**: elementos visuales que complementan el chat y simplifican pasos críticos. Pasamos de flujos paso a paso, luego conversacionales, a una propuesta que combina lo mejor de ambos mundos: la conversación como hilo conductor y la UI cuando aporta valor. Escribir no siempre es cómodo ni rápido; las micro-UIs reducen ese esfuerzo y agilizan la interacción.

Esto implica un cambio de paradigma: pasamos de flujos determinísticos a recorridos más abiertos y personalizados. El chat no solo responde; también anticipa, sugiere y guía según el contexto, el historial y el momento.

## 2. Enfoque y Solución

El objetivo final es definir cómo se ve y cómo se comporta la UI dentro del chat, tanto en el flujo conversacional como en los elementos visuales que acompañan la interacción.

La organización del documento es la siguiente:

- **Conversación en el chat**: cómo se plantean, ejecutan y registran las acciones en el hilo conversacional.
- **Componentes de UI en el chat**: los bloques visuales que complementan la conversación (inputs, chips, triggers, widgets inline, bottom sheets).

### Premisas

- **Registro limpio en la actividad**: el chat refleja la acción final, no los pasos intermedios.
- **Feedback inmediato**: cada interacción genera una respuesta clara.
- **Menos taps**: priorizar siempre el camino más rápido.
- **UI adaptativa**: aparece sólo si aporta valor.
- **Soportará gestos**: Además de elementos de UI, sumaremos gestos para navegación.
- **Personalización dinámica**: según perfil, historial, momento, intención.

## 3. Conversación en el chat

Este punto describe lo que la persona usuaria y la AI ven en el hilo conversacional.

### Eco textual

✅ Confirmar acciones críticas con una burbuja explícita.

- **Ejemplo**: Usuario escribe "Confirmo".
- **Decisión**: siempre registrar confirmaciones de usuario en el chat.
- **Implementación actual**: Usamos `pushUIMessage()` para mensajes generados por UI con estilo distintivo (transparente + borde punteado).

### Feedback inmediato

✅ Cada acción recibe una respuesta visible de la AI.

- **Ejemplo**: "Transferencia enviada con éxito".
- **Decisión**: la AI siempre debe dar un feedback textual inmediato.
- **Implementación actual**: Widget de confirmación con detalles completos + botón "Compartir comprobante".

### Cancelación y persistencia

✅ Si una acción se cancela (inactividad, cierre o decisión del usuario), la AI lo comunica y ofrece retomar el flujo.

- **Ejemplo**: "La acción fue cancelada por inactividad. ¿Querés retomarla?".
- **Ejemplo**: "Querías transferir $600 a Juan. ¿Retomamos?".
- **Decisión**: nunca usar voz de "sistema", siempre AI.

### Correcciones

✅ Permitir modificar elecciones sin reiniciar todo. Si se hace dentro de la UI, se usan seudoburbujas.

- **Ejemplo**: ✏️ Cambiar monto por $5.000 y destinatario por José Ramírez.
- **Decisión**: las seudo burbujas deben ser neutrales y diferenciadas.

### Acciones compuestas

🔮 Posibilidad de ejecutar varias operaciones en un único mensaje.

- **Ejemplo**: "Transferí $500 a Ana y recargá mi celular con $200".
- **Decisión**: habilitarlas cuando no generen conflictos de seguridad o usabilidad.

## 4. Componentes de UI en el chat

Los componentes son los bloques visuales que acompañan la conversación. Su función es simplificar interacciones y reducir la carga cognitiva.

### 4.1 Core

#### Input inicial

Entrada principal de texto, audio o archivos. Siempre visible.

**Ejemplos**:

- **Texto**: "Transferir $1.000 a Juan Pérez" → acción directa.
- **Audio**: "Pagá mi factura de Edenor" → transcripción + flujo.
- **Imagen**: foto de comprobante → adjuntar reclamo.

**Implementación actual**: `ChatComposer` con soporte para texto y voz.

#### Chips de sugerencia

Atajos visuales para iniciar, anticipar o continuar acciones.

**Tipos** (todas son contextuales y pueden o no incluir alguna destacada):

- **Start Suggestions**: inicio del chat, con contexto.
  - Ejemplo: Recargar celular, Enviar dinero, Consultar saldo.
- **Smart Suggestions**: mientras el usuario escribe, según intención.
  - Ejemplo: Usuario escribe "recar…" → Recarga celular, Recarga SUBE.
- **Next Suggestions**: después de una respuesta, como próximos pasos.
  - Ejemplo: Usuario pide precio del dólar → Comprar dólar, Ver saldo en dólares.
- **Destacadas** (opcional): resaltadas por relevancia o criticidad.
  - Ejemplo: "Pagar ahora" en una factura próxima a vencer.

**Implementación actual**: `QuickReplies` component.

#### Triggers

Orientados a power users.

- **Activación**: símbolos (@ personas, $ montos, / acciones).
- **Display**: siempre se despliegan en un widget azul desde abajo.
- **Decisión**: documentarlos como componente de input, igual que chips o campo inicial.

#### Widgets inline

**Definición**: muestran información inmediata dentro del chat.

**Formas de utilizarlos** (tipologías):

1. **Sin interacción** (solo información)
   - El widget se limita a mostrar datos relevantes.
   - Ejemplo: cotización del dólar, saldo disponible.
   - Ideal cuando la respuesta es suficiente por sí sola.

2. **Expandir inline** (mostrar más detalles)
   - El widget se "despliega" dentro del mismo chat para ampliar la info.
   - Ejemplo: "Ver histórico" → abre gráfico de cotización en la misma burbuja.
   - Útil cuando el usuario puede necesitar más contexto, pero sin salir del hilo.

3. **Abrir modal** (bottom sheet o vista detallada)
   - El widget actúa como puerta a un modal que presenta información más completa.
   - Ejemplo: "Ver detalle de oferta de un préstamo" → abre bottom sheet con tasas, plazos y condiciones.
   - Recomendado cuando se requiere mostrar más info, pero conviene mantener el contexto conversacional.

4. **Redirect** (navegar a sección de la app)
   - El widget deriva a una pantalla nativa fuera del chat.
   - Ejemplo: "Ver todos tus movimientos" → abre sección de Movimientos en la app.
   - Para tareas o visualizaciones que exceden lo que el chat/modales pueden resolver.

**Principios**:

- Incluir indicadores claros (Chevron, Flecha, "Ver más").
- Nunca pedir input directamente en un inline.

**Implementación actual**: `WidgetRenderer` con varios tipos predefinidos.

#### Bottom sheets

**Definición**: para elecciones intermedias, cuando el usuario ya decidió realizar la tarea.

**Variantes**:

1. **Confirmación simple**: botón de acción.
   - Ejemplo: pagar factura → detalle + botón "Confirmar pago".

2. **Confirmación reforzada**: deslizar para confirmar en acciones críticas (con fallback en botón accesible).
   - Ejemplo: transferencias de alto monto.

3. **Multi-paso**: seleccionar → revisar → confirmar.
   - Ejemplo: recargar celular → elegir número, monto, confirmar.
   - Formato de árbol de decisión, permitiendo volver al paso anterior.

**Comportamiento**:

- **Cancelación**: pueden abortarse con la X, salvo cuando haya una ejecución en progreso (ej. envío de dinero).
- **Estados posibles**: Activa, Cargando, Éxito, Error. Puede mostrarse o no al usuario.
- **Tiempo**: pueden incluir un indicador que avise al usuario que necesita responder en cierto plazo.

**Implementación actual**: `BottomSheet` con `FlowEngine` para flujos multi-paso.

#### Background tasks

**Definición**: TBD

#### Carrito

**Definición**: TBD

#### Fixed Card

**Definición**: TBD

### 4.2 De negocio

Son componentes específicos de funcionalidades fintech (Mercado Pago) y e-commerce (Mercado Libre). Se documentan de manera general como tipos de widgets especializados.

#### Fintech (Mercado Pago)

- Transferencia con contacto duplicado y múltiples cuentas.
- Crear reserva de ahorro y modificarlo.
- Consulta de gastos por categoría.
- Pago de factura con elección de medio de pago.
- Reintento de transferencia automática fallida.
- Consulta de préstamos activos y oferta proactiva.

#### Ecommerce (Mercado Libre)

- Estado de envío.
- Gestión de reclamos.
- Devolución de producto.

## Implementación en el Proyecto

### Decisiones Arquitecturales

1. **Flujos Informativos vs Interactivos**:
   - **Informativos** (balance, consultas): se muestran inline con widgets.
   - **Interactivos** (transferencias, pagos): requieren bottom sheet para input del usuario.

2. **Mensajes de UI**:
   - Los mensajes generados por acciones de UI tienen estilo distintivo.
   - Background transparente + borde punteado gris.
   - Se usa `pushUIMessage()` para diferenciarlos.

3. **Confirmaciones**:
   - Aparecen inmediatamente cuando el usuario confirma una acción.
   - Se muestra widget de confirmación con todos los detalles.
   - Incluye botón "Compartir comprobante".

4. **Layout**:
   - Header fijo con backdrop-blur.
   - Input fijo en la parte inferior.
   - Conversación scrollable entre ambos elementos.

### Próximos Pasos

- [ ] Implementar Smart Suggestions basadas en el texto del usuario.
- [ ] Agregar soporte para Triggers (@, $, /).
- [ ] Desarrollar más tipos de widgets inline expandibles.
- [ ] Implementar persistencia de flujos cancelados.
- [ ] Agregar Background Tasks para operaciones asíncronas.
- [ ] Crear componentes de negocio específicos (fintech/ecommerce).

### Referencias

- [Componente de Chat](../components/chat/)
- [Sistema de Flujos](../lib/flows/)
- [Widgets Disponibles](../components/chat/WidgetRenderer.tsx)
- [Demo Unificado](../lib/demos/unified-assistant.tsx)
