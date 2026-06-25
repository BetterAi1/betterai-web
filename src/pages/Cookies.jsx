import LegalLayout from "../components/LegalLayout";

export default function Cookies() {
  return (
    <LegalLayout title="Política de Cookies" updated="25 de junio de 2026">
      <h2>1. Qué son las cookies</h2>
      <p>
        Las cookies son pequeños archivos de texto que un sitio web almacena en el navegador de la
        persona que lo visita. Permiten, entre otras cosas, recordar las preferencias de navegación,
        reconocer al usuario en visitas posteriores o analizar cómo se utiliza el sitio web.
      </p>

      <h2>2. Cookies que utiliza este Sitio Web</h2>
      <p>
        El Sitio Web <strong>betterai.es</strong> utiliza únicamente las cookies estrictamente
        necesarias para su funcionamiento técnico. Actualmente no instalamos cookies de análisis ni
        de publicidad propias.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Finalidad</th>
              <th>¿Requiere consentimiento?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Técnicas / necesarias</td>
              <td>
                Garantizar el correcto funcionamiento y la seguridad del Sitio Web (por ejemplo,
                cookies derivadas de la infraestructura de alojamiento en Hostinger y Vercel/GitHub).
              </td>
              <td>No, son imprescindibles para la prestación del servicio</td>
            </tr>
            <tr>
              <td>Analíticas</td>
              <td>No utilizadas actualmente.</td>
              <td>Sí, en caso de activarse en el futuro</td>
            </tr>
            <tr>
              <td>Marketing / publicidad</td>
              <td>No utilizadas actualmente.</td>
              <td>Sí, en caso de activarse en el futuro</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Si en el futuro incorporamos cookies analíticas o de marketing (por ejemplo, para medir el
        rendimiento del Sitio Web o de nuestras campañas), se mostrará un aviso o panel de
        configuración de cookies para solicitar el consentimiento previo de la persona usuaria,
        conforme exige la normativa aplicable.
      </p>

      <h2>3. Cookies del agente de WhatsApp</h2>
      <p>
        El servicio de recepción virtual de BetterAI se presta a través de WhatsApp, una plataforma
        propiedad de Meta. Las conversaciones por WhatsApp no dependen de las cookies del Sitio Web;
        el tratamiento de los datos enviados por ese canal se describe en nuestra{" "}
        <a href="/politica-privacidad">Política de Privacidad</a>.
      </p>

      <h2>4. Cómo gestionar o desactivar las cookies</h2>
      <p>
        La persona usuaria puede permitir, bloquear o eliminar las cookies instaladas en su
        navegador mediante la configuración de las opciones de su propio navegador de internet. A
        continuación, algunos enlaces de ayuda de los navegadores más utilizados:
      </p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/es/kb/Borrar%20cookies" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
        <li><a href="https://support.microsoft.com/es-es/microsoft-edge" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
      </ul>
      <p>
        Ten en cuenta que desactivar determinadas cookies técnicas podría afectar al correcto
        funcionamiento del Sitio Web.
      </p>

      <h2>5. Cambios en esta política</h2>
      <p>
        Esta Política de Cookies puede actualizarse cuando se incorporen nuevas funcionalidades al
        Sitio Web que impliquen el uso de cookies adicionales. Recomendamos revisar esta página
        periódicamente.
      </p>

      <h2>6. Contacto</h2>
      <p>
        Para cualquier duda relacionada con el uso de cookies, puedes escribirnos a{" "}
        <a href="mailto:hola@betterai.es">hola@betterai.es</a>.
      </p>
    </LegalLayout>
  );
}
