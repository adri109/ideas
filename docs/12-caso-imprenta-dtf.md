# 12. Caso concreto: imprenta de papel y textil DTF

Capítulo específico para el escenario real: trabajas en una imprenta que hace impresión sobre
papel y textil en DTF, además de diseños y montajes "para salvar el papel".

Ese último detalle es el más informativo de todos, y explica buena parte de lo que viene
después: "salvar el papel" es **nesting** (imposición en pliego, gang sheet en DTF), es decir,
el trabajo más repetitivo, más automatizable y más directamente ligado al margen de toda la
imprenta. Que sea parte de tu día a día significa que estás sentado justo encima del cuello de
botella. También significa, como vas a ver, que ese problema concreto ya lo ha resuelto otro.

## 12.1. Lo que cambia respecto al plan general

Tres correcciones al capítulo 7, y conviene decirlas de entrada:

1. **Las dos ideas más obvias del sector ya están construidas.** No las construyas.
2. **Una imprenta pequeña no paga 300-600 €/mes por ahorrar tiempo.** La economía unitaria del
   capítulo 7 estaba calibrada para servicios de ticket alto y no se transfiere.
3. **En tu sector, los talleres de al lado suelen ser colaboradores, no competidores.** Eso
   convierte el problema de concurrencia del capítulo 11 en una ventaja de distribución.

## 12.2. Comprobación de mercado: lo que ya existe

Antes de recomendarte nada he mirado si el hueco existe. En dos de los tres frentes evidentes,
no existe.

### Nesting y gang sheets DTF — mercado saturado, con opción gratuita

| Herramienta | Modelo | Precio |
|---|---|---|
| Free Gang Sheet Maker | Navegador, sin cuenta, procesa en local | **Gratis** |
| DTF Gang Sheet App | SaaS con auto-nesting y canal de blanco automático | Desde 40 $/mes o 0,15 $/hoja |
| Kixxl | Nesting automático más recorte y fondo | Suscripción |
| DTF Transfer Studio | Escritorio, varios algoritmos de empaquetado | Suscripción |
| Caldera PrimeCenter | Preflight y nesting profesional antes del RIP | Empresa |

Los fabricantes reclaman mejoras de aprovechamiento del 15-25 % frente al montaje manual y
reducciones del tiempo de preparación del orden del 90 % (son cifras de vendedor, no auditadas,
pero el mecanismo es real: un algoritmo de empaquetado rota e interbloquea formas irregulares
mejor que una persona en Illustrator).

**Conclusión: construir un nester es tirar meses.** Hay uno gratuito y varios maduros.

### Preflight — categoría madura y en manos de gigantes

Enfocus PitStop y Switch, callas pdfToolbox, Caldera PrimeCenter, DALIM. Resuelven resolución,
RGB frente a CMYK, fuentes no incrustadas, sangrado y transparencias, con corrección automática.
Un caso publicado por Enfocus habla de pasar de 45 minutos a 3 por pedido.

**Conclusión: no compitas con un motor de preflight.** Lo que sí sigue abierto es otra cosa,
y está en el apartado 12.3.

### ERP y presupuestos para imprenta — parcialmente servido, incluso en español

| Herramienta | Precio | Nota |
|---|---|---|
| CotizaPrint | Desde 65 €/mes (anual) | En español, hecho por impresores, integración WooCommerce, Verifactu en su hoja de ruta |
| Unik (Dataline) | Desde 240 €/mes | Web-to-print, incluye textil |
| Pressero (Aleyant) | Desde 399 $/mes | Tiendas B2B/B2C |
| Logic Print | 1.999 € licencia | Pago único |
| Wakaprint | 2.990-5.900 € | Pago único |

**Conclusión: un cotizador genérico ya existe a 65 €/mes y en tu idioma.** Construir otro es
entrar tarde a una carrera ya empezada.

Esta es, hoy, la información más valiosa que te puedo dar: **acabas de ahorrarte los tres
proyectos que probablemente habrías empezado.**

## 12.3. Dónde sigue habiendo hueco

Fíjate en lo que todas esas herramientas dan por supuesto: **que el pedido ya llegó ordenado**.
El ERP espera que alguien teclee el trabajo. El nester espera PNGs con fondo transparente. El
preflight espera un PDF.

Y la realidad de tu taller es otra: llega un WhatsApp que dice "hola, quiero 25 camisetas para
el equipo, ¿cuánto me costaría?", con una foto del escudo hecha con el móvil y, con suerte, un
Excel con nombres, dorsales y tallas. Entre ese mensaje y un pedido estructurado hay una persona
haciendo veinte minutos de interpretación, de pedir el archivo bueno tres veces y de calcular un
precio a mano.

**Ese tramo de entrada es el hueco.** Y no es casualidad que siga abierto: es exactamente el
tipo de trabajo desestructurado que un ERP de 2015 no puede hacer y que un modelo de lenguaje sí,
desde hace poco.

