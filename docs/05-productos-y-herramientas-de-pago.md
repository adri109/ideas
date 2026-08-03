# 5. Productos y herramientas de pago: dónde faltan de verdad

Este bloque responde a la parte del encargo sobre "nichos donde falten herramientas de pago
que resuelvan problemas reales". La buena noticia es que hay un método razonablemente
sistemático para encontrarlos, y que los huecos están donde casi nadie mira.

## 5.1. La foto del mercado: dónde está la competencia y dónde no

Un mapeo de más de 30.000 empresas por nicho en 2026 deja un patrón muy nítido:

| Categoría | Empresas | % que son micro-SaaS | Lectura |
|---|---|---|---|
| Servicios del hogar y oficios | 963 | **0,4 %** | Mercado grande que ya paga, prácticamente sin producto indie |
| ONG y captación de fondos | 647 | **0,2 %** | Igual de desatendido |
| Restauración | 332 | 3,0 % | Desatendido |
| Control horario | 38 | 47,4 % | Probado y poco saturado |
| Gastos y control de gasto | 113 | 46,0 % | Probado y poco saturado |
| Formularios y encuestas | 91 | 40,7 % | Probado y poco saturado |
| Documentos y firma electrónica | 70 | 30,0 % | Probado y poco saturado |
| Comercio electrónico, agendas, apps de IA genéricas | miles | — | **Saturado. Evitar.** |

La conclusión es incómoda para quien viene de tecnología: **las categorías saturadas son
exactamente las que un fundador técnico elige por defecto**, porque construye para el sector
que conoce. Un fontanero no lee Hacker News y un patrón de barco de pesca no entra en Product
Hunt; sus problemas son invisibles desde dentro del sector tecnológico, y por eso siguen sin
resolver.

## 5.2. Método para encontrar un hueco real (no imaginado)

Cuatro señales que deben aparecer **a la vez**. Si falta alguna, sigue buscando.

1. **Un incumbente caro y sobredimensionado.** Existe software para ese sector, pero está
   pensado para la empresa grande y cuesta 79 $/mes o más. El hueco vive entre el "gratis con
   hoja de cálculo" y ese precio.
2. **Quejas sistemáticas y localizables.** Reseñas de 3,9-4,1 estrellas en Capterra o G2 con
   los mismos reproches repetidos ("informes insuficientes", "UX móvil"), hilos recurrentes de
   odio al software en el subreddit del gremio, y grupos de Facebook profesionales donde la
   gente pide recomendaciones.
3. **Un flujo de trabajo frecuente y pegado al dinero.** Facturación, presupuestos, cobro,
   cumplimiento, planificación. Lo que se hace todas las semanas y cuyo fallo cuesta dinero
   visible se paga; lo que se hace una vez al año, no.
4. **Disposición a pagar demostrada.** Ya están pagando algo peor (o pagando a una persona
   por hacerlo a mano). Rangos observados: 15-79 $/mes en micro-nichos, 99-399 $/mes en
   verticales profesionales.

**Validación antes de escribir código**: 10-20 entrevistas con profesionales del gremio,
reclutados en asociaciones sectoriales y grupos del oficio. No preguntes si usarían tu
producto; pregunta qué hicieron la última vez que tuvieron ese problema y cuánto les costó.

## 5.3. B1 · Micro-SaaS vertical con agente en un nicho aburrido — Puntuación 3,60

**La tesis.** El foso no es la tecnología —el modelo lo tiene cualquiera—, es el
**conocimiento del flujo de trabajo específico** y la integración con los sistemas viejos del
sector. Un desarrollador en solitario que ataca un nicho en profundidad, con distribución
creíble, alcanza típicamente 5.000-30.000 $ de ingreso recurrente mensual en unos 18 meses.
El 48 % de los negocios de software rentables los llevan equipos de tres personas o menos.

**Candidatos concretos documentados con datos de queja**, como punto de partida para tu
propia búsqueda:

