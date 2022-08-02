import { useTheme } from '@emotion/react';
import { Box, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import Layout from 'src/components/landingPage/Layout';

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundColor: '#010226',
    
    justifyContent:'center',
    alignItems: 'center',
    
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
        backgroundPosition:'top',
        paddingTop: '8vh',
        minHeight: '50vh',
      },
    [theme.breakpoints.down('md')]: {
        backgroundPosition:'inherit',
        padding:'8vh',
    },
  },
  containerText:{
      backgroundColor: 'white',
      minHeight: '50vh',
      textAlign: 'justify',
      [theme.breakpoints.up('md')]: {
        padding: '5vh 20vh',
      },
    [theme.breakpoints.down('md')]: {
        padding: '5vh 5vh',
    },
  }
}))

export default function Aviso() {

  const classes= useStyles()

  return (
    <Box className={classes.container}>
      <Grid container className={classes.hero} >
        <Typography variant='h4' sx={{color: 'white'}}>Aviso de Privacidad</Typography>
      </Grid>
      <Grid container className={classes.containerText}>
        <Typography variant='h6'>
        EN CUMPLIMIENTO A LO PREVISTO EN LA LEY FEDERAL DE PROTECCIÓN DE DATOS PERSONALES EN POSESIÓN DE LOS PARTICULARES SE PONE A LA DISPOSICIÓN DE LAS PERSONAS FÍSICAS EL SIGUIENTE AVISO DE PRIVACIDAD. ESTE DOCUMENTO TIENE COMO OBJETIVO HACER DEL CONOCIMIENTO DEL TITULAR DE LOS DATOS PERSONALES, LA INFORMACIÓN QUE ES TRATADA Y SUS FINALIDADES, ASÍ COMO LOS PROCEDIMIENTOS PARA EJERCER SUS DERECHOS DE ACCESO, RECTIFICACIÓN, CANCELACIÓN Y OPOSICIÓN. TODO ELLO, A FIN DE GARANTIZAR EL DERECHO DE LOS TITULARES A LA AUTODETERMINACIÓN INFORMATIVA CONFORME A LA LEGALIDAD.
        </Typography>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        1. GLOSARIO DE TÉRMINOS DEL AVISO DE PRIVACIDAD
        </Typography>
        <Typography variant='h6'>
        A. Aviso de Privacidad: Documento físico, electrónico o en cualquier otro formato generado por el Responsable que es puesto a disposición del Titular, previo al tratamiento de sus Datos Personales, en lo consecuente, el presente documento.
        <br />B. Cliente: Persona física o moral que haya contratado algún producto o servicio del Responsable, que a su vez es Titular de Datos Personales.
        <br />C. Datos de Autenticación: Es la información de acceso personal que el Usuario de la Plataforma haya creado para hacer uso de esta.
        <br />D. Datos de Contacto: Información que permite al Responsable mantener comunicación con el Titular, mediante correo electrónico, teléfono celular o análogos.
        <br />E. Datos de Identificación: Información concerniente a una persona física que permite diferenciarla de otras en una colectividad.
        <br />F. Datos Financieros y Patrimoniales: Información concerniente a una persona física relativa a sus bienes, derechos, cargas u obligaciones susceptibles de valoración económica, como pueden ser: bienes muebles e inmuebles.
        <br />G. Datos Personales: Cualquier información concerniente a una persona física identificada o identificable.
        <br />H. Datos Sensibles: Conforme a la Ley son aquellos Datos Personales que afecten a la esfera más íntima de su Titular, o cuya utilización indebida pueda dar origen a discriminación o conlleve un riesgo grave para este. Conforme al Centro de Políticas de Play Store para Android, se entiende como datos sensibles información de identificación financiera, de pago y de autenticación; datos relacionados con la agenda telefónica, contactos, ubicación del dispositivo, SMS y llamadas; inventario de otras aplicaciones en el dispositivo, el micrófono y la cámara.
        <br />I. Derechos ARCO: Derechos de acceso, rectificación, cancelación y oposición con los que cuenta el Titular, cuyo ejercicio se encuentra reconocido y regulado en la Ley y en el presente Aviso de Privacidad.
        <br />J. Ley: Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
        <br />K. Plataforma: Las Plataformas digitales las cuales pueden ser el sitio web https://www.montecavaconsultores.com o las aplicaciones móviles en iOS o Android denominadas “MONTECAVA APP”, según corresponda el uso.
        <br />L. Reglamento: Reglamento de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
        <br />M. Responsable: Persona física o moral de carácter privado que lleva a cabo el tratamiento de Datos Personales. En términos del presente Aviso de Privacidad se entiende por Responsable en lo consecuente al C. Hugo César Montemayor Cavazos.
        <br />N. Titular: La persona física a quien corresponden los Datos Personales registrados.
        <br />O. Tercero: La persona física o moral, nacional o extranjera, distinta del Titular o del Responsable de los datos.
        <br />P. Usuario: Quien haga uso de la Plataforma, siendo previamente Cliente del Responsable.
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        2. RESPONSABLE DEL TRATAMIENTO.
        </Typography>
        <Typography variant='h6'>
        El C. Hugo César Montemayor Cavazos, persona física y representante legal de Montecava App (para iOS y Android) y del sitio web https://www.montecavaconsultores.com, con domicilio en 2 de abril (Jesús Dionisio González) No. 1620, Col. Nuevo Repueblo, Monterrey, N.L., C.P. 64700, será el Responsable del uso, tratamiento y protección de los Datos Personales que le sean proporcionados por las personas físicas a quienes correspondan los mismos. A su vez el Responsable se compromete a respetar lo establecido en el presente Aviso de Privacidad, así como las disposiciones de la Ley y su Reglamento.
        <br /><br />De la misma forma, se hace de su conocimiento que, para cualquier duda, comentario, notificación y/o queja al respecto del manejo de sus Datos Personales puede dirigirse al correo electrónico hcmc_19@hotmail.com al número telefónico 811 489 3282 o en el domicilio previamente mencionado en días hábiles en un horario de 9:00 a.m. a 6:00 p.m.
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        3. DATOS PERSONALES QUE SERÁN TRATADOS
        </Typography>
        <Typography variant="h6">
        El Responsable recopila los siguientes Datos Personales de los Usuarios, quienes previamente han contratado los productos y servicios contables de este.
        <br />A. Datos de Identificación: Nombre y domicilio.
        <br />B. Datos de Contacto: Nombre y teléfono.
        <br />C. Datos de acceso: Usuario y contraseña.
        <br />D. Datos Financieros y Patrimoniales: Declaraciones fiscales, comprobantes (IMSS, AFORE, INFONAVIT, TESORERÍA), estados financieros y constancia de situación fiscal.
        <br />E. Datos sensibles: Datos de pago de tarjetas de crédito o débito como nombre, número de tarjeta, CVV y fecha de vencimiento.
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        4. DATOS SENSIBLES
        </Typography>
        <Typography variant="h6">
        El Responsable no somete a tratamiento Datos Personales Sensibles de los Titulares conforme a la Ley. No obstante, conforme al Centro de Políticas de Play Store para Android, la Aplicación utiliza datos para su desempeño como: datos de pago para suscribirse a los planes que se ofrecen en la Plataforma a través del sistema de pago seguro de Stripe, así como información financiera que es cargada por el Administrador concerniente a los Clientes de manera individual y privada.
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        5. FINALIDADES DEL TRATAMIENTO DE DATOS PERSONALES
        </Typography>
        <Typography variant="h6">
        El Responsable utiliza los Datos Personales con las siguientes finalidades: <br />
        <br />A. De autenticación:
        <br />1. Dar de alta al Usuario y proporcionar los servicios solicitados como Cliente.
        <br />2. Autenticar la identidad del Titular, mediante la creación de un Usuario.
        <br /><br />B. De servicio al Cliente:
        <br />1. Proveer los productos y servicios del Responsable hacia el Cliente.
        <br />2. Estar en contacto con el Usuario en caso de fallas de la Plataforma.
        <br />3. Brindar información de los productos y servicios solicitados.
        <br />4. Informar cambios en el servicio.
        <br />5. Contactar al Usuario por cualquier medio que le hubiere conferido al Responsable para dar seguimiento a los productos o servicios.
        <br /><br />C. De mantenimiento y seguridad.
        <br />1. Proteger la Plataforma de cualquier intento de fraude, operación ilícita, o riesgo.
        <br />2. Llevar a cabo de manera eficiente y operativa la Plataforma.
        <br />3. Garantizar que el contenido de la Plataforma sea el más eficiente.
        <br />4. Administrar la Plataforma, así como las operaciones internas del negocio, incluyendo servicio técnico, análisis de datos, pruebas, investigación y fines estadísticos.
        <br />5. Realizar evaluaciones periódicas de los servicios a efectos de mejorar la calidad de estos.
        <br />6. Para registro en la base de datos.
        <br /><br />D. Legales
        <br />1. Cumplir cualquier obligación contractual que se tenga con el Usuario.
        <br />2. Cumplir alguna obligación legal o regulatoria.
        <br />3. Cumplir con cualquier ley, disposición o Reglamento que sea aplicable.
        <br />4. Mantener la información necesaria actualizada en sistemas internos para poder mantener contacto con el Titular, así como para dar cumplimiento a disposiciones legales y posibles requerimientos de autoridades competentes u órganos regulatorios.
        <br />5. Atender las solicitudes de ejercicio de Derechos ARCO y de revocación de consentimiento.
        <br /><br />Es primordial hacer mención que el Responsable únicamente requerirá a los Usuarios de la información estrictamente necesaria para el funcionamiento de la Plataforma, y se limitará de solicitar de cualquier otro dato que no sea esencial para el desempeño de esta. Adicionalmente, el Responsable se compromete a tratar los Datos Personales única y exclusivamente para las finalidades aprobadas por el Titular, así como establecer y mantener los controles de seguridad necesarios para la protección de estos.
        <br /><br />Si el Usuario desea que su información no sea utilizada para alguna de las finalidades previamente mencionadas, se le solicita ponerse en comunicación a través de los Datos de Contacto en los días y horas señalados anteriormente.
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        6. DIVULGACIÓN CON TERCEROS
        </Typography>
        <Typography variant="h6">
        Se hace de conocimiento del Titular, que el Responsable no comparte ningún dato personal previamente mencionado que haya sido registrado en la Plataforma con Terceros. No obstante, el Responsable podrá transferir los Datos Personales de los Titulares al conglomerado empresarial que pertenezca, sea una controladora, subsidiaria, afiliada o a cualquier sociedad que opere bajo los mismos procesos y políticas internas, con la finalidad de dar cumplimiento a los Productos y Servicios que el Cliente contrate del Titular.
        <br /><br />El Responsable, únicamente está obligado a transferir los Datos Personales de los Titulares que sean requeridos a través de la obligatoriedad de una ley, o por autoridades como un Juez o Tribunal mediante un requerimiento judicial cuya esfera de competencias sea en la República Mexicana.
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        7. MEDIOS DE OBTENCIÓN DE LOS DATOS PERSONALES DEL TITULAR
        </Typography>
        <Typography variant="h6">
        El Responsable únicamente obtiene los datos mediante el consentimiento y voluntariedad del Titular, cuando de manera voluntaria el Titular envía sus datos como Cliente a el Responsable para recibir de este un producto o servicio mediante vía telefónica, correo electrónico o a través de la Plataforma.
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        8. MEDIOS PARA LIMITAR EL USO O DIVULGACIÓN DE DATOS PERSONALES.
        </Typography>
        <Typography variant="h6">
        El Titular podrá limitar el uso o divulgación de sus Datos Personales enviando una solicitud por escrito al Responsable a la dirección electrónica hcmc_19@hotmail.com señalando para cuales casos desea ser excluido y cuáles datos quiere eliminar. En caso de que la solicitud sea procedente se le registrará en el listado de exclusión propio del Responsable.
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        9. MEDIOS PARA EJERCER LOS DERECHOS DE ACCESO, RECTIFICACIÓN, CANCELACIÓN U OPOSICIÓN (DERECHOS ARCO)
        </Typography>
        <Typography variant="h6">
        El Titular o su representante tendrán derecho a solicitar el acceso, rectificación, revocación, cancelación u oposición según el capítulo IV de la Ley, así como limitar su uso o divulgación mediante:
        
        <br/><br/>A. Solicitud escrita dirigida al Responsable, en el siguiente domicilio: 2 de abril (Jesús Dionisio González) No. 1620, Col. Nuevo Repueblo, Monterrey, N.L., C.P. 64700, de las 09:00 a las 18:00 horas en días hábiles, o al correo electrónico hcmc_19@hotmail.com.
        <br/><br/>B. Dicha solicitud deberá de contener:
        <br/>1. El nombre del Titular y domicilio u otro medio para comunicarle la respuesta a su solicitud.
        <br/>2. Los documentos que acrediten la identidad y, en su caso, la representación legal del Titular.
        <br/>3. La descripción clara y precisa de los Datos Personales respecto de los que se busca ejercer alguno de los derechos antes mencionados.
        <br/>4. Cualquier otro elemento o documento que facilite la localización de los Datos Personales.
        <br/><br/>C. El Responsable designará a una persona para que lleve a cabo el trámite y sea resuelto de manera pronta y expedita. En el caso de solicitudes de rectificación de Datos Personales, el Titular deberá indicar, además de lo señalado previamente, las modificaciones a realizarse y aportar la documentación que sustente su petición conforme al artículo 31 de la Ley.
        <br/><br/>D. El Responsable comunicará al Titular, en un plazo máximo de veinte días, contados desde la fecha en que se recibió la solicitud de acceso, rectificación, cancelación u oposición, la determinación adoptada, a efecto de que, si resulta procedente, se haga efectiva la misma dentro de los quince días siguientes a la fecha en que se comunica la respuesta. Tratándose de solicitudes de acceso a Datos Personales, procederá la entrega previa acreditación de la identidad del solicitante o representante legal, según corresponda. Se tendrá opción de ampliar por una sola ocasión estos plazos cuando sea justificable.
        o representante legal, según corresponda. Se tendrá opción de ampliar por una sola ocasión estos plazos cuando sea justificable.

        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        10. MECANISMOS Y PROCEDIMIENTOS DE REVOCACIÓN DEL CONSENTIMIENTO
        </Typography>
        <Typography variant="h6">
        El Titular o su representante legal podrán revocar su consentimiento por escrito mediante para el tratamiento de sus datos siguiendo el procedimiento que se detalla a continuación: <br/>
        <br/>A. Solicitud escrita dirigida al Responsable al siguiente domicilio: 2 de abril (Jesús Dionisio González) No. 1620, Col. Nuevo Repueblo, Monterrey, N.L., C.P. 64700, de las 09:00 a las 18:00 horas en días hábiles, o al correo electrónico hcmc_19@hotmail.com.<br/>
        <br/>B. Dicha solicitud deberá de contener: <br/>
        1. El nombre del Titular y domicilio u otro medio para comunicarle la respuesta a su solicitud. <br/>
        2. Los documentos que acrediten la identidad y, en su caso, la representación legal del Titular. <br/>
        <br/>C. Señalar con precisión si desea revocar su consentimiento de forma total o parcial y deberá proporcionar los datos que permitan su identificación dentro de las bases de datos del Responsable, siempre y cuando dicha revocación no suponga la imposibilidad de cumplir obligaciones derivadas de una relación entre el Responsable y el Titular.
        <br/><br/>D. En caso de que no se acompañen los documentos de acreditación correspondientes o haya errores u omisiones en la solicitud, dentro de los cinco días hábiles siguientes a la recepción de la solicitud, el Responsable podrá requerirle que aporte los elementos o documentos necesarios para dar trámite a la misma y el Titular contará con diez días hábiles para atender el requerimiento, contados a partir del día siguiente en que lo haya recibido. De no dar respuesta en dicho plazo, se tendrá por no presentada la solicitud correspondiente.<br/>
        <br/><br/>E. El Responsable dará respuesta a su solicitud por correo electrónico en un plazo máximo de diez días.
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        11. DEL INSTITUTO NACIONAL DE TRANSPARENCIA, ACCESO A LA INFORMACIÓN Y PROTECCIÓN DE DATOS INAI
        </Typography>
        <Typography variant="h6">
        El Responsable le informa, que tiene derecho de acudir al Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales INAI en caso de considerar que ha sido vulnerado su derecho a la protección de Datos Personales, en el siguiente link https://home.inai.org.mx/ o al número telefónico Tel INAI! 800 835 4324 y/o en el domicilio Insurgentes Sur, No. 3211, planta baja, Col. Insurgentes Cuicuilco, Alcaldía Coyoacán, C.P. 04530 de lunes a jueves de 09:00 a 18:00 horas y viernes de 09:00 a 15:00 horas en días hábiles.
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        12. CAMBIOS AL AVISO DE PRIVACIDAD
        </Typography>
        <Typography variant="h6">
        El Responsable se reserva el derecho, bajo su exclusiva discreción, de cambiar, modificar, agregar o eliminar partes del presente Aviso de Privacidad en cualquier momento. En tal caso, el Responsable publicará dichas modificaciones en la página de internet https://www.montecavaconsultores.com e indicará la última versión del aviso. Se recomienda visitar periódicamente esta página con la finalidad de informarse si ocurre algún cambio al presente.
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        13. ACEPTACIÓN DE TÉRMINOS
        </Typography>
        <Typography variant="h6">
        Esta declaración de Privacidad constituye un acuerdo legal entre el Responsable y el Usuario. Si utiliza nuestros servicios, significa que ha leído, entendido y consentido los términos antes expuestos.
        <br/><br />Fecha de la última actualización al Aviso de Privacidad: 15/04/2022
        </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}


Aviso.getLayout = (page) => (
    <Layout>
      {page}
    </Layout>
  );