import { useTheme } from '@emotion/react';
import { Box, Grid, Typography, Button, Card } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { monthlyPlans, bimestralPlans, anualPlans, prepay, individualServices } from 'src/utils/suscription-info';
import Layout from 'src/components/landingPage/Layout';
import { useState } from 'react';
import CurrencyFormat from 'react-currency-format';

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


export const SubscriptionInfo = () => {

    const [currentPlan, setCurrentPlan] = useState(monthlyPlans)

    return (
        <Grid container sx={{justifyContent: 'center', py:5}} spacing={3}>
            <Grid item xs={10} md={2} sx={{flexDirection: {xs: 'inherit', md:'column'}}}>
                <Button fullWidth variant='contained' sx={{my: 1}}
                onClick={() => setCurrentPlan(monthlyPlans)}
                >Servicios Mensuales</Button>
                <Button fullWidth variant='contained' sx={{my: 1}}
                onClick={() => setCurrentPlan(bimestralPlans)}
                >Servicios Bimestrales</Button>
                <Button fullWidth variant='contained' sx={{my: 1}}
                onClick={() => setCurrentPlan(anualPlans)}
                >Servicios Anuales</Button>
                <Button fullWidth variant='contained' sx={{my: 1}}
                onClick={() => setCurrentPlan(individualServices)}
                >Servicios Individuales</Button>
            </Grid>
            <Grid item xs={12} md={10} sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}} >
            {currentPlan && currentPlan.map((plan, index) => {
                            return(
                                <Grid item key={index} xs={12} md={6} p={2}>
                                <Card sx={{padding: '5vh', backgroundColor: '#f1f58f', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'}}> 
                                    {currentPlan === individualServices ?  <Typography variant="h6"  sx={{textAlign: 'center'}}>{plan.name}</Typography>
                                    :<Typography variant="h4" sx={{textAlign: 'center'}}>{plan.name}</Typography>
                                    }
                                    {plan.term && <Typography variant="h6" sx={{textAlign: 'center'}}>{plan.term}</Typography>}
                                    {plan.privileges && 
                                    <Grid item py={2} sx={{minHeight: {xs:'auto', md: '35vh'}, alignItems: 'center' , display: 'flex', flexWrap: 'wrap'}}>
                                    {plan.privileges.map((privilege, index) => {
                                        return(
                                            <Typography key={index}>-{privilege}</Typography>
                                        )
                                    })}
                                    </Grid>
                                    }
                                    {Number.isInteger(plan.price) ? 
                                    <CurrencyFormat value={plan.price} displayType={'text'} thousandSeparator={true} prefix={'$'} suffix={' MXN'} renderText={value => <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center', py: 2}}>{value}</Typography>} />
                                    : <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center', py: 2}}>{plan.price}</Typography>
                                    }
                                </Card>
                                </Grid>
                            )
            })}
            </Grid>
        </Grid>
    )
}

export function TyC() {

    const theme= useTheme()
  const classes= useStyles()

  return (
    <Box className={classes.container}>
      <Grid container className={classes.hero} >
        <Grid item xs={10} sx={{textAlign: 'center'}}>
        <Typography variant='h4' sx={{color: 'white'}}>Términos y Condiciones</Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.containerText}>
        <TyCText />
      </Grid>
    </Box>
  )
}