| Nicho | Dolor concreto | Precio de referencia |
|---|---|---|
| Restauración de siniestros (agua, fuego, moho) | 3,9★ de media, +60 quejas sistemáticas; quieren seguimiento móvil de obra y automatización de renuncias de gravamen | 199-399 $/mes por taller |
| Clínicas de medicina estética | Ahogadas en historiales clínicos diseñados para atención primaria; hueco de mercado valorado en 9,5/10 | 149 $/mes por local |
| Veterinaria de especialidad (exóticos, equinos, urgencias) | Herramientas pensadas para animal pequeño generalista; +1.200 hilos de queja | 99 $/mes por veterinario |
| Detailing de coches y servicios a domicilio | Todo por WhatsApp y Excel; +40.000 huecos de funcionalidad etiquetados como "UX móvil" | 29 $/mes, se vende en grupos del gremio |
| Correduría de seguros independiente | Malabarismo con 3+ plataformas heredadas | 99 $/mes por agente |
| Gestión de espacios para eventos | Herramientas infrapotentes sin contratos ni depósitos, o precio de empresa grande | 29-49 $/mes |
| Gestión de suscripciones de software en pymes | Nadie de 20 personas necesita gobernanza; necesita saber qué paga y qué nadie usa hace 90 días | 19 $/mes |

**Dónde entra el agente.** No como "chat con IA" pegado en una esquina, sino haciendo el
trabajo administrativo que hoy hace el dueño a las 22:00: transcribir la visita en un parte,
convertir fotos de obra en un presupuesto, leer el correo del proveedor y actualizar el
estado, redactar el seguimiento del presupuesto no contestado. **El producto se vende por
las horas que devuelve, no por el modelo que usa.**

- **Primer euro**: 2-4 meses. **Ingreso relevante**: 9-18 meses. **Punto de no retorno**: 18-30 meses.

## 5.4. B2 · SaaS de cumplimiento con calendario forzado — Puntuación 3,65

**La mejor variante de B1**, y por una razón simple: la demanda no depende de convencer a
nadie de que tiene un problema. La fecha límite lo hace por ti, tiene presupuesto asignado, y
el coste de no comprar es una sanción.

**Calendario aprovechable en España y la UE** (verificar siempre el estado en el BOE o el
Diario Oficial antes de construir):

| Obligación | Quién | Desde | Estado |
|---|---|---|---|
| **Verifactu** (sistemas de facturación verificables) | Contribuyentes del Impuesto sobre Sociedades | **1 enero 2027** | Firme (RD 1007/2023, aplazado por RDL 15/2025) |
| **Verifactu** | Autónomos en IRPF, entidades en atribución de rentas, no residentes con EP | **1 julio 2027** | Firme |
| **Factura electrónica B2B** (Ley Crea y Crece) | Facturación > 8 M€ | ~octubre 2027 | RD 238/2026 aprobado; plazos cuentan desde una orden ministerial aún no publicada |
| **Factura electrónica B2B** | Pymes y autónomos < 8 M€ | ~octubre 2028 | Estimado, no confirmado |
| **Reglamento europeo de IA, art. 50** (transparencia) | Proveedores y desplegadores de IA generativa | **2 agosto 2026** (ya en vigor) | Marcado legible por máquina: prórroga al 2 diciembre 2026 para sistemas ya en mercado |

Están exentos de Verifactu quienes ya usan el SII, y los domiciliados en País Vasco (TicketBAI)
y Navarra. La AEAT **no publica un listado de software homologado**: la conformidad se
acredita por declaración responsable del fabricante, lo que baja mucho la barrera de entrada
frente a lo que la gente asume.

**El hueco no está en construir "otro programa de facturación"** —ese mercado está lleno—
sino en las piezas adyacentes que nadie quiere hacer: migración y verificación de datos entre
sistemas, agentes que auditan si la facturación de una asesoría con 300 clientes cumple los
requisitos, capas de reporte del estado de cada factura en 4 días hábiles, y para el
Reglamento de IA, herramientas de etiquetado y marcado de contenido sintético con trazabilidad
documental. Con multas de hasta 15 M€ o el 3 % de facturación mundial, el presupuesto existe.

Y hay un canal de distribución excelente y muy concentrado: **las asesorías y gestorías**.
Cada una tiene entre decenas y cientos de clientes obligados y va a necesitar herramientas
para pasarlos a todos. Vender a 20 asesorías es más fácil que vender a 3.000 autónomos.

- **Primer euro**: 3-5 meses. **Riesgo específico**: los plazos se aplazan (Verifactu ya se
  retrasó un año entero), así que no construyas un producto de un solo uso: construye algo
  que siga siendo útil el día después de la fecha límite.

