export interface Hotspot {
  id: string;
  top: string; // Percentage value (e.g. "20%")
  left: string; // Percentage value
  label: string;
  description: string;
}

export interface TransitionStep {
  index: number;
  title: string;
  subtitle: string;
  image: string; // Can be a legacy path or a special key like 'svg:wrist_warmup'
  description: string;
  duration: string;
  actionInstruction: string;
  breathingGuidance: string; // Guía de respiración libre para cada fase del ejercicio
  ergonomicsTips: string[];
  hotspots: Hotspot[];
}

export interface Routine {
  id: string;
  name: string;
  targetArea: string;
  description: string;
  color: string;
  steps: TransitionStep[];
}

export const activeBreakRoutines: Routine[] = [
  {
    id: "respiracion",
    name: "Respiración Consciente",
    targetArea: "Relajación",
    description: "Pausa de respiración consciente para resetear el sistema nervioso, reducir la fatiga visual y reconectar con el cuerpo antes de continuar.",
    color: "#5a7a6a",
    steps: [
      {
        index: 0,
        title: "Inicio de pausa",
        subtitle: "Conexión y presencia",
        image: "video:/src/assets/videos/respiracion_inicial.mp4",
        description: "Adopte una postura erguida sobre la silla, relaje plenamente los brazos y mantenga sus ojos abiertos, con la mirada hacia el frente.",
        duration: "3 segundos",
        actionInstruction: "Siéntese erguido, apoye las manos sobre el escritorio y mire relajadamente al frente.",
        breathingGuidance: "Retén y mantén la postura inicial",
        ergonomicsTips: [
          "Pies apoyados completamente en el suelo.",
          "Hombros libres, alejados de las orejas.",
          "Columna erguida de forma natural, sin rigidez."
        ],
        hotspots: [
          {
            id: "resp_start",
            top: "25%",
            left: "50%",
            label: "Presencia Consciente",
            description: "El primer paso es reconocer el momento de pausa. Esta transición mental activa el sistema nervioso parasimpático."
          }
        ]
      },
      {
        index: 1,
        title: "Cierre de ojos",
        subtitle: "Desconexión visual",
        image: "video:/src/assets/videos/respiracion_inicial.mp4",
        description: "Cierre los ojos lentamente de manera consciente. Deje ir los estímulos visuales del monitor y ablande toda su expresión facial.",
        duration: "3 segundos",
        actionInstruction: "Cierre suavemente los ojos, relajando la frente, los párpados y la mandíbula.",
        breathingGuidance: "Sostén con una respiración constante",
        ergonomicsTips: [
          "Relaje la mandíbula, permita que los dientes se separen levemente.",
          "Libere la tensión de la frente y el entrecejo.",
          "Permita que los párpados caigan con total pesadez."
        ],
        hotspots: [
          {
            id: "resp_eyes",
            top: "20%",
            left: "50%",
            label: "Descanso Visual",
            description: "El cierre ocular reduce un 80% de la carga sensorial del cerebro, iniciando un estado de calma profunda."
          }
        ]
      },
      {
        index: 2,
        title: "Inhalación",
        subtitle: "Expansión torácica y abdominal",
        image: "video:/src/assets/videos/respiracion_inicial.mp4",
        description: "Inhale suavemente por la nariz de manera constante. Imagine que el aire fresco oxigena cada una de sus células.",
        duration: "4 segundos",
        actionInstruction: "Tome aire profundamente por la nariz, expandiendo el abdomen y la caja torácica.",
        breathingGuidance: "Inhala de forma pausada y eleva",
        ergonomicsTips: [
          "El abdomen debe expandirse antes que el pecho.",
          "La inhalación nasal filtra y calienta el aire.",
          "Lleve el aire hasta la parte más baja de los pulmones."
        ],
        hotspots: [
          {
            id: "resp_inhale",
            top: "40%",
            left: "50%",
            label: "Respiración Diafragmática",
            description: "La expansión abdominal activa el diafragma, el músculo respiratorio principal, maximizando el intercambio gaseoso."
          }
        ]
      },
      {
        index: 3,
        title: "Retención",
        subtitle: "Silencio y quietud interior",
        image: "video:/src/assets/videos/respiracion_inicial.mp4",
        description: "Retenga el aire cargado de vida de manera confortable. Permita que la quietud de este instante penetre en todo su sistema.",
        duration: "3 segundos",
        actionInstruction: "Sostenga la respiración con suavidad, experimentando el silencio absoluto.",
        breathingGuidance: "Retén y mantén la postura inicial",
        ergonomicsTips: [
          "La retención debe ser cómoda, sin esfuerzo.",
          "Permita que el oxígeno se distribuya en el torrente sanguíneo.",
          "Mantenga los hombros relajados durante la retención."
        ],
        hotspots: [
          {
            id: "resp_hold",
            top: "35%",
            left: "50%",
            label: "Absorción de Oxígeno",
            description: "La pausa respiratoria potencia la transferencia de oxígeno a los tejidos y activa el reflejo de calma del nervio vago."
          }
        ]
      },
      {
        index: 4,
        title: "Exhalación",
        subtitle: "Liberación y soltar la fatiga",
        image: "video:/src/assets/videos/respiracion_inicial.mp4",
        description: "Suelte el aire muy lentamente. Note sus hombros descender con total liviandad y cómo se disuelve todo rastro de prisa laboral.",
        duration: "5 segundos",
        actionInstruction: "Exhale largo y tendido, relajando los hombros por completo y soltando la fatiga.",
        breathingGuidance: "Exhala y suaviza el estiramiento",
        ergonomicsTips: [
          "La exhalación debe ser más larga que la inhalación.",
          "Imagine que suelta toda tensión acumulada con cada gramo de aire.",
          "Al terminar, abra los ojos suavemente y regrese al trabajo renovado."
        ],
        hotspots: [
          {
            id: "resp_exhale",
            top: "40%",
            left: "50%",
            label: "Liberación de Tensión",
            description: "La exhalación prolongada activa el nervio vago y reduce el cortisol, reestableciendo el equilibrio del sistema nervioso autónomo."
          }
        ]
      }
    ]
  },
  {
    id: "cervical",
    name: "Estiramiento cervical",
    targetArea: "Cervical y trapecio",
    description: "Libere la rigidez muscular en cuello y trapecio acumulada por sostener la vista fija en la pantalla.",
    color: "#30475c",
    steps: [
      {
        index: 0,
        title: "Postura de inicio",
        subtitle: "Alineación y reseteo inicial",
        image: "/src/assets/images/pose_start_1780271542525.png",
        description: "Siéntese de forma erguida de manera muy cómoda. Apoye los pies firmes sobre el suelo y deje sus hombros completamente relajados para prepararse.",
        duration: "3 segundos",
        actionInstruction: "Apoye ambas manos sobre el escritorio, mantenga la espalda recta y mire fijamente al frente.",
        breathingGuidance: "Retén y mantén la postura inicial",
        ergonomicsTips: [
          "Libere los hombros hacia abajo, alejándolos de la mandíbula.",
          "Asiente los pies firmes en el suelo para equilibrar el peso lumbar.",
          "Comience a respirar de manera pausada y lenta para centrar el cuerpo."
        ],
        hotspots: [
          {
            id: "eyes_start",
            top: "22%",
            left: "50%",
            label: "Mirada al frente",
            description: "Enfoque neutro inicial. Mantenga las cervicales alineadas con la columna."
          },
          {
            id: "shoulder_start",
            top: "44%",
            left: "32%",
            label: "Hombros Libres",
            description: "Déjelos caer de forma natural para eliminar la tensión del trapecio superior."
          }
        ]
      },
      {
        index: 1,
        title: "Estiramiento cervical izquierdo",
        subtitle: "Elongación suave del lado izquierdo del cuello",
        image: "/src/assets/images/pose_end_1780271591748.png",
        description: "Deje caer la oreja izquierda en dirección al hombro izquierdo aplicando el peso pasivo de la gravedad. Sienta el estiramiento placentero a lo largo de toda la zona lateral derecha.",
        duration: "15 segundos",
        actionInstruction: "Exhale y deje caer la oreja izquierda hacia su hombro izquierdo suavemente de manera progresiva.",
        breathingGuidance: "Sostiene relajando los hombros",
        ergonomicsTips: [
          "No aplique fuerza descendente, deje que el peso natural de la cabeza haga el trabajo.",
          "Mantenga los hombros abajo y centrados, evitando tensión.",
          "Disfrute de la descompresión muscular cervical lateral."
        ],
        hotspots: [
          {
            id: "neck_stretch_left",
            top: "28%",
            left: "48%",
            label: "Trapecio derecho elongado",
            description: "El músculo se estira de forma pasiva, aliviando la fatiga por posturas estáticas."
          }
        ]
      },
      {
        index: 2,
        title: "Estiramiento cervical derecho",
        subtitle: "Elongación suave del lado derecho del cuello",
        image: "/src/assets/images/pose_end_1780271591748.png",
        description: "Incline la oreja derecha hacia el hombro derecho con suavidad. Permita que el hombro izquierdo caiga voluntariamente para lograr un balance simétrico en el trapecio izquierdo.",
        duration: "15 segundos",
        actionInstruction: "Exhale y deje caer la oreja derecha hacia su hombro derecho suavemente para balancear el estiramiento.",
        breathingGuidance: "Sostiene relajando los hombros",
        ergonomicsTips: [
          "Evite rotar la cabeza; mantenga la alineación lateral pura.",
          "La respiración profunda ayuda a relajar las fibras musculares tensas.",
          "Respire con un ritmo continuo y pausado."
        ],
        hotspots: [
          {
            id: "neck_stretch_right",
            top: "28%",
            left: "52%",
            label: "Trapecio izquierdo elongado",
            description: "Se compensa la rigidez del lado opuesto, logrando un alivio cervical bilateral integro."
          }
        ]
      },
      {
        index: 3,
        title: "Postura de inicio nuevamente",
        subtitle: "Alineación y reseteo final",
        image: "/src/assets/images/pose_mid_1_1780271559237.png",
        description: "Regrese la cabeza a la posición vertical neutral de manera pausada. Cierre los ojos y asiente las manos, permitiendo que la energía circule renovada por toda la zona cervical.",
        duration: "10 segundos",
        actionInstruction: "Regrese suavemente a la postura neutra erguida, relaje los brazos y descanse.",
        breathingGuidance: "Sostén con una respiración constante",
        ergonomicsTips: [
          "Tómese su tiempo para reajustar la postura y no haga movimientos bruscos al salir.",
          "Sienta los hombros más livianos y relajados tras el ejercicio de pausa.",
          "Se ha restaurado el flujo circulatorio natural de la columna."
        ],
        hotspots: [
          {
            id: "neck_cleanse",
            top: "22%",
            left: "50%",
            label: "Alineamiento Restaurado",
            description: "Cervicales lubricadas y liberadas de la compresión causada por el sedentarismo."
          }
        ]
      }
    ]
  },
  {
    id: "rotacion",
    name: "Rotación cervical",
    targetArea: "Cervical y trapecio",
    description: "Ejercite la movilidad horizontal profunda para liberar tensiones de rotación del cuello y trapecio inferior.",
    color: "#4992a8",
    steps: [
      {
        index: 0,
        title: "Fase 1: Postura de inicio",
        subtitle: "Alineación y reseteo inicial",
        image: "/src/assets/images/inicial_5.png",
        description: "Siéntese erguido cómodamente, con los hombros relajados y mire fijo al frente para comenzar.",
        duration: "3 segundos",
        actionInstruction: "Coloque las manos en el escritorio, mantenga la columna recta y mire al frente.",
        breathingGuidance: "Retén y mantén la postura inicial",
        ergonomicsTips: [
          "Mantenga los hombros caídos de forma natural, sin tensión.",
          "Apoye los pies completamente en el suelo.",
          "Respire calmadamente para relajar el sistema nervioso."
        ],
        hotspots: [
          {
            id: "rot_start_focus",
            top: "22%",
            left: "50%",
            label: "Enfoque Neutro",
            description: "Cervicales preparadas en la línea media del tronco."
          }
        ]
      },
      {
        index: 1,
        title: "Rotación izquierda - Serie 1",
        subtitle: "Primer ciclo bilateral",
        image: "/src/assets/images/pose_rotacion_izq_1780281447889.png",
        description: "Gire la cabeza suavemente y de manera horizontal hacia el lado izquierdo. Sostenga por 5 segundos.",
        duration: "5 segundos",
        actionInstruction: "Rote la cabeza mirando sobre su hombro izquierdo sin forzar las vértebras.",
        breathingGuidance: "Sostén con una respiración constante",
        ergonomicsTips: [
          "Gire solo el cuello, conserve la espalda y los hómplatos orientados hacia el frente.",
          "Evite elevar los hombros hacia las orejas.",
          "La rotación debe ser cómoda y placentera."
        ],
        hotspots: [
          {
            id: "rot_left_1",
            top: "28%",
            left: "45%",
            label: "Rotación Máxima Izquierda",
            description: "Trabaja la elasticidad de los rotadores cervicales derechos."
          }
        ]
      },
      {
        index: 2,
        title: "Rotación derecha - Serie 1",
        subtitle: "Primer ciclo bilateral",
        image: "/src/assets/images/pose_rotacion_der_1780281464908.png",
        description: "Gire la cabeza horizontalmente de regreso y continúe el movimiento hacia el lado derecho. Sostenga por 5 segundos.",
        duration: "5 segundos",
        actionInstruction: "Rote la cabeza mirando sobre su hombro derecho buscando el mismo nivel de amplitud.",
        breathingGuidance: "Sostén con una respiración constante",
        ergonomicsTips: [
          "Pase de forma muy fluida y lenta de un extremo al otro.",
          "Sienta si hay diferencias en el rango de movimiento de ambos lados.",
          "No incline la cabeza, conserve la barbilla paralela."
        ],
        hotspots: [
          {
            id: "rot_right_1",
            top: "28%",
            left: "55%",
            label: "Rotación Máxima Derecha",
            description: "Alivia e incrementa el rango de movimiento de los rotadores izquierdos."
          }
        ]
      },
      {
        index: 3,
        title: "Rotación izquierda - Serie 2",
        subtitle: "Segundo ciclo bilateral",
        image: "/src/assets/images/pose_rotacion_izq_1780281447889.png",
        description: "Repita la rotación hacia el lado izquierdo, buscando sentir el incremento paulatino de flexibilidad.",
        duration: "5 segundos",
        actionInstruction: "Vuelva a girar la mirada al hombro izquierdo suavemente de forma horizontal.",
        breathingGuidance: "Sostén con una respiración constante",
        ergonomicsTips: [
          "Disfrute de la soltura cervical progresiva en el segundo ciclo.",
          "Coordine el giro con una exhalación suave."
        ],
        hotspots: [
          {
            id: "rot_left_2",
            top: "28%",
            left: "45%",
            label: "Segunda Elongación Izquierda",
            description: "La repetición rítmica ayuda a lubricar las articulaciones facetarias."
          }
        ]
      },
      {
        index: 4,
        title: "Rotación derecha - Serie 2",
        subtitle: "Segundo ciclo bilateral",
        image: "/src/assets/images/pose_rotacion_der_1780281464908.png",
        description: "Gire de forma coordinada de regreso hacia el lado derecho, aliviando la fatiga cervical.",
        duration: "5 segundos",
        actionInstruction: "Lleve la barbilla en dirección al hombro derecho nuevamente por 5 segundos.",
        breathingGuidance: "Sostén con una respiración constante",
        ergonomicsTips: [
          "Conserve los ojos abiertos para mejorar el control propioceptivo espacial.",
          "No aplique esfuerzos bruscos."
        ],
        hotspots: [
          {
            id: "rot_right_2",
            top: "28%",
            left: "55%",
            label: "Segunda Elongación Derecha",
            description: "Mejora el retorno circulatorio de las arterias vertebrales principales."
          }
        ]
      },
      {
        index: 5,
        title: "Rotación izquierda - Serie 3",
        subtitle: "Tercer ciclo bilateral",
        image: "/src/assets/images/pose_rotacion_izq_1780281447889.png",
        description: "Última rotación horizontal hacia el lado izquierdo para consolidar el rango ganado.",
        duration: "5 segundos",
        actionInstruction: "Lleve la mirada al izquierdo de manera natural y muy fluida.",
        breathingGuidance: "Sostén con una respiración constante",
        ergonomicsTips: [
          "La tensión acumulada en las escápulas comenzará a disiparse.",
          "Sienta la libertad de movimiento lograda."
        ],
        hotspots: [
          {
            id: "rot_left_3",
            top: "28%",
            left: "45%",
            label: "Tercera Elongación Izquierda",
            description: "Máxima relajación muscular del esplenio de la cabeza."
          }
        ]
      },
      {
        index: 6,
        title: "Rotación derecha - Serie 3",
        subtitle: "Tercer ciclo bilateral",
        image: "/src/assets/images/pose_rotacion_der_1780281464908.png",
        description: "Finalice la tercera rotación hacia la derecha, buscando completar el balance simétrico.",
        duration: "5 segundos",
        actionInstruction: "Gire la mirada al hombro derecho por última vez completando el ciclo.",
        breathingGuidance: "Sostén con una respiración constante",
        ergonomicsTips: [
          "Mantenga los omóplatos planos en su espalda.",
          "Sienta ambos lados con igual soltura y balance."
        ],
        hotspots: [
          {
            id: "rot_right_3",
            top: "28%",
            left: "55%",
            label: "Tercera Elongación Derecha",
            description: "Completitud y simetría articular lograda."
          }
        ]
      },
      {
        index: 7,
        title: "Postura de inicio nuevamente",
        subtitle: "Alineación y reseteo final",
        image: "/src/assets/images/pose_start_1780271542525.png",
        description: "Regrese la cabeza a la posición neutral central de manera pausada y descanse.",
        duration: "5 segundos",
        actionInstruction: "Regrese suavemente a la postura neutra erguida, relaje los brazos y descanse.",
        breathingGuidance: "Sostén con una respiración constante",
        ergonomicsTips: [
          "Tómese su tiempo al volver al centro para evitar mareos leves.",
          "Respire profundamente sintiendo las cervicales descomprimidas."
        ],
        hotspots: [
          {
            id: "rot_final_neutral",
            top: "22%",
            left: "50%",
            label: "Eje Central Restaurado",
            description: "Flujo sanguíneo estimulado y cuello libre de tensiones posturales."
          }
        ]
      }
    ]
  },
  {
    id: "toracica",
    name: "Estiramiento torácico",
    targetArea: "Dorsal y Tórax",
    description: "Estiramiento torácico activo con manos en nuca para revertir la cifosis de escritorio, activar romboides y expandir la cadena pectoral anterior.",
    color: "#4a6741",
    steps: [
      {
        index: 0,
        title: "Póngase en posición",
        subtitle: "Postura de inicio con manos en nuca",
        image: "/src/assets/images/posicion_1_estiramiento_toracico.png",
        description: "Siéntese o párese de forma erguida. Coloque sus dedos entrelazados detrás de la cabeza, mantenga los codos estirados hacia el exterior y la espalda bien erguida.",
        duration: "3 segundos",
        actionInstruction: "Coloque sus dedos entrelazados detrás de la cabeza. Mantenga los codos estirados hacia el exterior. La espalda debe permanecer bien erguida.",
        breathingGuidance: "Inhala de forma pausada y eleva",
        ergonomicsTips: [
          "Los dedos deben apoyarse en la nuca, no en el cráneo.",
          "Codos abiertos al máximo desde el inicio.",
          "Pies apoyados firmemente en el suelo."
        ],
        hotspots: [
          {
            id: "toracica_start",
            top: "28%",
            left: "50%",
            label: "Posición de Carga",
            description: "La apertura inicial de codos activa los romboides y prepara la cadena posterior para el estiramiento."
          }
        ]
      },
      {
        index: 1,
        title: "Extensión torácica",
        subtitle: "Apertura de pecho y aproximación escapular",
        image: "/src/assets/images/posicion_2_estiramiento_toracico.png",
        description: "Lleve los codos activamente hacia afuera y atrás, empujando suavemente los omóplatos para que el esternón y el pecho se expandan libremente hacia arriba y adelante.",
        duration: "10 segundos",
        actionInstruction: "Lleve los codos hacia afuera y atrás, empujando los omóplatos para que el pecho salga suavemente.",
        breathingGuidance: "Inhala hondo y expande el pecho",
        ergonomicsTips: [
          "El movimiento parte de los omóplatos, no de los brazos.",
          "No arquee en exceso la zona lumbar; aísle el movimiento en la dorsal alta.",
          "Sostenga la posición respirando de forma constante."
        ],
        hotspots: [
          {
            id: "toracica_extension",
            top: "35%",
            left: "50%",
            label: "Expansión Torácica",
            description: "Los romboides se contraen activamente aproximando las escápulas y abriendo el pectoral menor cronificado por la postura de pantalla."
          }
        ]
      },
      {
        index: 2,
        title: "Flexión y compensación",
        subtitle: "Estiramiento de espalda alta y compensación",
        image: "/src/assets/images/posicion_3_estiramiento_toracico.png",
        description: "Sosteniendo las manos en la cabeza, lleve los codos hacia adelante de forma suave hasta casi tocarlos. Acompañe inclinando la cabeza hacia abajo y hundiendo el pecho para estirar la espalda alta.",
        duration: "10 segundos",
        actionInstruction: "Sosteniendo las manos en la cabeza, lleve los codos hacia adelante hasta casi tocarlos, acompañados de inclinar la cabeza hacia abajo y hundiendo el pecho.",
        breathingGuidance: "Exhala y suaviza el estiramiento",
        ergonomicsTips: [
          "La flexión compensa la extensión previa, equilibrando la tensión muscular.",
          "Permita que el peso de los codos y la cabeza genere el estiramiento de forma pasiva.",
          "Exhale lentamente mientras hunde el pecho y el mentón baja."
        ],
        hotspots: [
          {
            id: "toracica_flexion",
            top: "32%",
            left: "50%",
            label: "Estiramiento Dorsal Alto",
            description: "La flexión cervical y torácica combinada estira el trapecio medio, el romboides y los extensores de la columna dorsal."
          }
        ]
      }
    ]
  },
  {
    id: "triceps",
    name: "Estiramiento de Tríceps",
    targetArea: "Brazo y Hombro",
    description: "Estiramiento bilateral del tríceps para liberar la tensión acumulada en la parte posterior del brazo y el hombro por el uso prolongado del teclado y el mouse.",
    color: "#3d6b8f",
    steps: [
      {
        index: 0,
        title: "Póngase en posición",
        subtitle: "Postura de inicio",
        image: "/src/assets/images/postura_inicial.png",
        description: "Siéntese de forma erguida con los hombros relajados y la vista al frente antes de iniciar el estiramiento del tríceps.",
        duration: "3 segundos",
        actionInstruction: "Adopte una postura erguida, mantenga la espalda recta y relaje los hombros.",
        breathingGuidance: "Retén y mantén la postura inicial",
        ergonomicsTips: [
          "Pies apoyados firmemente en el suelo.",
          "Hombros caídos de forma natural, sin tensión.",
          "Columna erguida sin rigidez."
        ],
        hotspots: [
          {
            id: "triceps_start",
            top: "28%",
            left: "50%",
            label: "Postura Neutra",
            description: "La alineación correcta de partida garantiza que el estiramiento se aísle en el tríceps sin compensaciones cervicales."
          }
        ]
      },
      {
        index: 1,
        title: "Brazo Derecho F2",
        subtitle: "Estiramiento tríceps derecho",
        image: "/src/assets/images/triceps_derecho.png",
        description: "Lleve el brazo derecho flexionado por encima y detrás de la cabeza, mientras que la mano contraria ejerce una ligera tracción lateral hacia la izquierda sobre su codo derecho.",
        duration: "15 segundos",
        actionInstruction: "Flexione el brazo derecho por detrás de la cabeza, con la mano izquierda agarre el codo y llévelo hacia abajo.",
        breathingGuidance: "Sostiene relajando los hombros",
        ergonomicsTips: [
          "No eleve el hombro del brazo estirado.",
          "La tracción debe ser suave y progresiva.",
          "Mantenga el cuello relajado y la vista al frente."
        ],
        hotspots: [
          {
            id: "triceps_right",
            top: "30%",
            left: "55%",
            label: "Tríceps Derecho",
            description: "La elongación del tríceps braquial alivia la tensión acumulada por el uso repetitivo del mouse y teclado."
          }
        ]
      },
      {
        index: 2,
        title: "Brazo Izquierdo F3",
        subtitle: "Estiramiento tríceps izquierdo",
        image: "/src/assets/images/triceps_izquierdo.png",
        description: "Lleve el brazo izquierdo flexionado por encima y detrás de la cabeza, mientras que la mano derecha ejerce una ligera tracción lateral hacia la derecha sobre su codo izquierdo.",
        duration: "15 segundos",
        actionInstruction: "Flexione el brazo izquierdo por detrás de la cabeza, con la mano derecha agarre el codo y llévelo hacia abajo.",
        breathingGuidance: "Sostiene relajando los hombros",
        ergonomicsTips: [
          "Repita el mismo nivel de intensidad que en el brazo derecho.",
          "La simetría bilateral previene desequilibrios musculares.",
          "Exhale suavemente mientras sostiene la tracción."
        ],
        hotspots: [
          {
            id: "triceps_left",
            top: "30%",
            left: "45%",
            label: "Tríceps Izquierdo",
            description: "El estiramiento bilateral completa la descompresión posterior del brazo, recuperando la extensibilidad del tríceps."
          }
        ]
      }
    ]
  },
  {
    id: "elongacion_triceps",
    name: "Elongación de Tríceps",
    targetArea: "Brazo y Hombro",
    description: "Estiramiento cruzado del brazo para liberar la tensión del deltoides posterior y el tríceps mediante tracción horizontal hacia el pecho.",
    color: "#5c6b8f",
    steps: [
      {
        index: 0,
        title: "Póngase en posición",
        subtitle: "Postura de inicio",
        image: "/src/assets/images/inicial_6.png",
        description: "Siéntese de forma erguida con los hombros relajados y la vista al frente antes de iniciar la elongación.",
        duration: "3 segundos",
        actionInstruction: "Adopte una postura erguida, mantenga la espalda recta y relaje los hombros.",
        breathingGuidance: "Retén y mantén la postura inicial",
        ergonomicsTips: [
          "Pies apoyados firmemente en el suelo.",
          "Hombros caídos de forma natural, sin tensión.",
          "Columna erguida sin rigidez."
        ],
        hotspots: [
          {
            id: "elongacion_start",
            top: "28%",
            left: "50%",
            label: "Postura Neutra",
            description: "La alineación correcta de partida garantiza el aislamiento del estiramiento en el deltoides posterior."
          }
        ]
      },
      {
        index: 1,
        title: "Brazo Derecho F2",
        subtitle: "Elongación deltoides derecho",
        image: "/src/assets/images/tricep_2_der.png",
        description: "Estire y cruce el brazo derecho de frente por el pecho. Con la mano o antebrazo izquierdo, sujete el brazo y ejerza una ligera tracción hacia el pecho.",
        duration: "10 segundos",
        actionInstruction: "Cruce el brazo horizontalmente por delante y sostenga desde el codo con la mano contraria, hacia ti.",
        breathingGuidance: "Sostiene relajando los hombros",
        ergonomicsTips: [
          "Mantenga el codo del brazo cruzado a la altura del hombro.",
          "No eleve el hombro durante la tracción.",
          "Exhale suavemente mientras sostiene el estiramiento."
        ],
        hotspots: [
          {
            id: "elongacion_right",
            top: "32%",
            left: "55%",
            label: "Deltoides Posterior Derecho",
            description: "El cruce horizontal libera la tensión del deltoides posterior y el manguito rotador acumulada por el uso del mouse."
          }
        ]
      },
      {
        index: 2,
        title: "Brazo Izquierdo F3",
        subtitle: "Elongación deltoides izquierdo",
        image: "/src/assets/images/tricep_2_izq.png",
        description: "Estire y cruce el brazo izquierdo de frente por el pecho. Con la mano o antebrazo derecho, sujete el brazo y ejerza una ligera tracción hacia el pecho.",
        duration: "10 segundos",
        actionInstruction: "Cruce el brazo izquierdo horizontalmente por delante y sostenga desde el codo con la mano derecha, hacia ti.",
        breathingGuidance: "Sostiene relajando los hombros",
        ergonomicsTips: [
          "Repita la misma intensidad que en el brazo derecho.",
          "La simetría bilateral previene desequilibrios posturales.",
          "Exhale suavemente mientras sostiene la tracción."
        ],
        hotspots: [
          {
            id: "elongacion_left",
            top: "32%",
            left: "45%",
            label: "Deltoides Posterior Izquierdo",
            description: "Completa la descompresión bilateral del complejo deltoides posterior, recuperando el rango de movimiento articular del hombro."
          }
        ]
      }
    ]
  },
  {
    id: "muneca_codo",
    name: "Estiramiento de Muñeca a Codo",
    targetArea: "Muñeca y Antebrazo",
    description: "Estiramiento bilateral de extensores y flexores del antebrazo para descomprimir la zona carpiana y prevenir la fatiga tendinosa por uso prolongado del teclado y mouse.",
    color: "#6b5c3e",
    steps: [
      {
        index: 0,
        title: "Póngase en posición",
        subtitle: "Postura de inicio",
        image: "/src/assets/images/postura_inicial.png",
        description: "Siéntese de forma erguida con los hombros relajados y la vista al frente antes de iniciar el estiramiento.",
        duration: "3 segundos",
        actionInstruction: "Adopte una postura erguida, mantenga la espalda recta y relaje los hombros.",
        breathingGuidance: "Retén y mantén la postura inicial",
        ergonomicsTips: [
          "Pies apoyados firmemente en el suelo.",
          "Hombros caídos de forma natural, sin tensión.",
          "Columna erguida sin rigidez."
        ],
        hotspots: [
          {
            id: "muneca_start",
            top: "28%",
            left: "50%",
            label: "Postura Neutra",
            description: "La alineación correcta de partida permite aislar el estiramiento en la cadena extensora y flexora del antebrazo."
          }
        ]
      },
      {
        index: 1,
        title: "Extensores Brazo Derecho",
        subtitle: "Elongación extensores derecho",
        image: "/src/assets/images/extensor_der.png",
        description: "Estire el brazo derecho al frente con la palma hacia abajo. Con la mano izquierda, sujete los dedos derechos y llévelos hacia abajo, sintiendo la tensión en la cara superior del antebrazo.",
        duration: "15 segundos",
        actionInstruction: "Estire el brazo hacia delante, coloca la palma hacia abajo y con la otra acompaña el movimiento.",
        breathingGuidance: "Sostiene relajando los hombros",
        ergonomicsTips: [
          "Mantenga el codo completamente extendido.",
          "La presión debe ser suave y progresiva.",
          "Exhale al llevar los dedos hacia abajo."
        ],
        hotspots: [
          {
            id: "extensor_right",
            top: "45%",
            left: "55%",
            label: "Extensores Antebrazo Derecho",
            description: "Alivia la tensión acumulada en el músculo extensor común de los dedos por el uso repetitivo del teclado."
          }
        ]
      },
      {
        index: 2,
        title: "Extensores Brazo Izquierdo",
        subtitle: "Elongación extensores izquierdo",
        image: "/src/assets/images/extensor_izq.png",
        description: "Estire el brazo izquierdo al frente con la palma hacia abajo. Con la mano derecha, sujete los dedos izquierdos y llévelos hacia abajo, sintiendo la tensión en la cara superior del antebrazo.",
        duration: "15 segundos",
        actionInstruction: "Estire el brazo izquierdo hacia delante, coloca la palma hacia abajo y con la otra acompaña el movimiento.",
        breathingGuidance: "Sostiene relajando los hombros",
        ergonomicsTips: [
          "Repita la misma intensidad que en el brazo derecho.",
          "La simetría bilateral previene desequilibrios tendinosos.",
          "Exhale suavemente durante la tracción."
        ],
        hotspots: [
          {
            id: "extensor_left",
            top: "45%",
            left: "45%",
            label: "Extensores Antebrazo Izquierdo",
            description: "Completa la elongación bilateral de los extensores del carpo, reduciendo el riesgo de epicondilitis."
          }
        ]
      },
      {
        index: 3,
        title: "Flexores Brazo Derecho",
        subtitle: "Elongación flexores derecho",
        image: "/src/assets/images/flexor_der.png",
        description: "Estire el brazo derecho al frente con la palma hacia arriba. Con la mano izquierda, sujete los dedos derechos y llévelos hacia abajo, sintiendo la tensión en la cara inferior del antebrazo.",
        duration: "15 segundos",
        actionInstruction: "Estire el brazo hacia delante, coloca la palma hacia arriba y con la otra acompaña el movimiento.",
        breathingGuidance: "Sostiene relajando los hombros",
        ergonomicsTips: [
          "Mantenga el codo completamente extendido.",
          "La presión sobre los dedos debe ser suave.",
          "Exhale al llevar los dedos hacia abajo."
        ],
        hotspots: [
          {
            id: "flexor_right",
            top: "45%",
            left: "55%",
            label: "Flexores Antebrazo Derecho",
            description: "Descomprime el túnel carpiano aliviando la presión sobre el nervio mediano generada por la flexión repetitiva del mouse."
          }
        ]
      },
      {
        index: 4,
        title: "Flexores Brazo Izquierdo",
        subtitle: "Elongación flexores izquierdo",
        image: "/src/assets/images/flexor_izq.png",
        description: "Estire el brazo izquierdo al frente con la palma hacia arriba. Con la mano derecha, sujete los dedos izquierdos y llévelos hacia abajo, sintiendo la tensión en la cara inferior del antebrazo.",
        duration: "15 segundos",
        actionInstruction: "Estire el brazo izquierdo hacia delante, coloca la palma hacia arriba y con la otra acompaña el movimiento.",
        breathingGuidance: "Sostiene relajando los hombros",
        ergonomicsTips: [
          "Repita la misma intensidad que en el brazo derecho.",
          "Complete la elongación bilateral de los flexores.",
          "Exhale suavemente durante la tracción."
        ],
        hotspots: [
          {
            id: "flexor_left",
            top: "45%",
            left: "45%",
            label: "Flexores Antebrazo Izquierdo",
            description: "Completa la descompresión bilateral de la cadena flexora, previniendo la tendinitis del carpo."
          }
        ]
      }
    ]
  },
  {
    id: "rotacion_tronco",
    name: "Rotación de Tronco",
    targetArea: "Espalda y Piernas",
    description: "Rotación bilateral del tronco sentado para liberar la tensión de la columna torácica y lumbar acumulada por la postura estática prolongada.",
    color: "#5a4a6b",
    steps: [
      {
        index: 0,
        title: "Póngase en posición",
        subtitle: "Postura de inicio",
        image: "/src/assets/images/inicial_2.png",
        description: "Siéntese de forma erguida con los pies apoyados en el suelo y los hombros relajados antes de iniciar la rotación de tronco.",
        duration: "3 segundos",
        actionInstruction: "Adopte una postura erguida, mantenga la espalda recta y apoye ambos pies firmemente en el suelo.",
        breathingGuidance: "Retén y mantén la postura inicial",
        ergonomicsTips: [
          "Pies apoyados firmemente en el suelo al ancho de caderas.",
          "Hombros caídos de forma natural, sin tensión.",
          "Columna erguida, sin apoyarse en el respaldo."
        ],
        hotspots: [
          {
            id: "tronco_start",
            top: "28%",
            left: "50%",
            label: "Postura Neutra",
            description: "La posición de partida erguida maximiza el rango de rotación torácica disponible."
          }
        ]
      },
      {
        index: 1,
        title: "Rotación Derecha",
        subtitle: "Torsión de columna hacia la derecha",
        image: "/src/assets/images/torsion_columna_der.png",
        description: "Cruce la pierna derecha sobre la izquierda. Gire suavemente el tronco y la cabeza hacia la derecha, sujetando el respaldo o apoyabrazos de la silla con la mano derecha para profundizar el estiramiento.",
        duration: "10 segundos",
        actionInstruction: "Cruce la pierna derecha sobre la izquierda y gire el cuerpo y cabeza hacia el lado derecho.",
        breathingGuidance: "Exhala y suaviza el estiramiento",
        ergonomicsTips: [
          "El giro parte desde la zona lumbar y sube progresivamente hacia la dorsal.",
          "No fuerze la rotación, deje que la respiración profundice el movimiento.",
          "Mantenga ambos glúteos apoyados en el asiento."
        ],
        hotspots: [
          {
            id: "tronco_right",
            top: "35%",
            left: "55%",
            label: "Rotación Torácica Derecha",
            description: "La torsión espinal libera la compresión de las articulaciones facetarias y activa los músculos rotadores profundos de la columna."
          }
        ]
      },
      {
        index: 2,
        title: "Rotación Izquierda",
        subtitle: "Torsión de columna hacia la izquierda",
        image: "/src/assets/images/torsion_columna_izq.png",
        description: "Cruce la pierna izquierda sobre la derecha. Gire suavemente el tronco y la cabeza hacia la izquierda, sujetando el respaldo o apoyabrazos de la silla con la mano izquierda para profundizar el estiramiento.",
        duration: "10 segundos",
        actionInstruction: "Cruce la pierna izquierda sobre la derecha y gire el cuerpo y cabeza hacia el lado izquierdo.",
        breathingGuidance: "Exhala y suaviza el estiramiento",
        ergonomicsTips: [
          "Repita la misma amplitud de giro que en el lado derecho.",
          "La simetría bilateral equilibra la tensión de los rotadores espinales.",
          "Exhale profundamente para ganar rango de rotación."
        ],
        hotspots: [
          {
            id: "tronco_left",
            top: "35%",
            left: "45%",
            label: "Rotación Torácica Izquierda",
            description: "Completa la movilización bilateral de la columna, restaurando la elasticidad de los ligamentos intervertebrales."
          }
        ]
      }
    ]
  },
  {
    id: "piriforme",
    name: "Estiramiento piriforme",
    targetArea: "Espalda y Piernas",
    description: "Estiramiento bilateral del músculo piriforme y glúteo profundo en posición sentada, aliviando la tensión de la cadera acumulada por la postura prolongada.",
    color: "#3e6b5a",
    steps: [
      {
        index: 0,
        title: "Póngase en posición",
        subtitle: "Postura de inicio",
        image: "/src/assets/images/pose_start_1780271542525.png",
        description: "Siéntese de forma erguida con los pies apoyados en el suelo y los hombros relajados antes de iniciar el estiramiento del piriforme.",
        duration: "3 segundos",
        actionInstruction: "Adopte una postura erguida, mantenga la espalda recta y apoye ambos pies firmemente en el suelo.",
        breathingGuidance: "Retén y mantén la postura inicial",
        ergonomicsTips: [
          "Pies apoyados firmemente en el suelo al ancho de caderas.",
          "Hombros caídos de forma natural, sin tensión.",
          "Columna erguida, sin apoyarse en el respaldo."
        ],
        hotspots: [
          {
            id: "piriforme_start",
            top: "28%",
            left: "50%",
            label: "Postura Neutra",
            description: "La posición de partida erguida estabiliza la pelvis y maximiza el rango de apertura de cadera disponible."
          }
        ]
      },
      {
        index: 1,
        title: "Pierna Derecha",
        subtitle: "Estiramiento del piriforme derecho",
        image: "/src/assets/images/cuadricep_posterior_der.png",
        description: "Cruce el tobillo derecho sobre la rodilla izquierda, formando un número cuatro. Presione suavemente hacia abajo sobre la rodilla derecha si desea intensificar el estiramiento o agregando una inclinación de tronco.",
        duration: "15 segundos",
        actionInstruction: "Cruce el tobillo sobre la rodilla contraria y mantenga la postura por 15 segundos. Agregando una inclinación hacia adelante.",
        breathingGuidance: "Exhala y suaviza el estiramiento",
        ergonomicsTips: [
          "Forme un número cuatro apoyando el tobillo derecho sobre la rodilla izquierda.",
          "Presione suavemente la rodilla derecha hacia abajo para profundizar.",
          "Incline el tronco hacia adelante con la espalda recta para intensificar."
        ],
        hotspots: [
          {
            id: "piriforme_right",
            top: "55%",
            left: "45%",
            label: "Piriforme Derecho",
            description: "La posición en cuatro abre la cadera y elonga el piriforme y los rotadores profundos del glúteo derecho."
          }
        ]
      },
      {
        index: 2,
        title: "Pierna Izquierda",
        subtitle: "Estiramiento del piriforme izquierdo",
        image: "/src/assets/images/cuadricep_posterior_izq.png",
        description: "Cruce el tobillo izquierdo sobre la rodilla derecha, formando un número cuatro. Presione suavemente hacia abajo sobre la rodilla izquierda si desea intensificar el estiramiento o agregando una inclinación de tronco.",
        duration: "15 segundos",
        actionInstruction: "Cruce el tobillo sobre la rodilla contraria y mantenga la postura por 15 segundos. Agregando una inclinación hacia adelante.",
        breathingGuidance: "Exhala y suaviza el estiramiento",
        ergonomicsTips: [
          "Forme un número cuatro apoyando el tobillo izquierdo sobre la rodilla derecha.",
          "Presione suavemente la rodilla izquierda hacia abajo para profundizar.",
          "Repita la misma amplitud e inclinación que en el lado derecho."
        ],
        hotspots: [
          {
            id: "piriforme_left",
            top: "55%",
            left: "55%",
            label: "Piriforme Izquierdo",
            description: "Completa la movilización bilateral de la cadera, equilibrando la flexibilidad de ambos glúteos profundos."
          }
        ]
      }
    ]
  },
  {
    id: "bajando_tierra",
    name: "Bajando a tierra",
    targetArea: "Espalda y Relajación",
    description: "Flexión completa del tronco hacia adelante en posición sentada para descomprimir la columna y liberar la tensión acumulada de la espalda y el cuello.",
    color: "#4a5a6b",
    steps: [
      {
        index: 0,
        title: "Póngase en posición",
        subtitle: "Postura de inicio",
        image: "/src/assets/images/inicial_4.png",
        description: "Siéntese de forma erguida con los pies apoyados en el suelo y las rodillas ligeramente separadas antes de dejar caer el tronco.",
        duration: "3 segundos",
        actionInstruction: "Adopte una postura erguida, mantenga la espalda recta y apoye ambos pies firmemente en el suelo.",
        breathingGuidance: "Retén y mantén la postura inicial",
        ergonomicsTips: [
          "Pies apoyados firmemente en el suelo al ancho de caderas.",
          "Rodillas ligeramente separadas para dejar espacio al tronco.",
          "Columna erguida, sin apoyarse en el respaldo."
        ],
        hotspots: [
          {
            id: "bajando_start",
            top: "28%",
            left: "50%",
            label: "Postura Neutra",
            description: "La posición de partida erguida prepara la columna para una flexión segura y controlada hacia adelante."
          }
        ]
      },
      {
        index: 1,
        title: "Descenso del tronco",
        subtitle: "Flexión completa hacia adelante",
        image: "/src/assets/images/estiramiento_completo.png",
        description: "Deje caer el torso con suavidad sobre los muslos, permitiendo que la cabeza y los brazos cuelguen libremente hacia el suelo.",
        duration: "15 segundos",
        actionInstruction: "Exhale lentamente y deje caer todo el peso del tronco hacia adelante entre sus rodillas, estirando los brazos hacia abajo por 15 segundos.",
        breathingGuidance: "Exhala y suelta el peso del tronco",
        ergonomicsTips: [
          "Deje que la cabeza y el cuello cuelguen relajados, sin tensión.",
          "Permita que los brazos caigan libremente hacia el suelo.",
          "Suelte el peso del tronco con cada exhalación, sin forzar."
        ],
        hotspots: [
          {
            id: "bajando_full",
            top: "60%",
            left: "50%",
            label: "Descompresión Espinal",
            description: "La flexión completa con gravedad descomprime las vértebras y elonga toda la cadena posterior de la espalda y el cuello."
          }
        ]
      }
    ]
  }
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const stretchFaq: FaqItem[] = [
  {
    question: "¿Con qué frecuencia se debe realizar?",
    answer: "Se recomienda efectuar esta pausa activa cada 2 horas de trabajo continuo frente a una pantalla, o bien ante las primeras manifestaciones de fatiga o rigidez en el área de los hombros."
  },
  {
    question: "¿Puedo lastimarme las cervicales?",
    answer: "Solo si ejerce tirones bruscos. Por ello el peso de la mano debe ser pasivo, sirviendo únicamente como guía de gravedad. La respiración y el tiempo son los encargados de elastizar el tejido, no el exceso de fuerza manual."
  },
  {
    question: "¿Cuánto debe durar cada fase?",
    answer: "Las transiciones (cuando movemos el brazo) deben ser de 3 a 5 segundos de forma súper lenta, y sostener la elongación del cuello al final durante por lo menos 15 a 30 segundos de cada lado."
  }
];
