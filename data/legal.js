/* =========================================================================
   Quantum4Colorado — shared data layer: Terms of Service + Privacy Policy
   Single source for the /terms and /privacy pages on the web app and the
   legal block in the mobile About screen. Bilingual {en, es}.

   The privacy text describes what the code really does, so change it when
   the code changes:
     - api/submit-review.js      name, role, quote, rating -> Upstash Redis
                                 moderation queue (q4co:reviews:pending)
     - api/track-assessment.js   only { orgType, tier } -> aggregate counters
     - localStorage / AsyncStorage keys q4co-lang, q4co-course-progress
     - Google Fonts <link> in index.html; hosting on Vercel
   ========================================================================= */

export const LEGAL_UPDATED = { en: "October 23, 2026", es: "23 de octubre de 2026" };

export const CONTACT_EMAILS = ["team@quantum4colorado.org", "quantum4colorado@protonmail.com"];

export const LEGAL = {
  terms: {
    title: { en: "Terms of Service", es: "Términos de Servicio" },
    intro: {
      en: "These terms cover your use of Quantum4Colorado, a free, nonpartisan website and mobile app. Aarush Goradia, Arnav Rohilla, and Christian Lee, a group of high school students, built it for the 2026 Congressional App Challenge. By using it, you agree to what's below. If you don't, please don't use it.",
      es: "Estos términos regulan el uso de Quantum4Colorado, un sitio web y una aplicación móvil gratuitos y no partidistas. Aarush Goradia, Arnav Rohilla y Christian Lee, un grupo de estudiantes de secundaria, lo crearon para el Congressional App Challenge 2026. Al usarlo, usted acepta lo que sigue. Si no está de acuerdo, por favor no lo use.",
    },
    sections: [
      {
        heading: { en: "What this is", es: "Qué es esto" },
        paragraphs: [
          {
            en: "Quantum4Colorado explains the quantum computing work happening in Colorado, offers a self-check on post-quantum security readiness, lays out policy ideas for state representatives, and teaches the basics of quantum computing. It's a student project. It isn't a company, a law firm, or a government agency, and no party, campaign, or elected office is behind it.",
            es: "Quantum4Colorado explica el trabajo en computación cuántica que se hace en Colorado, ofrece una autoevaluación de preparación en seguridad poscuántica, presenta ideas de política para los representantes estatales y enseña los fundamentos de la computación cuántica. Es un proyecto estudiantil. No es una empresa, un bufete ni una agencia de gobierno, y ningún partido, campaña o cargo electo está detrás.",
          },
        ],
      },
      {
        heading: { en: "Information only, not advice", es: "Solo información, no asesoría" },
        paragraphs: [
          {
            en: "Nothing here is legal, cybersecurity, financial, or policy advice. The readiness assessment gives a rough picture based on the answers you pick. It doesn't audit your systems, and it doesn't replace a qualified professional. Nobody knows when quantum computers will break today's encryption, so we frame preparation as sensible, not as a prediction of a date.",
            es: "Nada de lo que aparece aquí es asesoría legal, de ciberseguridad, financiera ni de política pública. La evaluación de preparación da una idea general según las respuestas que usted elige. No audita sus sistemas ni reemplaza a un profesional calificado. Nadie sabe cuándo las computadoras cuánticas romperán el cifrado actual, así que presentamos la preparación como algo prudente, no como la predicción de una fecha.",
          },
        ],
      },
      {
        heading: { en: "Accuracy", es: "Exactitud" },
        paragraphs: [
          {
            en: "We build from public sources, which are listed on the About page, and we try to keep them current. Figures such as state investment amounts are approximate and may be reported differently elsewhere. We can also make mistakes. If you find one, email us and we'll take a look. For anything that matters to a decision, check the primary source.",
            es: "Trabajamos con fuentes públicas, que aparecen en la página Acerca de, y tratamos de mantenerlas al día. Cifras como los montos de inversión estatal son aproximadas y otras fuentes pueden reportarlas de otra forma. También podemos equivocarnos. Si encuentra un error, escríbanos y lo revisaremos. Para cualquier decisión importante, consulte la fuente original.",
          },
        ],
      },
      {
        heading: { en: "Reviews you submit", es: "Reseñas que usted envía" },
        paragraphs: [
          {
            en: "If you send a review, you're telling us it's your own words and that it's honest. Leave out anything unlawful, hateful, or harassing, and don't share private details about another person.",
            es: "Si envía una reseña, nos confirma que son sus propias palabras y que es honesta. No incluya nada ilegal, de odio o acosador, ni datos privados de otra persona.",
          },
          {
            en: "A team member reads every submission before anything goes public. We may edit for length or clarity, decline a review, or take one down later. When you submit, you let us display your review, with the name and role you typed, on this site and in materials about the project, such as our Congressional App Challenge entry. You keep ownership of your words. To have a review removed, email us.",
            es: "Un miembro del equipo lee cada envío antes de que se haga público. Podemos editar por extensión o claridad, rechazar una reseña o retirarla más tarde. Al enviarla, usted nos permite mostrarla, con el nombre y el rol que escribió, en este sitio y en materiales sobre el proyecto, como nuestra participación en el Congressional App Challenge. Usted conserva la propiedad de sus palabras. Para que retiremos una reseña, escríbanos.",
          },
        ],
      },
      {
        heading: { en: "Using the site", es: "Uso del sitio" },
        paragraphs: [
          {
            en: "Use it to learn, to plan for your organization, or to talk with your representatives. Don't try to break it, overload it, scrape it at scale, or probe it for weaknesses, and don't spam the review form. Don't use it to mislead people or to pose as someone else.",
            es: "Úselo para aprender, para planificar en su organización o para hablar con sus representantes. No intente dañarlo, sobrecargarlo, extraer su contenido a gran escala ni buscar vulnerabilidades, y no envíe spam por el formulario de reseñas. No lo use para engañar a otras personas ni para hacerse pasar por alguien más.",
          },
        ],
      },
      {
        heading: { en: "Our content and other people's", es: "Nuestro contenido y el de terceros" },
        paragraphs: [
          {
            en: "The writing, design, and code are ours unless noted. Data, quotes, and names that come from other organizations, such as NIST, JILA, and state governments, belong to them. You're welcome to share links and quote short passages with credit. For anything bigger, ask first.",
            es: "La redacción, el diseño y el código son nuestros, salvo que se indique lo contrario. Los datos, citas y nombres que provienen de otras organizaciones, como NIST, JILA y los gobiernos estatales, les pertenecen a ellas. Puede compartir enlaces y citar pasajes cortos dando el crédito. Para algo más extenso, pídanos permiso.",
          },
        ],
      },
      {
        heading: { en: "No warranty", es: "Sin garantía" },
        paragraphs: [
          {
            en: "The site and app are provided as is and as available. We don't promise they'll always work or be free of errors. To the extent the law allows, the creators aren't liable for losses that come from using the site or relying on it. Some places don't allow these limits, so they may not apply to you.",
            es: "El sitio y la aplicación se ofrecen tal cual y según disponibilidad. No prometemos que siempre funcionen ni que estén libres de errores. En la medida que la ley lo permita, los creadores no son responsables por pérdidas derivadas de usar el sitio o de confiar en él. Algunos lugares no permiten estos límites, por lo que podrían no aplicarle.",
          },
        ],
      },
      {
        heading: { en: "Links to other sites", es: "Enlaces a otros sitios" },
        paragraphs: [
          {
            en: "We link to outside sites for sources and further reading. We don't control them and we're not responsible for what they say or do.",
            es: "Enlazamos a sitios externos como fuentes y lecturas adicionales. No los controlamos y no somos responsables de lo que dicen o hacen.",
          },
        ],
      },
      {
        heading: { en: "Age", es: "Edad" },
        paragraphs: [
          {
            en: "The site is made for teens and adults. If you're under 13, please don't use the review form or share any personal information, and ask a parent or teacher to help you explore.",
            es: "El sitio está hecho para adolescentes y adultos. Si tiene menos de 13 años, por favor no use el formulario de reseñas ni comparta información personal, y pida ayuda a un padre o a un maestro para explorar.",
          },
        ],
      },
      {
        heading: { en: "Changes and governing law", es: "Cambios y ley aplicable" },
        paragraphs: [
          {
            en: "We may update these terms as the project changes. The date at the top shows the latest version, and if you keep using the site after an update, you accept the new version. Colorado law governs these terms, and any dispute goes to the courts in Colorado.",
            es: "Podemos actualizar estos términos a medida que el proyecto cambie. La fecha al inicio indica la versión más reciente, y si sigue usando el sitio después de una actualización, acepta la nueva versión. Estos términos se rigen por las leyes de Colorado, y cualquier disputa se resolverá en los tribunales de Colorado.",
          },
        ],
      },
    ],
  },

  privacy: {
    title: { en: "Privacy Policy", es: "Política de Privacidad" },
    intro: {
      en: "The short version: we collect very little. There are no accounts, no ads, no analytics, and no tracking cookies. The details are below so you can check us on it.",
      es: "En resumen: recopilamos muy poco. No hay cuentas, ni anuncios, ni analíticas, ni cookies de seguimiento. Los detalles están abajo para que pueda comprobarlo.",
    },
    sections: [
      {
        heading: { en: "What we collect", es: "Qué recopilamos" },
        paragraphs: [
          {
            en: "Only two things ever reach our server, and only if you use those features:",
            es: "Solo dos cosas llegan a nuestro servidor, y únicamente si usa esas funciones:",
          },
        ],
        bullets: [
          {
            en: "Reviews. If you submit the review form, we receive the name, role, review text, and star rating you typed. They go into a private queue until a team member reads them, and we use them only to decide whether to publish. If a review is published, your name and role appear with it. A first name or initials works fine.",
            es: "Reseñas. Si envía el formulario de reseñas, recibimos el nombre, el rol, el texto y las estrellas que escribió. Quedan en una cola privada hasta que un miembro del equipo las lee, y las usamos solo para decidir si se publican. Si se publica una reseña, su nombre y su rol aparecen con ella. Un nombre de pila o unas iniciales bastan.",
          },
          {
            en: "Assessment counts. When you finish the readiness assessment, we add one to an anonymous total. The only things sent are the organization type you chose and the risk tier you got. We never receive your individual answers, and the count isn't tied to you.",
            es: "Conteos de la evaluación. Cuando termina la evaluación de preparación, sumamos uno a un total anónimo. Solo se envían el tipo de organización que eligió y el nivel de riesgo obtenido. Nunca recibimos sus respuestas individuales, y el conteo no se vincula con usted.",
          },
        ],
      },
      {
        heading: { en: "What stays on your device", es: "Lo que se queda en su dispositivo" },
        paragraphs: [
          {
            en: "The site saves your language choice and your course progress in your browser's local storage, and the mobile app saves the same two things in its own storage. We never see them. Clear your browser data or the app's data to erase them.",
            es: "El sitio guarda su idioma y su progreso en el curso en el almacenamiento local del navegador, y la aplicación móvil guarda esas mismas dos cosas en su propio almacenamiento. Nosotros nunca las vemos. Borre los datos del navegador o de la aplicación para eliminarlas.",
          },
        ],
      },
      {
        heading: { en: "Shared results links", es: "Enlaces de resultados compartidos" },
        paragraphs: [
          {
            en: "The link, QR code, and printed report from the assessment carry your answers with them. The link holds them in the web address, so anyone who has it can read them. Share it only with people you want to see your results. The \"email a representative\" template includes a link to the site, not your answers.",
            es: "El enlace, el código QR y el informe impreso de la evaluación llevan sus respuestas consigo. El enlace las guarda en la dirección web, así que cualquiera que lo tenga puede leerlas. Compártalo solo con quienes quiera que vean sus resultados. La plantilla de correo para un representante incluye un enlace al sitio, no sus respuestas.",
          },
        ],
      },
      {
        heading: { en: "Who else handles data", es: "Quién más maneja datos" },
        paragraphs: [
          {
            en: "Three services help run the project. Vercel hosts the site and processes the usual request data, such as your IP address and browser type, to deliver pages and keep things secure. Upstash stores the review queue and the anonymous counters. Google Fonts supplies the web fonts, so Google receives your IP address and browser type when a page loads, like any font request. We don't sell your information and we don't share it for advertising.",
            es: "Tres servicios ayudan a que el proyecto funcione. Vercel aloja el sitio y procesa los datos habituales de cada solicitud, como su dirección IP y el tipo de navegador, para entregar las páginas y mantenerlas seguras. Upstash guarda la cola de reseñas y los contadores anónimos. Google Fonts ofrece las fuentes web, por lo que Google recibe su dirección IP y el tipo de navegador cuando se carga una página, como en cualquier solicitud de fuentes. No vendemos su información ni la compartimos con fines publicitarios.",
          },
        ],
      },
      {
        heading: { en: "How long we keep it", es: "Cuánto tiempo la conservamos" },
        paragraphs: [
          {
            en: "We keep review submissions for as long as the project runs, or until you ask us to remove yours. The anonymous totals have nothing personal in them, so there's nothing to delete.",
            es: "Conservamos las reseñas mientras el proyecto siga activo, o hasta que usted nos pida eliminar la suya. Los totales anónimos no contienen nada personal, así que no hay nada que borrar.",
          },
        ],
      },
      {
        heading: { en: "Your choices", es: "Sus opciones" },
        paragraphs: [
          {
            en: "Email us any time to see, correct, or delete a review you sent. We'll handle the request whether or not a privacy law requires us to.",
            es: "Escríbanos cuando quiera para ver, corregir o eliminar una reseña que envió. Atenderemos la solicitud aunque ninguna ley de privacidad nos lo exija.",
          },
        ],
      },
      {
        heading: { en: "Children", es: "Menores de edad" },
        paragraphs: [
          {
            en: "The site isn't aimed at children under 13, and we don't knowingly collect personal information from them. If a child sent us a review, email us and we'll delete it.",
            es: "El sitio no está dirigido a menores de 13 años y no recopilamos a sabiendas información personal de ellos. Si un menor nos envió una reseña, escríbanos y la eliminaremos.",
          },
        ],
      },
      {
        heading: { en: "Security", es: "Seguridad" },
        paragraphs: [
          {
            en: "Everything travels over HTTPS and the review queue is private. Still, no system is perfectly secure, so keep anything sensitive out of a review.",
            es: "Todo viaja por HTTPS y la cola de reseñas es privada. Aun así, ningún sistema es perfectamente seguro, así que no incluya nada sensible en una reseña.",
          },
        ],
      },
      {
        heading: { en: "Changes", es: "Cambios" },
        paragraphs: [
          {
            en: "If we change what we collect, we'll update this page and the date at the top before the change goes live.",
            es: "Si cambiamos lo que recopilamos, actualizaremos esta página y la fecha al inicio antes de que el cambio entre en vigor.",
          },
        ],
      },
    ],
  },
};
