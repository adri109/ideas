# 10. El siguiente paso: sprint de validación de 14 días

## 10.1. La respuesta corta

El siguiente paso **no es construir nada**. Es tomar una única decisión —qué vertical— y
gastar dos semanas comprando evidencia de que el problema existe, usando el teléfono en lugar
del editor de código.

Suena poco ambicioso y es exactamente donde se decide el resultado. El modo de fallo más
común de este tipo de proyectos no es técnico: es construir seis meses para un problema que
nadie tenía tanta prisa en resolver. Un sprint de 14 días cuesta unas 40-50 horas y menos de
60 € en telefonía, y separa las dos únicas posibilidades que importan: o hay un negocio ahí
debajo, o has ahorrado seis meses.

Este sprint es la **fase 0 del [capítulo 7](07-la-mejor-idea.md) comprimida de tres semanas a
dos**, con una puerta de decisión explícita al final. Todo el material para ejecutarlo está en
la carpeta [`plantillas/`](../plantillas/).

## 10.2. Antes de empezar: la decisión que lo desbloquea todo

Elegir el vertical es el 80 % del resultado y la gente lo posterga porque parece reversible.
No lo es en la práctica: cambiar de vertical cada tres semanas te deja con cero conocimiento
acumulado en ninguno, y es lo que convierte un proyecto de seis meses en un año de
movimiento sin avance.

Usa [`plantillas/00-seleccion-de-vertical.md`](../plantillas/00-seleccion-de-vertical.md):
puntúas **tres** candidatos con cinco criterios, y el desempate no lo gana el que tiene mejor
mercado sino **el que tiene mejor acceso** —donde ya conoces a alguien que te abre cinco
puertas. La distribución vence al tamaño de mercado cuando tienes cero clientes.

Tiempo asignado: **una tarde**. No más. Si tras una tarde no está claro, elige el de mejor
acceso y sigue adelante; la información que falta solo aparece llamando.

## 10.3. El sprint, día a día

**Empieza en lunes.** No es un detalle estético: la auditoría del apartado siguiente necesita
un viernes por la noche y un sábado por la tarde, que es cuando el problema que vendes se
manifiesta.

### Días 1-2 · Vertical y lista (6-8 h)

- Puntúa tres verticales y elige uno.
- Construye una lista de **60 negocios** con nombre, teléfono, web, formulario de contacto y,
  si aparece, nombre del dueño. Fuentes: Google Maps, directorios del gremio, asociaciones
  sectoriales, grupos de Facebook profesionales.
- Registra todo en [`plantillas/01-auditoria-encubierta.csv`](../plantillas/01-auditoria-encubierta.csv).

### Días 3-5 · Auditoría encubierta (4-5 h, incluye viernes noche y sábado tarde)

- Viernes por la noche: rellena el formulario web de **20** negocios con una consulta real y
  verosímil (necesito presupuesto para X, ¿cuándo podríais venir?).
- Sábado por la tarde: llama a **20** negocios distintos. Anota si contestan, en cuántos
  timbres, si hay buzón, y si devuelven la llamada (y cuándo).
- Lunes: cuenta cuántos de los 40 te han respondido, y en cuánto tiempo.

Esto produce dos cosas a la vez: tu estudio de mercado y **tu mejor argumento de venta**, que
es un dato sobre el propio negocio del cliente. Es la diferencia entre "la IA mejora la
atención al cliente" y "llamé el sábado a las 18:40 y nadie cogió el teléfono".

### Días 6-10 · Entrevistas (10-14 h)

- Consigue **10-15 conversaciones** de 20 minutos con dueños o responsables. Usa los mensajes
  de [`plantillas/03-mensajes-de-contacto.md`](../plantillas/03-mensajes-de-contacto.md);
  pide consejo, no vendas.
- Sigue [`plantillas/02-guion-entrevista.md`](../plantillas/02-guion-entrevista.md) sin
  saltarte la regla principal: **no menciones tu solución hasta la pregunta 11**. En el
  momento en que la mencionas, la persona pasa de informarte a ser amable contigo, y los datos
  se contaminan.
- Anota literalmente las frases que usan para describir el problema. Ese vocabulario es el
  texto de tu página de oferta; no lo reescribas en lenguaje de consultor.

### Días 11-12 · Oferta y demo (6-8 h)

- Escribe la oferta en una página con precio explícito, usando
  [`plantillas/04-oferta-una-pagina.md`](../plantillas/04-oferta-una-pagina.md).
- Monta una **demo de 90 segundos con herramientas de terceros**, sin escribir código: un
  número de teléfono, un agente de voz configurado con las preguntas del oficio, y el aviso
  inicial de que es un asistente automático. La demo tiene que ser grabable y enviable por
  WhatsApp; no tiene que estar terminada, tiene que ser creíble.
- Rellena la hoja de economía unitaria
  ([`plantillas/05-economia-unitaria.csv`](../plantillas/05-economia-unitaria.csv)) con los
  costes reales de lo que acabas de montar, no con estimaciones.

### Días 13-14 · Conversaciones de venta (6-8 h)

- Vuelve a los entrevistados que mostraron interés y a los negocios de la auditoría que
  quedaron peor, con la evidencia en la mano y la demo grabada.
