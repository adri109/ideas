# 14. El hallazgo de los cinco canales

Dato aportado desde el taller: los pedidos entran por **dos correos distintos** ("lo cual es un
lío"), el teléfono fijo, WhatsApp y en persona en el local. Cinco vías.

Eso reordena el plan del [capítulo 12](12-caso-imprenta-dtf.md), y para mejor.

## 14.1. Por qué esto es el problema y no los archivos

En el capítulo 12 señalé como hueco el tramo de entrada: convertir un WhatsApp caótico en un
pedido estructurado. Iba bien encaminado pero se quedaba corto. El problema de fondo no es que el
mensaje venga desordenado: es que **no existe una bandeja**. Cinco puertas y ningún sitio donde
esté todo.

Las consecuencias son mecánicas, no opinables:

- **Nadie sabe el volumen real.** Es imposible decir cuántas consultas entraron el mes pasado, así
  que tampoco se puede saber cuántas se perdieron. Lo que no se ve no se gestiona.
- **Se cae trabajo entre canales.** Una persona contesta el WhatsApp, otra ve uno de los correos,
  el del mostrador se va con un precio dicho de palabra que no queda registrado en ningún sitio.
- **No hay estado.** ¿Cuántos presupuestos están esperando respuesta del cliente ahora mismo?
  Nadie lo sabe, y por tanto nadie hace seguimiento. Ese es dinero ya trabajado que se abandona.
- **Dos correos son dos historiales.** El mismo cliente aparece en dos sitios, sin histórico
  unificado ni precios consistentes.
- **El precio depende de quién coja el teléfono.** Sin tarifa aplicada por un sistema, el mismo
  trabajo se cotiza distinto según el día y la persona.

Y hay algo que lo hace mejor como oportunidad: **es un problema que las herramientas del sector no
resuelven.** CotizaPrint y compañía te dan un cotizador donde alguien teclea el trabajo. Ninguna se
mete en tus dos buzones, tu WhatsApp y tu mostrador para consolidarlo. Ese trozo sigue vacío.

## 14.2. El producto se redefine: bandeja única con presupuesto asistido

La primera pantalla no es un cotizador. Es **todo lo que ha entrado hoy, en un sitio, con su
estado**:

1. **Recogida** de los dos correos, WhatsApp y un formulario de captura rápida de treinta segundos
   para el mostrador y el fijo.
2. **Unificación por cliente**, deduplicando lo que llega dos veces por dos vías.
3. **Extracción** de lo que se pide: producto, cantidad, tallas, plazo.
4. **Revisión del archivo** contra el tamaño real de estampación, si hay archivo.
5. **Borrador de presupuesto** con las tarifas del taller, para validar en un clic.
6. **Estado y seguimiento**: pendiente de presupuestar, presupuestado, esperando cliente, aprobado,
   en producción. Y aviso automático a los 3, 7 y 14 días de lo que sigue sin respuesta.

El orden de esa lista es el orden de construcción. Y fíjate en cuál es el primer valor entregado:
**visibilidad**. Antes de automatizar nada, poder decir "este mes entraron 180 consultas, se
presupuestaron 140 y 45 siguen sin respuesta" ya vale dinero, porque nadie en el taller lo sabe hoy.

## 14.3. La respuesta a "si hay que moverlo a otro sector, se mueve"

No hace falta moverlo. Hay que separar dos cosas que estaban pegadas:

> **El laboratorio se queda en la imprenta. El mercado se elige por ticket.**

La razón es que el producto que acaba de definirse tiene dos capas con propiedades muy distintas:

| Capa | ¿Es específica de imprenta? | ¿Viaja a otros sectores? |
|---|---|---|
| Bandeja única, extracción, estado y seguimiento | No | **Sí, entera** |
| Revisión de archivos y tarifas de estampación | Sí | No |

El caos de cinco canales con presupuesto a medida es **idéntico** en reformas e instaladores,
restauración de siniestros, talleres de vehículos, carpintería y cristalería a medida, servicios
náuticos o eventos. Dos correos, un WhatsApp, un fijo y gente que entra por la puerta. Lo único
específico de tu sector es la parte de los archivos.

Consecuencia práctica y bastante liberadora: **construye apoyándote en la capa que viaja**. Si el
núcleo es la bandeja y el seguimiento, el mismo trabajo sirve para vender a talleres de
personalización a 39-99 €/mes o a un vertical de ticket alto a 300-600 €/mes. Si el núcleo fuera el
preflight, te quedarías encerrado en el sector con el precio más bajo.

Y no pierdes nada de la ventaja del capítulo 13: sigues teniendo acceso, datos reales y una usuaria
garantizada para construir. Solo dejas de asumir que quien construyes para es quien te paga.

## 14.4. Validar dos mercados en paralelo, no uno

Cambio concreto sobre el sprint del capítulo 12. En las mismas dos semanas:

| | Mercado A · Talleres de personalización | Mercado B · Servicios de ticket alto |
|---|---|---|
| Quiénes | Serigrafía, bordado, vinilo, láser, DTF de otras provincias | Reformas, instaladores, restauración de siniestros, carpintería a medida |
| Cómo llegas | Red de colaboradores de tu propia imprenta: contacto templado | Frío, pero con la auditoría como argumento |
| Precio esperable | 39-99 €/mes | 300-600 €/mes más variable |
| Clientes para 3.000 €/mes | 40-60 | 6-10 |
| Ventaja | Hablas su idioma y tienes el caso exacto | El mismo esfuerzo vale entre 5 y 10 veces más |
| Desventaja | Ticket bajo, hacen falta muchos | No conoces el oficio |

**Reparto sugerido de las 10-15 entrevistas: 8 en el mercado A y 5 en el B.** Al día 14 no
preguntas solo "¿existe el problema?", sino **"¿en cuál de los dos mercados me dicen antes que sí
y a qué precio?"**. Esa pregunta la contestan los números, no la intuición, y es la que decide
dónde inviertes el año siguiente.

Si el mercado B responde mejor, no habrás perdido nada: el producto es el mismo y tu imprenta
seguirá siendo el sitio donde lo pruebas antes de instalarlo en un cliente que paga diez veces más.

## 14.5. Lo que hay que medir ahora, por canal

La medición del capítulo 12 necesita una dimensión más: **el canal**. Sin eso no se puede
diagnosticar nada, y con eso aparece el primer titular casi solo.

Usa [`plantillas/09-mapa-de-canales.md`](../plantillas/09-mapa-de-canales.md) para retratar cómo
funciona hoy el taller, y la versión por canal de
[`plantillas/08-linea-base-imprenta.csv`](../plantillas/08-linea-base-imprenta.csv) para las dos
semanas de datos.

Las tres preguntas que la medición tiene que responder, en este orden:

1. **¿Cuánto entra por cada puerta?** Reparto de consultas entre los dos correos, WhatsApp, fijo y
   mostrador.
2. **¿Qué puerta pierde más?** Tiempo de respuesta y tasa de abandono por canal. Mi apuesta es que
   el fijo fuera de horario y el segundo correo son los agujeros, pero eso hay que verlo.
3. **¿Cuánto vale lo que se cae?** Consultas perdidas al mes multiplicado por el ticket medio y por
   la tasa de conversión habitual. Ese número es el argumento de la conversación con tu tía y,
   más adelante, el de la venta.

## 14.6. Dos victorias rápidas antes de construir nada

Ambas cuestan cero y se pueden hacer esta semana:

- **Unificar los dos buzones.** Si los dos correos son comerciales, una regla de reenvío a un
  buzón compartido resuelve hoy la mitad del lío. Mídelo antes para poder demostrar la mejora, y
  compruébalo con tu tía primero: puede que uno de los dos tenga un motivo (administración,
  proveedores, un cliente grande) que no es evidente desde fuera.
- **Una hoja de captura para mostrador y fijo.** Cinco campos y un móvil o una tablet en el
  mostrador. Deja de perderse lo que se dice de palabra y, de paso, empiezas a tener datos de los
  dos canales que hoy son invisibles.

Ninguna de las dos es el producto. Las dos hacen que el problema se vea, que es el paso previo a
que alguien pague por resolverlo.
