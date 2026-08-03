# 3. Mercados financieros: crypto, acciones y divisas

Este es el bloque que más ilusión genera y peor puntúa. Merece un análisis honesto porque la
conclusión no es "no lo hagas nunca", sino "no lo hagas *primero*, no lo hagas con dinero que
necesitas, y probablemente el negocio no esté en operar sino en vender a los que operan".

## 3.1. El punto de partida: qué dicen los datos, no los vendedores

Cuatro cifras que conviene tener presentes antes de escribir una línea de código:

| Dato | Cifra | Fuente |
|---|---|---|
| Cuentas minoristas en pérdidas (CFD/forex, media de 49 brókers regulados UE/FCA) | **71 %** (rango 51-81 %) | Divulgaciones obligatorias ESMA/FCA, 2026 |
| Rango original que motivó la intervención de ESMA en 2018 | **74-89 %** de cuentas en pérdida | ESMA |
| Operadores minoristas de bots de crypto no rentables en un ciclo completo | **75-90 %** | Triangulación de divulgaciones ESMA, estudios académicos y datos on-chain |
| Compradores de retos de prop firm que llegan a cobrar un pago | **~7 %** (5-14 % pasa el reto) | Datos agregados de FPFX/Track360, 2026 |

Estas cifras son estructurales, no coyunturales: llevan estables desde que ESMA obligó a
publicarlas en 2018. Y son la base sobre la que hay que evaluar cualquier promesa de
rentabilidad automatizada.

Un dato adicional que reordena las expectativas: los bots ya ejecutan alrededor del **65 %
del volumen global de crypto**. El competidor al otro lado de tu operación no es un humano
distraído, es un sistema institucional con mejor latencia, mejores comisiones y más datos.

## 3.2. D1 · Bot direccional de crypto (grid, DCA, señales) — Puntuación 1,93

**Qué es.** Un agente que ejecuta una estrategia sobre un exchange: rejilla en mercados
laterales, compras periódicas en tendencia alcista, o entradas según señales.

**Rendimientos realistas.** Las plataformas reportan retornos medianas de usuario en torno al
8-15 % anual, con el decil superior en 25-35 % y el cuartil inferior perdiendo un 5-15 %.
Un DCA bien configurado en mercado normal produce del orden de un dígito bajo o medio de
porcentaje **mensual**, no los resultados de las capturas de pantalla. Y hay un coste de
oportunidad brutal: mantener bitcoin sin hacer nada de enero 2024 a enero 2026 devolvió más
del 200 %, superando a muchos bots "rentables".

**Los siete modos de fallo** que explican la tasa de fracaso del 75-90 %: sobreajuste de
parámetros al histórico, sesgo de supervivencia en el backtest, ceguera al régimen de mercado
(una rejilla muere en tendencia fuerte; un seguidor de tendencia muere en rango), coste de
deslizamiento no modelado, comisiones acumuladas, apalancamiento, y el factor humano de
apagar el bot en el peor momento del drawdown.

- **Primer euro**: días (y también la primera pérdida).
- **Ingreso relevante**: exige capital. Con 10.000 € y un excelente 20 % anual son ~165 €/mes.
- **Riesgo**: pérdida total del capital asignado es un desenlace normal, no excepcional.
- **Veredicto**: **no como fuente de ingresos**. Como laboratorio de aprendizaje con una
  cantidad que puedas perder entera sin que cambie nada en tu vida, es defendible.

## 3.3. D2 · Delta-neutral / funding rate arbitrage — Puntuación 2,08

**Qué es.** Comprar el activo al contado y vender en corto el perpetuo por el mismo importe.
La exposición direccional se anula y cobras la tasa de financiación mientras sea positiva.
Es la estrategia crypto con mejor perfil riesgo/retorno accesible a un particular.

**Rendimientos realistas.** 4-15 % anual neto en mercados estables; 8-20 % en periodos de
financiación positiva sostenida; 3-8 % en los pares grandes (BTC, ETH, SOL) donde compites
contra miles de millones de capital de arbitraje. Los APY de 300 % de las pantallas son
anualizaciones de situaciones que duran horas.

