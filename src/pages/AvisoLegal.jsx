import LegalLayout from "../components/LegalLayout";

const Pending = ({ children }) => <span className="pending-flag">[PENDIENTE: {children}]</span>;

export default function AvisoLegal() {
  return (
    <LegalLayout title="Aviso Legal" updated="25 de junio de 2026">
      <h2>1. Datos identificativos del titular</h2>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad
        de la Información y de Comercio Electrónico (LSSI-CE), se informa de los siguientes datos: el
        sitio web <strong>betterai.es</strong> (en adelante, "el Sitio Web") es titularidad de:
      </p>
      <ul>
        <li>Denominación / Nombre y apellidos: <Pending>razón social o nombre completo del titular</Pending></li>
        <li>NIF / CIF: <Pending>NIF o CIF</Pending></li>
        <li>Domicilio: <Pending>domicilio fiscal o de notificaciones</Pending></li>
        <li>Datos registrales: <Pending>si procede, datos de inscripción en el Registro Mercantil</Pending></li>
        <li>Correo electrónico de contacto: <a href="mailto:betterai1@hotmail.com">betterai1@hotmail.com</a></li>
      </ul>
      <p>
        <em>
          Nota interna: BetterAI se encuentra actualmente en fase de constitución legal. Este apartado
          debe completarse con los datos fiscales definitivos antes de la publicación del Sitio Web.
        </em>
      </p>

      <h2>2. Objeto</h2>
      <p>
        El presente Aviso Legal regula el acceso y la utilización del Sitio Web, a través del cual
        BetterAI ofrece información sobre su servicio de recepción virtual basada en inteligencia
        artificial para negocios que gestionan citas (clínicas, centros de estética, fisioterapia y
        otros negocios similares), así como un formulario de contacto para solicitar información o una
        demostración del servicio.
      </p>
      <p>
        El acceso al Sitio Web es gratuito, salvo en lo relativo al coste de la conexión a internet
        suministrada por el proveedor de acceso contratado por la persona usuaria.
      </p>

      <h2>3. Condiciones de acceso y uso</h2>
      <p>
        El acceso y/o uso del Sitio Web atribuye la condición de usuario, que acepta, desde dicho
        acceso y/o uso, las condiciones generales recogidas en este Aviso Legal. El usuario se
        compromete a hacer un uso adecuado y lícito del Sitio Web, así como del contenido y los
        servicios ofrecidos a través de él, y a no emplearlo para incurrir en actividades ilícitas o
        contrarias a la buena fe y al orden público, o que de cualquier forma puedan dañar, inutilizar
        o sobrecargar el Sitio Web o impedir su normal utilización.
      </p>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>
        Todos los contenidos del Sitio Web (textos, imágenes, marcas, logotipos, combinaciones de
        colores, estructura, diseño, código fuente y demás elementos) son titularidad de BetterAI o de
        terceros que han autorizado su uso, y están protegidos por la normativa de propiedad
        intelectual e industrial. Queda prohibida su reproducción, distribución, comunicación pública
        o transformación, total o parcial, sin la autorización expresa de su titular, salvo en los
        casos en que la ley lo permita o resulte necesario con fines de información sobre el servicio.
      </p>

      <h2>5. Exclusión de garantías y responsabilidad</h2>
      <p>
        BetterAI no garantiza la disponibilidad y continuidad del funcionamiento del Sitio Web ni de
        los servicios. Cuando sea razonablemente posible, se advertirá previamente de las
        interrupciones en el funcionamiento del Sitio Web por labores de mantenimiento o
        actualización.
      </p>
      <p>
        El Sitio Web puede contener enlaces a sitios web de terceros. BetterAI no asume
        responsabilidad alguna por los contenidos, informaciones o servicios que pudieran aparecer en
        dichos sitios, que tendrán exclusivamente carácter informativo y que en ningún caso implican
        relación alguna entre BetterAI y las personas o entidades titulares de dichos sitios.
      </p>
      <p>
        El servicio de recepción virtual de BetterAI utiliza un agente de inteligencia artificial
        para interpretar y responder mensajes de forma automatizada. Aunque el agente está
        configurado para minimizar errores, sus respuestas pueden no ser exactas en todos los casos.
        El servicio no sustituye el criterio profesional del negocio cliente (médico, sanitario o de
        otra naturaleza) y este conserva en todo momento la responsabilidad final sobre la atención
        prestada a sus propios clientes y pacientes.
      </p>

      <h2>6. Protección de datos personales</h2>
      <p>
        El tratamiento de los datos personales facilitados a través del Sitio Web se rige por lo
        establecido en nuestra <a href="/politica-privacidad">Política de Privacidad</a>, que forma
        parte integrante de este Aviso Legal.
      </p>

      <h2>7. Legislación aplicable y jurisdicción</h2>
      <p>
        Las presentes condiciones se rigen por la legislación española. Para la resolución de cualquier
        controversia que pudiera surgir con motivo del acceso o uso del Sitio Web, y sin perjuicio de
        los derechos que, en su caso, asistan a los usuarios con la condición de consumidores para
        acudir al fuero correspondiente a su domicilio, las partes se someten a los Juzgados y
        Tribunales de <Pending>localidad de sumisión expresa</Pending>, España.
      </p>
    </LegalLayout>
  );
}