export const TyCText = () => {
  return(
    <>
        <Typography variant='h6'>
        EN VIRTUD DEL PRESENTE CONTRATO DE ADHESIÓN, SE DESCRIBEN LOS TÉRMINOS Y CONDICIONES CONTRACTUALES, EN ADELANTE “TÉRMINOS Y CONDICIONES”, QUE REGULAN EL ACCESO Y/O UTILIZACIÓN, EN LO CONSECUENTE “EL USO” QUE EL USUARIO HAGA DE LA APLICACIÓN MÓVIL, LA PÁGINA WEB, SU CONTENIDO Y SERVICIOS, PUESTOS A SU DISPOSICIÓN POR EL C. HUGO CÉSAR MONTEMAYOR CAVAZOS, EN LO SUCESIVO “EL TITULAR DE LA PLATAFORMA”. <br/>
        Mediante su registro en la página web con dominio https://www.montecavaconsultores.com y/o en la Aplicación móvil de la App Store o Google Play de los sistemas operativos iOS y Android, respectivamente, denominada “MONTECAVA APP”, el Usuario consiente establecer una relación contractual con El Titular de la Plataforma, la cual estará sujeta en todo momento al Código Fiscal de la Federación, a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y demás leyes análogas de observancia obligatoria en la República Mexicana. <br />
        En caso de que el Usuario no acepte los presentes Términos y Condiciones con carácter obligatorio y vinculante, deberá de abstenerse de acceder o utilizar los Servicios. Los Términos y Condiciones sustituyen expresamente los acuerdos o compromisos previos con el Usuario. <br/>
        En caso de que el Usuario viole lo dispuesto en los presentes Términos y Condiciones, El Titular de la Plataforma podrá restringir su Uso, así como excluir al Usuario de futuras operaciones y tomar la acción legal que juzgue conveniente para sus intereses.
        </Typography>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        1. GLOSARIO DE TÉRMINOS DEL AVISO DE PRIVACIDAD
        </Typography>
        <Typography variant='h6'>
        1. Administrador: Perfil dentro de la Plataforma que se encarga de brindar acceso a los Usuarios, así como cargar los documentos correspondientes a cada cuenta de manera personal e individualizada.<br />
        2. Aplicación: Programa de cómputo denominado “MONTECAVA APP” por medio del cual El Titular de la Plataforma, permite a los Clientes mediante el registro de un Usuario hacer Uso de los Servicios contratados, desde su dispositivo móvil, disponible en la App Store o Google Play de los sistemas operativos iOS y Android, respectivamente. <br />
        3. Aviso de Privacidad: Documento físico, electrónico o en cualquier otro formato generado por el Responsable (El Titular de la Plataforma) que es puesto a disposición del Usuario, previo al tratamiento de sus Datos Personales, el cual se encuentra disponible en la Aplicación y en el Sitio Web.<br />
        4. Cliente: Persona física o moral que haya contratado algún producto o servicio del Titular de la Plataforma. <br />
        5. Documentos: Información financiera y fiscal de los Clientes que se carga mediante archivos digitales a la Plataforma por medio del Administrador, posterior a la adquisición de las membresías.<br />
        6. Contrato de Adhesión: Los presentes Términos y Condiciones de Uso de la Plataforma.<br />
        7. Datos Personales: Cualquier información concerniente a una persona física identificada o identificable.<br />
        8. Datos de Autenticación: Conjunto de datos como correo electrónico y contraseña mediante los cuales el Usuario podrá tener acceso a la Plataforma y acceder a los Servicios, los cuales serán otorgados por el Administrador.<br />
        9. Dispositivo móvil: Aparato electrónico con acceso a internet mediante el cual el Usuario accede a los Servicios digitales.<br />
        10. Membresías: Servicio digital que los Usuarios adquieren a través de la Plataforma mediante el cual contrata servicios del Titular de la plataforma con la finalidad de obtener beneficios a través de los Planes ofrecidos a cambio de una contraprestación económica que se realizará de manera digital.<br />
        11. Plataforma: El Sitio web https://www.montecavaconsultores.com o las aplicaciones móviles en iOS o Android denominadas “MONTECAVA APP”, según corresponda el Uso.<br />
        12. Servicios: Las operaciones que los Usuarios, previamente Clientes de El Titular de la Plataforma, ejecuten mediante cualquier Plataforma como el Sitio Web o la Aplicación.<br />
        13. Sitio web: https://www.montecavaconsultores.com <br />
        14. Términos y Condiciones: El presente Contrato de Adhesión, en toda su extensión.<br />
        15. Uso: Constituye al acceso, utilización, registro y/o creación de una cuenta de Usuario de la Plataforma.<br />
        16. Usuario: Quién haga Uso del Sitio web https://www.montecavaconsultores.com o las aplicaciones “MONTECAVA APP” en iOS o Android.<br />
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        2. OBJETO
        </Typography>
        <Typography variant='h6'>
        Los presentes Términos y Condiciones establecen los derechos y obligaciones que gozarán y a las que se sujetarán El Titular de la Plataforma y los Usuarios por el Uso del Sitio web y la Aplicación, su contenido, secciones y funcionalidades. Las Partes convienen en que la prestación de los Servicios que solicitaren se regirá por Contratos independientes que corresponden a los Clientes. Los presentes Términos y Condiciones serán puestos a disposición del Usuario en la Plataforma que opera bajo el nombre de dominio de https://www.montecavaconsultores.com y su Aplicación “MONTECAVA APP”.
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        3. EXPLICACIÓN DETALLADA DE LOS USOS DE LA PLATAFORMA
        </Typography>
        <Typography variant="h6">
        “Montecava App” para iOS y Android es una aplicación gratuita que se puede descargar en ambos sistemas operativos, el sitio web https://www.montecavaconsultores.com es un sitio web de navegación libre en cualquier buscador. La finalidad de las Plataformas consiste en que los Clientes del Titular de la Plataforma bajo el rol de Usuario, accedan mediante los Datos de Autenticación otorgados por el Administrador, a los servicios contables denominados “membresías” las cuales son: paquete 1: plan principiante, Paquete 2: básico, paquete 3: intermedio, paquete 4: avanzado y paquete 5: premium, en formato mensual, bimestral, anual, así como productos individuales. Estos servicios consisten en la generación de documentos contables y fiscales acorde a las Leyes Mexicanas como folios para facturas elaboradas; declaraciones de impuestos mensuales, bimestrales o anuales; contabilidad fiscal; tableros de control; estados financieros; presentación de resultados en la Sala de Juntas; presentación y explicación de los números en la Sala de Juntas; documentos que se tramitan ante Institutos con carácter de organismo fiscal autónomo como IMSS o INFONAVIT; documentos de AFORE; documentos de la tesorería del Estado de Nuevo León; consultorías; y, opinión de cumplimiento de obligaciones. El acceso a estos productos y/o servicios se da a través de un pago seguro. El pago de las membresías se cobrará de manera automática mediante tarjeta de crédito o débito el día primero del mes siguiente en el que se haya contratado si es un día distinto al primero del mes, o en su defecto el mismo día en caso de que la contratación se haga el día primero del mes, y puede ser cancelado en cualquier momento a través de la cuenta. El pago de los productos de manera individual se podrá hacer mediante tarjeta de crédito, débito o en OXXO. El costo de cada uno de los productos y/o servicios incluye IVA en conformidad con las Leyes Fiscales de la República Mexicana. <br />
        <br/> El perfil de Administrador tiene las siguientes funciones: <br />
        A. Acceso y utilización de la Plataforma. <br />
        B. Acceso único a la Plataforma bajo el rol de Administrador. <br />
        C. Registro, eliminación y administración de las cuentas de los Usuarios. <br />
        D. Carga de los documentos fiscales de los Clientes. <br />
        E. Carga de los documentos fiscales de los Clientes que adquieran a través de los productos que contraten. <br />
        <br/> El perfil de Usuario tiene las siguientes funciones:
        A. Ingreso y utilización del Sitio o de la Aplicación mediante los Datos de Autenticación otorgados por el Administrador. <br/>
        B. Navegación dentro de la Plataforma para poder consultar los documentos fiscales que se tengan como Clientes de El Titular de la Plataforma. <br/>
        C. Contratar los servicios individuales y/o membresías que se ofrece a los Clientes, consistentes en a) Plan Mensual; b) Plan Bimestral y C) Plan Anual, los cuales contienen documentación fiscal que el Cliente desee obtener de los productos contables ofrecidos por el Titular de la Plataforma: <br/>
        </Typography>
        <SubscriptionInfo />
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        4. CAPACIDAD DEL USUARIO
        </Typography>
        <Typography variant="h6">
        A. Manifestación del Usuario: Desde el momento en el que acceden y hacen Uso del Sitio, los Usuarios manifiestan que cuentan con capacidad de ejercicio suficiente para obligarse en todos los extremos establecidos en los presentes Términos y Condiciones. <br/>
        B. Menores de Edad: En el supuesto que los Usuarios del Sitio web o de la Aplicación sean menores de edad o incapaces, acorde a la legislación Civil correspondiente, el acceso, Uso y aprovechamiento del Sitio web o de la Aplicación, su contenido,
        secciones y funcionalidades, así como la contratación de los Servicios se entenderán bajo la total y completa responsabilidad de quienes ejerzan la patria potestad o sean sus tutores. De manera íntegra y total, la responsabilidad en la determinación de los contenidos y 
        Servicios a los que accede un menor de edad o incapaz corresponde enteramente a quienes ejerzan la patria potestad, sean sus tutores o representantes legales. Manifestado lo anterior El Titular de la Plataforma no sugiere el Uso de esta Aplicación a menores de edad o incapaces.
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        5. REGLAS GENERALES DE USO DE LA PLATAFORMA
        </Typography>
        <Typography variant="h6">
        A. Descarga: Comprende la acción de descargar la Aplicación en un dispositivo móvil o de acceder al Sitio web. <br/>
        B. Registro como Usuario: Al hacer Uso de la Aplicación, el Administrador deberá registrar a los Clientes en su perfil único de Usuario y otorgarle los Datos de Autenticación correspondientes. <br/>
        C. Registro de los documentos: El Administrador tendrá la opción de registrar los documentos, acorde a los servicios individuales contratados, o las membresías según sea el caso, a su vez la Aplicación solicitará permiso para acceder a los archivos del dispositivo móvil del Usuario. El registro, acceso y Uso de los Servicios por cada Usuario deberá ser en todo momento personal, por lo que los derechos y obligaciones que tiene al amparo los Términos y Condiciones son personalísimos, únicos e intransferibles. Usuario y Administrador deberán mantener en secreto y abstenerse de revelar a terceros los datos asociados a su cuenta y Servicios, incluyendo, sin limitación, el nombre de Usuario y contraseña.<br/>
        D. Consulta de Documentos: El Usuario podrá consultar los Documentos que el Administrador cargue en su perfil. <br/>
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        6. PROHIBICIONES DE USO DE LA PLATAFORMA
        </Typography>
        <Typography variant="h6">
        En el Uso de los Servicios, el Usuario tendrá estrictamente prohibido: <br/>
        A. Difundir información falsa o engañosa o que induzca al error. <br/>
        B. Restringir o inhibir a cualquier otro Usuario de usar y disfrutar los Servicios. <br/>
        C. Generar o alentar conductas que pudieran constituir una ofensa criminal, dar lugar a responsabilidad civil o de otro modo violar cualquier ley local, estatal, nacional o internacional. <br/>
        D. Intentar obtener un acceso no autorizado o dañar cualquier aspecto de los Servicios, sistemas o redes relacionados. <br/>
        <br/> En este sentido, se hace saber al Usuario que el incumplimiento a lo anterior podrá derivar en la decisión de El Titular de la Plataforma de excluir al Usuario de los Servicios por no hacer Uso adecuado de ellos o por incumplir los presentes Términos y Condiciones. Para tales efectos, se le hará llegar una notificación mediante la Plataforma y se le harán saber los motivos por la cual se le excluye de los Servicios del presente sitio, se le notificará a través de los Datos de Contacto.
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        7. HORARIOS DE DISPONIBILIDAD DE ACCESO LA PLATAFORMA
        </Typography>
        <Typography variant="h6">
        La Plataforma está a disposición del Usuario las veinticuatro horas del día, así como los trescientos sesenta y cinco días del año. Lo anterior, con excepción de los días en los que la Plataforma este llevando a cabo un procedimiento de actualización para ofrecer un mejor Servicio, con la debida notificación de la suspensión del Uso de la Plataforma.
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        8. RESPONSABILIDAD SOBRE CONTRASEÑAS Y CUENTA
        </Typography>
        <Typography variant="h6">
        Cada Usuario del Sitio es el único responsable de mantener sus contraseñas. El Usuario es totalmente responsable de todas las actividades que ocurran bajo su contraseña o cuenta. Por otra parte, el Usuario debe notificar a El Titular de la Plataforma de cualquier Uso no autorizado de su contraseña o cuenta. De ninguna manera El Titular de la Plataforma será responsable, directa o indirectamente, por cualquier pérdida o daño de cualquier tipo incurridos como resultado de la falta de cumplimiento con esta sección por parte del Usuario. Está prohibida la venta, cesión, transferencia o transmisión de la Cuenta del Usuario bajo cualquier título, ya sea oneroso o gratuito. <br />
        <br /> En caso de olvidar su la contraseña de la cuenta de Usuario, el Usuario deberá seleccionar la opción de “Recupera tu contraseña”, posteriormente se le solicitará su correo electrónico con el cual se creó la cuenta de Usuario donde el mismo deberá ingresarla. En virtud de lo anterior se le enviará un correo electrónico en el cual deberá de seleccionar la opción de “Recupera tu contraseña” que remitirá al Sitio web en donde se le dará la opción de crear una nueva contraseña.
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        9. ANUNCIOS
        </Typography>
        <Typography variant="h6">
        El Titular de la Plataforma a través de su Aplicación móvil y Sitio web declara no contener anuncios en las mismas.
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        10. COMPRAS DENTRO DE LAS APLICACIONES
        </Typography>
        <Typography variant="h6">
        El Titular de la Plataforma declara tener compras dentro de la aplicación y el sitio web a través del sistema de pagos seguros Stripe, en el cual se ingresan datos como: nombre del titular de la tarjeta de crédito o débito, banco emisor, número de tarjeta de crédito o débito, fecha de vencimiento de la tarjeta, CVV; así como información de pago de Google Pay vinculada con la cuenta del Usuario o número de cuenta para pago en Oxxo. Así mismo El Titular de la Plataforma declara no tener acceso a las cuentas bancarias de los usuarios, en ninguna circunstancia o método, y que la información bancaria quedará almacenada únicamente en el sistema de pagos seguros Stripe para efectuar el pago de las membresías mensuales, anuales o bimestrales según corresponda el caso.
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        11. FORMAS DE PAGO
        </Typography>
        <Typography variant="h6">
        Para usar el servicio de Montecava App se debe proveer una Forma de pago. El Usuario autoriza a hacer cargos del monto de su suscripción a cualquier Forma de pago asociada con su cuenta en caso del rechazo o indisponibilidad de su Forma de pago principal. Cualquier cargo pendiente le corresponderá al Usuario. Si el pago no se pudiera hacer satisfactoriamente, debido a la fecha de vencimiento, la falta de fondos u otro motivo, y si el Usuario no cancela su cuenta, se puede suspender el acceso al servicio hasta que obtengamos una Forma de pago válida.
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        12. CICLO DE FACTURACIÓN
        </Typography>
        <Typography variant="h6">
        Los cargos de membresía por el servicio del Titular de la Plataforma a través de la Aplicación y el Sitio Web y cualquier otro cargo en el que incurra en relación con el uso que haga del servicio, como impuestos y posibles gastos de transacción, se cobrarán a la Forma de pago en la fecha de pago específica indicada en la página “Cuenta”. La duración del ciclo de facturación dependerá del tipo de membresía que haya seleccionado al suscribirse al servicio. En ciertos casos, la fecha de pago podría cambiar, por ejemplo, si no se pudo hacer el cobro con la Forma de pago satisfactoriamente, cuando cambie el plan de suscripción, o si la membresía pagada comenzó un día que no está incluido en un determinado mes, todos los pagos se cobrarán el día primero del mes al en que se haya contratado.
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        13. CANCELACIÓN
        </Typography>
        <Typography variant="h6">
        Las membresías continúan hasta que el Usuario las cancele. Puede cancelar la membresía en cualquier momento, y continuará teniendo acceso al servicio hasta el final del período de facturación. En la medida permitida por la ley aplicable, los pagos no son reembolsables y no se otorgarán reembolsos ni créditos por los periodos de membresía utilizados parcialmente o por el contenido no usado. Para cancelar, se debe acceder a la opción “Cuenta” y seguir las instrucciones. Si el Usuario cancela la membresía, los servicios se suspenderán al final de su periodo de facturación actual.
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        14. CAMBIOS EN LOS PRECIOS DE SERVICIOS INDIVIDUALES O MEMBRESÍAS
        </Typography>
        <Typography variant="h6">
        El Titular de la plataforma puede cambiar los planes de suscripción y el precio del servicio de vez en cuando. Sin embargo, cualquier cambio en los precios o en los planes de suscripción se aplicará no antes de los 30 días siguientes a la notificación.
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        15. ENLACES EXTERNOS
        </Typography>
        <Typography variant="h6">
        A través del Uso de la Aplicación mediante la función de la consulta de documentos se redirigirá al Usuario a una ventana externa en el navegador del dispositivo móvil la cual se abrirá en formato PDF para visualizarlo.
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        16. DE LA NAVEGACIÓN EN EL SITIO WEB
        </Typography>
        <Typography variant="h6">
        El Titular de la Plataforma no garantiza de ningún modo la continuidad y disponibilidad de los contenidos, productos o Servicios ofrecidos a través del Sitio web o Aplicación, no obstante, El Titular de la Plataforma llevará a cabo las acciones que de acuerdo con sus posibilidades le permitan mantener el buen funcionamiento del Sitio web sin que esto le suponga de alguna responsabilidad.
        <br /><br />De igual forma, El Titular de la Plataforma no será responsable ni garantiza que el contenido o software al que pueda accederse a través del Sitio web o Aplicación se encuentre libre de errores, software malicioso, o que pueda causar algún daño a nivel de software o hardware en el equipo a través del cual el Usuario accede al Sitio web.
        <br /><br />El Titular de la Plataforma tampoco se hace responsable de los daños que pudiesen ocasionarse por un Uso inadecuado del Sitio web o Aplicación. En ningún caso El Titular de la Plataforma será responsable por las pérdidas, daños o perjuicios de cualquier tipo que surjan por el solo acceso o utilización del Sitio web o Aplicación.
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        17. ACCESOS AL DISPOSITIVO MÓVIL
        </Typography>
        <Typography variant="h6">
        El Titular de la Plataforma a través de sus aplicaciones móviles podrá solicitar al Administrador el acceso únicamente a los archivos del dispositivo para cargar los Documentos en la Aplicación. No se solicitará acceso a demás funciones del dispositivo móvil del Usuario como cámara, contactos, geolocalización o teléfono.
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        18. PRIVACIDAD, PROTECCIÓN DE DATOS PERSONALES Y CONFIDENCIALIDAD.
        </Typography>
        <Typography variant="h6">
        Los Datos Personales y documentos que reciba El Titular de la Plataforma como parte de la solicitud de cualquier Servicio son propiedad exclusiva del Usuario y en ninguna circunstancia serán publicados, difundidos, o compartidos con terceros sin que medie previa autorización por escrito. <br/>
        <br />El Titular de la Plataforma hace del conocimiento del Usuario, quien a su vez comprende y acepta, que toda la información proporcionada, adicionada, provista o agregada por los Usuarios y toda la información de carácter personal que se obtenga del Usuario en razón del Uso del Sitio web o Aplicación o la provisión de los Servicios, será tratada de manera estrictamente confidencial y protegida contra cualquier Uso indebido o alteración, de acuerdo con lo establecido en el Aviso de Privacidad puesto a disposición del público en el Sitio web. <br />
        <br />En este acto el Usuario reconoce y acepta que El Titular de la Plataforma obtiene su información personal por medio de la provisión o captura de forma directa a través del Sitio web o Aplicación, sus funcionalidades o módulos.
        <br /><br />Adicionalmente, el Usuario reconoce y consiente que, previo a recabar su información, El Titular de la Plataforma puso a su disposición el Aviso de Privacidad correspondiente. Documento en el cual se le hizo sabedor sobre qué Datos Personales son recabados, cuáles son las finalidades de su tratamiento, así como la forma, mecanismos y requisitos para el debido ejercicio de sus derechos de acceso, rectificación, cancelación y oposición, de conformidad con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares. El Usuario reconoce que en el documento de referencia se le proporcionó y, a su vez, consintió la información necesaria sobre los mecanismos para llevar a cabo la revocación de su consentimiento para el tratamiento de sus Datos Personales, así como los medios para limitar su Uso y divulgación.
        <br /><br />El Usuario reconoce que otorga su información y Datos Personales a El Titular de la Plataforma de manera enteramente libre e informada, utilizando su capacidad y criterio, además de que lo hace en ejercicio de su plena voluntad, libre de vicios del consentimiento. Debido a lo anterior, se entiende que el Usuario es entera y completamente responsable de la veracidad y confiabilidad de la información que al efecto proporcione.
        <br /><br />Al aceptar los presentes Términos y Condiciones, el Usuario se obliga a que toda la información que le proporcione a El Titular de la Plataforma sea veraz y comprobable garantizando así, la autenticidad de los Datos Personales proporcionados.
        <br /><br />El Titular de la Plataforma se obliga a observar, respecto de los Datos Personales que recaba del Usuario, los principios de licitud, consentimiento, información, calidad, finalidad, lealtad, proporcionalidad y responsabilidad.
        <br /><br />Asimismo, el Aviso de Privacidad puede ser modificado en el tiempo y forma que El Titular de la Plataforma lo determine, quien notificará al Usuario de dicha modificación mediante avisos en la misma Plataforma de El Titular de la Plataforma, el envío de correos electrónicos al Usuario a efecto de que, se encuentre en posibilidad de ejercer sus Derechos ARCO.
        <br /><br />Ahora bien, será responsabilidad y obligación del Usuario revisar el Aviso de Privacidad, el cual estará a su disposición, en todo momento actualizado en el Sitio web de https://www.montecavaconsultores.com. La no manifestación de inconformidad por parte del Usuario representa su consentimiento y autorización al mismo en todos sus términos.
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        19. PROPIEDAD INTELECTUAL.
        </Typography>
        <Typography variant="h6">
        El Sitio web o Aplicación, incluyendo sin limitación alguna todo su contenido como son textos, fotografías, ilustraciones, gráficos, videos, audio, diseños, códigos, datos y cualquier otra información, son propiedad única y exclusiva de El Titular de la Plataforma, incluyendo cualesquiera derechos de autor, derechos de marca, derechos de patente, derechos de base de datos, derechos morales, y otras propiedades intelectuales y derechos patrimoniales del mismo, que se encuentran protegidos por la Ley Federal del Derecho de Autor, la Ley de la Propiedad Industrial, así como cualquier otro ordenamiento en materia de Propiedad Intelectual aplicable.
        <br /><br />El Uso de los Servicios no le otorga en ningún momento al Usuario propiedad del contenido del Sitio, ni tampoco se le otorga licencia para explotación de éstos, por lo que el Usuario reconoce que por ningún motivo adquiere derecho alguno de propiedad al descargar material con derechos de autor del Sitio o relacionado con los Servicios.
        <br /><br />Los signos distintivos, incluyendo las marcas y avisos comerciales, así como demás Contenido, expuestos en los Servicios serán en todo momento propiedad de El Titular de la Plataforma, aun cuando los mismos se encuentren registrados o no, y no pueden ser usados por el Usuario sin consentimiento expreso y por escrito de El Titular de la Plataforma.
        </Typography>
        </Grid>
        <Grid item sx={{padding: '2vh 0'}}>
        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
        20. LEGISLACIÓN APLICABLE Y JURISDICCIÓN.
        </Typography>
        <Typography variant="h6">
        Para la resolución de cualquier disputa, controversia, reclamación o diferencia que surja de o se relacione con los presentes Términos y Condiciones, El Titular de la Plataforma y el Usuario se someten expresamente a la competencia de los órganos jurisdiccionales establecidos en el Estado de Nuevo León, renunciando a cualquier otro fuero presente o futuro que pudiera corresponderle en virtud de sus domicilios presentes o futuros o por cualquier otra causa.
        <br /><br />Última actualización: 30/07/2022.
        </Typography>
        </Grid>
        </>
  )
}

TyC.getLayout = (page) => (
    <Layout>
      {page}
    </Layout>
  );