**Riesgos que no desaparecen por ser "neutral":** liquidación de la pata corta en un pico
alcista (que te deja con exposición pura), inversión del signo de la financiación, riesgo de
base, y sobre todo **riesgo de contraparte del exchange**: ambas patas suelen estar en el
mismo sitio, y FTX sigue siendo el recordatorio.

- **Capital mínimo para que tenga sentido**: la estrategia consume capital en ambas patas y
  las comisiones (0,02-0,05 % por pata) se comen los márgenes estrechos. Por debajo de
  ~20.000 € el rendimiento absoluto no compensa el trabajo de vigilancia.
- **Veredicto**: la mejor de las ideas financieras para capital propio ya existente. Sigue
  siendo un mal punto de partida si el objetivo es *crear* ingresos.

## 3.4. D3 · Sistemático en acciones y ETF — Puntuación 2,05

**Qué es.** Un agente que ejecuta reglas sobre renta variable vía API de bróker: rebalanceos,
inversión periódica, sesgos por factores, gestión de aportaciones.

**El problema no es técnico, es aritmético.** La renta variable diversificada ofrece
históricamente algo del orden del 7-10 % anual nominal a largo plazo. Automatizarlo mejora la
disciplina y ahorra tiempo, pero no cambia la magnitud. Con 20.000 € invertidos, el 8 %
anual son ~133 €/mes, y llegan con la volatilidad incluida.

Donde sí aporta un agente: **no en elegir qué comprar, sino en la fontanería**. Consolidar
posiciones de varios brókers, avisar de desviaciones del plan, preparar la declaración de
operaciones, detectar comisiones ocultas, recordar aportaciones. Es valioso y aburrido, que
suele ser la combinación correcta.

- **Veredicto**: hazlo con tu propio patrimonio como higiene financiera, no como plan de
  ingresos. Y ojo: en cuanto lo haces *para otros* con parametrización personalizada, entras
  en territorio regulado (capítulo 8).

## 3.5. D4 · Prop firms con Expert Advisor — Puntuación 1,73

**Qué es.** Pagar por un reto de evaluación, superarlo con un algoritmo y operar capital de
la firma a cambio de un reparto (hoy 80-90 % estándar).

**Por qué puntúa tan bajo.** El 5-14 % pasa el reto, ~45 % de los que pasan llegan a cobrar
algo, y el resultado combinado es que **alrededor del 7 % de los compradores cobra alguna
vez**; solo un 1-3 % se convierte en operador pagado de forma consistente. El coste real de
llegar a fondeado son 2-4 intentos (860-1.035 $ en una firma típica de 50.000 $). Además el
40-50 % de las cuentas fondeadas se pierden en los primeros 90 días. La industria misma es
inestable: de un pico de 220+ firmas en 2023 se ha pasado a 120-150, con 80-100 cierres entre
2024 y 2025 —tu contraparte puede desaparecer con tu beneficio.

Y las reglas anti-algoritmo se han endurecido: prohibición de arbitraje de latencia, límites
de peticiones al servidor (con topes del orden de 2.000/día), ventanas de noticias vetadas,
reglas de consistencia que limitan qué porcentaje del beneficio puede venir de un solo día, y
en 2026 vetos al promediado a la baja en cuentas fondeadas.

- **Veredicto**: es un producto de suscripción disfrazado de oportunidad. El negocio rentable
  y comprobado aquí es el de la firma y el de sus afiliados (40-50 % de las compras vienen de
  afiliación, a 40-80 $ por conversión), no el del operador.

## 3.6. D5 · Forex y divisas fiat automatizado — Puntuación 1,53

**Es el peor de la lista y conviene ser explícito sobre por qué.** El arbitraje de divisas
entre brókers minoristas no existe como oportunidad: el mercado FX es el más líquido y
eficiente del mundo, con participantes que miden la latencia en microsegundos. Lo que se
vende como "arbitraje" a particulares es, en el mejor de los casos, exposición direccional
con apalancamiento; en el peor, un fraude. Las pérdidas por fraude de inversión en Reino
Unido alcanzaron 879,8 M£ en 2025 (+35 % interanual), con crypto y CFD/forex como las dos
categorías dominantes y un 36 % de los casos originados en redes sociales.