- Objetivo del día 14: **3 demos agendadas** con intención real de compra, y la puerta del
  apartado siguiente resuelta.

Los pilotos de pago se cierran en la fase 1 (semanas 3-7), no aquí. Intentar cerrar y validar
en la misma quincena es lo que hace que se abandonen los dos.

## 10.4. La puerta del día 14: los cuatro resultados posibles

Al final del día 14 tienes tres números. Decide con ellos, no con la sensación:

| Número | Cómo se mide | Umbral |
|---|---|---|
| **Tasa de dolor** | De cada 10 entrevistados, cuántos describen el problema **sin que tú lo menciones** | ≥ 3 |
| **Evidencia del mercado** | De los 40 negocios auditados, cuántos no respondieron en 24 h | ≥ 20 |
| **Intención** | Demos agendadas con fecha en el calendario | ≥ 3 |

**Los cuatro desenlaces y qué hacer con cada uno:**

- **Los tres umbrales se cumplen** → adelante con la fase 1 del [capítulo 7](07-la-mejor-idea.md):
  tres pilotos de pago en las semanas 3-7. Ya no estás explorando, estás ejecutando.
- **Hay dolor y evidencia, pero nadie agenda** → el problema es real y tu **oferta** falla.
  No cambies de vertical: cambia el precio, el riesgo que asumes (garantía más agresiva) o el
  alcance (empieza solo con formularios web y fuera de horario, sin voz, que es la objeción
  más frecuente). Repite los días 11-14.
- **Hay evidencia pero nadie siente el dolor** → el vertical está mal elegido: pierden
  consultas pero no les duele porque tienen trabajo de sobra o el ticket es bajo. Vuelve al
  día 1 con el segundo candidato de tu hoja de puntuación. Has perdido dos semanas, no seis
  meses; eso es el sprint funcionando, no fallando.
- **Ni dolor ni evidencia** → este vertical no tiene el problema. Segundo candidato. Y si te
  ocurre con dos verticales seguidos, considera la variante alternativa del apartado 7.9 o
  empieza por **E1** (aplicar agentes a tu propia actividad), que tiene retorno casi seguro.

Escribe la decisión y la fecha en el registro de decisiones. Decidir por escrito es lo que
impide que tres semanas después estés "aún explorando" sin haber descartado nada.

## 10.5. Lo que NO debes hacer estos 14 días

Cada una de estas cosas parece progreso y es evasión: son formas de sentirte productivo sin
exponerte al único juicio que importa, que es que alguien te diga que no.

- **Nada de código.** Ni un repositorio, ni un esquema de base de datos, ni un backend.
- **Nada de marca.** Sin nombre, sin logo, sin dominio, sin colores. Vendes con tu nombre y
  un documento de una página.
- **Nada de constituir sociedad.** Los tres primeros clientes se facturan perfectamente como
  autónomo; la estructura se monta cuando hay ingresos que la justifiquen.
- **Nada de comparar herramientas.** La elección de plataforma de voz o de orquestación es
  irrelevante hasta que tengas un cliente pagando. Coge la primera que funcione.
- **Nada de contenido ni redes.** Publicar resultados llega en la fase 2, cuando hay
  resultados. Publicar antes es hablar de un negocio que aún no existe.

## 10.6. Coste del sprint

| Partida | Coste |
|---|---|
| Número de teléfono para la demo | 5-15 € |
| Minutos de voz y modelo para la demo y las pruebas | 10-30 € |
| Hoja de cálculo y calendario | 0 € |
| Tu tiempo | 40-50 h |
| **Total en dinero** | **< 60 €** |

Ese es el punto: el precio de descubrir si esto funciona es de dos dígitos. Compáralo con el
capital que exigiría cualquier idea del bloque financiero para producir un resultado
comparable en información.

## 10.7. Qué tener preparado para el día 15

Si la puerta se abre, la fase 1 empieza con tres decisiones ya tomadas para no perder ritmo:

1. **Qué se instala el primer día en un cliente** y qué queda explícitamente fuera del
   alcance del piloto.
2. **El panel de antes/después.** El tiempo medio de respuesta previo (que ya tienes de la
   auditoría) y el posterior. Sin ese panel no puedes demostrar valor y la renovación depende
   de la simpatía, que es un pésimo modelo de negocio.
3. **La lista de verificación legal del [capítulo 8](08-riesgos-legal-y-cumplimiento.md)**
   resuelta: aviso de que es un sistema de IA en la primera interacción —obligatorio en la UE
   desde el 2 de agosto de 2026—, contrato de encargo del tratamiento firmado, aviso de
   grabación, y topes de gasto en las APIs. Son unas horas antes del primer cliente y un
   problema serio después.

## 10.8. Si ya tienes un negocio o actividad en marcha

Haz **E1 en paralelo** durante estas dos semanas: automatiza con agentes un proceso propio que
te robe tiempo cada semana. No compite con el sprint (son tipos de trabajo distintos: uno es
hablar con gente, el otro es construir en solitario), tiene retorno prácticamente seguro, y te
deja con lo que más falta hace el día que empiezas a vender: **un caso real, tuyo, con números
que puedes enseñar.**
