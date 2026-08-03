# Plantilla 07 · La conversación con tu empresa y el acuerdo por escrito

Para quien trabaja por cuenta ajena y quiere probar la idea dentro. Se usa en los días 1-2 del
sprint, **antes de construir nada**.

Orden correcto: leer tu contrato → conversación → una página firmada → construir. Cambiar ese
orden es el error caro.

---

## Paso 1 · Lee tu contrato y busca estas cuatro cosas

| Qué buscas | Cómo suele aparecer | Qué implica |
|---|---|---|
| Exclusividad o plena dedicación | "dedicación exclusiva", "plena dedicación", con una compensación asociada | Solo válido con compensación económica expresa; puedes rescindirlo con 30 días de preaviso perdiendo esa compensación (art. 21.3 ET) |
| No competencia postcontractual | "durante los X meses siguientes a la extinción" | Máximo 2 años para técnicos, 6 meses para el resto, y solo válido con interés real de la empresa **y** compensación adecuada (art. 21.2 ET) |
| Cesión de propiedad intelectual | "cede a la empresa cuantos derechos…" | Puede ir más allá de lo que ya dice la ley por defecto |
| Deber de confidencialidad | "información confidencial", "secreto empresarial" | Marca qué no puedes contar fuera, incluidos los números que quieras usar como caso |

Si aparece cualquiera de las dos primeras, para y consulta con un laboralista antes de la
conversación. Una hora de consulta cuesta mucho menos que descubrirlo con el proyecto en marcha.

---

## Paso 2 · La conversación (20 minutos, con quien decide)

No la plantees como "tengo una idea de negocio". Plantéala como lo que es desde el punto de
vista de tu empresa: **una mejora concreta y medida, sin coste y sin riesgo.**

> "He estado mirando qué pasa con las consultas que entran fuera de horario. El mes pasado
> entraron [nº] y se quedaron sin contestar [nº]; el que llama un sábado normalmente llama
> también a otros dos, así que ahí se nos está escapando trabajo.
>
> Quiero montar una prueba acotada: un sistema que contesta esas consultas, hace tres preguntas
> y las deja agendadas, avisando siempre de que es un asistente automático. Empezaría solo con
> el formulario de la web y el fuera de horario, sin tocar nada de lo que ya funciona.
>
> Te propongo un mes de prueba con una métrica clara: tiempo de respuesta antes y después.
> Si no mejora, lo quitamos y no ha costado nada.
>
> Y te pido dos cosas a cambio: poder contarlo como caso de estudio con los números
> anonimizados, y poder reutilizar la parte genérica del sistema en proyectos propios fuera de
> aquí, en sectores que no compitan con nosotros. Lo que sea específico de la empresa se queda
> aquí, obviamente."

**Por qué funciona:** llegas con un número suyo, propones algo acotado y reversible, defines
cómo se mide, y pides la contrapartida en el mismo momento en que estás dando valor —no seis
meses después, cuando ya no tienes nada que ofrecer en el intercambio.

**Sé transparente sobre tu interés.** Decir "me interesa aprender a hacer esto y puede que
acabe montando algo con ello, por eso te pido el permiso ahora y no después" genera confianza.
Ocultarlo y que se descubra a mitad de camino destruye la relación y el proyecto a la vez.

---

## Paso 3 · La página que hay que firmar

No necesita lenguaje jurídico ni un abogado para redactarla; sí conviene que un laboralista la
revise si tu contrato tenía alguna de las cláusulas del paso 1. Cinco puntos:

```
ACUERDO SOBRE PROYECTO DE AUTOMATIZACIÓN INTERNA

Entre [empresa] y [tu nombre], con fecha [fecha].

1. ALCANCE
   Se implantará un sistema de atención automática de [canales concretos: formulario web
   y llamadas fuera del horario de X a Y]. Queda fuera del alcance: [lo que no se toca].
   Duración de la prueba: [30/60] días, con revisión el [fecha].

2. MÉTRICA
   El resultado se evalúa con: tiempo medio de respuesta, número de consultas atendidas
   y citas agendadas. Línea base medida el [fecha]: [números].

3. MEDIOS Y DEDICACIÓN
   El trabajo se realiza [dentro de la jornada / fuera de ella], utilizando
   [medios de la empresa / medios propios]. Coste de herramientas asumido por
   [empresa / tú], con un tope de [importe] € al mes.

4. TITULARIDAD Y REUTILIZACIÓN  ← el punto que importa
   a) La configuración, los datos y todo lo específico de [empresa] son de su propiedad.
   b) [Tu nombre] conserva el derecho a reutilizar los componentes genéricos y la
      metodología en proyectos propios ajenos a [empresa], siempre que no incluyan datos,
      configuraciones ni información confidencial de la empresa.
   c) [Tu nombre] podrá referirse a este proyecto como caso de estudio, con cifras
      [anonimizadas / con el nombre de la empresa], previa autorización de [persona].
   d) Este apartado constituye el "pacto en contrario" previsto en el art. 97.4 TRLPI.

5. DATOS PERSONALES
   La empresa es responsable del tratamiento. Autoriza expresamente el uso de
   [proveedor de IA] como subencargado para esta finalidad. Los datos no se utilizan
   para ningún fin distinto ni salen de los sistemas autorizados por la empresa.

Firmado:
[empresa]                          [tu nombre]
```

El apartado 4 es la razón de existir de este documento. Los otros cuatro son los que hacen que
firmarlo parezca razonable en lugar de una maniobra.

---

## Lo que no se hace, en ninguna circunstancia

- **Sacar datos de clientes de la empresa.** Ni para probar, ni anonimizados a medias, ni "solo
  un rato". El responsable del tratamiento es la empresa.
- **Vender a competidores directos de tu empleador mientras trabajas allí.** Es concurrencia
  desleal y no necesita que exista ningún pacto para ser un problema (arts. 5, 20 y 21.1 ET).
- **Facturar a tu propio empleador como autónomo** sin haberlo revisado con un asesor: puede
  interpretarse como encubrimiento de la relación laboral, y el problema es para las dos partes.
- **Construir tu proyecto propio en el portátil, las cuentas o los repositorios de la empresa.**
  La separación de medios tiene que ser evidente sin necesidad de explicarla.
- **Empezar a construir "y luego lo hablamos".** Antes de construir, la petición es razonable;
  después, es una negociación donde ya has entregado tu única baza.

---

## Si vas a facturar por tu cuenta a clientes de fuera

Recordatorio breve, porque llega antes de lo que parece (el primer piloto de pago externo):

- Ser asalariado y autónomo a la vez es legal y se llama **pluriactividad** (art. 313 LGSS).
- **No existe un umbral mínimo de facturación** por debajo del cual no haga falta darse de alta:
  la obligación nace de que la actividad sea habitual, personal y directa (art. 305 LGSS), no de
  cuánto factures.
- El alta son dos trámites: Hacienda (modelo 036/037 con el epígrafe correcto) y Seguridad
  Social (modelo TA.0521 marcando pluriactividad).
- Hay bonificación de la cuota del RETA por pluriactividad —del orden del 50 % los primeros 18
  meses con jornada completa—, **incompatible con la tarifa plana**, así que conviene comparar
  las dos opciones antes de elegir.
- Si la suma de bases de cotización de los dos regímenes supera el tope anual, se devuelve
  automáticamente parte de lo cotizado en exceso en el RETA.

Una consulta de una hora con una asesoría antes de emitir la primera factura evita casi todos
los errores de este apartado y cuesta menos que cualquiera de ellos.
