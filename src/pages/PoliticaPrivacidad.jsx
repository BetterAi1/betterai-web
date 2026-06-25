import LegalLayout from "../components/LegalLayout";

const Pending = ({ children }) => <span className="pending-flag">[PENDIENTE: {children}]</span>;

export default function PoliticaPrivacidad() {
  return (
    <LegalLayout title="Política de Privacidad" updated="25 de junio de 2026">
      <h2>1. Responsable del tratamiento</h2>
      <p>
        BetterAI (en adelante, "BetterAI", "nosotros") es responsable del tratamiento de los datos
        personales recogidos a través del Sitio Web <strong>betterai.es</strong> y de los servicios
        descritos en esta política.
      </p>
      <ul>
        <li>Denominación / Nombre: <Pending>razón social o nombre completo del titular</Pending></li>
        <li>NIF / CIF: <Pending>NIF o CIF</Pending></li>
        <li>Domicilio: <Pending>domicilio fiscal o de notificaciones</Pending></li>
        <li>Correo electrónico de contacto: <a href="mailto:betterai1@hotmail.com">betterai1@hotmail.com</a></li>
      </ul>

      <h2>2. Dos formas en las que tratamos datos personales</h2>
      <p>
        BetterAI trata datos personales en dos contextos distintos, con un papel diferente en cada uno
        de ellos:
      </p>
      <ul>
        <li>
          <strong>Como responsable del tratamiento:</strong> cuando recogemos los datos de las
          personas que visitan el Sitio Web y rellenan el formulario de contacto o solicitud de demo
          (datos de potenciales clientes de BetterAI).
        </li>
        <li>
          <strong>Como encargado del tratamiento:</strong> cuando, en virtud del contrato de
          prestación de servicios firmado con un negocio cliente (por ejemplo, una clínica o centro
          de estética), gestionamos en su nombre las conversaciones de WhatsApp de sus propios
          pacientes o clientes finales. En este segundo caso, el negocio cliente es el responsable
          del tratamiento de esos datos y BetterAI actúa como encargado, conforme al artículo 28 del
          Reglamento (UE) 2016/679 (RGPD), tratando los datos únicamente según las instrucciones
          documentadas del negocio cliente y para la finalidad de prestarle el servicio contratado.
        </li>
      </ul>

      <h2>3. Qué datos recopilamos</h2>
      <h3>3.1 A través del formulario web de contacto / demo</h3>
      <ul>
        <li>Nombre y apellidos</li>
        <li>Nombre de la empresa o negocio</li>
        <li>Correo electrónico</li>
        <li>Teléfono (opcional)</li>
        <li>Tipo de negocio</li>
        <li>Cualquier información que el usuario incluya voluntariamente en el campo de mensaje</li>
      </ul>
      <h3>3.2 A través del agente de WhatsApp (en nombre del negocio cliente)</h3>
      <ul>
        <li>Nombre del cliente o paciente final</li>
        <li>Número de teléfono de WhatsApp</li>
        <li>Contenido de la conversación necesario para gestionar la solicitud (preguntas, respuestas)</li>
        <li>Datos de la reserva o cita: servicio solicitado, fecha y hora, observaciones, cancelaciones o cambios</li>
      </ul>

      <h2>4. Finalidad del tratamiento</h2>
      <ul>
        <li>Responder a las solicitudes de información o demostración recibidas a través del formulario web.</li>
        <li>Gestionar la relación comercial y, en su caso, la ejecución del contrato de prestación de servicios con el negocio cliente.</li>
        <li>
          Prestar el servicio de recepción virtual: interpretar los mensajes recibidos por WhatsApp,
          responder preguntas frecuentes, recoger los datos necesarios y gestionar la solicitud, confirmación,
          modificación o cancelación de citas, todo ello en nombre y por cuenta del negocio cliente.
        </li>
        <li>Enviar comunicaciones relacionadas con el servicio solicitado, cuando exista una relación previa o consentimiento para ello.</li>
        <li>Cumplir con las obligaciones legales que sean de aplicación.</li>
      </ul>

      <h2>5. Base legal del tratamiento</h2>
      <ul>
        <li><strong>Ejecución de un contrato o relación precontractual:</strong> al rellenar el formulario de contacto o al iniciar una conversación de WhatsApp para solicitar información o una cita.</li>
        <li><strong>Interés legítimo:</strong> para gestionar y mejorar la atención prestada.</li>
        <li><strong>Consentimiento:</strong> cuando se solicite expresamente para finalidades adicionales, como el envío de comunicaciones comerciales.</li>
        <li><strong>Cumplimiento de obligaciones legales</strong>, cuando proceda.</li>
      </ul>

      <h2>6. Destinatarios y cesión de datos a terceros</h2>
      <p>
        Para poder prestar el servicio, BetterAI se apoya en proveedores tecnológicos externos que
        actúan como encargados del tratamiento (incluyendo, en algunos casos, agentes de inteligencia
        artificial de terceros) y que tratan los datos siguiendo nuestras instrucciones. Los
        principales proveedores utilizados actualmente son:
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Proveedor</th>
              <th>Función</th>
              <th>Ubicación</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Meta (WhatsApp Business / Cloud API)</td>
              <td>Canal de mensajería por el que el cliente final escribe y recibe respuestas</td>
              <td>Unión Europea / Estados Unidos</td>
            </tr>
            <tr>
              <td>Proveedor del modelo de inteligencia artificial (p. ej. OpenAI, GPT-4o-mini)</td>
              <td>Interpretación del lenguaje natural y generación de las respuestas del agente "Sofía"</td>
              <td>Estados Unidos</td>
            </tr>
            <tr>
              <td>n8n</td>
              <td>Orquestación de los flujos de automatización entre WhatsApp, la IA y la base de datos</td>
              <td>Unión Europea</td>
            </tr>
            <tr>
              <td>Airtable</td>
              <td>Base de datos de clientes, reservas, agenda y configuración del servicio</td>
              <td>Estados Unidos</td>
            </tr>
            <tr>
              <td>Hostinger</td>
              <td>Alojamiento de dominio / infraestructura</td>
              <td>Unión Europea</td>
            </tr>
            <tr>
              <td>Vercel / GitHub</td>
              <td>Alojamiento y despliegue del Sitio Web</td>
              <td>Estados Unidos</td>
            </tr>
            <tr>
              <td>FormSubmit</td>
              <td>Recepción y reenvío por correo electrónico de las solicitudes del formulario de contacto/demo</td>
              <td>Estados Unidos / Unión Europea</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        No vendemos ni cedemos datos personales a terceros para fines comerciales propios de dichos
        terceros. El acceso de estos proveedores a los datos se limita a lo necesario para prestar
        sus servicios a BetterAI, en virtud de los correspondientes contratos o acuerdos de
        tratamiento de datos (Data Processing Agreements).
      </p>
      <p>
        Algunos de estos proveedores se encuentran fuera del Espacio Económico Europeo (principalmente
        en Estados Unidos). Cuando esto ocurre, la transferencia internacional se realiza acogiéndose
        a las garantías previstas en el RGPD, tales como las Cláusulas Contractuales Tipo aprobadas
        por la Comisión Europea o, en su caso, decisiones de adecuación equivalentes.
      </p>

      <h2>7. Plazo de conservación</h2>
      <p>
        Los datos se conservarán durante el tiempo necesario para cumplir con la finalidad para la
        que fueron recogidos y, en el caso de los datos tratados por cuenta de un negocio cliente,
        durante el plazo que dicho negocio determine conforme a sus propias obligaciones legales
        (por ejemplo, las relativas a historiales o registros de actividad), o hasta que se solicite
        su supresión. Posteriormente, los datos se conservarán bloqueados durante los plazos legales
        de prescripción de responsabilidades que resulten de aplicación.
      </p>

      <h2>8. Derechos de las personas interesadas</h2>
      <p>Cualquier persona tiene derecho a:</p>
      <ul>
        <li>Acceder a sus datos personales.</li>
        <li>Solicitar la rectificación de datos inexactos.</li>
        <li>Solicitar la supresión de sus datos cuando, entre otros motivos, ya no sean necesarios.</li>
        <li>Solicitar la limitación u oposición al tratamiento de sus datos.</li>
        <li>Solicitar la portabilidad de sus datos.</li>
      </ul>
      <p>
        Estos derechos pueden ejercerse enviando una solicitud a{" "}
        <a href="mailto:betterai1@hotmail.com">betterai1@hotmail.com</a>, indicando el derecho que se desea
        ejercer y aportando la documentación necesaria para verificar la identidad. Si los datos se
        tratan en nombre de un negocio cliente (por ejemplo, datos recogidos por WhatsApp para
        gestionar una cita), también se pueden ejercer dichos derechos directamente ante ese negocio,
        que es el responsable del tratamiento en ese caso.
      </p>
      <p>
        Asimismo, se tiene derecho a presentar una reclamación ante la Agencia Española de
        Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>)
        si se considera que el tratamiento de los datos no se ajusta a la normativa vigente.
      </p>

      <h2>9. Medidas de seguridad</h2>
      <p>
        BetterAI aplica medidas técnicas y organizativas razonables para proteger los datos
        personales frente a accesos no autorizados, pérdida, alteración o destrucción, adaptadas al
        riesgo del tratamiento y al estado de la técnica.
      </p>

      <h2>10. Menores de edad</h2>
      <p>
        Los servicios ofrecidos a través del Sitio Web y del agente de WhatsApp están dirigidos a
        personas mayores de edad. No se recogen intencionadamente datos de menores sin el
        consentimiento de sus padres, madres o tutores legales.
      </p>

      <h2>11. Cambios en esta política</h2>
      <p>
        Esta Política de Privacidad puede actualizarse para adaptarse a novedades legislativas,
        jurisprudenciales o a cambios en los servicios prestados. Se recomienda revisar
        periódicamente esta página.
      </p>

      <h2>12. Contacto</h2>
      <p>
        Para cualquier duda relacionada con esta Política de Privacidad, puedes escribirnos a{" "}
        <a href="mailto:betterai1@hotmail.com">betterai1@hotmail.com</a>.
      </p>
    </LegalLayout>
  );
}