**El giro que sí tiene sentido en "intercambio de monedas fiat"** no es especular, sino
**mover dinero mejor que los bancos** (idea D6) o **construir herramientas de gestión de
divisa para pymes exportadoras**: comparar el coste real de conversión, detectar el margen
oculto que aplica el banco, avisar de coberturas, conciliar facturas multidivisa. Eso es un
micro-SaaS del bloque B, no una operativa, y no requiere licencia mientras no ejecutes pagos
ni asesores sobre instrumentos financieros.

## 3.7. D6 · Remesas y pagos transfronterizos con stablecoins — Puntuación 2,35

**Qué es.** Un negocio real de pagos: captar euros, mover valor por rail de stablecoin y
entregar moneda local más rápido y barato que la banca corresponsal.

**La oportunidad es genuina.** El objetivo del FSB para el G20 es que en 2027 el coste medio
global de remesas minoristas no supere el 1 %, y en octubre de 2025 el propio FSB reconocía
que difícilmente se cumplirá. La infraestructura ha madurado (Stripe vende aceptación de
stablecoin a aproximadamente la mitad de su comisión de tarjeta; Visa liquida en USDC).

**Y la barrera también es genuina.** En la UE, una stablecoin de moneda única es un
*e-money token* bajo MiCA, y su emisor debe ser entidad de crédito o **EMI** (capital inicial
mínimo 350.000 €) con notificación de white paper al supervisor 40 días hábiles antes. Si no
emites pero prestas servicios sobre cripto, necesitas autorización **CASP** (capital desde
50.000 €). El periodo de grandfathering para registros nacionales **expiró el 1 de julio de
2026**. Para remesas fiat puras basta una licencia de entidad de pago con alcance de envío de
dinero (20.000 € de capital inicial), que es la puerta de entrada más asequible.

Además, gran parte del ahorro del rail se evapora en las rampas de entrada y salida: el
cambio euro→stablecoin→moneda local reintroduce spreads y comisiones bancarias.

- **Veredicto**: negocio de varios cientos de miles de euros y equipo con perfil regulatorio.
  Fuera de alcance para un proyecto en solitario, pero excelente **cliente**: estas empresas
  necesitan proveedores de KYC, monitorización, conciliación y reporte —ahí sí hay hueco.

## 3.8. D7 · "Picos y palas": herramientas para quien opera — Puntuación 3,25

**La única idea del bloque financiero que asciende a la mitad alta del ranking**, y no por
casualidad: en una fiebre del oro, el margen fiable está en las palas.

Productos concretos con demanda demostrable y sin exposición de mercado:

- **Diario de operaciones con análisis automático**: el agente lee las operaciones importadas
  del bróker y produce el diagnóstico que el operador no quiere escribir (a qué hora pierde,
  qué setup le funciona, cuánto le cuesta romper su propia regla).
- **Motor de backtest honesto**: universo point-in-time, captura de deslizamiento en el
  momento de decisión, filtro de régimen. Precisamente las defensas cuya ausencia explica los
  siete modos de fallo del apartado 3.2.
- **Vigilancia y alertas de cartera cripto**: exposición real por activo, riesgo de
  contraparte por exchange, avisos de tasa de financiación con histórico de 7 días en lugar
  del dato puntual.
- **Reporte fiscal de operaciones** para el país concreto donde vivas: aburrido, doloroso,
  anual, con fecha límite y sin buenas soluciones locales en muchos mercados.

**La frontera legal es clara y hay que respetarla**: vender software que el usuario
parametriza no requiere autorización; parametrizarlo tú con datos del cliente convierte la
actividad en asesoramiento en materia de inversión y exige licencia previa de la CNMV. La
regla práctica: **describe el pasado y el estado actual, nunca recomiendes el futuro.**

## 3.9. Conclusión del bloque

Si de todo este capítulo hay que quedarse con una idea: **el dinero fiable en mercados
financieros para alguien que empieza no está en operar, está en resolver los problemas
operativos de quienes operan.** Y si aun así quieres operar, hazlo con capital que ya tengas,
con estrategia neutral antes que direccional, y tratándolo como una asignación de patrimonio
—no como un plan de ingresos.