> **Actualización con datos del taller:** los pedidos entran por dos correos distintos, teléfono
> fijo, WhatsApp y mostrador. Eso convierte esta cuña en algo más grande y mejor definido —una
> bandeja única de entrada— y separa el sitio donde se construye del mercado al que se vende. Ver
> [capítulo 14](14-bandeja-unica.md), que sustituye la definición de producto de este apartado.

### Cuña 1 (recomendada) · Recepción inteligente de pedidos para talleres de personalización

El agente lee el mensaje entrante (texto, imagen y hoja de cálculo), y:

- Identifica producto, cantidad, tallas, colores y plazo.
- Comprueba el archivo **contra el tamaño real de estampación**: si el escudo va a 25 cm de
  ancho, ¿tiene píxeles suficientes?, ¿tiene fondo?, ¿es transparente?, ¿es vectorial?
- Si falta algo, lo pide en el idioma del cliente y con instrucciones concretas, no con jerga:
  "necesito el escudo con fondo transparente; el que me has mandado tiene fondo blanco y se vería
  un recuadro alrededor".
- Si está todo, devuelve **presupuesto automático** con las reglas de tarifa del taller.
- Deja el pedido montado y estructurado para que una persona solo valide.

No compite con CotizaPrint ni con el nester: se pone **delante** de ellos. Es la pieza que
ninguno cubre.

### Cuña 2 · La venta a grupos: tienda de club, peña o empresa

El pedido de 25 camisetas de un equipo no duele por imprimirlo: duele por **recoger tallas,
nombres, dorsales y dinero de 25 personas**, que hoy se hace por WhatsApp y acaba en una hoja
de cálculo con errores.

Una tienda mínima por grupo —el club comparte un enlace, cada miembro elige talla, escribe su
nombre y paga— convierte ese caos en un pedido cerrado y cobrado. Y esto es importante: **no
ahorra minutos, aumenta ventas**, porque el taller se atreve con encargos de grupo que hoy
rechaza o hace a regañadientes. Lo que genera ingresos siempre se paga mejor que lo que ahorra
tiempo.

Existe equivalente en el mercado anglosajón (DecoNetwork, InkSoft) a precios y complejidad de
otra liga. En España, para un taller de dos personas, está por validar —y validarlo es
exactamente para lo que sirven las entrevistas.

## 12.4. La corrección incómoda: cuánto paga realmente una imprenta pequeña

Hay que decirlo claro porque cambia los plazos. Un taller de 1-3 personas paga del orden de
**39-99 €/mes** por una herramienta, no 300-600 €. La referencia de mercado la marca
CotizaPrint en 65 €/mes.

Consecuencias directas:

- Para llegar a 3.000 €/mes necesitas del orden de **40-60 clientes**, no 6. El plazo del
  capítulo 7 se alarga: cuenta 12-24 meses en lugar de 6-9.
- **La implantación tiene que ser autoservicio casi desde el principio.** A 65 €/mes no puedes
  permitirte instalar a mano en cada taller; el coste de captación y arranque se come el año.
- Compensa parcialmente con un **segundo escalón de precio**: la cuña 2 (tienda de grupo) puede
  ir a 99-149 €/mes o llevar una parte variable por pedido, porque produce ingresos.
- Y considera un **modelo mixto**: implantación de pago (300-600 € una vez) para los primeros
  clientes, que financia el desarrollo mientras el producto se estandariza.

Si lo que quieres es facturación rápida, la conclusión honesta es que **este vertical es bueno
para construir un producto y malo para cobrar pronto**. La caja rápida, si la necesitas, sale de
aplicar la misma habilidad a un vertical de ticket alto de los del capítulo 7; el producto sale
de tu sector.

## 12.5. El piloto interno: qué automatizar en tu imprenta y qué medir

Aquí no hay dudas de mercado que resolver: es trabajo que ya se hace y que cuesta dinero medible.

**Victoria inmediata, sin construir nada (esta semana).** Coge una herramienta de nesting
existente —hay una gratuita— y compárala con tu montaje manual sobre los mismos trabajos de la
semana pasada. Mide dos cosas: metros de film consumidos y minutos de preparación. Si las cifras
del sector se sostienen aunque sea a la mitad, tienes un ahorro real que presentar. Es la forma
más barata de empezar la conversación del capítulo 11 con un número en la mano en lugar de con
una idea.

**El bucle a automatizar después**, por orden de dolor:

1. **Presupuesto desde WhatsApp**: del mensaje al precio, con las reglas de tarifa del taller.
2. **Triaje del archivo del cliente**: resolución al tamaño de estampación, fondo, formato.
3. **Petición automática de lo que falta**, con instrucciones que un cliente entienda.
4. **Seguimiento del presupuesto no contestado** a los 3, 7 y 14 días.
5. **Datos variables**: del Excel del club a archivos por jugador, con etiquetado de producción
   para que nadie tenga que adivinar qué transfer es de quién.

