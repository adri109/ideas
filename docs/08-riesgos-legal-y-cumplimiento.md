# 8. Riesgos, legalidad y cumplimiento

Este capítulo no sustituye el asesoramiento de un profesional. Sirve para saber **qué
preguntar** y para no descubrir un problema regulatorio con el producto ya construido.

## 8.1. Reglamento europeo de IA, artículo 50 — aplicable desde el 2 de agosto de 2026

Es la norma que afecta a más ideas de este informe, y **ya está en vigor**.

**Cuatro obligaciones de transparencia:**

1. **Interacción con IA.** Quien provee un sistema que interactúa directamente con personas
   debe diseñarlo para que la persona sepa que habla con una IA, en la primera interacción,
   de forma clara y accesible. *Afecta directamente a la idea ganadora (capítulo 7).*
2. **Marcado legible por máquina** de contenido sintético (texto, imagen, audio, vídeo) por
   parte del proveedor, salvo función meramente asistiva de edición estándar. Prórroga hasta
   el **2 de diciembre de 2026** solo para sistemas ya en el mercado antes del 2 de agosto.
3. **Deepfakes.** Quien los despliega debe revelar que el contenido es generado o manipulado,
   antes de la primera exposición. Contenido claramente fantástico o imposible queda fuera de
   la definición; en obras artísticas o satíricas la obligación se reduce a revelarlo "de
   forma que no estorbe el disfrute de la obra".
4. **Texto de interés público** publicado para informar sin revisión editorial humana: debe
   etiquetarse.

**Puntos que se malinterpretan a menudo:**

- El marcado técnico del proveedor **no sustituye** la etiqueta visible que debe poner quien
  despliega. Ambas obligaciones pueden recaer sobre la misma salida, y una misma entidad
  puede ser proveedor y desplegador a la vez.
- Sanciones de hasta **15 M€ o el 3 % de la facturación mundial**, con proporcionalidad para
  pymes (se aplica la menor de las dos cifras).
- Adherirse al Código de Conducta sobre transparencia del contenido generado por IA es
  voluntario y sirve para demostrar cumplimiento; quien no se adhiera deberá demostrarlo por
  medios equivalentes.

**Traducción práctica para las ideas de este informe**: en cualquier agente que hable con
personas, la primera frase debe identificarlo como asistente automático, y debe quedar
registrado que así ocurre. Es barato hacerlo bien desde el principio y caro corregirlo después.

## 8.2. Mercados financieros: la línea que no se cruza

La regla clave, según las preguntas y respuestas de la CNMV para empresas fintech:

- **Comercializar un algoritmo o software directamente a inversores minoristas no requiere
  autorización ni registro de la CNMV**, siempre que sea el propio cliente quien lo
  parametrice.
- **Si tú lo parametrizas con información del cliente, es asesoramiento en materia de
  inversión** y requiere autorización previa. Solo pueden prestarlo sociedades y agencias de
  valores, sociedades gestoras de cartera, empresas de asesoramiento financiero, entidades de
  crédito y gestoras de IIC autorizadas.
- Las cuentas de gestión tipo MAM/PAMM se consideran gestión discrecional de carteras, que es
  servicio de inversión reservado.
- La propia CNMV advierte de que **no es deseable la venta indiscriminada de este tipo de
  software a minoristas**, aunque no esté prohibida.

Además, bajo MiFID II las empresas que hacen negociación algorítmica tienen obligaciones de
gobernanza, pruebas de resistencia, controles previos a la negociación y notificación al
supervisor —lo que refuerza que este es terreno de entidades autorizadas, no de proyectos
individuales.

**Regla operativa segura**: describe hechos pasados y estado actual (esto hiciste, esto
tienes, esto te costó), nunca recomendaciones futuras personalizadas. Y no toques dinero
ajeno bajo ninguna forma sin licencia.

