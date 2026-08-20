/* =========================================================================
   Quantum4Colorado — shared data layer: the Learn Quantum course
   A self-paced course for students with no physics background: seven units,
   eighteen lessons, each a short read with optional diagrams and a
   knowledge check at the end.

   Structure:
     UNITS[]           ordered units
       .lessons[]      ordered lessons within the unit
         .sections[]   the lesson body, split into headed prose blocks
         .quiz[]       end-of-lesson knowledge check (never gates progress)

   `icon` strings resolve through ICON_REGISTRY (src/shared/uiKit.jsx) and
   `diagram` strings through DIAGRAM_REGISTRY (src/education/diagrams) —
   the same string-key indirection the rest of /data uses, since a shared
   data file can't hold component references.

   Bilingual: every user-facing string is an { en, es } pair, resolved with
   pick()/makeTranslator() from data/i18n.js. Proper nouns (NIST, JILA,
   Grover, Shor) stay untranslated in both languages.

   Voice: second person, plain language, an everyday analogy before any
   piece of jargon. Same register as data/resources.js — never assume the
   reader has seen a physics class.
   ========================================================================= */

export const UNITS = [
  /* ======================================================= UNIT 1 ======= */
  {
    id: "foundations",
    icon: "Layers",
    title: { en: "Foundations", es: "Fundamentos" },
    summary: {
      en: "What actually makes a computer \"quantum,\" and the two ideas — superposition and measurement — that everything else in this course is built on.",
      es: "Qué hace que una computadora sea realmente \"cuántica\", y las dos ideas — superposición y medición — sobre las que se construye todo lo demás en este curso.",
    },
    lessons: [
      {
        slug: "what-makes-a-computer-quantum",
        estimatedMinutes: 5,
        title: {
          en: "What Makes a Computer \"Quantum\"?",
          es: "¿Qué Hace que una Computadora Sea \"Cuántica\"?",
        },
        bigIdea: {
          en: "A quantum computer is not a faster laptop. It is a different kind of machine that stores information in a way an ordinary computer physically cannot.",
          es: "Una computadora cuántica no es una laptop más rápida. Es un tipo distinto de máquina que guarda información de una forma que una computadora común no puede físicamente.",
        },
        sections: [
          {
            heading: { en: "Start with the bit", es: "Empecemos por el bit" },
            body: {
              en: "Every device you own runs on bits. A bit is the smallest piece of information a computer can hold, and it has exactly two options: 0 or 1. Off or on. That is it. Your photos, your messages, this sentence — all of it is stored as long strings of those two digits, and every calculation your phone does is really just billions of tiny operations flipping bits between 0 and 1. This system works extraordinarily well. It has powered every computer built in the last seventy years.",
              es: "Cada aparato que usted tiene funciona con bits. Un bit es la porción más pequeña de información que una computadora puede guardar, y tiene exactamente dos opciones: 0 o 1. Apagado o encendido. Eso es todo. Sus fotos, sus mensajes, esta oración: todo se guarda como cadenas largas de esos dos dígitos, y cada cálculo que hace su teléfono es en realidad miles de millones de operaciones diminutas que cambian bits entre 0 y 1. Este sistema funciona extraordinariamente bien. Ha impulsado cada computadora construida en los últimos setenta años.",
            },
          },
          {
            heading: { en: "Now change the rules", es: "Ahora cambiemos las reglas" },
            body: {
              en: "A quantum computer replaces the bit with a qubit. A qubit can be 0, or 1, or — and this is the part with no everyday equivalent — a genuine blend of both at the same time. Not \"we don't know which yet.\" Actually both, simultaneously, until the moment you look. That blend is called superposition, and it is the subject of the next lesson. The important thing right now is that this is a physical difference, not a software trick. Qubits are built from real physical things that behave this way naturally: single atoms, particles of light, or tiny superconducting loops chilled to nearly absolute zero.",
              es: "Una computadora cuántica reemplaza el bit por un qubit. Un qubit puede ser 0, o 1, o — y esta es la parte sin equivalente en la vida diaria — una mezcla real de ambos al mismo tiempo. No se trata de \"todavía no sabemos cuál\". Es que realmente son los dos, a la vez, hasta el momento en que usted mira. Esa mezcla se llama superposición, y es el tema de la próxima lección. Lo importante ahora es que se trata de una diferencia física, no de un truco de software. Los qubits se construyen con cosas físicas reales que se comportan así de forma natural: átomos individuales, partículas de luz o pequeños circuitos superconductores enfriados casi hasta el cero absoluto.",
            },
            diagram: "classicalVsQuantum",
          },
          {
            heading: {
              en: "Why anyone bothers",
              es: "Por qué alguien se toma la molestia",
            },
            body: {
              en: "Because some problems get impossibly large for ordinary computers. Imagine simulating how a single drug molecule behaves. Every additional atom multiplies the number of possibilities you have to track, and it does not take many atoms before the count exceeds what every computer on Earth working together could handle. A quantum computer sidesteps that wall for certain problems, because its qubits can hold many possibilities at once instead of grinding through them one at a time. This is a narrow superpower, not a general one — for email and homework a quantum computer would actually be worse — but the problems it does touch are enormously valuable ones.",
              es: "Porque algunos problemas se vuelven imposiblemente grandes para las computadoras comunes. Imagine simular cómo se comporta una sola molécula de un medicamento. Cada átomo adicional multiplica la cantidad de posibilidades que hay que seguir, y no hacen falta muchos átomos para que ese número supere lo que todas las computadoras de la Tierra juntas podrían manejar. Una computadora cuántica esquiva ese muro para ciertos problemas, porque sus qubits pueden contener muchas posibilidades a la vez en lugar de recorrerlas una por una. Es un superpoder estrecho, no general — para el correo y la tarea escolar una computadora cuántica sería peor — pero los problemas que sí abarca son enormemente valiosos.",
            },
          },
          {
            heading: {
              en: "What this course will do",
              es: "Lo que hará este curso",
            },
            body: {
              en: "Over the next seventeen lessons you will build up from this foundation: how superposition and measurement work, what entanglement really is, how quantum circuits are assembled from gates, what the famous algorithms actually do, why real hardware is so difficult to build, and why all of this is already changing how your data gets protected. You do not need calculus or a physics class. You need curiosity and about ninety minutes.",
              es: "En las próximas diecisiete lecciones usted construirá sobre esta base: cómo funcionan la superposición y la medición, qué es realmente el entrelazamiento, cómo se arman los circuitos cuánticos a partir de compuertas, qué hacen en realidad los algoritmos famosos, por qué el hardware real es tan difícil de construir, y por qué todo esto ya está cambiando la forma en que se protegen sus datos. No necesita cálculo ni una clase de física. Necesita curiosidad y unos noventa minutos.",
            },
          },
        ],
        quiz: [
          {
            prompt: {
              en: "What is the fundamental difference between a bit and a qubit?",
              es: "¿Cuál es la diferencia fundamental entre un bit y un qubit?",
            },
            choices: [
              {
                en: "A qubit can be 0, 1, or a genuine blend of both at once",
                es: "Un qubit puede ser 0, 1, o una mezcla real de ambos a la vez",
              },
              {
                en: "A qubit stores more decimal places than a bit",
                es: "Un qubit guarda más decimales que un bit",
              },
              {
                en: "A qubit switches between 0 and 1 much faster than a bit",
                es: "Un qubit cambia entre 0 y 1 mucho más rápido que un bit",
              },
              {
                en: "A qubit uses three values instead of two: 0, 1, and 2",
                es: "Un qubit usa tres valores en lugar de dos: 0, 1 y 2",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "A qubit is not a faster or bigger bit. It can hold 0 and 1 simultaneously — a state called superposition — which is something no ordinary bit can physically do.",
              es: "Un qubit no es un bit más rápido ni más grande. Puede contener 0 y 1 al mismo tiempo — un estado llamado superposición — algo que ningún bit común puede hacer físicamente.",
            },
          },
          {
            prompt: {
              en: "Would a quantum computer be better than your laptop at checking email?",
              es: "¿Sería una computadora cuántica mejor que su laptop para revisar el correo?",
            },
            choices: [
              {
                en: "No — it would actually be worse at everyday tasks",
                es: "No, en realidad sería peor para las tareas cotidianas",
              },
              {
                en: "Yes, because it is faster at absolutely everything",
                es: "Sí, porque es más rápida en absolutamente todo",
              },
              {
                en: "Yes, but only if it has more qubits than your laptop has bits",
                es: "Sí, pero solo si tiene más qubits que bits tiene su laptop",
              },
              {
                en: "They would perform about the same",
                es: "Tendrían un rendimiento más o menos igual",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "Quantum computers are specialists, not all-purpose speed upgrades. They only pull ahead on a narrow set of problems. For ordinary tasks a classical computer is simpler, cheaper, and better.",
              es: "Las computadoras cuánticas son especialistas, no mejoras generales de velocidad. Solo tienen ventaja en un conjunto reducido de problemas. Para tareas comunes, una computadora clásica es más simple, más barata y mejor.",
            },
          },
          {
            prompt: {
              en: "Why do some problems become impossible for ordinary computers?",
              es: "¿Por qué algunos problemas se vuelven imposibles para las computadoras comunes?",
            },
            choices: [
              {
                en: "Each added piece multiplies the possibilities until the count is unmanageable",
                es: "Cada pieza añadida multiplica las posibilidades hasta que la cantidad es inmanejable",
              },
              {
                en: "Ordinary computers run out of physical storage space",
                es: "Las computadoras comunes se quedan sin espacio físico de almacenamiento",
              },
              {
                en: "The problems require decimals too precise to represent",
                es: "Los problemas requieren decimales demasiado precisos para representarlos",
              },
              {
                en: "Programming languages cannot express those problems",
                es: "Los lenguajes de programación no pueden expresar esos problemas",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "It is a multiplication problem. Simulating a molecule means tracking possibilities that multiply with every atom added, so the total quickly exceeds what any classical machine could ever process.",
              es: "Es un problema de multiplicación. Simular una molécula implica seguir posibilidades que se multiplican con cada átomo añadido, así que el total supera rápidamente lo que cualquier máquina clásica podría procesar.",
            },
          },
        ],
      },

      {
        slug: "superposition",
        estimatedMinutes: 6,
        title: { en: "Superposition", es: "Superposición" },
        bigIdea: {
          en: "A qubit in superposition is genuinely both 0 and 1 at once — not unknown to you, but actually undecided — and that is what lets a quantum computer explore many paths in parallel.",
          es: "Un qubit en superposición es de verdad 0 y 1 a la vez — no es que usted no lo sepa, es que realmente no está decidido — y eso permite que una computadora cuántica explore muchos caminos en paralelo.",
        },
        sections: [
          {
            heading: { en: "The spinning coin", es: "La moneda que gira" },
            body: {
              en: "Flip a coin and watch it spin in the air. While it is spinning, what is it? Your instinct says it is already heads or tails and you simply cannot see which yet. That instinct is right about coins — and wrong about qubits. A qubit in superposition is not hiding an answer from you. There is no answer yet. It is genuinely in a combination of both states, and the universe has not picked one.",
              es: "Lance una moneda y obsérvela girar en el aire. Mientras gira, ¿qué es? Su instinto dice que ya es cara o cruz y que usted simplemente aún no puede ver cuál. Ese instinto acierta con las monedas, y se equivoca con los qubits. Un qubit en superposición no le está ocultando una respuesta. Todavía no hay respuesta. Está realmente en una combinación de ambos estados, y el universo no ha elegido uno.",
            },
            diagram: "superpositionCoin",
          },
          {
            heading: {
              en: "That distinction is not a technicality",
              es: "Esa distinción no es un tecnicismo",
            },
            body: {
              en: "It sounds like philosophy, but it has been tested in laboratories for decades and the difference shows up in the results. If a qubit were secretly already 0 or 1, certain experiments would come out one way. They come out the other way. The blend is real, and physicists can even control it: a qubit can be an even mix of 0 and 1, or lean seventy percent toward 1, or any balance in between. The mix itself is information that the machine can work with.",
              es: "Suena a filosofía, pero se ha puesto a prueba en laboratorios durante décadas y la diferencia aparece en los resultados. Si un qubit ya fuera secretamente 0 o 1, ciertos experimentos darían un resultado. Dan el contrario. La mezcla es real, y los físicos incluso pueden controlarla: un qubit puede ser una mezcla pareja de 0 y 1, o inclinarse setenta por ciento hacia el 1, o cualquier equilibrio intermedio. La mezcla misma es información con la que la máquina puede trabajar.",
            },
          },
          {
            heading: { en: "Why this is powerful", es: "Por qué esto es poderoso" },
            body: {
              en: "Here is where it stops being a curiosity. One qubit holds a blend of 2 states. Two qubits hold a blend of 4. Three hold 8. Each qubit you add doubles the number of combinations represented at once. By the time you have 300 qubits, the number of combinations exceeds the number of atoms in the observable universe. A classical computer would need to store and process those possibilities one after another. A quantum computer holds them together and operates on all of them in a single step.",
              es: "Aquí es donde deja de ser una curiosidad. Un qubit contiene una mezcla de 2 estados. Dos qubits contienen una mezcla de 4. Tres contienen 8. Cada qubit que se añade duplica la cantidad de combinaciones representadas a la vez. Para cuando se tienen 300 qubits, la cantidad de combinaciones supera la cantidad de átomos del universo observable. Una computadora clásica tendría que guardar y procesar esas posibilidades una tras otra. Una computadora cuántica las mantiene juntas y opera sobre todas en un solo paso.",
            },
          },
          {
            heading: { en: "The catch", es: "El problema" },
            body: {
              en: "You cannot simply read all those answers out. The moment you measure a qubit, the blend collapses and you get one plain 0 or 1, like the coin landing. All that parallel richness vanishes into a single result. This is the central frustration of quantum computing and the reason clever algorithms are necessary: the entire art is arranging the calculation so that when the collapse happens, the answer you want is overwhelmingly the one most likely to appear. The next lesson is about that collapse.",
              es: "Usted no puede simplemente leer todas esas respuestas. En el momento en que mide un qubit, la mezcla colapsa y obtiene un 0 o un 1 común, como la moneda al caer. Toda esa riqueza paralela se desvanece en un único resultado. Esta es la frustración central de la computación cuántica y la razón por la que hacen falta algoritmos ingeniosos: todo el arte consiste en organizar el cálculo para que, cuando ocurra el colapso, la respuesta que usted quiere sea abrumadoramente la que más probablemente aparezca. La próxima lección trata de ese colapso.",
            },
          },
        ],
        quiz: [
          {
            prompt: {
              en: "A qubit is in superposition. What is true about its value?",
              es: "Un qubit está en superposición. ¿Qué es cierto sobre su valor?",
            },
            choices: [
              {
                en: "It is genuinely both 0 and 1; no value has been decided yet",
                es: "Es de verdad 0 y 1 a la vez; todavía no se ha decidido ningún valor",
              },
              {
                en: "It is already 0 or 1, but we cannot see which one",
                es: "Ya es 0 o 1, pero no podemos ver cuál",
              },
              {
                en: "It alternates rapidly between 0 and 1",
                es: "Alterna rápidamente entre 0 y 1",
              },
              {
                en: "It is a third value that is neither 0 nor 1",
                es: "Es un tercer valor que no es ni 0 ni 1",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "This is the distinction that matters most. Superposition is not hidden information or rapid switching — the value genuinely has not been determined, and laboratory experiments confirm the difference.",
              es: "Esta es la distinción que más importa. La superposición no es información oculta ni un cambio rápido: el valor realmente no se ha determinado, y los experimentos de laboratorio confirman la diferencia.",
            },
          },
          {
            prompt: {
              en: "How many combinations can 3 qubits represent at once?",
              es: "¿Cuántas combinaciones pueden representar 3 qubits a la vez?",
            },
            choices: [
              { en: "8", es: "8" },
              { en: "3", es: "3" },
              { en: "6", es: "6" },
              { en: "9", es: "9" },
            ],
            correctIndex: 0,
            explanation: {
              en: "Each qubit doubles the count: 1 qubit gives 2, two give 4, three give 8. That doubling is why a few hundred qubits can represent more combinations than there are atoms in the universe.",
              es: "Cada qubit duplica la cantidad: 1 qubit da 2, dos dan 4, tres dan 8. Esa duplicación es la razón por la que unos cientos de qubits pueden representar más combinaciones que átomos hay en el universo.",
            },
          },
          {
            prompt: {
              en: "Why can't we just read out all the possibilities a qubit holds?",
              es: "¿Por qué no podemos simplemente leer todas las posibilidades que contiene un qubit?",
            },
            choices: [
              {
                en: "Measuring collapses the blend into a single ordinary 0 or 1",
                es: "Medir colapsa la mezcla en un solo 0 o 1 común",
              },
              {
                en: "Current instruments are not sensitive enough yet",
                es: "Los instrumentos actuales todavía no son lo bastante sensibles",
              },
              {
                en: "The possibilities are stored in a format we cannot decode",
                es: "Las posibilidades se guardan en un formato que no podemos decodificar",
              },
              {
                en: "Reading them would take longer than the age of the universe",
                es: "Leerlas tardaría más que la edad del universo",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "It is a law of physics, not an engineering limitation. Measurement forces the superposition to collapse to one result, which is exactly why quantum algorithms must be designed to make the desired answer the most likely one.",
              es: "Es una ley de la física, no una limitación de ingeniería. La medición obliga a la superposición a colapsar en un solo resultado, y por eso los algoritmos cuánticos deben diseñarse para que la respuesta deseada sea la más probable.",
            },
          },
        ],
      },

      {
        slug: "measurement",
        estimatedMinutes: 5,
        title: { en: "Measurement", es: "La Medición" },
        bigIdea: {
          en: "Measuring a qubit destroys its superposition and returns one ordinary bit. Everything hard and everything clever about quantum computing follows from that single fact.",
          es: "Medir un qubit destruye su superposición y devuelve un bit común. Todo lo difícil y todo lo ingenioso de la computación cuántica se desprende de ese único hecho.",
        },
        sections: [
          {
            heading: { en: "The coin lands", es: "La moneda cae" },
            body: {
              en: "Superposition ends the instant you look. The spinning coin hits the table and it is heads — one outcome, no blend, nothing left of the in-between state. In quantum computing this is called measurement or collapse, and it is not gentle. You do not get a peek. You get a single 0 or a single 1, and the superposition that produced it is gone for good. Run the identical experiment again and you may get the opposite answer.",
              es: "La superposición termina en el instante en que usted mira. La moneda que giraba cae sobre la mesa y es cara: un solo resultado, sin mezcla, sin nada del estado intermedio. En computación cuántica esto se llama medición o colapso, y no es suave. Usted no obtiene un vistazo. Obtiene un solo 0 o un solo 1, y la superposición que lo produjo desaparece para siempre. Repita el mismo experimento y puede obtener la respuesta contraria.",
            },
            diagram: "measurementCollapse",
          },
          {
            heading: {
              en: "The blend decides the odds",
              es: "La mezcla decide las probabilidades",
            },
            body: {
              en: "Which result you get is not arbitrary — it is governed by how the superposition was balanced. A qubit in an even mix gives you 0 about half the time and 1 about half the time. A qubit leaning ninety percent toward 1 gives you 1 about nine times out of ten. So a single measurement tells you very little, but running the same program many times and counting the outcomes reveals the underlying balance. Real quantum computations are run hundreds or thousands of times, and the answer is read from the pattern of results rather than from any single one.",
              es: "El resultado que usted obtiene no es arbitrario: depende de cómo estaba equilibrada la superposición. Un qubit en una mezcla pareja da 0 aproximadamente la mitad de las veces y 1 la otra mitad. Un qubit inclinado noventa por ciento hacia el 1 da 1 unas nueve de cada diez veces. Así que una sola medición dice muy poco, pero ejecutar el mismo programa muchas veces y contar los resultados revela el equilibrio subyacente. Los cálculos cuánticos reales se ejecutan cientos o miles de veces, y la respuesta se lee del patrón de resultados y no de uno solo.",
            },
          },
          {
            heading: {
              en: "Why the universe is not being difficult on purpose",
              es: "Por qué el universo no es difícil a propósito",
            },
            body: {
              en: "Measurement collapse is not a design flaw someone will eventually engineer around. It is a consequence of what measuring physically means: to learn a qubit's value, something has to interact with it, and any interaction strong enough to reveal the value is strong enough to destroy the delicate blend. This is also why quantum computers are kept in extreme isolation — near absolute zero, shielded from vibration and stray radiation. A stray particle bumping into a qubit is an accidental measurement, and it ruins the calculation. You will meet that problem again in the lesson on noise.",
              es: "El colapso por medición no es un defecto de diseño que alguien vaya a resolver algún día con ingeniería. Es una consecuencia de lo que significa medir físicamente: para conocer el valor de un qubit, algo tiene que interactuar con él, y cualquier interacción lo bastante fuerte como para revelar el valor lo es también para destruir la delicada mezcla. Por eso las computadoras cuánticas se mantienen en aislamiento extremo: cerca del cero absoluto, protegidas de vibraciones y radiación dispersa. Una partícula perdida que choca con un qubit es una medición accidental, y arruina el cálculo. Volverá a encontrarse con ese problema en la lección sobre el ruido.",
            },
          },
          {
            heading: {
              en: "The whole game, stated plainly",
              es: "El juego completo, dicho claramente",
            },
            body: {
              en: "Put superposition and measurement together and you have the core challenge of the field. A quantum computer can hold an enormous number of possibilities at once, but it will only ever hand you one answer, chosen by chance according to the balance you set up. Designing a quantum algorithm means arranging the calculation so that wrong answers cancel each other out and the right answer is left standing with high probability. Every algorithm in Unit 4 is a different strategy for doing exactly that.",
              es: "Junte superposición y medición y tendrá el desafío central del campo. Una computadora cuántica puede contener una cantidad enorme de posibilidades a la vez, pero solo le entregará una respuesta, elegida al azar según el equilibrio que usted haya establecido. Diseñar un algoritmo cuántico significa organizar el cálculo para que las respuestas equivocadas se cancelen entre sí y la correcta quede en pie con alta probabilidad. Cada algoritmo de la Unidad 4 es una estrategia distinta para lograr exactamente eso.",
            },
          },
        ],
        quiz: [
          {
            prompt: {
              en: "What happens to a qubit's superposition when you measure it?",
              es: "¿Qué le pasa a la superposición de un qubit cuando se mide?",
            },
            choices: [
              {
                en: "It collapses permanently, leaving a single 0 or 1",
                es: "Colapsa permanentemente y deja un solo 0 o 1",
              },
              {
                en: "It pauses during the reading and then resumes",
                es: "Se pausa durante la lectura y luego se reanuda",
              },
              {
                en: "It is copied so the original stays intact",
                es: "Se copia para que el original quede intacto",
              },
              {
                en: "Nothing — measurement does not affect a qubit",
                es: "Nada; la medición no afecta a un qubit",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "Measurement is destructive and permanent. The blend is gone and you are left with one ordinary bit — which is why a calculation is typically run many times over.",
              es: "La medición es destructiva y permanente. La mezcla desaparece y queda un bit común, y por eso un cálculo suele ejecutarse muchas veces.",
            },
          },
          {
            prompt: {
              en: "A qubit leans 90% toward 1. What does one measurement give you?",
              es: "Un qubit se inclina 90% hacia el 1. ¿Qué da una sola medición?",
            },
            choices: [
              {
                en: "Either 0 or 1, but 1 about nine times out of ten",
                es: "0 o 1, pero 1 unas nueve de cada diez veces",
              },
              { en: "Always 1, with complete certainty", es: "Siempre 1, con total certeza" },
              { en: "The value 0.9", es: "El valor 0,9" },
              {
                en: "A blend of 0 and 1 weighted 90/10",
                es: "Una mezcla de 0 y 1 ponderada 90/10",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "The balance sets the odds, not the outcome. You always get a plain 0 or 1; the 90% lean only means 1 will show up far more often across repeated runs.",
              es: "El equilibrio fija las probabilidades, no el resultado. Siempre se obtiene un 0 o un 1 común; la inclinación del 90% solo significa que el 1 aparecerá mucho más seguido en ejecuciones repetidas.",
            },
          },
          {
            prompt: {
              en: "Why must quantum computers be kept in extreme isolation?",
              es: "¿Por qué las computadoras cuánticas deben mantenerse en aislamiento extremo?",
            },
            choices: [
              {
                en: "Stray particles act as accidental measurements that ruin the calculation",
                es: "Las partículas perdidas actúan como mediciones accidentales que arruinan el cálculo",
              },
              {
                en: "The processors generate too much heat to run warm",
                es: "Los procesadores generan demasiado calor para funcionar templados",
              },
              {
                en: "Cold temperatures make the qubits switch faster",
                es: "Las temperaturas frías hacen que los qubits cambien más rápido",
              },
              {
                en: "It prevents other people from stealing the results",
                es: "Impide que otras personas roben los resultados",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "Any interaction strong enough to reveal a qubit's value also destroys its superposition. Isolation keeps the environment from measuring the qubits by accident before the program finishes.",
              es: "Cualquier interacción lo bastante fuerte para revelar el valor de un qubit también destruye su superposición. El aislamiento evita que el entorno mida los qubits por accidente antes de que el programa termine.",
            },
          },
        ],
      },
    ],
  },

  /* ======================================================= UNIT 2 ======= */
  {
    id: "entanglement",
    icon: "Link2",
    title: { en: "Entanglement", es: "Entrelazamiento" },
    summary: {
      en: "The strangest idea in physics, and the one that turns a pile of qubits into something more powerful than the sum of its parts.",
      es: "La idea más extraña de la física, y la que convierte un montón de qubits en algo más poderoso que la suma de sus partes.",
    },
    lessons: [
      {
        slug: "entanglement",
        estimatedMinutes: 6,
        title: { en: "Entanglement", es: "Entrelazamiento" },
        bigIdea: {
          en: "Two entangled qubits stop being two separate things. They share a single joint state, so measuring one instantly determines the other — no matter how far apart they are.",
          es: "Dos qubits entrelazados dejan de ser dos cosas separadas. Comparten un único estado conjunto, así que medir uno determina instantáneamente el otro, sin importar cuán lejos estén.",
        },
        sections: [
          {
            heading: { en: "Two linked coins", es: "Dos monedas vinculadas" },
            body: {
              en: "Picture two coins that have been magically linked. Put one in your pocket and mail the other to Tokyo. Now flip yours. It comes up heads — and at that exact instant, the coin in Tokyo is tails. Every time. Flip yours again and get tails, and Tokyo is heads. The coins are not communicating; nothing travels between them. They were never two independent coins in the first place. That is entanglement.",
              es: "Imagine dos monedas vinculadas por arte de magia. Guarde una en su bolsillo y envíe la otra a Tokio. Ahora lance la suya. Sale cara, y en ese mismo instante, la moneda en Tokio es cruz. Siempre. Lance la suya de nuevo y salga cruz, y Tokio es cara. Las monedas no se están comunicando; nada viaja entre ellas. Nunca fueron dos monedas independientes. Eso es el entrelazamiento.",
            },
            diagram: "entangledPair",
          },
          {
            heading: {
              en: "Einstein hated this",
              es: "A Einstein no le gustaba nada esto",
            },
            body: {
              en: "Albert Einstein called it \"spooky action at a distance\" and spent years arguing it could not be the whole story. Surely, he reasoned, the coins carried hidden instructions all along — some secret note agreed on before they were separated. In 1964 the physicist John Bell worked out a test that could tell the two explanations apart, and when experiments were finally run, the hidden-instructions idea lost. The 2022 Nobel Prize in Physics went to three researchers for settling it. Entanglement is real, and it is not hidden bookkeeping.",
              es: "Albert Einstein lo llamó \"acción fantasmal a distancia\" y pasó años argumentando que no podía ser toda la historia. Seguramente, razonaba, las monedas llevaban instrucciones ocultas desde el principio: alguna nota secreta acordada antes de separarlas. En 1964 el físico John Bell ideó una prueba capaz de distinguir ambas explicaciones, y cuando por fin se hicieron los experimentos, la idea de las instrucciones ocultas perdió. El Premio Nobel de Física de 2022 fue para tres investigadores por haberlo resuelto. El entrelazamiento es real, y no es contabilidad oculta.",
            },
          },
          {
            heading: {
              en: "No, you cannot text with it",
              es: "No, no se puede enviar mensajes con esto",
            },
            body: {
              en: "This is the most common misunderstanding, so it is worth being direct. Entanglement does not let you send a message faster than light. When you measure your coin you get a random result — you cannot choose heads. The person in Tokyo also sees a random result. Only when you compare notes later, over an ordinary phone call limited by the speed of light, does the perfect correlation become visible. The link is real, but it carries no signal you can control.",
              es: "Este es el malentendido más común, así que conviene ser directo. El entrelazamiento no permite enviar un mensaje más rápido que la luz. Cuando usted mide su moneda obtiene un resultado azaroso: no puede elegir cara. La persona en Tokio también ve un resultado azaroso. Solo cuando comparan notas después, por una llamada telefónica común limitada por la velocidad de la luz, se vuelve visible la correlación perfecta. El vínculo es real, pero no transporta ninguna señal que usted pueda controlar.",
            },
          },
          {
            heading: {
              en: "One state, not two",
              es: "Un estado, no dos",
            },
            body: {
              en: "The cleanest way to think about it is this: entangled qubits do not have individual states anymore. There is no fact about what your coin is, separate from the pair. There is only a joint state describing both together — \"opposite of each other\" — and neither half has a value of its own until measurement. This is genuinely different from anything in ordinary experience, and it is the property the next lesson turns into computing power.",
              es: "La forma más clara de pensarlo es esta: los qubits entrelazados ya no tienen estados individuales. No hay ningún hecho sobre qué es su moneda, aparte del par. Solo hay un estado conjunto que describe a ambas juntas — \"opuestas entre sí\" — y ninguna mitad tiene un valor propio hasta la medición. Esto es realmente distinto de cualquier cosa de la experiencia común, y es la propiedad que la próxima lección convierte en potencia de cálculo.",
            },
          },
        ],
        quiz: [
          {
            prompt: {
              en: "Can entanglement be used to send messages faster than light?",
              es: "¿Se puede usar el entrelazamiento para enviar mensajes más rápido que la luz?",
            },
            choices: [
              {
                en: "No — each measurement gives a random result you cannot control",
                es: "No; cada medición da un resultado azaroso que no se puede controlar",
              },
              {
                en: "Yes, that is its main practical use",
                es: "Sí, ese es su principal uso práctico",
              },
              {
                en: "Yes, but only across distances under one kilometer",
                es: "Sí, pero solo en distancias menores a un kilómetro",
              },
              {
                en: "Only if both qubits are measured at the same moment",
                es: "Solo si ambos qubits se miden en el mismo momento",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "This is the most common misconception about entanglement. You cannot choose your outcome, so no information is transmitted. The correlation only becomes visible when the two sides compare notes through ordinary, light-speed-limited communication.",
              es: "Este es el error más común sobre el entrelazamiento. Usted no puede elegir su resultado, así que no se transmite información. La correlación solo se hace visible cuando ambas partes comparan notas por comunicación común, limitada por la velocidad de la luz.",
            },
          },
          {
            prompt: {
              en: "What did Bell's test and later experiments establish?",
              es: "¿Qué establecieron la prueba de Bell y los experimentos posteriores?",
            },
            choices: [
              {
                en: "Entangled particles do not carry hidden instructions agreed on in advance",
                es: "Las partículas entrelazadas no llevan instrucciones ocultas acordadas de antemano",
              },
              {
                en: "Einstein was right that entanglement is an illusion",
                es: "Einstein tenía razón en que el entrelazamiento es una ilusión",
              },
              {
                en: "Entanglement only works at extremely low temperatures",
                es: "El entrelazamiento solo funciona a temperaturas extremadamente bajas",
              },
              {
                en: "Entangled particles communicate through an undiscovered force",
                es: "Las partículas entrelazadas se comunican mediante una fuerza no descubierta",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "Einstein's proposed explanation — that the particles secretly agreed on their answers beforehand — was ruled out experimentally. The 2022 Nobel Prize in Physics recognized that work.",
              es: "La explicación que propuso Einstein — que las partículas acordaban sus respuestas en secreto de antemano — quedó descartada experimentalmente. El Premio Nobel de Física de 2022 reconoció ese trabajo.",
            },
          },
          {
            prompt: {
              en: "What is the best description of two entangled qubits?",
              es: "¿Cuál es la mejor descripción de dos qubits entrelazados?",
            },
            choices: [
              {
                en: "They share one joint state; neither has an individual value",
                es: "Comparten un estado conjunto; ninguno tiene un valor individual",
              },
              {
                en: "They are two separate qubits that happen to match",
                es: "Son dos qubits separados que casualmente coinciden",
              },
              {
                en: "One is the original and the other is a copy of it",
                es: "Uno es el original y el otro es una copia",
              },
              {
                en: "They take turns holding the value between them",
                es: "Se turnan para sostener el valor entre ambos",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "Entangled qubits stop being individually describable. There is only a joint state covering both — which is precisely what makes entanglement more than ordinary correlation.",
              es: "Los qubits entrelazados dejan de poder describirse individualmente. Solo existe un estado conjunto que cubre a ambos, y eso es precisamente lo que hace que el entrelazamiento sea más que una correlación común.",
            },
          },
        ],
      },

      {
        slug: "why-entanglement-matters",
        estimatedMinutes: 5,
        title: {
          en: "Why Entanglement Enables New Computing",
          es: "Por Qué el Entrelazamiento Permite una Nueva Computación",
        },
        bigIdea: {
          en: "Entanglement lets qubits act as one connected system rather than a row of independent switches, and that is where the exponential power actually comes from.",
          es: "El entrelazamiento permite que los qubits actúen como un sistema conectado en lugar de una fila de interruptores independientes, y de ahí viene realmente la potencia exponencial.",
        },
        sections: [
          {
            heading: {
              en: "Superposition alone is not enough",
              es: "La superposición sola no alcanza",
            },
            body: {
              en: "It is tempting to think superposition does all the work: put every qubit in a blend, try everything at once, done. But a row of qubits each independently in superposition is not much more useful than a row of ordinary random bits. You can hold many possibilities, but you cannot make them work together, and measurement will just hand you one random combination. Something has to connect the qubits so that operations on one affect the others.",
              es: "Es tentador pensar que la superposición hace todo el trabajo: poner cada qubit en una mezcla, probar todo a la vez, listo. Pero una fila de qubits, cada uno en superposición de forma independiente, no es mucho más útil que una fila de bits comunes al azar. Usted puede contener muchas posibilidades, pero no puede hacer que trabajen juntas, y la medición simplemente le entregará una combinación al azar. Algo tiene que conectar los qubits para que las operaciones sobre uno afecten a los demás.",
            },
          },
          {
            heading: { en: "Entanglement is the wiring", es: "El entrelazamiento es el cableado" },
            body: {
              en: "Entanglement is what supplies that connection. Once qubits are entangled, a single operation can ripple through the whole group, and the possibilities they hold stop being independent lists and become a structured web of relationships. This is what allows a quantum program to compute with all those possibilities rather than merely store them. A useful shorthand: superposition provides the raw breadth, entanglement provides the structure that makes the breadth usable.",
              es: "El entrelazamiento aporta esa conexión. Una vez que los qubits están entrelazados, una sola operación puede propagarse por todo el grupo, y las posibilidades que contienen dejan de ser listas independientes para convertirse en una red estructurada de relaciones. Esto es lo que permite que un programa cuántico calcule con todas esas posibilidades en lugar de solo guardarlas. Una síntesis útil: la superposición aporta la amplitud bruta, el entrelazamiento aporta la estructura que hace esa amplitud utilizable.",
            },
          },
          {
            heading: {
              en: "Cancelling out the wrong answers",
              es: "Cancelar las respuestas equivocadas",
            },
            body: {
              en: "Recall the problem from the measurement lesson: you only get one answer, chosen at random. Entanglement is what lets an algorithm stack the deck. Because the possibilities are linked, they can be made to interfere with one another — wrong answers arranged to cancel out, correct answers arranged to reinforce. Interference is the technical name for this, and it is the mechanism behind every quantum algorithm you will meet in Unit 4. Without entanglement there is nothing to interfere.",
              es: "Recuerde el problema de la lección sobre medición: usted solo obtiene una respuesta, elegida al azar. El entrelazamiento es lo que permite a un algoritmo inclinar la balanza. Como las posibilidades están vinculadas, se puede hacer que interfieran entre sí: las respuestas equivocadas se organizan para cancelarse y las correctas para reforzarse. Interferencia es el nombre técnico de esto, y es el mecanismo detrás de cada algoritmo cuántico que verá en la Unidad 4. Sin entrelazamiento no hay nada que interfiera.",
            },
          },
          {
            heading: {
              en: "Beyond computing",
              es: "Más allá de la computación",
            },
            body: {
              en: "Entanglement also underpins quantum networking. Because you cannot observe an entangled pair without disturbing it, two parties can use entangled particles to build a shared secret key and detect any eavesdropper automatically — the act of listening leaves evidence. This is quantum key distribution, and unlike quantum computers it already works over real fiber links today. It is a different application of the same physics you just learned.",
              es: "El entrelazamiento también sostiene las redes cuánticas. Como no se puede observar un par entrelazado sin perturbarlo, dos partes pueden usar partículas entrelazadas para construir una clave secreta compartida y detectar automáticamente a cualquier espía: el acto de escuchar deja evidencia. Esto es la distribución cuántica de claves y, a diferencia de las computadoras cuánticas, ya funciona hoy sobre enlaces de fibra reales. Es una aplicación distinta de la misma física que acaba de aprender.",
            },
          },
        ],
        quiz: [
          {
            prompt: {
              en: "Why isn't superposition alone enough for quantum computing?",
              es: "¿Por qué no basta la superposición sola para la computación cuántica?",
            },
            choices: [
              {
                en: "Independent qubits cannot work together; measurement yields a random combination",
                es: "Los qubits independientes no pueden trabajar juntos; la medición da una combinación al azar",
              },
              {
                en: "Superposition decays too quickly to be useful",
                es: "La superposición decae demasiado rápido para ser útil",
              },
              {
                en: "Superposition only works with fewer than ten qubits",
                es: "La superposición solo funciona con menos de diez qubits",
              },
              {
                en: "Superposition requires far more energy than entanglement",
                es: "La superposición requiere mucha más energía que el entrelazamiento",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "Unconnected qubits in superposition are little better than random bits. Entanglement supplies the links that let operations on one qubit affect the others, turning stored possibilities into usable computation.",
              es: "Los qubits desconectados en superposición son poco mejores que bits al azar. El entrelazamiento aporta los vínculos que permiten que las operaciones sobre un qubit afecten a los demás, convirtiendo posibilidades guardadas en cálculo utilizable.",
            },
          },
          {
            prompt: {
              en: "What is interference used for in a quantum algorithm?",
              es: "¿Para qué se usa la interferencia en un algoritmo cuántico?",
            },
            choices: [
              {
                en: "Cancelling out wrong answers so the right one is most likely measured",
                es: "Cancelar respuestas equivocadas para que la correcta sea la más probable al medir",
              },
              {
                en: "Blocking outside radiation from reaching the qubits",
                es: "Bloquear la radiación externa para que no llegue a los qubits",
              },
              {
                en: "Speeding up how fast qubits change state",
                es: "Acelerar la velocidad a la que los qubits cambian de estado",
              },
              {
                en: "Copying a qubit's state onto a second qubit",
                es: "Copiar el estado de un qubit en un segundo qubit",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "Interference is how algorithms beat the randomness of measurement. Linked possibilities are arranged so incorrect answers destructively cancel and the correct one reinforces.",
              es: "La interferencia es la forma en que los algoritmos vencen la aleatoriedad de la medición. Las posibilidades vinculadas se organizan para que las respuestas incorrectas se cancelen y la correcta se refuerce.",
            },
          },
          {
            prompt: {
              en: "How does quantum key distribution detect an eavesdropper?",
              es: "¿Cómo detecta un espía la distribución cuántica de claves?",
            },
            choices: [
              {
                en: "Observing an entangled pair disturbs it, leaving detectable evidence",
                es: "Observar un par entrelazado lo perturba y deja evidencia detectable",
              },
              {
                en: "It traces the physical location of the listener",
                es: "Rastrea la ubicación física de quien escucha",
              },
              {
                en: "It encrypts the key with an unbreakable password",
                es: "Cifra la clave con una contraseña indescifrable",
              },
              {
                en: "It sends decoy messages to confuse the attacker",
                es: "Envía mensajes señuelo para confundir al atacante",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "The security comes from physics, not from a hard math problem. Any measurement disturbs the entangled state, so eavesdropping automatically announces itself.",
              es: "La seguridad viene de la física, no de un problema matemático difícil. Cualquier medición perturba el estado entrelazado, así que espiar se delata automáticamente.",
            },
          },
        ],
      },
    ],
  },

  /* ======================================================= UNIT 3 ======= */
  {
    id: "gates-and-circuits",
    icon: "Cpu",
    title: { en: "Gates and Circuits", es: "Compuertas y Circuitos" },
    summary: {
      en: "How you actually program a quantum computer: the operations you apply to qubits, and the diagrams used to describe them.",
      es: "Cómo se programa realmente una computadora cuántica: las operaciones que se aplican a los qubits y los diagramas que se usan para describirlas.",
    },
    lessons: [
      {
        slug: "quantum-gates",
        estimatedMinutes: 6,
        title: { en: "Quantum Gates", es: "Compuertas Cuánticas" },
        bigIdea: {
          en: "A quantum gate is a reversible operation that nudges qubits into new states. Gates are the instruction set — the verbs of quantum programming.",
          es: "Una compuerta cuántica es una operación reversible que empuja los qubits a nuevos estados. Las compuertas son el conjunto de instrucciones: los verbos de la programación cuántica.",
        },
        sections: [
          {
            heading: {
              en: "Classical gates first",
              es: "Primero las compuertas clásicas",
            },
            body: {
              en: "Ordinary computers are built from logic gates: tiny circuits that take bits in and put bits out. A NOT gate flips a bit — 0 becomes 1. An AND gate outputs 1 only when both of its inputs are 1. Chain millions of these together and you get a processor. Nothing about a laptop is more mysterious than that; it is gates all the way down.",
              es: "Las computadoras comunes se construyen con compuertas lógicas: circuitos diminutos que reciben bits y entregan bits. Una compuerta NOT invierte un bit: el 0 se vuelve 1. Una compuerta AND entrega 1 solo cuando sus dos entradas son 1. Encadene millones de estas y obtendrá un procesador. Nada de una laptop es más misterioso que eso; son compuertas hasta el fondo.",
            },
          },
          {
            heading: {
              en: "Quantum gates, and one big rule",
              es: "Las compuertas cuánticas y una gran regla",
            },
            body: {
              en: "Quantum gates do the same job for qubits, with one strict difference: every quantum gate must be reversible. Given the output you must always be able to work backwards to the input. Classical AND fails this test — if the output is 0 you cannot tell which inputs produced it — which is why quantum computers need their own gate set rather than reusing the classical one. Reversibility is not an arbitrary rule; it comes from the underlying physics, which runs equally well in both directions.",
              es: "Las compuertas cuánticas hacen el mismo trabajo con los qubits, con una diferencia estricta: toda compuerta cuántica debe ser reversible. Dado el resultado, siempre se debe poder retroceder hasta la entrada. La compuerta clásica AND no pasa esta prueba — si el resultado es 0 no se puede saber qué entradas lo produjeron — y por eso las computadoras cuánticas necesitan su propio conjunto de compuertas en lugar de reutilizar el clásico. La reversibilidad no es una regla arbitraria; viene de la física subyacente, que funciona igual de bien en ambas direcciones.",
            },
          },
          {
            heading: {
              en: "The three gates worth knowing",
              es: "Las tres compuertas que vale la pena conocer",
            },
            body: {
              en: "The X gate is the quantum NOT: it flips 0 to 1 and 1 to 0. The Hadamard gate, written H, is the one that creates superposition — feed it a plain 0 and it produces an even blend of 0 and 1. It is the gate that starts nearly every quantum program, because it is how you get the machine into a state worth computing with. The CNOT gate acts on two qubits at once: it flips the second qubit only if the first is 1. Because its effect on one qubit depends on the other, CNOT is how entanglement gets created. Those three cover most of what you will see in an introductory circuit.",
              es: "La compuerta X es el NOT cuántico: convierte 0 en 1 y 1 en 0. La compuerta Hadamard, escrita H, es la que crea superposición: si le entrega un 0 simple, produce una mezcla pareja de 0 y 1. Es la compuerta con la que empieza casi todo programa cuántico, porque es la forma de llevar la máquina a un estado que valga la pena calcular. La compuerta CNOT actúa sobre dos qubits a la vez: invierte el segundo qubit solo si el primero es 1. Como su efecto sobre un qubit depende del otro, CNOT es la forma de crear entrelazamiento. Esas tres cubren la mayor parte de lo que verá en un circuito introductorio.",
            },
            diagram: "gateOperations",
          },
          {
            heading: {
              en: "Rotations, not switches",
              es: "Rotaciones, no interruptores",
            },
            body: {
              en: "One last shift in intuition. Classical gates switch things between discrete values. Quantum gates rotate a qubit's state smoothly, adjusting the balance of the blend by any amount you like. This is why quantum programming feels more like steering than like toggling: you are continuously guiding qubits toward a configuration where the right answer dominates. The next lesson shows how those steering instructions get written down.",
              es: "Un último cambio de intuición. Las compuertas clásicas conmutan cosas entre valores discretos. Las compuertas cuánticas rotan el estado de un qubit de forma continua, ajustando el equilibrio de la mezcla en la medida que se desee. Por eso la programación cuántica se parece más a conducir que a accionar interruptores: usted guía de forma continua los qubits hacia una configuración donde domine la respuesta correcta. La próxima lección muestra cómo se escriben esas instrucciones.",
            },
          },
        ],
        quiz: [
          {
            prompt: {
              en: "Which gate is used to put a qubit into superposition?",
              es: "¿Qué compuerta se usa para poner un qubit en superposición?",
            },
            choices: [
              { en: "The Hadamard (H) gate", es: "La compuerta Hadamard (H)" },
              { en: "The X gate", es: "La compuerta X" },
              { en: "The CNOT gate", es: "La compuerta CNOT" },
              { en: "The AND gate", es: "La compuerta AND" },
            ],
            correctIndex: 0,
            explanation: {
              en: "Hadamard takes a definite 0 and produces an even blend of 0 and 1. It opens nearly every quantum program because superposition is the starting point for computation.",
              es: "Hadamard toma un 0 definido y produce una mezcla pareja de 0 y 1. Abre casi todo programa cuántico porque la superposición es el punto de partida del cálculo.",
            },
          },
          {
            prompt: {
              en: "Why must every quantum gate be reversible?",
              es: "¿Por qué toda compuerta cuántica debe ser reversible?",
            },
            choices: [
              {
                en: "The underlying physics runs equally well in both directions",
                es: "La física subyacente funciona igual de bien en ambas direcciones",
              },
              {
                en: "It makes the circuits run faster",
                es: "Hace que los circuitos funcionen más rápido",
              },
              {
                en: "It allows errors to be undone after the fact",
                es: "Permite deshacer los errores después del hecho",
              },
              {
                en: "It reduces the amount of cooling required",
                es: "Reduce la cantidad de enfriamiento necesaria",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "Reversibility is imposed by physics, not convenience. It is also why the classical AND gate cannot be reused — an output of 0 does not tell you which inputs produced it.",
              es: "La reversibilidad la impone la física, no la conveniencia. Es también la razón por la que no se puede reutilizar la compuerta clásica AND: un resultado de 0 no indica qué entradas lo produjeron.",
            },
          },
          {
            prompt: {
              en: "What does the CNOT gate do?",
              es: "¿Qué hace la compuerta CNOT?",
            },
            choices: [
              {
                en: "Flips the second qubit only if the first is 1, which can create entanglement",
                es: "Invierte el segundo qubit solo si el primero es 1, lo que puede crear entrelazamiento",
              },
              {
                en: "Flips both qubits at the same time",
                es: "Invierte ambos qubits al mismo tiempo",
              },
              {
                en: "Measures two qubits simultaneously",
                es: "Mide dos qubits simultáneamente",
              },
              {
                en: "Copies the first qubit's state onto the second",
                es: "Copia el estado del primer qubit en el segundo",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "Because CNOT's effect on one qubit depends on the value of another, it links their fates — which is exactly how entanglement is generated in a circuit.",
              es: "Como el efecto de CNOT sobre un qubit depende del valor de otro, une sus destinos, y así es exactamente como se genera el entrelazamiento en un circuito.",
            },
          },
        ],
      },

      {
        slug: "reading-a-circuit-diagram",
        estimatedMinutes: 5,
        title: {
          en: "Reading a Circuit Diagram",
          es: "Cómo Leer un Diagrama de Circuito",
        },
        bigIdea: {
          en: "A quantum circuit diagram is sheet music for qubits: horizontal lines are qubits, boxes are gates, and you read strictly left to right.",
          es: "Un diagrama de circuito cuántico es la partitura de los qubits: las líneas horizontales son qubits, las cajas son compuertas y se lee estrictamente de izquierda a derecha.",
        },
        sections: [
          {
            heading: { en: "The staff lines", es: "Las líneas del pentagrama" },
            body: {
              en: "Every quantum circuit diagram starts with horizontal lines, one per qubit, stacked top to bottom. The line is not a wire carrying current — nothing is physically moving along it. It represents one qubit's journey through time, with the left edge being the start of the program and the right edge the end. Each qubit almost always begins in the definite state 0, which is written at the far left.",
              es: "Todo diagrama de circuito cuántico empieza con líneas horizontales, una por qubit, apiladas de arriba abajo. La línea no es un cable que lleva corriente: nada se mueve físicamente por ella. Representa el recorrido de un qubit a lo largo del tiempo, donde el borde izquierdo es el inicio del programa y el derecho el final. Cada qubit casi siempre empieza en el estado definido 0, que se escribe en el extremo izquierdo.",
            },
          },
          {
            heading: { en: "The notation", es: "La notación" },
            body: {
              en: "A gate acting on one qubit is drawn as a labeled box sitting on that qubit's line — a box marked H is a Hadamard, a box marked X is an X gate. Two-qubit gates like CNOT look different: a filled dot on the controlling qubit, a circled plus on the target, joined by a vertical line. At the right end you will usually see a meter symbol, which means measurement — the point where superposition collapses and you read out ordinary bits.",
              es: "Una compuerta que actúa sobre un qubit se dibuja como una caja etiquetada sobre la línea de ese qubit: una caja marcada H es una Hadamard, una caja marcada X es una compuerta X. Las compuertas de dos qubits como CNOT se ven distintas: un punto relleno sobre el qubit de control, un signo más dentro de un círculo sobre el objetivo, unidos por una línea vertical. En el extremo derecho suele verse el símbolo de un medidor, que significa medición: el punto donde la superposición colapsa y se leen bits comunes.",
            },
            diagram: "circuitDiagram",
          },
          {
            heading: {
              en: "Reading one for real",
              es: "Leer uno de verdad",
            },
            body: {
              en: "Take the most famous two-qubit circuit there is. Two qubits both start at 0. A Hadamard box sits on the top line, putting that qubit into an even blend of 0 and 1. Then a CNOT connects the top qubit to the bottom one. Finally both are measured. Read left to right, that is the whole program — three steps.",
              es: "Tomemos el circuito de dos qubits más famoso que existe. Dos qubits empiezan ambos en 0. Una caja Hadamard está sobre la línea superior y pone ese qubit en una mezcla pareja de 0 y 1. Luego una CNOT conecta el qubit de arriba con el de abajo. Por último se miden ambos. Leído de izquierda a derecha, ese es todo el programa: tres pasos.",
            },
          },
          {
            heading: {
              en: "What it produces",
              es: "Lo que produce",
            },
            body: {
              en: "Run that circuit many times and you will get 00 about half the time and 11 about half the time — and never 01 or 10. The two qubits always agree, even though which value they agree on is random. That is entanglement, produced in two gates, and it is called a Bell state. If you can read that diagram, you can read most introductory quantum circuits, because larger programs are the same building blocks repeated.",
              es: "Ejecute ese circuito muchas veces y obtendrá 00 aproximadamente la mitad de las veces y 11 la otra mitad, y nunca 01 ni 10. Los dos qubits siempre coinciden, aunque el valor en el que coinciden sea azaroso. Eso es entrelazamiento, producido con dos compuertas, y se llama estado de Bell. Si usted puede leer ese diagrama, puede leer la mayoría de los circuitos cuánticos introductorios, porque los programas más grandes son los mismos bloques repetidos.",
            },
          },
        ],
        quiz: [
          {
            prompt: {
              en: "What does a horizontal line represent in a quantum circuit diagram?",
              es: "¿Qué representa una línea horizontal en un diagrama de circuito cuántico?",
            },
            choices: [
              {
                en: "One qubit's journey through time, read left to right",
                es: "El recorrido de un qubit a lo largo del tiempo, leído de izquierda a derecha",
              },
              {
                en: "A wire carrying electrical current between gates",
                es: "Un cable que transporta corriente eléctrica entre compuertas",
              },
              {
                en: "The physical distance between two qubits",
                es: "La distancia física entre dos qubits",
              },
              {
                en: "A connection that entangles everything it touches",
                es: "Una conexión que entrelaza todo lo que toca",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "Nothing physically travels along the line. It is a timeline for a single qubit — left edge is the program's start, right edge is its end.",
              es: "Nada viaja físicamente por la línea. Es una línea de tiempo para un solo qubit: el borde izquierdo es el inicio del programa y el derecho su final.",
            },
          },
          {
            prompt: {
              en: "A circuit applies H to the first qubit, then CNOT, then measures both. What results appear?",
              es: "Un circuito aplica H al primer qubit, luego CNOT, y luego mide ambos. ¿Qué resultados aparecen?",
            },
            choices: [
              {
                en: "Only 00 and 11, each about half the time",
                es: "Solo 00 y 11, cada uno aproximadamente la mitad de las veces",
              },
              {
                en: "All four results equally often",
                es: "Los cuatro resultados con la misma frecuencia",
              },
              { en: "Always 00", es: "Siempre 00" },
              {
                en: "Only 01 and 10, each about half the time",
                es: "Solo 01 y 10, cada uno aproximadamente la mitad de las veces",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "This is the Bell state, the classic two-gate entanglement circuit. The qubits always agree with each other, though which value they agree on is random from run to run.",
              es: "Este es el estado de Bell, el circuito clásico de entrelazamiento de dos compuertas. Los qubits siempre coinciden entre sí, aunque el valor en el que coinciden sea azaroso en cada ejecución.",
            },
          },
          {
            prompt: {
              en: "What state does each qubit almost always start in?",
              es: "¿En qué estado empieza casi siempre cada qubit?",
            },
            choices: [
              { en: "The definite state 0", es: "El estado definido 0" },
              { en: "An even superposition", es: "Una superposición pareja" },
              { en: "A random value", es: "Un valor al azar" },
              { en: "Entangled with its neighbor", es: "Entrelazado con su vecino" },
            ],
            correctIndex: 0,
            explanation: {
              en: "Circuits begin from a known, definite baseline of 0 so results are reproducible. Superposition is then created deliberately by applying a gate such as Hadamard.",
              es: "Los circuitos parten de una base conocida y definida en 0 para que los resultados sean reproducibles. La superposición se crea luego deliberadamente aplicando una compuerta como Hadamard.",
            },
          },
        ],
      },

      {
        slug: "building-a-simple-circuit",
        estimatedMinutes: 6,
        title: {
          en: "Building Intuition with a Simple Circuit",
          es: "Construir Intuición con un Circuito Simple",
        },
        bigIdea: {
          en: "Walk one small circuit end to end and the abstract pieces — superposition, entanglement, interference, measurement — snap together into a single working picture.",
          es: "Recorra un circuito pequeño de principio a fin y las piezas abstractas — superposición, entrelazamiento, interferencia y medición — encajan en una sola imagen que funciona.",
        },
        sections: [
          {
            heading: {
              en: "A coin-flip generator",
              es: "Un generador de lanzamientos de moneda",
            },
            body: {
              en: "Start with the smallest useful quantum program: one qubit, one Hadamard gate, one measurement. The qubit begins at 0. Hadamard turns it into an even blend. Measurement collapses that blend, returning 0 or 1 with equal probability. Run it a thousand times and you get roughly five hundred of each. This is a true random number generator — not the predictable pseudo-randomness software normally uses, but randomness sourced from physics itself. Modest, but genuinely something a classical computer cannot do.",
              es: "Empecemos con el programa cuántico útil más pequeño: un qubit, una compuerta Hadamard, una medición. El qubit empieza en 0. Hadamard lo convierte en una mezcla pareja. La medición colapsa esa mezcla y devuelve 0 o 1 con igual probabilidad. Ejecútelo mil veces y obtendrá alrededor de quinientos de cada uno. Este es un generador de números verdaderamente aleatorios: no la pseudoaleatoriedad predecible que suele usar el software, sino aleatoriedad tomada de la física misma. Modesto, pero realmente algo que una computadora clásica no puede hacer.",
            },
          },
          {
            heading: {
              en: "Now add a second Hadamard",
              es: "Ahora añada una segunda Hadamard",
            },
            body: {
              en: "Here is where intuition usually breaks, in a productive way. Take that same circuit and apply a second Hadamard gate before measuring — H, then H, then measure. If Hadamard produces randomness, two of them should produce even more randomness. It does the opposite. You get 0 every single time, with certainty. The randomness vanishes completely.",
              es: "Aquí es donde la intuición suele romperse, de forma productiva. Tome ese mismo circuito y aplique una segunda compuerta Hadamard antes de medir: H, luego H, luego medir. Si Hadamard produce aleatoriedad, dos deberían producir aún más aleatoriedad. Ocurre lo contrario. Usted obtiene 0 siempre, con certeza. La aleatoriedad desaparece por completo.",
            },
          },
          {
            heading: {
              en: "Why: interference",
              es: "Por qué: interferencia",
            },
            body: {
              en: "The second Hadamard did not scramble the qubit further — it undid the first one. The blend created by the first gate was not a coin already secretly landed; it was a state with structure, and the second gate operated on that structure, steering every path toward 0 while the paths toward 1 cancelled each other out exactly. This is interference, the mechanism named in Unit 2, now visible in two gates. It is the clearest demonstration that superposition is not hidden randomness: hidden randomness could never be reversed like this.",
              es: "La segunda Hadamard no revolvió más el qubit: deshizo la primera. La mezcla creada por la primera compuerta no era una moneda ya caída en secreto; era un estado con estructura, y la segunda compuerta operó sobre esa estructura, dirigiendo todos los caminos hacia el 0 mientras los caminos hacia el 1 se cancelaban exactamente entre sí. Esto es la interferencia, el mecanismo nombrado en la Unidad 2, ahora visible en dos compuertas. Es la demostración más clara de que la superposición no es aleatoriedad oculta: una aleatoriedad oculta jamás podría revertirse así.",
            },
          },
          {
            heading: {
              en: "This is what algorithms do",
              es: "Esto es lo que hacen los algoritmos",
            },
            body: {
              en: "Scale that idea up and you have quantum computing entire. A real algorithm spreads a calculation across an enormous superposition, then applies carefully chosen gates so that the paths leading to wrong answers cancel — exactly as the 1s cancelled above — while the paths leading to the right answer reinforce. When you finally measure, the correct answer is overwhelmingly likely to be the one that appears. You are now ready for Unit 4, where you will see specific strategies for arranging that cancellation.",
              es: "Amplíe esa idea y tendrá la computación cuántica completa. Un algoritmo real distribuye un cálculo a lo largo de una superposición enorme y luego aplica compuertas cuidadosamente elegidas para que los caminos que llevan a respuestas equivocadas se cancelen — igual que se cancelaron los 1 arriba — mientras que los caminos hacia la respuesta correcta se refuerzan. Cuando por fin usted mide, la respuesta correcta es abrumadoramente la que más probablemente aparece. Ya está listo para la Unidad 4, donde verá estrategias concretas para organizar esa cancelación.",
            },
          },
        ],
        quiz: [
          {
            prompt: {
              en: "A qubit starts at 0. You apply H, then H again, then measure. What do you get?",
              es: "Un qubit empieza en 0. Aplica H, luego H otra vez, y luego mide. ¿Qué obtiene?",
            },
            choices: [
              { en: "0 every time, with certainty", es: "0 siempre, con certeza" },
              { en: "0 or 1 with equal probability", es: "0 o 1 con igual probabilidad" },
              { en: "1 every time, with certainty", es: "1 siempre, con certeza" },
              {
                en: "Even more randomness than a single H",
                es: "Aún más aleatoriedad que una sola H",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "The second Hadamard reverses the first through interference: paths toward 1 cancel exactly while paths toward 0 reinforce. Hidden randomness could never be undone this way.",
              es: "La segunda Hadamard revierte la primera mediante interferencia: los caminos hacia el 1 se cancelan exactamente mientras los caminos hacia el 0 se refuerzan. Una aleatoriedad oculta nunca podría deshacerse así.",
            },
          },
          {
            prompt: {
              en: "What does the single-qubit circuit H → measure actually build?",
              es: "¿Qué construye realmente el circuito de un qubit H → medir?",
            },
            choices: [
              {
                en: "A true random number generator sourced from physics",
                es: "Un generador de números verdaderamente aleatorios tomado de la física",
              },
              {
                en: "A circuit that always outputs 1",
                es: "Un circuito que siempre entrega 1",
              },
              { en: "An entangled pair of qubits", es: "Un par de qubits entrelazados" },
              {
                en: "A way to copy a qubit's state",
                es: "Una forma de copiar el estado de un qubit",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "Ordinary software randomness is pseudo-random and ultimately predictable. This circuit's randomness comes from measurement collapse itself, which classical hardware cannot reproduce.",
              es: "La aleatoriedad del software común es pseudoaleatoria y en última instancia predecible. La aleatoriedad de este circuito viene del propio colapso por medición, algo que el hardware clásico no puede reproducir.",
            },
          },
          {
            prompt: {
              en: "In broad terms, what does a real quantum algorithm arrange?",
              es: "En términos generales, ¿qué organiza un algoritmo cuántico real?",
            },
            choices: [
              {
                en: "Wrong-answer paths cancel while right-answer paths reinforce",
                es: "Los caminos de respuestas equivocadas se cancelan y los de la correcta se refuerzan",
              },
              {
                en: "Every possible answer is read out and then compared",
                es: "Se leen todas las respuestas posibles y luego se comparan",
              },
              {
                en: "Qubits are measured as early and often as possible",
                es: "Los qubits se miden lo más temprano y seguido posible",
              },
              {
                en: "The problem is broken into pieces solved one at a time",
                es: "El problema se divide en partes que se resuelven una por una",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "Since measurement returns only one result, the whole craft is stacking the odds through interference so the correct answer is overwhelmingly the likeliest one to appear.",
              es: "Como la medición devuelve un solo resultado, todo el oficio consiste en inclinar las probabilidades mediante interferencia para que la respuesta correcta sea abrumadoramente la más probable.",
            },
          },
        ],
      },
    ],
  },

  /* ======================================================= UNIT 4 ======= */
  {
    id: "algorithms",
    icon: "Code2",
    title: { en: "Quantum Algorithms", es: "Algoritmos Cuánticos" },
    summary: {
      en: "The two famous algorithms — Grover's and Shor's — what they genuinely do, and why only one of them keeps security experts awake at night.",
      es: "Los dos algoritmos famosos — el de Grover y el de Shor — qué hacen realmente y por qué solo uno de ellos desvela a los expertos en seguridad.",
    },
    lessons: [
      {
        slug: "classical-vs-quantum-approaches",
        estimatedMinutes: 5,
        title: {
          en: "Classical vs Quantum Approaches",
          es: "Enfoques Clásicos y Cuánticos",
        },
        bigIdea: {
          en: "Quantum algorithms are not classical algorithms run faster. They are entirely different strategies, and they only exist for a handful of problems.",
          es: "Los algoritmos cuánticos no son algoritmos clásicos ejecutados más rápido. Son estrategias completamente distintas, y solo existen para un puñado de problemas.",
        },
        sections: [
          {
            heading: {
              en: "How a classical computer searches",
              es: "Cómo busca una computadora clásica",
            },
            body: {
              en: "Suppose you have a phone book with a million entries, sorted by name, and you want to find whose number is 555-0142. Sorting does not help — the book is organized by name, not number. A classical computer has no better option than checking entries one at a time. On average it will look at half a million before finding the match. Double the book's size and you double the work. That direct relationship between problem size and effort is the defining feature of classical search.",
              es: "Suponga que tiene una guía telefónica con un millón de entradas, ordenada por nombre, y quiere averiguar de quién es el número 555-0142. El orden no ayuda: la guía está organizada por nombre, no por número. Una computadora clásica no tiene mejor opción que revisar entradas una por una. En promedio mirará medio millón antes de encontrar la coincidencia. Duplique el tamaño de la guía y duplicará el trabajo. Esa relación directa entre el tamaño del problema y el esfuerzo es el rasgo definitorio de la búsqueda clásica.",
            },
          },
          {
            heading: {
              en: "The tempting wrong answer",
              es: "La respuesta equivocada tentadora",
            },
            body: {
              en: "It is natural to assume a quantum computer just checks all million entries simultaneously and reports the answer instantly. That is the single most common misconception in the field, and it is wrong for a reason you already know: measurement. Yes, superposition can represent all million entries at once. But measuring collapses everything to one randomly chosen entry, which is no better than guessing. Holding possibilities is free; extracting the one you want is the hard part.",
              es: "Es natural suponer que una computadora cuántica simplemente revisa el millón de entradas a la vez e informa la respuesta al instante. Ese es el malentendido más común del campo, y es falso por una razón que usted ya conoce: la medición. Sí, la superposición puede representar el millón de entradas a la vez. Pero medir colapsa todo a una entrada elegida al azar, lo que no es mejor que adivinar. Contener posibilidades es gratis; extraer la que usted quiere es la parte difícil.",
            },
          },
          {
            heading: {
              en: "What actually happens instead",
              es: "Lo que realmente ocurre en su lugar",
            },
            body: {
              en: "A quantum algorithm works in rounds. It puts everything in superposition, then repeatedly applies gates that shift the balance a little more toward the answer and a little further away from the non-answers — the interference you saw in the last lesson. After enough rounds the correct entry dominates the blend so heavily that measuring almost certainly returns it. It is less like looking everywhere at once and more like slowly turning up the volume on the right answer until it drowns out the rest.",
              es: "Un algoritmo cuántico trabaja por rondas. Pone todo en superposición y luego aplica repetidamente compuertas que desplazan el equilibrio un poco más hacia la respuesta y un poco más lejos de las no respuestas: la interferencia que vio en la lección anterior. Tras suficientes rondas, la entrada correcta domina la mezcla tan fuertemente que medir casi con certeza la devuelve. Es menos como mirar todo a la vez y más como subirle poco a poco el volumen a la respuesta correcta hasta que ahogue a las demás.",
            },
          },
          {
            heading: {
              en: "The honest scorecard",
              es: "El balance honesto",
            },
            body: {
              en: "This strategy only works when a problem has structure the interference can exploit, which is why the list of useful quantum algorithms is short rather than universal. Decades of research have produced a handful of genuine wins. Two matter most: Grover's algorithm, which speeds up unstructured search moderately, and Shor's algorithm, which breaks a specific math problem dramatically. The next two lessons take them in turn — and the difference in their scale of improvement is the whole reason one of them reshaped global security policy.",
              es: "Esta estrategia solo funciona cuando un problema tiene una estructura que la interferencia pueda aprovechar, y por eso la lista de algoritmos cuánticos útiles es corta y no universal. Décadas de investigación han producido un puñado de logros genuinos. Dos son los más importantes: el algoritmo de Grover, que acelera moderadamente la búsqueda sin estructura, y el algoritmo de Shor, que rompe drásticamente un problema matemático específico. Las próximas dos lecciones los abordan uno por uno, y la diferencia en su escala de mejora es toda la razón por la que uno de ellos reconfiguró la política de seguridad mundial.",
            },
          },
        ],
        quiz: [
          {
            prompt: {
              en: "Why can't a quantum computer just check all possibilities at once and report the answer?",
              es: "¿Por qué una computadora cuántica no puede simplemente revisar todas las posibilidades a la vez e informar la respuesta?",
            },
            choices: [
              {
                en: "Measurement collapses everything to one randomly chosen result",
                es: "La medición colapsa todo a un único resultado elegido al azar",
              },
              {
                en: "There are not enough qubits to hold every possibility",
                es: "No hay suficientes qubits para contener todas las posibilidades",
              },
              {
                en: "Checking them all would take too much electricity",
                es: "Revisarlas todas consumiría demasiada electricidad",
              },
              {
                en: "Quantum computers cannot store a phone book",
                es: "Las computadoras cuánticas no pueden guardar una guía telefónica",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "Superposition really can hold all the possibilities — that part is free. The difficulty is extraction: measuring returns one random entry unless the algorithm has first shifted the odds toward the right one.",
              es: "La superposición realmente puede contener todas las posibilidades; esa parte es gratis. La dificultad es la extracción: medir devuelve una entrada al azar salvo que el algoritmo haya inclinado antes las probabilidades hacia la correcta.",
            },
          },
          {
            prompt: {
              en: "How does a quantum algorithm actually arrive at its answer?",
              es: "¿Cómo llega realmente un algoritmo cuántico a su respuesta?",
            },
            choices: [
              {
                en: "In rounds that gradually shift the balance toward the correct answer",
                es: "En rondas que desplazan gradualmente el equilibrio hacia la respuesta correcta",
              },
              {
                en: "By checking every possibility in a single instant",
                es: "Revisando cada posibilidad en un solo instante",
              },
              {
                en: "By measuring repeatedly until the answer appears",
                es: "Midiendo repetidamente hasta que aparece la respuesta",
              },
              {
                en: "By splitting the problem across many separate qubits",
                es: "Dividiendo el problema entre muchos qubits separados",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "Think of it as turning up the volume on the right answer over successive rounds of interference until it dominates the superposition and measurement almost certainly returns it.",
              es: "Piénselo como subir el volumen de la respuesta correcta en rondas sucesivas de interferencia hasta que domine la superposición y la medición casi con certeza la devuelva.",
            },
          },
          {
            prompt: {
              en: "Why is the list of useful quantum algorithms so short?",
              es: "¿Por qué la lista de algoritmos cuánticos útiles es tan corta?",
            },
            choices: [
              {
                en: "The approach only works on problems with structure interference can exploit",
                es: "El enfoque solo funciona en problemas con una estructura que la interferencia pueda aprovechar",
              },
              {
                en: "Researchers have only been studying the field for a few years",
                es: "Los investigadores llevan solo unos pocos años estudiando el campo",
              },
              {
                en: "Most algorithms are classified by governments",
                es: "La mayoría de los algoritmos están clasificados por los gobiernos",
              },
              {
                en: "Existing quantum computers are too small to run them",
                es: "Las computadoras cuánticas actuales son demasiado pequeñas para ejecutarlos",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "It is a mathematical limitation, not a temporary one. Without exploitable structure there is no way to arrange the interference, which is why decades of research have yielded only a handful of genuine speedups.",
              es: "Es una limitación matemática, no temporal. Sin una estructura aprovechable no hay forma de organizar la interferencia, y por eso décadas de investigación solo han dado un puñado de aceleraciones genuinas.",
            },
          },
        ],
      },

      {
        slug: "grovers-algorithm",
        estimatedMinutes: 5,
        title: { en: "Grover's Algorithm", es: "El Algoritmo de Grover" },
        bigIdea: {
          en: "Grover's algorithm searches an unsorted list in roughly the square root of the usual number of steps — a real speedup, but a modest one that breaks nothing.",
          es: "El algoritmo de Grover busca en una lista desordenada en aproximadamente la raíz cuadrada de los pasos habituales: una aceleración real, pero modesta, que no rompe nada.",
        },
        sections: [
          {
            heading: {
              en: "The square root speedup",
              es: "La aceleración de raíz cuadrada",
            },
            body: {
              en: "Back to the phone book. A classical search through a million entries takes about a million checks in the worst case. Grover's algorithm, published by Lov Grover in 1996, finds it in about a thousand steps — the square root of a million. For a trillion entries, classical needs a trillion checks and Grover needs about a million. The advantage grows as problems get bigger, and it is a genuine, mathematically proven improvement.",
              es: "Volvamos a la guía telefónica. Una búsqueda clásica entre un millón de entradas toma cerca de un millón de comprobaciones en el peor caso. El algoritmo de Grover, publicado por Lov Grover en 1996, la encuentra en unos mil pasos: la raíz cuadrada de un millón. Para un billón de entradas, el enfoque clásico necesita un billón de comprobaciones y Grover necesita cerca de un millón. La ventaja crece a medida que los problemas se agrandan, y es una mejora genuina y demostrada matemáticamente.",
            },
          },
          {
            heading: {
              en: "How it works",
              es: "Cómo funciona",
            },
            body: {
              en: "Grover's algorithm is the clearest example of the round-by-round strategy from the previous lesson. Every entry starts with an equal share of the superposition. Each round does two things: it marks the correct entry, then it amplifies whatever was marked at the expense of everything else. One round barely moves the needle. Repeat about a thousand times for a million entries and the correct answer holds nearly the entire probability, so measurement returns it reliably. Picture a bar chart where one bar grows a little taller each round while all the others shrink.",
              es: "El algoritmo de Grover es el ejemplo más claro de la estrategia por rondas de la lección anterior. Cada entrada empieza con una parte igual de la superposición. Cada ronda hace dos cosas: marca la entrada correcta y luego amplifica lo que fue marcado a costa de todo lo demás. Una ronda apenas mueve la aguja. Repita unas mil veces para un millón de entradas y la respuesta correcta concentrará casi toda la probabilidad, de modo que la medición la devuelve de forma confiable. Imagine un gráfico de barras donde una barra crece un poco más en cada ronda mientras todas las demás se encogen.",
            },
            diagram: "groverAmplitude",
          },
          {
            heading: {
              en: "Knowing when to stop",
              es: "Saber cuándo detenerse",
            },
            body: {
              en: "One delightful quirk: you can overshoot. Keep applying rounds past the optimal number and the correct answer's probability starts falling again, eventually returning near zero. The amplification is a rotation, and rotating too far carries you past the target. So Grover's algorithm requires calculating in advance how many rounds to run and stopping precisely there — a detail that surprises people expecting more computation to always mean better results.",
              es: "Una peculiaridad encantadora: se puede pasar de largo. Si sigue aplicando rondas más allá del número óptimo, la probabilidad de la respuesta correcta empieza a caer otra vez y termina cerca de cero. La amplificación es una rotación, y rotar demasiado lo lleva más allá del objetivo. Por eso el algoritmo de Grover exige calcular de antemano cuántas rondas ejecutar y detenerse exactamente ahí, un detalle que sorprende a quienes esperan que más cálculo siempre signifique mejores resultados.",
            },
          },
          {
            heading: {
              en: "Why this does not break encryption",
              es: "Por qué esto no rompe el cifrado",
            },
            body: {
              en: "Grover's algorithm does apply to guessing encryption keys, but a square root is a manageable loss. An encryption key with 128 bits of security effectively drops to 64 bits against Grover — weakened, but the fix is trivial: double the key length to 256 bits and you are back where you started. That is why symmetric encryption like AES survives the quantum era with a straightforward adjustment already underway. The algorithm in the next lesson is a completely different story.",
              es: "El algoritmo de Grover sí se aplica a adivinar claves de cifrado, pero una raíz cuadrada es una pérdida manejable. Una clave de cifrado con 128 bits de seguridad baja efectivamente a 64 bits frente a Grover: queda debilitada, pero la solución es trivial: duplicar la longitud de la clave a 256 bits y usted vuelve al punto de partida. Por eso el cifrado simétrico como AES sobrevive a la era cuántica con un ajuste sencillo que ya está en marcha. El algoritmo de la próxima lección es una historia completamente distinta.",
            },
          },
        ],
        quiz: [
          {
            prompt: {
              en: "Roughly how many steps does Grover's algorithm need to search a million entries?",
              es: "¿Aproximadamente cuántos pasos necesita el algoritmo de Grover para buscar en un millón de entradas?",
            },
            choices: [
              { en: "About 1,000 — the square root", es: "Unos 1.000, la raíz cuadrada" },
              { en: "Exactly 1 — it checks all at once", es: "Exactamente 1; revisa todas a la vez" },
              { en: "About 500,000 — half the list", es: "Unos 500.000, la mitad de la lista" },
              { en: "About 1,000,000 — the same as classical", es: "Unos 1.000.000, igual que el clásico" },
            ],
            correctIndex: 0,
            explanation: {
              en: "Grover's provides a square-root speedup. It is a real and proven improvement that grows with problem size, but it is far more modest than the exponential speedup Shor's algorithm delivers.",
              es: "Grover ofrece una aceleración de raíz cuadrada. Es una mejora real y demostrada que crece con el tamaño del problema, pero es mucho más modesta que la aceleración exponencial que da el algoritmo de Shor.",
            },
          },
          {
            prompt: {
              en: "What happens if you run more Grover rounds than the optimal number?",
              es: "¿Qué pasa si ejecuta más rondas de Grover que el número óptimo?",
            },
            choices: [
              {
                en: "The correct answer's probability starts falling again",
                es: "La probabilidad de la respuesta correcta empieza a caer otra vez",
              },
              {
                en: "The answer becomes even more certain",
                es: "La respuesta se vuelve aún más certera",
              },
              { en: "The program crashes", es: "El programa falla" },
              { en: "Nothing changes after the optimum", es: "Nada cambia después del óptimo" },
            ],
            correctIndex: 0,
            explanation: {
              en: "Amplification is a rotation, so rotating too far carries you past the target. The number of rounds must be calculated in advance and stopped at precisely the right point.",
              es: "La amplificación es una rotación, así que rotar demasiado lo lleva más allá del objetivo. La cantidad de rondas debe calcularse de antemano y detenerse exactamente en el punto correcto.",
            },
          },
          {
            prompt: {
              en: "How can symmetric encryption defend against Grover's algorithm?",
              es: "¿Cómo puede el cifrado simétrico defenderse del algoritmo de Grover?",
            },
            choices: [
              {
                en: "Double the key length — 128-bit becomes 256-bit",
                es: "Duplicar la longitud de la clave: de 128 bits a 256 bits",
              },
              {
                en: "It cannot be defended and must be replaced entirely",
                es: "No se puede defender y debe reemplazarse por completo",
              },
              {
                en: "Change the key more frequently",
                es: "Cambiar la clave con más frecuencia",
              },
              {
                en: "Nothing is needed — Grover's does not apply to it",
                es: "No hace falta nada; Grover no se le aplica",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "A square-root speedup halves the effective security level, so doubling the key restores it. This is why AES survives the quantum era with a simple adjustment that is already being rolled out.",
              es: "Una aceleración de raíz cuadrada reduce a la mitad el nivel efectivo de seguridad, así que duplicar la clave lo restaura. Por eso AES sobrevive a la era cuántica con un ajuste simple que ya se está implementando.",
            },
          },
        ],
      },

      {
        slug: "shors-algorithm",
        estimatedMinutes: 6,
        title: { en: "Shor's Algorithm", es: "El Algoritmo de Shor" },
        bigIdea: {
          en: "Shor's algorithm factors large numbers exponentially faster than any known classical method — and the security of most internet encryption rests on factoring being hard.",
          es: "El algoritmo de Shor factoriza números grandes exponencialmente más rápido que cualquier método clásico conocido, y la seguridad de la mayor parte del cifrado de internet depende de que factorizar sea difícil.",
        },
        sections: [
          {
            heading: {
              en: "The problem that guards the internet",
              es: "El problema que protege internet",
            },
            body: {
              en: "Multiply 61 by 53 and you get 3,233 — easy. Now go the other way: what two numbers multiply to 3,233? Much harder, and you probably reached for trial and error. Now imagine a number six hundred digits long. Multiplying its two factors together takes a computer no time at all; finding those factors from the product would take the world's fastest supercomputers longer than the universe has existed. That gap between easy-forward and impossible-backward is the foundation of RSA encryption, which has protected online banking, private messages, and secure websites for decades.",
              es: "Multiplique 61 por 53 y obtiene 3.233: fácil. Ahora vaya en sentido contrario: ¿qué dos números multiplicados dan 3.233? Mucho más difícil, y probablemente recurrió al ensayo y error. Ahora imagine un número de seiscientos dígitos. Multiplicar sus dos factores no le cuesta nada a una computadora; encontrar esos factores a partir del producto les tomaría a las supercomputadoras más rápidas del mundo más tiempo del que existe el universo. Esa brecha entre lo fácil hacia adelante y lo imposible hacia atrás es la base del cifrado RSA, que ha protegido la banca en línea, los mensajes privados y los sitios web seguros durante décadas.",
            },
          },
          {
            heading: {
              en: "1994: the gap closes",
              es: "1994: la brecha se cierra",
            },
            body: {
              en: "In 1994, mathematician Peter Shor showed that a sufficiently large quantum computer could factor those numbers efficiently. Not somewhat faster — exponentially faster, turning a task that would outlast the universe into one taking hours. This was not a small optimization. It meant the mathematical assumption underpinning most of the world's encryption had an expiration date attached to the arrival of quantum hardware.",
              es: "En 1994, el matemático Peter Shor demostró que una computadora cuántica suficientemente grande podría factorizar esos números de forma eficiente. No algo más rápido: exponencialmente más rápido, convirtiendo una tarea que duraría más que el universo en uno de horas. No fue una pequeña optimización. Significó que el supuesto matemático que sostiene la mayor parte del cifrado del mundo tenía una fecha de vencimiento atada a la llegada del hardware cuántico.",
            },
          },
          {
            heading: {
              en: "The trick: turn factoring into a rhythm problem",
              es: "El truco: convertir la factorización en un problema de ritmo",
            },
            body: {
              en: "Shor's insight was that factoring can be rewritten as a question about repeating patterns. Certain sequences built from the number you want to factor repeat on a cycle, and if you can find the length of that cycle, straightforward arithmetic hands you the factors. Finding a cycle length is exactly the kind of structured problem quantum interference excels at — the pattern's rhythm reinforces itself while everything else cancels out. Most of Shor's algorithm is actually ordinary classical math; the quantum computer is called in for the single step of finding that period.",
              es: "La idea de Shor fue que la factorización puede reescribirse como una pregunta sobre patrones que se repiten. Ciertas secuencias construidas a partir del número que se quiere factorizar se repiten en ciclos, y si se puede hallar la longitud de ese ciclo, una aritmética sencilla entrega los factores. Hallar la longitud de un ciclo es exactamente el tipo de problema estructurado en el que la interferencia cuántica sobresale: el ritmo del patrón se refuerza a sí mismo mientras todo lo demás se cancela. La mayor parte del algoritmo de Shor es en realidad matemática clásica común; a la computadora cuántica se la convoca para el único paso de hallar ese período.",
            },
          },
          {
            heading: {
              en: "Where things stand",
              es: "Cómo están las cosas",
            },
            body: {
              en: "No quantum computer today can factor numbers large enough to threaten real encryption. Doing so would take millions of high-quality qubits, and current machines have hundreds of error-prone ones. But two facts make this urgent anyway. First, encrypted data being intercepted today can be stored and decrypted later — security experts call this \"harvest now, decrypt later,\" and it means data that must stay secret for a decade is already at risk. Second, replacing encryption across every system on Earth takes many years. That combination is precisely why NIST — including its laboratory in Boulder, Colorado — finalized new quantum-resistant standards in 2024, well before any machine can break the old ones. Unit 6 covers those standards in detail.",
              es: "Ninguna computadora cuántica actual puede factorizar números lo bastante grandes como para amenazar el cifrado real. Hacerlo requeriría millones de qubits de alta calidad, y las máquinas actuales tienen cientos, propensos a errores. Pero dos hechos lo vuelven urgente de todos modos. Primero, los datos cifrados que se interceptan hoy pueden guardarse y descifrarse después; los expertos en seguridad lo llaman \"cosechar ahora, descifrar después\", y significa que los datos que deben permanecer secretos una década ya están en riesgo. Segundo, reemplazar el cifrado en cada sistema del planeta lleva muchos años. Esa combinación es precisamente la razón por la que el NIST — incluido su laboratorio en Boulder, Colorado — finalizó nuevos estándares resistentes a lo cuántico en 2024, mucho antes de que alguna máquina pueda romper los viejos. La Unidad 6 cubre esos estándares en detalle.",
            },
          },
        ],
        quiz: [
          {
            prompt: {
              en: "What mathematical problem does Shor's algorithm solve?",
              es: "¿Qué problema matemático resuelve el algoritmo de Shor?",
            },
            choices: [
              {
                en: "Factoring large numbers into their prime factors",
                es: "Factorizar números grandes en sus factores primos",
              },
              {
                en: "Searching an unsorted list quickly",
                es: "Buscar rápidamente en una lista desordenada",
              },
              {
                en: "Simulating molecules for drug discovery",
                es: "Simular moléculas para descubrir medicamentos",
              },
              {
                en: "Optimizing delivery and logistics routes",
                es: "Optimizar rutas de entrega y logística",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "Factoring is easy to reverse-check but appears impossibly hard to perform classically at scale — and RSA encryption is built entirely on that difficulty.",
              es: "Factorizar es fácil de verificar al revés pero parece imposiblemente difícil de hacer de forma clásica a gran escala, y el cifrado RSA se construye enteramente sobre esa dificultad.",
            },
          },
          {
            prompt: {
              en: "What does \"harvest now, decrypt later\" mean?",
              es: "¿Qué significa \"cosechar ahora, descifrar después\"?",
            },
            choices: [
              {
                en: "Encrypted data stolen today can be decrypted once quantum computers mature",
                es: "Los datos cifrados robados hoy pueden descifrarse cuando maduren las computadoras cuánticas",
              },
              {
                en: "Quantum computers must gather qubits before running",
                es: "Las computadoras cuánticas deben reunir qubits antes de ejecutarse",
              },
              {
                en: "Encryption keys are collected and reused across systems",
                es: "Las claves de cifrado se recolectan y reutilizan entre sistemas",
              },
              {
                en: "Data is compressed now and expanded later",
                es: "Los datos se comprimen ahora y se expanden después",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "This is why the threat is present-tense even though no capable machine exists yet. Anything intercepted today that must remain secret for a decade is already exposed.",
              es: "Por eso la amenaza es de tiempo presente aunque todavía no exista una máquina capaz. Todo lo interceptado hoy que deba permanecer secreto una década ya está expuesto.",
            },
          },
          {
            prompt: {
              en: "How does Shor's algorithm use a quantum computer?",
              es: "¿Cómo usa el algoritmo de Shor una computadora cuántica?",
            },
            choices: [
              {
                en: "For one step — finding the length of a repeating cycle",
                es: "Para un solo paso: hallar la longitud de un ciclo que se repite",
              },
              {
                en: "For every step, from start to finish",
                es: "Para cada paso, de principio a fin",
              },
              {
                en: "To try every possible factor simultaneously",
                es: "Para probar todos los factores posibles simultáneamente",
              },
              {
                en: "To store the enormous number being factored",
                es: "Para almacenar el número enorme que se factoriza",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "Most of Shor's algorithm is ordinary classical arithmetic. The quantum computer handles only the period-finding step, where interference makes the repeating rhythm stand out while everything else cancels.",
              es: "La mayor parte del algoritmo de Shor es aritmética clásica común. La computadora cuántica se encarga solo del paso de hallar el período, donde la interferencia hace resaltar el ritmo repetido mientras todo lo demás se cancela.",
            },
          },
        ],
      },
    ],
  },

  /* ======================================================= UNIT 5 ======= */
  {
    id: "advantage-and-hardware",
    icon: "Zap",
    title: {
      en: "Quantum Advantage and Real Hardware",
      es: "Ventaja Cuántica y Hardware Real",
    },
    summary: {
      en: "Separating the hype from the engineering: where quantum computers genuinely win, what the machines are physically made of, and why noise is the field's central obstacle.",
      es: "Separar la exageración de la ingeniería: dónde ganan realmente las computadoras cuánticas, de qué están hechas físicamente y por qué el ruido es el obstáculo central del campo.",
    },
    lessons: [
      {
        slug: "quantum-advantage",
        estimatedMinutes: 5,
        title: { en: "Quantum Advantage", es: "Ventaja Cuántica" },
        bigIdea: {
          en: "Quantum advantage means beating every classical computer at a problem people actually care about — a much higher bar than beating them at a contrived one.",
          es: "La ventaja cuántica significa superar a toda computadora clásica en un problema que a la gente realmente le importa, un listón mucho más alto que superarlas en uno artificial.",
        },
        sections: [
          {
            heading: {
              en: "Defining the term",
              es: "Definir el término",
            },
            body: {
              en: "Quantum advantage is the point where a quantum computer solves a problem that no classical computer could solve in a reasonable amount of time. You may also see \"quantum supremacy,\" an older phrase for roughly the same milestone that has fallen out of favor. The distinction that matters is not the label but the problem: demonstrating advantage on a task invented specifically to suit quantum hardware is a scientific milestone, while demonstrating it on a task someone actually needs done is an economic one. Those are very different achievements, and press coverage often blurs them.",
              es: "La ventaja cuántica es el punto en que una computadora cuántica resuelve un problema que ninguna computadora clásica podría resolver en un tiempo razonable. También puede ver \"supremacía cuántica\", una expresión más antigua para el mismo hito que ha caído en desuso. La distinción que importa no es la etiqueta sino el problema: demostrar ventaja en una tarea inventada específicamente para el hardware cuántico es un hito científico, mientras que demostrarlo en una tarea que alguien realmente necesita hacer es un hito económico. Son logros muy distintos, y la cobertura de prensa a menudo los confunde.",
            },
          },
          {
            heading: {
              en: "What has actually been demonstrated",
              es: "Lo que se ha demostrado realmente",
            },
            body: {
              en: "In 2019 Google announced its Sycamore processor had completed in about two hundred seconds a task it estimated would take a supercomputer ten thousand years. The result was real, but the task was sampling random circuit outputs — a problem designed to be hard for classical machines and useless for anything else. Classical researchers then improved their methods and narrowed the gap considerably. Similar demonstrations have followed from other groups. The pattern holds: genuine milestones, contrived problems, and a classical community that keeps finding better workarounds.",
              es: "En 2019 Google anunció que su procesador Sycamore había completado en unos doscientos segundos una tarea que, según estimó, le tomaría diez mil años a una supercomputadora. El resultado fue real, pero la tarea consistía en muestrear salidas de circuitos aleatorios: un problema diseñado para ser difícil para las máquinas clásicas e inútil para cualquier otra cosa. Luego, investigadores clásicos mejoraron sus métodos y redujeron la brecha considerablemente. Han seguido demostraciones similares de otros grupos. El patrón se mantiene: hitos genuinos, problemas artificiales y una comunidad clásica que sigue encontrando mejores atajos.",
            },
            diagram: "advantageDomains",
          },
          {
            heading: {
              en: "Where the real value is expected",
              es: "Dónde se espera el valor real",
            },
            body: {
              en: "Three areas come up consistently. Simulating molecules and materials is the most promising, because nature is quantum mechanical and a quantum computer is a natural fit for modeling it — this could accelerate drug discovery, battery chemistry, and fertilizer production. Optimization problems, like routing thousands of deliveries or balancing a power grid, may benefit though the evidence is less settled. And cryptography, which you have already met through Shor's algorithm. Notice what is absent: graphics, databases, artificial intelligence as commonly practiced, and general-purpose software. Those remain classical work.",
              es: "Tres áreas aparecen de forma constante. Simular moléculas y materiales es la más prometedora, porque la naturaleza es mecánico-cuántica y una computadora cuántica encaja naturalmente para modelarla; esto podría acelerar el descubrimiento de medicamentos, la química de baterías y la producción de fertilizantes. Los problemas de optimización, como planificar miles de entregas o equilibrar una red eléctrica, podrían beneficiarse aunque la evidencia es menos firme. Y la criptografía, que ya conoció con el algoritmo de Shor. Note lo que falta: gráficos, bases de datos, inteligencia artificial tal como se practica comúnmente y software de propósito general. Eso sigue siendo trabajo clásico.",
            },
          },
          {
            heading: {
              en: "How to read a quantum headline",
              es: "Cómo leer un titular sobre lo cuántico",
            },
            body: {
              en: "When you see a claim about a quantum breakthrough, three questions cut through most of the noise. What exactly was the problem, and does anyone need it solved? What is the honest classical comparison, run by people trying to win rather than to lose? And how many qubits were used, and how error-prone were they? A headline that cannot survive those three questions is usually describing a milestone rather than a product. That skepticism is not cynicism about the field — it is what lets you take the genuine progress seriously.",
              es: "Cuando vea una afirmación sobre un avance cuántico, tres preguntas eliminan casi todo el ruido. ¿Cuál era exactamente el problema, y alguien necesita que se resuelva? ¿Cuál es la comparación clásica honesta, hecha por gente que intenta ganar y no perder? ¿Y cuántos qubits se usaron, y qué tan propensos a errores eran? Un titular que no sobrevive a esas tres preguntas suele describir un hito y no un producto. Ese escepticismo no es cinismo sobre el campo: es lo que le permite tomar en serio el progreso genuino.",
            },
          },
        ],
        quiz: [
          {
            prompt: {
              en: "Which application is considered the most promising for quantum computers?",
              es: "¿Qué aplicación se considera la más prometedora para las computadoras cuánticas?",
            },
            choices: [
              {
                en: "Simulating molecules and materials",
                es: "Simular moléculas y materiales",
              },
              { en: "Rendering video game graphics", es: "Renderizar gráficos de videojuegos" },
              { en: "Running large databases", es: "Ejecutar bases de datos grandes" },
              { en: "Training everyday AI models", es: "Entrenar modelos de IA cotidianos" },
            ],
            correctIndex: 0,
            explanation: {
              en: "Nature is quantum mechanical, so a quantum computer is a natural match for modeling it. This could accelerate drug discovery, battery chemistry, and fertilizer production in ways classical simulation struggles with.",
              es: "La naturaleza es mecánico-cuántica, así que una computadora cuántica encaja naturalmente para modelarla. Esto podría acelerar el descubrimiento de medicamentos, la química de baterías y la producción de fertilizantes de formas que la simulación clásica no logra.",
            },
          },
          {
            prompt: {
              en: "What was the limitation of Google's 2019 Sycamore demonstration?",
              es: "¿Cuál fue la limitación de la demostración Sycamore de Google en 2019?",
            },
            choices: [
              {
                en: "The task was designed to suit quantum hardware and had no practical use",
                es: "La tarea se diseñó para el hardware cuántico y no tenía uso práctico",
              },
              {
                en: "The results turned out to be fabricated",
                es: "Los resultados resultaron ser inventados",
              },
              {
                en: "It used a classical computer in disguise",
                es: "Usaba una computadora clásica disfrazada",
              },
              {
                en: "It was slower than a supercomputer after all",
                es: "Después de todo era más lenta que una supercomputadora",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "The achievement was real but the problem — sampling random circuit outputs — was useless outside the demonstration. Classical researchers later narrowed the gap considerably with improved methods.",
              es: "El logro fue real pero el problema — muestrear salidas de circuitos aleatorios — era inútil fuera de la demostración. Luego, investigadores clásicos redujeron la brecha considerablemente con métodos mejorados.",
            },
          },
          {
            prompt: {
              en: "What is the most useful question to ask about a quantum breakthrough headline?",
              es: "¿Cuál es la pregunta más útil ante un titular sobre un avance cuántico?",
            },
            choices: [
              {
                en: "What was the problem, and does anyone actually need it solved?",
                es: "¿Cuál era el problema, y alguien necesita realmente que se resuelva?",
              },
              {
                en: "Which company funded the research?",
                es: "¿Qué empresa financió la investigación?",
              },
              {
                en: "How cold was the processor kept?",
                es: "¿A qué temperatura se mantuvo el procesador?",
              },
              {
                en: "How long did the experiment run?",
                es: "¿Cuánto tiempo duró el experimento?",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "Most overstated coverage collapses under this question, because the demonstration solved a contrived task. Pair it with an honest classical comparison and the qubit error rate and you can assess almost any claim.",
              es: "La mayoría de la cobertura exagerada se derrumba ante esta pregunta, porque la demostración resolvió una tarea artificial. Súmele una comparación clásica honesta y la tasa de error de los qubits y podrá evaluar casi cualquier afirmación.",
            },
          },
        ],
      },

      {
        slug: "real-qubits",
        estimatedMinutes: 5,
        title: {
          en: "Real Qubits: How Machines Are Built",
          es: "Qubits Reales: Cómo se Construyen las Máquinas",
        },
        bigIdea: {
          en: "There is no single design for a quantum computer. Competing technologies each trade speed against stability, and nobody yet knows which will win.",
          es: "No existe un único diseño de computadora cuántica. Tecnologías rivales intercambian velocidad por estabilidad, y nadie sabe todavía cuál ganará.",
        },
        sections: [
          {
            heading: {
              en: "What a qubit is physically made of",
              es: "De qué está hecho físicamente un qubit",
            },
            body: {
              en: "A qubit is not a component you order from a catalog. It is any physical system with two distinguishable states that can be placed in superposition and controlled precisely — and several very different systems fit that description. The engineering competition between them is one of the most interesting parts of the field, because the approaches are not minor variations on a theme. They are fundamentally different machines that happen to compute the same way.",
              es: "Un qubit no es un componente que se pida por catálogo. Es cualquier sistema físico con dos estados distinguibles que pueda ponerse en superposición y controlarse con precisión, y varios sistemas muy distintos encajan en esa descripción. La competencia de ingeniería entre ellos es una de las partes más interesantes del campo, porque los enfoques no son variaciones menores de un mismo tema. Son máquinas fundamentalmente distintas que dan la casualidad de calcular igual.",
            },
          },
          {
            heading: {
              en: "Superconducting circuits",
              es: "Circuitos superconductores",
            },
            body: {
              en: "The most common approach today, used by Google and IBM. Tiny loops of superconducting metal are chilled to around fifteen millikelvin — colder than deep space — where electrical current flows without resistance and the loop behaves as a two-state quantum system. Advantages: they are fast, and they can be manufactured with adapted versions of existing chip-fabrication techniques. Drawbacks: they lose their quantum state in millionths of a second and require enormous refrigeration. Those chandelier-like photographs of quantum computers are mostly cooling apparatus; the actual chip is fingernail-sized at the bottom.",
              es: "El enfoque más común hoy, usado por Google e IBM. Diminutos bucles de metal superconductor se enfrían a unos quince milikelvin — más fríos que el espacio profundo — donde la corriente eléctrica fluye sin resistencia y el bucle se comporta como un sistema cuántico de dos estados. Ventajas: son rápidos y pueden fabricarse con versiones adaptadas de las técnicas existentes de fabricación de chips. Desventajas: pierden su estado cuántico en millonésimas de segundo y requieren una refrigeración enorme. Esas fotografías de computadoras cuánticas que parecen candelabros son casi todo aparato de enfriamiento; el chip real es del tamaño de una uña, en la base.",
            },
            diagram: "qubitHardware",
          },
          {
            heading: {
              en: "Trapped ions and the alternatives",
              es: "Iones atrapados y las alternativas",
            },
            body: {
              en: "Trapped-ion machines suspend individual charged atoms in electromagnetic fields and manipulate them with lasers. Because every ion of a given element is precisely identical, these qubits are exceptionally stable and accurate — but slower to operate. This is the approach taken by Quantinuum, which has a major presence in Colorado, and it builds directly on decades of atomic-clock research at NIST Boulder. Other contenders include photonic qubits made from particles of light, which can operate at room temperature, and topological qubits, a Microsoft bet on an approach that would be inherently error-resistant if the underlying physics cooperates.",
              es: "Las máquinas de iones atrapados suspenden átomos cargados individuales en campos electromagnéticos y los manipulan con láseres. Como todos los iones de un mismo elemento son exactamente idénticos, estos qubits son excepcionalmente estables y precisos, pero más lentos de operar. Este es el enfoque de Quantinuum, que tiene una presencia importante en Colorado, y se apoya directamente en décadas de investigación sobre relojes atómicos en NIST Boulder. Otros aspirantes incluyen los qubits fotónicos hechos de partículas de luz, que pueden funcionar a temperatura ambiente, y los qubits topológicos, una apuesta de Microsoft por un enfoque que sería inherentemente resistente a errores si la física subyacente coopera.",
            },
          },
          {
            heading: {
              en: "Why qubit counts mislead",
              es: "Por qué la cantidad de qubits engaña",
            },
            body: {
              en: "Headlines love qubit counts, but the number alone means very little. A thousand noisy qubits can be less useful than fifty excellent ones, because errors compound as a calculation runs. What actually matters is the combination of count, error rate, connectivity — which qubits can interact with which — and coherence time, meaning how long the fragile quantum state survives. A machine with a high count and a poor error rate cannot run a long program to completion. That trade-off is the subject of the final lesson in this unit.",
              es: "A los titulares les encanta la cantidad de qubits, pero el número por sí solo significa muy poco. Mil qubits ruidosos pueden ser menos útiles que cincuenta excelentes, porque los errores se acumulan a medida que avanza el cálculo. Lo que realmente importa es la combinación de cantidad, tasa de error, conectividad — qué qubits pueden interactuar con cuáles — y tiempo de coherencia, es decir, cuánto sobrevive el frágil estado cuántico. Una máquina con muchos qubits y una mala tasa de error no puede ejecutar un programa largo hasta el final. Ese compromiso es el tema de la última lección de esta unidad.",
            },
          },
        ],
        quiz: [
          {
            prompt: {
              en: "Why are superconducting quantum computers kept near absolute zero?",
              es: "¿Por qué las computadoras cuánticas superconductoras se mantienen cerca del cero absoluto?",
            },
            choices: [
              {
                en: "So current flows without resistance and the loop acts as a quantum system",
                es: "Para que la corriente fluya sin resistencia y el bucle actúe como sistema cuántico",
              },
              {
                en: "To stop the processor from overheating",
                es: "Para evitar que el procesador se sobrecaliente",
              },
              {
                en: "To make the qubits operate faster",
                es: "Para que los qubits funcionen más rápido",
              },
              {
                en: "To reduce the electricity the machine consumes",
                es: "Para reducir la electricidad que consume la máquina",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "Superconductivity only appears at these temperatures, and it is what lets the loop behave as a controllable two-state quantum system. The chandelier in the photos is the refrigeration; the chip itself is fingernail-sized.",
              es: "La superconductividad solo aparece a esas temperaturas, y es lo que permite que el bucle se comporte como un sistema cuántico de dos estados controlable. El candelabro de las fotos es la refrigeración; el chip en sí es del tamaño de una uña.",
            },
          },
          {
            prompt: {
              en: "What is the main advantage of trapped-ion qubits?",
              es: "¿Cuál es la principal ventaja de los qubits de iones atrapados?",
            },
            choices: [
              {
                en: "Every ion is precisely identical, making them very stable and accurate",
                es: "Todos los iones son exactamente idénticos, lo que los hace muy estables y precisos",
              },
              {
                en: "They are the fastest qubits available",
                es: "Son los qubits más rápidos disponibles",
              },
              {
                en: "They need no cooling or isolation at all",
                es: "No necesitan ningún enfriamiento ni aislamiento",
              },
              {
                en: "They are the cheapest type to manufacture",
                es: "Son el tipo más barato de fabricar",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "Identical atoms give exceptional stability and accuracy, at the cost of slower operation. Quantinuum uses this approach in Colorado, building on decades of NIST Boulder atomic-clock research.",
              es: "Los átomos idénticos dan una estabilidad y precisión excepcionales, a costa de una operación más lenta. Quantinuum usa este enfoque en Colorado, apoyándose en décadas de investigación de relojes atómicos en NIST Boulder.",
            },
          },
          {
            prompt: {
              en: "Why is a machine's qubit count a poor measure of its capability?",
              es: "¿Por qué la cantidad de qubits es una mala medida de la capacidad de una máquina?",
            },
            choices: [
              {
                en: "Error rate, connectivity, and coherence time matter just as much",
                es: "La tasa de error, la conectividad y el tiempo de coherencia importan igual",
              },
              {
                en: "Qubit counts are usually exaggerated by manufacturers",
                es: "Los fabricantes suelen exagerar la cantidad de qubits",
              },
              {
                en: "All quantum computers have roughly the same number",
                es: "Todas las computadoras cuánticas tienen aproximadamente la misma cantidad",
              },
              {
                en: "Only the qubits actively measured are counted",
                es: "Solo se cuentan los qubits que se miden activamente",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "A thousand noisy qubits can be less useful than fifty excellent ones, because errors compound as a program runs. A high count with a poor error rate cannot complete a long calculation.",
              es: "Mil qubits ruidosos pueden ser menos útiles que cincuenta excelentes, porque los errores se acumulan mientras corre el programa. Muchos qubits con mala tasa de error no pueden completar un cálculo largo.",
            },
          },
        ],
      },

      {
        slug: "noise-and-error-correction",
        estimatedMinutes: 6,
        title: {
          en: "Noise and Error Correction",
          es: "Ruido y Corrección de Errores",
        },
        bigIdea: {
          en: "Qubits are extraordinarily fragile, and fixing their errors is the single hardest engineering problem standing between today's machines and useful ones.",
          es: "Los qubits son extraordinariamente frágiles, y corregir sus errores es el problema de ingeniería más difícil entre las máquinas de hoy y las verdaderamente útiles.",
        },
        sections: [
          {
            heading: {
              en: "Everything is trying to measure your qubit",
              es: "Todo intenta medir su qubit",
            },
            body: {
              en: "Recall from Unit 1 that any interaction with a qubit acts like a measurement and destroys its superposition. Now consider what a qubit is surrounded by: heat, stray electromagnetic fields, vibration, cosmic rays passing through the building. Each of these can nudge a qubit and collapse the state you carefully prepared. This constant assault is called decoherence, and it is why superconducting qubits hold their state for only millionths of a second. The clock starts the moment your program does.",
              es: "Recuerde de la Unidad 1 que cualquier interacción con un qubit actúa como una medición y destruye su superposición. Ahora piense en lo que rodea a un qubit: calor, campos electromagnéticos dispersos, vibración, rayos cósmicos que atraviesan el edificio. Cada uno de ellos puede empujar un qubit y colapsar el estado que usted preparó con cuidado. Este asedio constante se llama decoherencia, y es la razón por la que los qubits superconductores mantienen su estado apenas millonésimas de segundo. El reloj empieza a correr en el momento en que arranca su programa.",
            },
          },
          {
            heading: {
              en: "Why the classical fix does not work",
              es: "Por qué la solución clásica no funciona",
            },
            body: {
              en: "Classical computers handle errors by making copies. Store a bit three times, and if one copy flips you take the majority vote. This is simple and it works. It is also flatly impossible for qubits, because of a result called the no-cloning theorem: an unknown quantum state cannot be copied. Not \"it is difficult\" — the laws of physics forbid it. Worse, checking whether a qubit has an error would normally require measuring it, which destroys the very state you were trying to protect. Quantum error correction has to detect errors without ever looking at the data.",
              es: "Las computadoras clásicas manejan los errores haciendo copias. Guarde un bit tres veces y, si una copia se invierte, se toma el voto mayoritario. Es simple y funciona. También es rotundamente imposible para los qubits, por un resultado llamado teorema de no clonación: un estado cuántico desconocido no puede copiarse. No es que \"sea difícil\": las leyes de la física lo prohíben. Peor aún, comprobar si un qubit tiene un error normalmente exigiría medirlo, lo que destruye el mismo estado que se intentaba proteger. La corrección cuántica de errores tiene que detectar errores sin mirar jamás los datos.",
            },
          },
          {
            heading: {
              en: "The clever solution",
              es: "La solución ingeniosa",
            },
            body: {
              en: "The trick, developed through the 1990s, is to spread one unit of information across many physical qubits so that no single qubit holds it. You then measure carefully chosen relationships between qubits — asking \"do these two still agree?\" rather than \"what value are you?\" These comparisons reveal that an error occurred and where, without ever exposing the underlying data. The protected unit is called a logical qubit, and the physical qubits backing it are its scaffolding.",
              es: "El truco, desarrollado a lo largo de los años noventa, consiste en repartir una unidad de información entre muchos qubits físicos de modo que ningún qubit por sí solo la contenga. Luego se miden relaciones cuidadosamente elegidas entre qubits, preguntando \"¿estos dos siguen coincidiendo?\" en lugar de \"¿qué valor tienes?\". Esas comparaciones revelan que ocurrió un error y dónde, sin exponer nunca los datos subyacentes. La unidad protegida se llama qubit lógico, y los qubits físicos que la sostienen son su andamiaje.",
            },
            diagram: "errorCorrection",
          },
          {
            heading: {
              en: "The brutal arithmetic",
              es: "La aritmética brutal",
            },
            body: {
              en: "Here is why useful quantum computers remain years away. Current estimates suggest one reliable logical qubit needs somewhere between a thousand and ten thousand physical qubits, depending on hardware quality. Running Shor's algorithm against real encryption would require a few thousand logical qubits — which multiplies out to millions of physical ones. Today's best machines have hundreds. That gap is the whole ballgame, and it is why the field currently distinguishes between the noisy machines we have now and the fault-tolerant machines that would actually change the world. Progress is real and steady, but the remaining distance is measured in orders of magnitude, not percentages.",
              es: "Aquí está la razón por la que las computadoras cuánticas útiles siguen a años de distancia. Las estimaciones actuales sugieren que un qubit lógico confiable necesita entre mil y diez mil qubits físicos, según la calidad del hardware. Ejecutar el algoritmo de Shor contra el cifrado real requeriría unos pocos miles de qubits lógicos, lo que se multiplica hasta millones de qubits físicos. Las mejores máquinas de hoy tienen cientos. Esa brecha lo es todo, y por eso el campo distingue actualmente entre las máquinas ruidosas que tenemos ahora y las máquinas tolerantes a fallos que sí cambiarían el mundo. El progreso es real y constante, pero la distancia restante se mide en órdenes de magnitud, no en porcentajes.",
            },
          },
        ],
        quiz: [
          {
            prompt: {
              en: "Why can't quantum computers copy qubits to correct errors?",
              es: "¿Por qué las computadoras cuánticas no pueden copiar qubits para corregir errores?",
            },
            choices: [
              {
                en: "The no-cloning theorem makes copying an unknown quantum state impossible",
                es: "El teorema de no clonación hace imposible copiar un estado cuántico desconocido",
              },
              {
                en: "Copying would take too much time to be practical",
                es: "Copiar tomaría demasiado tiempo para ser práctico",
              },
              {
                en: "There are not enough spare qubits available",
                es: "No hay suficientes qubits de repuesto disponibles",
              },
              {
                en: "Copies would be stored too far apart to compare",
                es: "Las copias quedarían demasiado separadas para compararlas",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "This is a law of physics, not an engineering limit. It rules out the classical majority-vote approach entirely, which is why quantum error correction had to be invented from scratch.",
              es: "Es una ley de la física, no un límite de ingeniería. Descarta por completo el enfoque clásico de voto mayoritario, y por eso hubo que inventar desde cero la corrección cuántica de errores.",
            },
          },
          {
            prompt: {
              en: "How does quantum error correction detect errors without destroying the data?",
              es: "¿Cómo detecta errores la corrección cuántica sin destruir los datos?",
            },
            choices: [
              {
                en: "It measures relationships between qubits, not their values",
                es: "Mide relaciones entre qubits, no sus valores",
              },
              {
                en: "It measures each qubit very gently",
                es: "Mide cada qubit muy suavemente",
              },
              {
                en: "It restores the data after measuring it",
                es: "Restaura los datos después de medirlos",
              },
              {
                en: "It checks the qubits before the program starts",
                es: "Revisa los qubits antes de que empiece el programa",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "Asking \"do these two still agree?\" rather than \"what value are you?\" reveals that an error occurred and where, while leaving the underlying information untouched.",
              es: "Preguntar \"¿estos dos siguen coincidiendo?\" en lugar de \"¿qué valor tienes?\" revela que ocurrió un error y dónde, sin tocar la información subyacente.",
            },
          },
          {
            prompt: {
              en: "Roughly how many physical qubits does one reliable logical qubit require?",
              es: "¿Aproximadamente cuántos qubits físicos requiere un qubit lógico confiable?",
            },
            choices: [
              { en: "Between 1,000 and 10,000", es: "Entre 1.000 y 10.000" },
              { en: "Exactly 3, as in classical computing", es: "Exactamente 3, como en la computación clásica" },
              { en: "Between 10 and 20", es: "Entre 10 y 20" },
              { en: "Just 1 — logical and physical are the same", es: "Solo 1; lógico y físico son lo mismo" },
            ],
            correctIndex: 0,
            explanation: {
              en: "This overhead is why useful machines remain distant. Breaking real encryption needs thousands of logical qubits, multiplying out to millions of physical ones — while today's best machines have hundreds.",
              es: "Ese costo adicional es la razón por la que las máquinas útiles siguen lejos. Romper el cifrado real necesita miles de qubits lógicos, que se multiplican hasta millones de qubits físicos, mientras que las mejores máquinas de hoy tienen cientos.",
            },
          },
        ],
      },
    ],
  },

  /* ======================================================= UNIT 6 ======= */
  {
    id: "security",
    icon: "KeyRound",
    title: {
      en: "Quantum-Safe Security",
      es: "Seguridad a Prueba de lo Cuántico",
    },
    summary: {
      en: "How encryption protects you today, why quantum computing threatens part of it, and the Colorado laboratory that wrote the world's replacement standards.",
      es: "Cómo lo protege el cifrado hoy, por qué la computación cuántica amenaza una parte de él y el laboratorio de Colorado que escribió los estándares de reemplazo del mundo.",
    },
    lessons: [
      {
        slug: "how-encryption-works-today",
        estimatedMinutes: 6,
        title: {
          en: "How Encryption Works Today",
          es: "Cómo Funciona el Cifrado Hoy",
        },
        bigIdea: {
          en: "Modern security uses two different kinds of encryption, and quantum computing threatens one of them far more than the other.",
          es: "La seguridad moderna usa dos tipos distintos de cifrado, y la computación cuántica amenaza a uno mucho más que al otro.",
        },
        sections: [
          {
            heading: {
              en: "The padlock in your browser",
              es: "El candado de su navegador",
            },
            body: {
              en: "Every time you see a padlock in your address bar, encryption is running. It scrambles your data into nonsense before it crosses the internet and unscrambles it at the other end. Without it, every password, message, and payment would travel in plain readable text through dozens of machines you do not control. What most people never learn is that two fundamentally different systems are working together behind that single padlock icon.",
              es: "Cada vez que ve un candado en la barra de direcciones, hay cifrado funcionando. Convierte sus datos en algo ininteligible antes de que crucen internet y los descifra en el otro extremo. Sin él, cada contraseña, mensaje y pago viajaría como texto legible a través de decenas de máquinas que usted no controla. Lo que casi nadie aprende es que detrás de ese único ícono de candado trabajan juntos dos sistemas fundamentalmente distintos.",
            },
          },
          {
            heading: {
              en: "Symmetric: one shared key",
              es: "Simétrico: una clave compartida",
            },
            body: {
              en: "The first kind uses a single secret key to both lock and unlock, like a physical door key that everyone in the household shares. The standard here is AES, and it is fast and extremely strong — it protects the actual contents of your messages, files, and video calls. Symmetric encryption has one glaring problem, though: both sides need the same key, and you cannot simply email it to someone, because anyone intercepting the email gets the key too.",
              es: "El primer tipo usa una sola clave secreta para cerrar y abrir, como la llave física de una puerta que todos en la casa comparten. El estándar aquí es AES, rápido y extremadamente fuerte: protege el contenido real de sus mensajes, archivos y videollamadas. Sin embargo, el cifrado simétrico tiene un problema evidente: ambas partes necesitan la misma clave, y usted no puede simplemente enviarla por correo, porque cualquiera que intercepte el correo también obtiene la clave.",
            },
            diagram: "encryptionLock",
          },
          {
            heading: {
              en: "Asymmetric: solving the delivery problem",
              es: "Asimétrico: resolver el problema de la entrega",
            },
            body: {
              en: "The second kind solves exactly that. Each person has a matched pair of keys: a public key they publish openly and a private key they never share. Anything locked with the public key can only be unlocked with the private one. So you can look up a website's public key, use it to scramble a message, and be confident only that website can read it — without ever having arranged a shared secret in advance. RSA is the best-known system of this type, and its security rests entirely on factoring being hard. This is the encryption Shor's algorithm targets.",
              es: "El segundo tipo resuelve exactamente eso. Cada persona tiene un par de claves emparejadas: una clave pública que publica abiertamente y una clave privada que nunca comparte. Lo que se cierra con la clave pública solo puede abrirse con la privada. Así usted puede consultar la clave pública de un sitio web, usarla para codificar un mensaje y confiar en que solo ese sitio puede leerlo, sin haber acordado nunca un secreto compartido de antemano. RSA es el sistema más conocido de este tipo, y su seguridad depende enteramente de que factorizar sea difícil. Este es el cifrado que apunta el algoritmo de Shor.",
            },
          },
          {
            heading: {
              en: "How the two work together — and where the threat lands",
              es: "Cómo trabajan juntos, y dónde cae la amenaza",
            },
            body: {
              en: "In practice, connecting to a website uses both. Asymmetric encryption performs a brief handshake to agree on a fresh symmetric key, and then fast symmetric encryption carries the actual conversation. This matters enormously for the quantum threat, because the danger is lopsided. Symmetric encryption faces only Grover's algorithm, and doubling the key length neutralizes it. Asymmetric encryption faces Shor's algorithm, which breaks it outright — no key length can save RSA. So the handshake is the vulnerable step, and replacing it is the subject of the next lesson.",
              es: "En la práctica, conectarse a un sitio web usa ambos. El cifrado asimétrico realiza un breve saludo inicial para acordar una clave simétrica nueva, y luego el cifrado simétrico rápido transporta la conversación real. Esto importa enormemente para la amenaza cuántica, porque el peligro es desigual. El cifrado simétrico solo enfrenta al algoritmo de Grover, y duplicar la longitud de la clave lo neutraliza. El cifrado asimétrico enfrenta al algoritmo de Shor, que lo rompe por completo: ninguna longitud de clave puede salvar a RSA. Así que el saludo inicial es el paso vulnerable, y reemplazarlo es el tema de la próxima lección.",
            },
          },
        ],
        quiz: [
          {
            prompt: {
              en: "Which type of encryption does quantum computing threaten most severely?",
              es: "¿Qué tipo de cifrado amenaza más gravemente la computación cuántica?",
            },
            choices: [
              {
                en: "Asymmetric encryption like RSA, which Shor's algorithm breaks outright",
                es: "El cifrado asimétrico como RSA, que el algoritmo de Shor rompe por completo",
              },
              {
                en: "Symmetric encryption like AES",
                es: "El cifrado simétrico como AES",
              },
              {
                en: "Both are threatened exactly equally",
                es: "Ambos están amenazados exactamente por igual",
              },
              {
                en: "Neither is meaningfully threatened",
                es: "Ninguno está amenazado de forma significativa",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "The threat is lopsided. AES faces only Grover's square-root speedup, fixed by doubling the key. RSA faces Shor's exponential speedup, and no key length can rescue it.",
              es: "La amenaza es desigual. AES solo enfrenta la aceleración de raíz cuadrada de Grover, resuelta al duplicar la clave. RSA enfrenta la aceleración exponencial de Shor, y ninguna longitud de clave puede rescatarlo.",
            },
          },
          {
            prompt: {
              en: "What problem does asymmetric encryption solve?",
              es: "¿Qué problema resuelve el cifrado asimétrico?",
            },
            choices: [
              {
                en: "Communicating securely without arranging a shared secret in advance",
                es: "Comunicarse de forma segura sin acordar antes un secreto compartido",
              },
              {
                en: "Making encryption run faster than symmetric methods",
                es: "Hacer que el cifrado sea más rápido que los métodos simétricos",
              },
              {
                en: "Compressing data before it is sent",
                es: "Comprimir los datos antes de enviarlos",
              },
              {
                en: "Storing passwords safely on a server",
                es: "Guardar contraseñas de forma segura en un servidor",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "Symmetric encryption needs both sides to already hold the same key, which cannot be safely delivered over an open network. Public/private key pairs solve that delivery problem.",
              es: "El cifrado simétrico exige que ambas partes ya tengan la misma clave, que no puede entregarse de forma segura por una red abierta. Los pares de clave pública y privada resuelven ese problema de entrega.",
            },
          },
          {
            prompt: {
              en: "When you connect to a secure website, how are the two encryption types used?",
              es: "Cuando se conecta a un sitio web seguro, ¿cómo se usan los dos tipos de cifrado?",
            },
            choices: [
              {
                en: "Asymmetric handles a handshake to agree a key; symmetric carries the conversation",
                es: "El asimétrico hace un saludo para acordar una clave; el simétrico lleva la conversación",
              },
              {
                en: "Only asymmetric encryption is used throughout",
                es: "Solo se usa cifrado asimétrico en todo momento",
              },
              {
                en: "Only symmetric encryption is used throughout",
                es: "Solo se usa cifrado simétrico en todo momento",
              },
              {
                en: "They alternate randomly for each packet sent",
                es: "Se alternan al azar para cada paquete enviado",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "This hybrid design is why the handshake is the vulnerable step — it is the asymmetric part, and it is exactly what post-quantum cryptography has to replace.",
              es: "Ese diseño híbrido explica por qué el saludo inicial es el paso vulnerable: es la parte asimétrica, y es justamente lo que la criptografía poscuántica debe reemplazar.",
            },
          },
        ],
      },

      {
        slug: "post-quantum-cryptography",
        estimatedMinutes: 6,
        title: {
          en: "Post-Quantum Cryptography",
          es: "Criptografía Poscuántica",
        },
        bigIdea: {
          en: "The replacement encryption already exists. It runs on ordinary computers, it was standardized in 2024, and the work now is deploying it everywhere.",
          es: "El cifrado de reemplazo ya existe. Funciona en computadoras comunes, se estandarizó en 2024, y ahora el trabajo es implementarlo en todas partes.",
        },
        sections: [
          {
            heading: {
              en: "A common misunderstanding, cleared up",
              es: "Un malentendido común, aclarado",
            },
            body: {
              en: "Post-quantum cryptography does not require a quantum computer. That surprises almost everyone. PQC is ordinary software, running on ordinary laptops and phones and servers, built on math problems that quantum computers are not known to solve efficiently. Your device does not need any new hardware — it needs updated software. This is the good news buried under most quantum-threat coverage: the defense is already here and it is a software upgrade, not a hardware replacement.",
              es: "La criptografía poscuántica no requiere una computadora cuántica. Eso sorprende a casi todo el mundo. La PQC es software común, que corre en laptops, teléfonos y servidores comunes, construido sobre problemas matemáticos que no se sabe que las computadoras cuánticas resuelvan de forma eficiente. Su dispositivo no necesita hardware nuevo: necesita software actualizado. Esta es la buena noticia enterrada bajo la mayoría de la cobertura sobre la amenaza cuántica: la defensa ya está aquí y es una actualización de software, no un reemplazo de hardware.",
            },
          },
          {
            heading: {
              en: "Different math, same idea",
              es: "Matemática distinta, misma idea",
            },
            body: {
              en: "The strategy is to find problems that are easy in one direction and hard in reverse — the same trick RSA uses — but based on structures Shor's algorithm cannot exploit. The leading approach uses lattices, which you can picture as an infinite grid of points stretching through many dimensions. Finding the grid point closest to a given location is easy in two or three dimensions and becomes brutally hard in hundreds, for classical and quantum computers alike. Other approaches build on error-correcting codes or on the mathematics of hash functions.",
              es: "La estrategia es encontrar problemas fáciles en una dirección y difíciles en reversa — el mismo truco que usa RSA — pero basados en estructuras que el algoritmo de Shor no puede aprovechar. El enfoque principal usa retículas, que puede imaginar como una cuadrícula infinita de puntos extendida por muchas dimensiones. Encontrar el punto de la cuadrícula más cercano a una ubicación dada es fácil en dos o tres dimensiones y se vuelve brutalmente difícil en cientos, tanto para computadoras clásicas como cuánticas. Otros enfoques se construyen sobre códigos de corrección de errores o sobre la matemática de las funciones hash.",
            },
          },
          {
            heading: {
              en: "The 2024 standards",
              es: "Los estándares de 2024",
            },
            body: {
              en: "In 2016 NIST launched a global competition, inviting cryptographers everywhere to submit candidate algorithms and, crucially, to attack each other's submissions. Dozens of entries were broken during the process, which was the point — better to fail in public review than in deployment. In August 2024, after eight years, NIST published the first finalized standards: ML-KEM for key exchange, plus ML-DSA and SLH-DSA for digital signatures. These are now the official recommendations, and adoption is underway across major browsers, messaging apps, and cloud providers.",
              es: "En 2016 el NIST lanzó una competencia global, invitando a criptógrafos de todo el mundo a presentar algoritmos candidatos y, sobre todo, a atacar las propuestas de los demás. Decenas de participantes fueron quebrados durante el proceso, que era justamente el objetivo: mejor fallar en la revisión pública que en la implementación. En agosto de 2024, tras ocho años, el NIST publicó los primeros estándares finalizados: ML-KEM para el intercambio de claves, y ML-DSA y SLH-DSA para firmas digitales. Estas son ahora las recomendaciones oficiales, y su adopción está en marcha en los principales navegadores, aplicaciones de mensajería y proveedores de nube.",
            },
          },
          {
            heading: {
              en: "Why this is urgent now",
              es: "Por qué esto es urgente ahora",
            },
            body: {
              en: "Two reasons, both covered earlier. First, harvest now, decrypt later: encrypted traffic captured today can be stored until a capable quantum computer exists, so any secret that must hold for a decade is already exposed. Second, migration is genuinely slow — every server, browser, phone, banking system, and embedded device has to be updated, and many organizations do not even have a complete inventory of where they use encryption. That is exactly what the readiness assessment elsewhere on this site helps organizations figure out. Starting early is not caution; it is the only way to finish in time.",
              es: "Dos razones, ambas ya vistas. Primero, cosechar ahora y descifrar después: el tráfico cifrado capturado hoy puede guardarse hasta que exista una computadora cuántica capaz, así que cualquier secreto que deba durar una década ya está expuesto. Segundo, la migración es realmente lenta: hay que actualizar cada servidor, navegador, teléfono, sistema bancario y dispositivo integrado, y muchas organizaciones ni siquiera tienen un inventario completo de dónde usan cifrado. Eso es exactamente lo que la evaluación de preparación de este sitio ayuda a determinar a las organizaciones. Empezar temprano no es precaución: es la única forma de terminar a tiempo.",
            },
          },
        ],
        quiz: [
          {
            prompt: {
              en: "Does post-quantum cryptography require a quantum computer to run?",
              es: "¿La criptografía poscuántica requiere una computadora cuántica para funcionar?",
            },
            choices: [
              {
                en: "No — it runs as ordinary software on ordinary devices",
                es: "No; funciona como software común en dispositivos comunes",
              },
              {
                en: "Yes, both sides need quantum hardware",
                es: "Sí, ambas partes necesitan hardware cuántico",
              },
              {
                en: "Yes, but only the server side needs it",
                es: "Sí, pero solo el lado del servidor lo necesita",
              },
              {
                en: "Only for generating the keys initially",
                es: "Solo para generar las claves inicialmente",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "This surprises almost everyone. PQC is built on math that quantum computers are not known to crack, but it runs on the laptop or phone you already own — the defense is a software update, not new hardware.",
              es: "Esto sorprende a casi todos. La PQC se basa en matemáticas que no se sabe que las computadoras cuánticas puedan romper, pero funciona en la laptop o el teléfono que usted ya tiene: la defensa es una actualización de software, no hardware nuevo.",
            },
          },
          {
            prompt: {
              en: "When did NIST finalize the first post-quantum cryptography standards?",
              es: "¿Cuándo finalizó el NIST los primeros estándares de criptografía poscuántica?",
            },
            choices: [
              { en: "August 2024", es: "Agosto de 2024" },
              { en: "2016", es: "2016" },
              { en: "2019", es: "2019" },
              { en: "They have not been finalized yet", es: "Todavía no se han finalizado" },
            ],
            correctIndex: 0,
            explanation: {
              en: "The competition opened in 2016 and the standards — ML-KEM, ML-DSA, and SLH-DSA — were published in August 2024 after eight years of public analysis in which many candidate algorithms were broken.",
              es: "La competencia se abrió en 2016 y los estándares — ML-KEM, ML-DSA y SLH-DSA — se publicaron en agosto de 2024 tras ocho años de análisis público en el que muchos algoritmos candidatos fueron quebrados.",
            },
          },
          {
            prompt: {
              en: "Why did NIST invite cryptographers to attack the candidate algorithms?",
              es: "¿Por qué el NIST invitó a criptógrafos a atacar los algoritmos candidatos?",
            },
            choices: [
              {
                en: "Better for a weak algorithm to fail in public review than after deployment",
                es: "Es mejor que un algoritmo débil falle en revisión pública que tras su implementación",
              },
              {
                en: "To find out which team was the most skilled",
                es: "Para averiguar qué equipo era el más hábil",
              },
              {
                en: "To slow the process down deliberately",
                es: "Para retrasar el proceso deliberadamente",
              },
              {
                en: "Because quantum computers were not available for testing",
                es: "Porque no había computadoras cuánticas disponibles para probar",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "Dozens of submissions were broken during the competition, and that was the point. Adversarial public review is how cryptographers build confidence that the survivors are actually strong.",
              es: "Decenas de propuestas fueron quebradas durante la competencia, y ese era el objetivo. La revisión pública adversarial es como los criptógrafos ganan confianza en que los sobrevivientes son realmente fuertes.",
            },
          },
        ],
      },

      {
        slug: "colorado-and-nist-boulder",
        estimatedMinutes: 5,
        title: {
          en: "NIST Boulder and Colorado's Role",
          es: "NIST Boulder y el Papel de Colorado",
        },
        bigIdea: {
          en: "The standards protecting the world's data were shaped in Boulder, Colorado — and the state's quantum cluster is one of the densest anywhere.",
          es: "Los estándares que protegen los datos del mundo se moldearon en Boulder, Colorado, y el grupo cuántico del estado es uno de los más densos que existen.",
        },
        sections: [
          {
            heading: {
              en: "Why Boulder",
              es: "Por qué Boulder",
            },
            body: {
              en: "It is not an accident. The National Institute of Standards and Technology has operated a major laboratory in Boulder since 1954, and its specialty has always been measuring things with extreme precision — which turns out to be exactly the skill set that quantum technology demands. NIST Boulder helps maintain the official time standard for the United States using atomic clocks, and decades of that atomic-physics expertise fed directly into quantum computing, because the techniques for controlling single atoms in a clock are closely related to the techniques for controlling them as qubits.",
              es: "No es casualidad. El Instituto Nacional de Estándares y Tecnología opera un laboratorio importante en Boulder desde 1954, y su especialidad siempre ha sido medir cosas con precisión extrema, lo que resulta ser exactamente la habilidad que exige la tecnología cuántica. NIST Boulder ayuda a mantener el estándar oficial de tiempo de Estados Unidos con relojes atómicos, y décadas de esa experiencia en física atómica alimentaron directamente la computación cuántica, porque las técnicas para controlar átomos individuales en un reloj están muy relacionadas con las técnicas para controlarlos como qubits.",
            },
          },
          {
            heading: {
              en: "JILA and the research base",
              es: "JILA y la base de investigación",
            },
            body: {
              en: "JILA, a joint institute of NIST and the University of Colorado Boulder, is among the world's leading atomic and quantum physics research centers. Researchers affiliated with JILA have won multiple Nobel Prizes in Physics, including for creating a new state of matter and for developing the precision laser techniques underpinning modern optical clocks. The practical effect is a deep local talent pipeline: graduate students trained on this equipment go on to found or join quantum companies, and many stay in the region.",
              es: "JILA, un instituto conjunto del NIST y la Universidad de Colorado Boulder, está entre los principales centros de investigación de física atómica y cuántica del mundo. Investigadores afiliados a JILA han ganado varios Premios Nobel de Física, incluso por crear un nuevo estado de la materia y por desarrollar las técnicas láser de precisión que sustentan los relojes ópticos modernos. El efecto práctico es una cantera local profunda de talento: los estudiantes de posgrado formados con este equipamiento terminan fundando empresas cuánticas o uniéndose a ellas, y muchos se quedan en la región.",
            },
          },
          {
            heading: {
              en: "The cluster around it",
              es: "El grupo a su alrededor",
            },
            body: {
              en: "Around that research base sits a genuine industry cluster. Quantinuum, one of the leading trapped-ion quantum computing companies, has significant Colorado operations. Other quantum hardware, sensing, and software firms have concentrated along the Front Range, drawn by the talent and the proximity to federal labs. In 2024 the region was designated a federal Tech Hub for quantum technology, and Colorado has committed state funding to grow the sector. For a student, the practical upshot is that the field is not somewhere else — the labs, the companies, and the people are a drive away.",
              es: "Alrededor de esa base de investigación hay un verdadero grupo industrial. Quantinuum, una de las empresas líderes en computación cuántica de iones atrapados, tiene operaciones importantes en Colorado. Otras empresas de hardware, sensores y software cuánticos se han concentrado a lo largo del Front Range, atraídas por el talento y la cercanía a los laboratorios federales. En 2024 la región fue designada un Tech Hub federal para tecnología cuántica, y Colorado ha comprometido fondos estatales para hacer crecer el sector. Para un estudiante, la conclusión práctica es que el campo no está en otra parte: los laboratorios, las empresas y las personas están a un viaje en auto.",
            },
          },
          {
            heading: {
              en: "What this means for you",
              es: "Lo que esto significa para usted",
            },
            body: {
              en: "You have now finished the technical portion of this course, and you did it living in one of the few places on Earth where every layer of this field is present at once: the federal lab that writes the standards, a world-class university research institute, and companies building the machines. That is unusual, and it is worth using. The Youth and Education section of this site lists specific Colorado programs, summer research opportunities, and the reality that many CU Boulder researchers will respond to a motivated high schooler who simply emails them. The last lesson looks at where all of this is heading.",
              es: "Usted ya terminó la parte técnica de este curso, y lo hizo viviendo en uno de los pocos lugares del planeta donde todas las capas de este campo están presentes a la vez: el laboratorio federal que escribe los estándares, un instituto universitario de investigación de primer nivel y empresas que construyen las máquinas. Eso es poco común, y vale la pena aprovecharlo. La sección de Juventud y Educación de este sitio enumera programas específicos de Colorado, oportunidades de investigación de verano y el hecho de que muchos investigadores de CU Boulder responden a un estudiante de secundaria motivado que simplemente les escribe. La última lección analiza hacia dónde va todo esto.",
            },
          },
        ],
        quiz: [
          {
            prompt: {
              en: "Why is NIST Boulder well positioned for quantum research?",
              es: "¿Por qué NIST Boulder está bien posicionado para la investigación cuántica?",
            },
            choices: [
              {
                en: "Decades of atomic-clock work built exactly the precision-measurement skills quantum needs",
                es: "Décadas de trabajo con relojes atómicos crearon justo las habilidades de medición de precisión que lo cuántico necesita",
              },
              {
                en: "Colorado's high altitude improves qubit performance",
                es: "La altitud de Colorado mejora el rendimiento de los qubits",
              },
              {
                en: "It was purpose-built for quantum computing in 2024",
                es: "Se construyó específicamente para computación cuántica en 2024",
              },
              {
                en: "The cold climate reduces cooling costs",
                es: "El clima frío reduce los costos de enfriamiento",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "The lab has operated in Boulder since 1954 specializing in extreme-precision measurement. Controlling single atoms in an atomic clock is closely related to controlling them as qubits.",
              es: "El laboratorio funciona en Boulder desde 1954 especializado en mediciones de precisión extrema. Controlar átomos individuales en un reloj atómico está muy relacionado con controlarlos como qubits.",
            },
          },
          {
            prompt: {
              en: "What is JILA?",
              es: "¿Qué es JILA?",
            },
            choices: [
              {
                en: "A joint NIST and CU Boulder institute for atomic and quantum physics",
                es: "Un instituto conjunto del NIST y CU Boulder de física atómica y cuántica",
              },
              {
                en: "A quantum computing company based in Denver",
                es: "Una empresa de computación cuántica con sede en Denver",
              },
              {
                en: "The federal agency that sets encryption standards",
                es: "La agencia federal que fija los estándares de cifrado",
              },
              {
                en: "Colorado's state quantum funding program",
                es: "El programa estatal de financiamiento cuántico de Colorado",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "JILA is among the world's leading atomic and quantum physics research centers, with multiple affiliated Nobel Prize winners, and it feeds a deep local talent pipeline into Colorado's quantum industry.",
              es: "JILA está entre los principales centros de investigación de física atómica y cuántica del mundo, con varios premios Nobel afiliados, y alimenta una profunda cantera local de talento para la industria cuántica de Colorado.",
            },
          },
          {
            prompt: {
              en: "Which quantum computing company has significant Colorado operations?",
              es: "¿Qué empresa de computación cuántica tiene operaciones importantes en Colorado?",
            },
            choices: [
              { en: "Quantinuum", es: "Quantinuum" },
              { en: "Sycamore Systems", es: "Sycamore Systems" },
              { en: "Lattice Security", es: "Lattice Security" },
              { en: "Bell Labs Quantum", es: "Bell Labs Quantum" },
            ],
            correctIndex: 0,
            explanation: {
              en: "Quantinuum is a leading trapped-ion quantum computing company — the same technology approach that grew out of NIST Boulder's atomic physics research.",
              es: "Quantinuum es una empresa líder en computación cuántica de iones atrapados, el mismo enfoque tecnológico que surgió de la investigación en física atómica de NIST Boulder.",
            },
          },
        ],
      },
    ],
  },

  /* ======================================================= UNIT 7 ======= */
  {
    id: "wrap-up",
    icon: "Globe",
    title: { en: "Where This Is Headed", es: "Hacia Dónde Va Esto" },
    summary: {
      en: "A realistic look at the road ahead, and a final review pulling together everything from the whole course.",
      es: "Una mirada realista al camino por delante y un repaso final que reúne todo el curso.",
    },
    lessons: [
      {
        slug: "where-quantum-is-headed",
        estimatedMinutes: 6,
        title: {
          en: "Where Quantum Computing Is Headed",
          es: "Hacia Dónde Va la Computación Cuántica",
        },
        bigIdea: {
          en: "The honest forecast sits between the hype and the dismissal: slower than the headlines promise, and more consequential than the skeptics allow.",
          es: "El pronóstico honesto está entre la exageración y el desdén: más lento de lo que prometen los titulares y más trascendente de lo que admiten los escépticos.",
        },
        sections: [
          {
            heading: {
              en: "Where things actually stand",
              es: "Cómo están las cosas realmente",
            },
            body: {
              en: "Today's machines have hundreds of noisy qubits and can run only short programs before errors overwhelm the calculation. They are genuine scientific instruments and they are not yet useful for commercial problems that classical computers cannot already handle. Anyone claiming otherwise is selling something. At the same time, the progress is real: error rates have fallen steadily, qubit counts have risen, and error-correction milestones that were theoretical a decade ago have now been demonstrated in hardware.",
              es: "Las máquinas de hoy tienen cientos de qubits ruidosos y solo pueden ejecutar programas cortos antes de que los errores desborden el cálculo. Son instrumentos científicos genuinos y todavía no son útiles para problemas comerciales que las computadoras clásicas no puedan resolver ya. Quien afirme lo contrario está vendiendo algo. Al mismo tiempo, el progreso es real: las tasas de error han bajado de forma sostenida, la cantidad de qubits ha subido, y hitos de corrección de errores que hace una década eran teóricos ahora se han demostrado en hardware.",
            },
          },
          {
            heading: {
              en: "The next decade",
              es: "La próxima década",
            },
            body: {
              en: "Most researchers expect the near term to bring incremental gains: better error correction, modestly larger machines, and early specialized applications in chemistry and materials simulation where even a noisy quantum computer might contribute something useful. The larger prize — fault-tolerant machines with thousands of logical qubits, capable of running Shor's algorithm against real encryption — is generally estimated at somewhere between ten and thirty years away. Take any specific number with real skepticism, including that one. Forecasts in this field have been wrong in both directions for decades.",
              es: "La mayoría de los investigadores espera que el corto plazo traiga avances incrementales: mejor corrección de errores, máquinas moderadamente más grandes y primeras aplicaciones especializadas en química y simulación de materiales, donde incluso una computadora cuántica ruidosa podría aportar algo útil. El premio mayor — máquinas tolerantes a fallos con miles de qubits lógicos, capaces de ejecutar el algoritmo de Shor contra el cifrado real — se estima generalmente entre diez y treinta años. Tome cualquier número específico con verdadero escepticismo, incluido ese. Los pronósticos de este campo se han equivocado en ambas direcciones durante décadas.",
            },
          },
          {
            heading: {
              en: "What is already changing",
              es: "Lo que ya está cambiando",
            },
            body: {
              en: "Here is the part that does not require waiting. Post-quantum cryptography is being deployed right now, in browsers and messaging apps you already use. Quantum sensing — using quantum effects for extraordinarily precise measurement rather than computation — is further along than computing and is already improving navigation, medical imaging, and geology. Governments have committed billions and treat quantum capability as a strategic priority. So the technology is reshaping policy, security practice, and career paths well before any machine breaks an encryption key.",
              es: "Esta es la parte que no requiere esperar. La criptografía poscuántica se está implementando ahora mismo, en navegadores y aplicaciones de mensajería que usted ya usa. Los sensores cuánticos — usar efectos cuánticos para mediciones extraordinariamente precisas en lugar de cálculo — están más avanzados que la computación y ya están mejorando la navegación, las imágenes médicas y la geología. Los gobiernos han comprometido miles de millones y tratan la capacidad cuántica como una prioridad estratégica. Así que la tecnología ya está reconfigurando políticas, prácticas de seguridad y trayectorias profesionales mucho antes de que una máquina rompa una clave de cifrado.",
            },
          },
          {
            heading: {
              en: "What you can do with this",
              es: "Qué puede hacer con esto",
            },
            body: {
              en: "You now understand quantum computing better than most adults, including most people who write about it. You can explain superposition without saying \"it tries everything at once.\" You know why entanglement cannot send messages. You can tell Grover's modest speedup from Shor's dramatic one, and you know why only one of them prompted a global standards effort. That is a real foundation. If you want to keep going, the Youth and Education section lists free platforms with hands-on access to actual quantum hardware, Colorado summer research programs, and career paths that span physics, software, policy, and business. This field needs people who can explain it clearly at least as much as it needs more physicists — and you have just spent ninety minutes practicing exactly that.",
              es: "Ahora usted entiende la computación cuántica mejor que la mayoría de los adultos, incluida la mayoría de quienes escriben sobre ella. Puede explicar la superposición sin decir \"prueba todo a la vez\". Sabe por qué el entrelazamiento no puede enviar mensajes. Puede distinguir la aceleración modesta de Grover de la drástica de Shor, y sabe por qué solo una de ellas motivó un esfuerzo global de estandarización. Esa es una base real. Si quiere seguir, la sección de Juventud y Educación enumera plataformas gratuitas con acceso práctico a hardware cuántico real, programas de investigación de verano en Colorado y carreras que abarcan física, software, políticas públicas y negocios. Este campo necesita gente que sepa explicarlo con claridad al menos tanto como necesita más físicos, y usted acaba de pasar noventa minutos practicando exactamente eso.",
            },
          },
        ],
        quiz: [
          {
            prompt: {
              en: "What can today's quantum computers actually do?",
              es: "¿Qué pueden hacer realmente las computadoras cuánticas de hoy?",
            },
            choices: [
              {
                en: "Run short programs as research instruments, not yet beat classical machines commercially",
                es: "Ejecutar programas cortos como instrumentos de investigación, sin superar aún a las clásicas comercialmente",
              },
              {
                en: "Break RSA encryption already",
                es: "Romper ya el cifrado RSA",
              },
              {
                en: "Replace classical computers for most business tasks",
                es: "Reemplazar a las computadoras clásicas en la mayoría de las tareas empresariales",
              },
              {
                en: "Nothing at all — they are purely theoretical",
                es: "Nada en absoluto; son puramente teóricas",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "The honest position sits between hype and dismissal. These are real scientific instruments limited by noise, and the progress in error rates and error correction is genuine even though commercial usefulness has not arrived.",
              es: "La postura honesta está entre la exageración y el desdén. Son instrumentos científicos reales limitados por el ruido, y el progreso en tasas de error y corrección de errores es genuino aunque la utilidad comercial aún no haya llegado.",
            },
          },
          {
            prompt: {
              en: "Which quantum technology is already in real-world use today?",
              es: "¿Qué tecnología cuántica ya se usa en el mundo real hoy?",
            },
            choices: [
              {
                en: "Quantum sensing, for navigation, medical imaging, and geology",
                es: "Los sensores cuánticos, para navegación, imágenes médicas y geología",
              },
              {
                en: "Fault-tolerant quantum computers",
                es: "Computadoras cuánticas tolerantes a fallos",
              },
              {
                en: "Quantum computers running Shor's algorithm at scale",
                es: "Computadoras cuánticas ejecutando el algoritmo de Shor a gran escala",
              },
              {
                en: "None — all quantum technology is still experimental",
                es: "Ninguna; toda la tecnología cuántica sigue siendo experimental",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "Quantum sensing uses quantum effects for extraordinarily precise measurement rather than computation, and it is further along than quantum computing. Post-quantum cryptography is also deploying right now.",
              es: "Los sensores cuánticos usan efectos cuánticos para mediciones extraordinariamente precisas en lugar de cálculo, y están más avanzados que la computación cuántica. La criptografía poscuántica también se está implementando ahora mismo.",
            },
          },
          {
            prompt: {
              en: "How should you treat a specific prediction like \"quantum computers will break encryption in 15 years\"?",
              es: "¿Cómo debería tomar una predicción específica como \"las computadoras cuánticas romperán el cifrado en 15 años\"?",
            },
            choices: [
              {
                en: "With real skepticism — forecasts here have been wrong in both directions for decades",
                es: "Con verdadero escepticismo; los pronósticos aquí se han equivocado en ambas direcciones durante décadas",
              },
              {
                en: "As a reliable date to plan around precisely",
                es: "Como una fecha confiable para planificar con precisión",
              },
              {
                en: "As proof the whole field is overhyped",
                es: "Como prueba de que todo el campo está sobrevalorado",
              },
              {
                en: "As certainly too pessimistic",
                es: "Como algo seguramente demasiado pesimista",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "Estimates range from ten to thirty years, and the uncertainty is genuine. That is precisely why NIST standardized post-quantum cryptography early rather than waiting for a confident date.",
              es: "Las estimaciones van de diez a treinta años, y la incertidumbre es real. Por eso mismo el NIST estandarizó la criptografía poscuántica temprano en lugar de esperar una fecha segura.",
            },
          },
          {
            prompt: {
              en: "Course review: which pair correctly matches algorithm to impact?",
              es: "Repaso del curso: ¿qué par relaciona correctamente algoritmo e impacto?",
            },
            choices: [
              {
                en: "Grover's gives a square-root speedup; Shor's breaks RSA outright",
                es: "Grover da una aceleración de raíz cuadrada; Shor rompe RSA por completo",
              },
              {
                en: "Grover's breaks RSA; Shor's speeds up search",
                es: "Grover rompe RSA; Shor acelera la búsqueda",
              },
              {
                en: "Both break RSA equally well",
                es: "Ambos rompen RSA igual de bien",
              },
              {
                en: "Neither has any effect on encryption",
                es: "Ninguno tiene efecto sobre el cifrado",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "Grover's square-root speedup weakens symmetric encryption manageably — just double the key. Shor's exponential speedup destroys RSA entirely, which is why it triggered a worldwide standards migration.",
              es: "La aceleración de raíz cuadrada de Grover debilita el cifrado simétrico de forma manejable: basta duplicar la clave. La aceleración exponencial de Shor destruye RSA por completo, y por eso desencadenó una migración mundial de estándares.",
            },
          },
          {
            prompt: {
              en: "Course review: why is measurement the central challenge of quantum computing?",
              es: "Repaso del curso: ¿por qué la medición es el desafío central de la computación cuántica?",
            },
            choices: [
              {
                en: "It collapses superposition to one result, so algorithms must make the right answer likeliest",
                es: "Colapsa la superposición en un resultado, así que los algoritmos deben hacer más probable la respuesta correcta",
              },
              {
                en: "Measuring qubits takes an impractically long time",
                es: "Medir qubits toma un tiempo impracticablemente largo",
              },
              {
                en: "Measurements are frequently inaccurate",
                es: "Las mediciones son frecuentemente inexactas",
              },
              {
                en: "Only one qubit can be measured per program run",
                es: "Solo se puede medir un qubit por ejecución del programa",
              },
            ],
            correctIndex: 0,
            explanation: {
              en: "This ties the whole course together. Superposition holds many possibilities, but measurement returns just one — so interference must be arranged to cancel wrong answers and amplify the right one.",
              es: "Esto une todo el curso. La superposición contiene muchas posibilidades, pero la medición devuelve solo una, así que hay que organizar la interferencia para cancelar las respuestas equivocadas y amplificar la correcta.",
            },
          },
        ],
      },
    ],
  },
];

/* ----------------------------- Derived data ----------------------------- */

/* Every lesson in course order, each tagged with the unit it belongs to and
   its 1-based position. Lesson slugs are unique across the whole course, so
   a flat lookup is enough — no unit segment is needed in the URL. */
export const ALL_LESSONS = UNITS.flatMap((unit, unitIndex) =>
  unit.lessons.map((lesson, lessonIndex) => ({
    ...lesson,
    unitId: unit.id,
    unitTitle: unit.title,
    unitNumber: unitIndex + 1,
    lessonNumberInUnit: lessonIndex + 1,
  }))
).map((lesson, index) => ({ ...lesson, courseNumber: index + 1 }));

export const TOTAL_LESSONS = ALL_LESSONS.length;

const LESSON_BY_SLUG = Object.fromEntries(
  ALL_LESSONS.map((lesson) => [lesson.slug, lesson])
);

/* ------------------------------- Helpers -------------------------------- */

/* Returns undefined for an unknown slug — callers are expected to handle a
   miss (a stale bookmark shouldn't crash the lesson page). */
export function getLessonBySlug(slug) {
  return LESSON_BY_SLUG[slug];
}

export function getUnitForLesson(slug) {
  const lesson = LESSON_BY_SLUG[slug];
  if (!lesson) return undefined;
  return UNITS.find((unit) => unit.id === lesson.unitId);
}

/* Previous/next in course order, crossing unit boundaries. Either side is
   null at the ends of the course. */
export function getAdjacentLessons(slug) {
  const index = ALL_LESSONS.findIndex((lesson) => lesson.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? ALL_LESSONS[index - 1] : null,
    next: index < ALL_LESSONS.length - 1 ? ALL_LESSONS[index + 1] : null,
  };
}

export function getUnitById(unitId) {
  return UNITS.find((unit) => unit.id === unitId);
}

/* Total minutes of reading across the course, for the hub's overview line. */
export const TOTAL_MINUTES = ALL_LESSONS.reduce(
  (sum, lesson) => sum + (lesson.estimatedMinutes || 0),
  0
);