**Lo que hay que medir** (plantilla en
[`plantillas/08-linea-base-imprenta.csv`](../plantillas/08-linea-base-imprenta.csv)): minutos por
presupuesto, número de presupuestos al mes, porcentaje de trabajos que requieren pedir el archivo
otra vez, horas al mes en montaje, metros de film consumidos frente a metros útiles, y
presupuestos que se quedan sin contestar. Dos semanas de línea base antes de tocar nada.

Ese conjunto de números es simultáneamente el argumento para tu empresa, tu caso de estudio y la
especificación del producto.

## 12.6. El vertical adyacente: en tu sector, los de al lado colaboran

En el capítulo 11 el problema era que vender en tu sector es competir con tu empresa. En artes
gráficas hay una particularidad que juega a tu favor: **los talleres se subcontratan entre sí**.
El de vinilo manda el textil al de DTF, el de DTF manda el bordado al bordador, el de rotulación
manda el papel a la imprenta. Existe una red de colaboración real que en otros sectores no está.

Verticales adyacentes con el mismo problema de entrada y sin solape directo con tu taller:

- Serigrafía textil
- Bordado
- Sublimación
- Corte de vinilo y rotulación
- Grabado y corte láser
- Trofeos, premios y regalo personalizado
- Talleres DTF **de otras provincias** (mismo oficio, sin competencia real de mercado)

Dos consecuencias prácticas: la lista de 60 negocios del sprint sale en buena parte de la agenda
de proveedores y colaboradores de tu propia imprenta, y ese primer contacto es templado, no frío.
Y la conversación con tu empresa es mucho más fácil, porque no le estás pidiendo permiso para
ayudar a un competidor.

Aun así, escríbelo en el acuerdo: **venta permitida fuera de [tu área] y en oficios distintos al
de la empresa**. Explícito y por escrito, como el resto.

## 12.7. El sprint de 14 días, para tu caso

| Días | Dentro de tu imprenta | Fuera |
|---|---|---|
| 1-2 | Lee tu contrato. Conversación con quien decide (plantilla 07), con la prueba del nester ya hecha | Elige el adyacente: serigrafía, bordado, vinilo o láser |
| 3-5 | Empieza la línea base: dos semanas midiendo con la plantilla 08 | Auditoría de 40 talleres: manda una consulta real por WhatsApp y por formulario y cronometra la respuesta |
| 6-10 | Monta el triaje de WhatsApp para **un** tipo de trabajo (el más frecuente: textil con logo) | 10-15 entrevistas, muchas desde la red de colaboradores del taller |
| 11-12 | Mide el después y calcula el ahorro | Oferta de una página con precio de 39-99 €/mes y tu caso real como demo |
| 13-14 | Presenta el resultado en tu empresa | Cierra 3 demos |

**Las cinco preguntas que tienen que aparecer en las entrevistas**, además del guion general:

1. ¿Cuántos presupuestos haces a la semana y cuánto tardas en cada uno?
2. De cada diez archivos que te manda un cliente, ¿cuántos sirven tal cual?
3. ¿Cuántas veces al mes reimprimes o repites por un problema del archivo?
4. Cuando un club te pide 25 prendas con nombres y tallas, ¿cómo recoges esos datos y cuánto
   tiempo se te va?
5. ¿Qué software usas hoy y cuánto pagas? (si nombran CotizaPrint o similar, pregunta qué les
   falta: eso es tu especificación)

La segunda y la cuarta son las que deciden si las cuñas del apartado 12.3 son reales.

## 12.8. Si nada de esto valida

Tres salidas, todas razonables:

- **Línea de negocio para tu empresa en lugar de para ti**: DTF mayorista para talleres que no
  tienen máquina, con el pedido y el presupuesto automatizados. Es un ingreso nuevo para la
  imprenta, es tuya la idea y el trabajo, y es material de primer orden para negociar tu posición
  allí.
- **Mismo producto, otro sector con el mismo caos de entrada**: cualquier oficio donde el cliente
  manda un archivo o una medida por WhatsApp y alguien lo traduce a un presupuesto —carpintería a
  medida, cristalería, marcos, tapicería, cerrajería artística.
- **La habilidad, aplicada al vertical de ticket alto** del capítulo 7. Habrás aprendido a montar
  agentes de recepción y presupuesto con un caso real detrás; eso se vende igual de bien en
  reformas o restauración de siniestros, donde el cliente sí paga 300-600 €/mes.

## 12.9. Resumen en cinco líneas

- No construyas nester, ni preflight, ni cotizador genérico: ya existen, uno de ellos gratis.
- El hueco está **antes** de esas herramientas: convertir el WhatsApp caótico en pedido
  estructurado y presupuestado.
- La segunda cuña, la venta a grupos con tallas y nombres, es la que puede pagarse mejor porque
  genera ingresos en lugar de ahorrar minutos.
- Tu sector paga 39-99 €/mes: producto sí, caja rápida no.
- Y esta semana, gratis: mide el aprovechamiento de tu film con un nester existente y llega a la
  conversación con tu empresa con ese número.