## 5.5. B3 · Producto de datos propietario con API — Puntuación 3,35

Cuando el modelo es una materia prima, **el dato exclusivo es lo único que no se puede
replicar con un prompt**. La estructura: un agente recopila, normaliza y enriquece de forma
continua un conjunto de datos disperso y feo (registros públicos, licitaciones, expedientes
municipales, precios sectoriales, cambios normativos, oferta inmobiliaria de un mercado), y
lo vendes limpio por suscripción o por llamada.

El valor crece con el tiempo (el histórico no se puede improvisar) y el coste marginal de un
cliente adicional es casi cero. Es lento de arrancar y exige rigor legal sobre las fuentes:
condiciones de uso, derecho *sui generis* de bases de datos y protección de datos personales.

## 5.6. B4 · App dentro de un marketplace ajeno — Puntuación 3,33

Shopify, HubSpot, Slack, la tienda de extensiones de Chrome, el directorio de plantillas de
n8n. Resuelves el problema más caro de un producto nuevo —que alguien lo descubra— a cambio
de una comisión y de dependencia estratégica. Es un intercambio razonable para el primer
producto: **distribución prestada ahora, marca propia después**.

## 5.7. B5 · Servidor MCP o API de pago por llamada para agentes — Puntuación 3,05

La apuesta más especulativa del bloque y la que más puede crecer. Con x402 (basado en el
código HTTP 402), un servidor puede responder a la petición de un agente con un precio, el
agente paga con USDC y reintenta, y el servidor entrega. Sin registro, sin suscripción, sin
clave de API.

Los números que definen la oportunidad y su inmadurez a la vez: más de **11.000 servidores
MCP publicados y menos del 5 % monetizados**; precios de referencia con mediana de 0,028 $
por llamada (rango 0,002-0,440 $); e inclusión de x402 en AP2, la iniciativa de
estandarización de pagos para agentes liderada por Google, lo que le da probabilidad de
supervivencia.

**La regla que determina si cobras o no**: el precio tiene que estar en la respuesta 402, en
número exacto, en cada llamada. Un agente elige herramienta por descripción y precio; si tu
precio está "en la web" o es un rango, te descarta y llama a otro. Esa es toda la superficie
comercial que tienes ante un comprador que no lee marketing.

**Veredicto**: vale la pena poner un servidor de pago encima de algo que ya tengas (por
ejemplo el producto de datos de B3), como opción barata sobre un mercado futuro. No como
apuesta principal.

## 5.8. B6 · Plantillas, curso y comunidad — Puntuación 3,08

Vender el conocimiento del proceso en lugar del proceso. Funciona **solo como derivada de
haberlo hecho de verdad**: plantillas de flujos que usas con clientes reales, con resultados
verificables. Genera caja rápido y con margen altísimo, pero tiene techo bajo, decae rápido
al quedar obsoleto y compite con una avalancha de material gratuito. Es un ingreso
complementario legítimo, nunca el principal.

## 5.9. Cómo poner precio (y el error que arruina el margen)

El modelo de precios ha cambiado de forma importante y conviene no copiar el SaaS de 2018:

- **Híbrido (suscripción base + consumo) es el estándar por defecto**: 43 % de las empresas
  SaaS ya lo usan en 2026, con previsión del 61 % a final de año. Ejemplo: 49 €/mes con 1.000
  ejecuciones incluidas y 0,05 € por ejecución adicional.
- **Por resultado es el de mayor margen** cuando el resultado es medible y atribuible: por
  reunión agendada, por ticket resuelto, por lead cualificado. Se asocia a un 31 % más de
  retención y 21 % más de satisfacción. Es la mejor forma de vender a quien desconfía de la IA.
- **Por puesto está muriendo**: cuando un agente sustituye a cinco personas, cobrar por
  puesto no tiene sentido para ninguna de las dos partes. Se prevé que el 70 % de los
  proveedores abandone el modelo puro por puesto antes de 2028.

**El error que arruina el margen**: capa gratuita permanente. Quema inferencia sin
contrapartida. Usa pruebas limitadas en tiempo o en número de ejecuciones. Y mide el coste
por petición desde el primer día —la diferencia entre rentable y no rentable suele estar en
la estrategia de enrutado entre modelos, no en el precio.