**Cripto y pagos**: el periodo transitorio de MiCA para registros nacionales terminó el
**1 de julio de 2026**. Prestar servicios sobre criptoactivos en el EEE exige autorización
CASP (capital desde 50.000 €); emitir una stablecoin de moneda única exige ser entidad de
crédito o EMI (350.000 € de capital inicial) más notificación del white paper 40 días hábiles
antes; y una remesa fiat pura exige entidad de pago con alcance de envío de dinero
(20.000 €). Bajo MiCA, además, **está prohibido remunerar la tenencia de e-money tokens**.

## 8.3. Protección de datos

Aplica a prácticamente todas las ideas de servicio y producto:

- **Base jurídica y información** antes de tratar datos: si el agente atiende llamadas,
  informa de la grabación y de la finalidad al inicio, no al final.
- **Encargado del tratamiento**: si tratas datos de clientes de tus clientes, necesitas un
  contrato de encargo (art. 28 RGPD) con cada uno. Los proveedores de modelo son
  subencargados y deben estar declarados.
- **Transferencias internacionales** si el proveedor de modelo procesa fuera del EEE.
- **Minimización**: no envíes al modelo más datos de los necesarios, y evita entrenar con
  datos de clientes salvo consentimiento explícito.
- **Datos de salud** (clínicas): categoría especial del art. 9. Es la razón principal para
  limitar el agente a agendar y no acercarse a nada clínico.

## 8.4. Riesgo de plataforma

Cualquier ingreso que dependa de una cuenta que no controlas tiene un riesgo que no aparece
en la hoja de cálculo:

- **YouTube**: la política de contenido no auténtico se aplica al canal completo; los avisos
  por no declarar contenido sintético escalan a 90 días sin monetización y expulsión del
  programa de partners. Ventana de apelación de 21 días.
- **Meta y TikTok**: vigilancia activa del contenido sintético en publicidad; incumplir las
  normas de divulgación puede costar la cuenta publicitaria.
- **Exchanges de cripto**: riesgo de contraparte real; ambas patas de una operación neutral
  suelen estar en el mismo sitio.
- **Prop firms**: de un pico de más de 220 firmas en 2023 a 120-150 en 2026, con 80-100
  cierres entre 2024 y 2025. Tu beneficio depende de que la empresa siga existiendo.

**Mitigación general**: convertir audiencia prestada en audiencia propia (lista de correo,
contactos, contratos) lo antes posible, y no depender nunca de un solo proveedor crítico.

## 8.5. Riesgos económicos del propio modelo de negocio

- **Márgenes de IA, no de SaaS**: 50-60 % de margen bruto medio en aplicaciones de IA frente
  a 80-90 % del SaaS tradicional. Presupuestar con expectativas de SaaS clásico lleva a
  precios equivocados.
- **Consumo imprevisto**: el 78 % de los responsables de IT reportó cargos inesperados ligados
  a consumo de IA en el último año. Pon topes de gasto, alertas y paneles de uso desde el
  primer cliente.
- **La paradoja de Jevons**: los precios por token han caído unas 50 veces desde 2022 y aun
  así el gasto empresarial en IA creció un 320 % hasta 37.000 M$ en 2025. Que el modelo sea
  barato no significa que tu factura lo sea.
- **Concentración de clientes**: con 10 clientes, perder 2 es perder el 20 % del ingreso. El
  objetivo de la fase 3 (producto) es también un objetivo de diversificación.

## 8.6. Lista de verificación antes de facturar al primer cliente

- [ ] El agente se identifica como IA en la primera interacción y queda registrado.
- [ ] Contrato de encargo del tratamiento firmado, con subencargados declarados.
- [ ] Aviso de grabación y finalidad al inicio de cada llamada.
- [ ] Topes de gasto y alertas configurados en cada proveedor de API.
- [ ] Coste real por conversación medido, no estimado.
- [ ] Contrato de servicio con alcance, nivel de servicio y causas de terminación.
- [ ] Facturación cumpliendo el reglamento vigente y con hoja de ruta hacia Verifactu
      (1 enero 2027 sociedades / 1 julio 2027 resto).
- [ ] Ninguna funcionalidad que pueda interpretarse como asesoramiento financiero, jurídico
      o sanitario personalizado.
- [ ] Copia de seguridad y plan de recuperación si el proveedor principal falla.
