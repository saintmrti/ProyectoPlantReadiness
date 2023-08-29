export const expectativas = [
  {
    id: 1,
    nombre: "Todos los nuevos procesos incluidos perifericos",
    evidencia: "Documento",
    prioridad: "P1",
    ponderacion: "1",
    comentarios:
      "Se finalizo el formato para el llenado, en espera de validar la forma de aplicar y realizar el proceso con gerencia de UEN Energia, dar de alta formato en control de documentos.",
  },
  {
    id: 2,
    nombre: "Manejo de materiales",
    evidencia: "Documento",
    prioridad: "P1",
    ponderacion: "1",
    comentarios:
      "Cotización para realizar estudio, contacto con Baldemar para la persona que realizo el analisis en multipak. En espera de la actualización de la propuesta economica.",
  },
  {
    id: 3,
    nombre: "Documento de IPERCON",
    evidencia: "Documento",
    prioridad: "P1",
    ponderacion: "2",
    comentarios:
      "Carga de  informarción pasar el formato de IPERCON FSEG 023, finalizando el ART.",
  },
];

export const avanceEntrable = [
  {
    1: {
      id: 1,
      idGrupo: 1,
      idMaquina: 1,
      responsable: "Juan Perez",
      fecha_inicio: "2021-01-01",
      fecha_termino: "2021-01-01",
      fecha_real: "2021-01-01",
      avance: "100",
      comentarios: "",
    },
    2: {
      id: 2,
      idGrupo: 1,
      idMaquina: 2,
      responsable: "Juan Perez",
      fecha_inicio: "2021-01-01",
      fecha_termino: "2021-01-01",
      fecha_real: "2021-01-01",
      avance: "100",
      comentarios: "",
    },
  },
];

export const fases = [
  {
    id: 1,
    idMaquina: 1,
    idGrupo: 1,
    fase: "Fase 1",
    maquina: "Extruder 4.5",
  },
  {
    id: 2,
    idMaquina: 2,
    idGrupo: 1,
    fase: "Fase 1",
    maquina: "Buncher 1800",
  },
  {
    id: 3,
    idMaquina: 3,
    idGrupo: 1,
    fase: "Fase 1",
    maquina: "B T 3+1",
  },
  {
    id: 4,
    idMaquina: 4,
    idGrupo: 1,
    fase: "Fase 1",
    maquina: "MSM86",
  },
  {
    id: 5,
    idMaquina: 5,
    idGrupo: 1,
    fase: "Fase 1",
    maquina: "Cableadora C.",
  },
  {
    id: 6,
    idMaquina: 6,
    idGrupo: 1,
    fase: "Fase 1",
    maquina: "X Compound",
  },
  {
    id: 7,
    idMaquina: 7,
    idGrupo: 1,
    fase: "Fase 1",
    maquina: "P. Electricas",
  },
  {
    id: 8,
    idMaquina: 8,
    idGrupo: 1,
    fase: "Fase 1",
    maquina: "Med 2da mano",
  },
  {
    id: 9,
    idMaquina: 9,
    idGrupo: 1,
    fase: "Fase 1",
    maquina: "Coiler 2da mano",
  },
  {
    id: 10,
    idMaquina: 10,
    idGrupo: 1,
    fase: "Fase 1",
    maquina: "Tulsa Power",
  },
  {
    id: 11,
    idMaquina: 11,
    idGrupo: 1,
    fase: "Fase 1",
    maquina: "Caballe",
  },
];

export const maquinas = [
  {
    id: 1,
    name: "General",
    seguridad: {
      real: 38,
      plan: 29,
    },
    calidad: {
      real: 38,
      plan: 45,
    },
    rh: {
      real: 63,
      plan: 43,
    },
    produccion: {
      real: 33,
      plan: 45,
    },
    mantenimiento: {
      real: 47,
      plan: 50,
    },
  },
  {
    id: 2,
    name: "Fase 1",
    seguridad: {
      real: 46,
      plan: 42,
    },
    calidad: {
      real: 50,
      plan: 54,
    },
    rh: {
      real: 55,
      plan: 61,
    },
    produccion: {
      real: 41,
      plan: 53,
    },
    mantenimiento: {
      real: 45,
      plan: 57,
    },
  },
  {
    id: 3,
    name: "BT 3+1",
    seguridad: {
      real: 18,
      plan: 18,
    },
    calidad: {
      real: 31,
      plan: 0,
    },
    rh: {
      real: 61,
      plan: 55,
    },
    produccion: {
      real: 41,
      plan: 53,
    },
    mantenimiento: {
      real: 45,
      plan: 57,
    },
  },
  {
    id: 4,
    name: "Buncher 1800",
    seguridad: {
      real: 18,
      plan: 18,
    },
    calidad: {
      real: 31,
      plan: 0,
    },
    rh: {
      real: 61,
      plan: 55,
    },
    produccion: {
      real: 41,
      plan: 53,
    },
    mantenimiento: {
      real: 45,
      plan: 57,
    },
  },
  {
    id: 5,
    name: "Extruder 4.5",
    seguridad: {
      real: 18,
      plan: 18,
    },
    calidad: {
      real: 31,
      plan: 0,
    },
    rh: {
      real: 61,
      plan: 55,
    },
    produccion: {
      real: 41,
      plan: 53,
    },
    mantenimiento: {
      real: 45,
      plan: 57,
    },
  },
  {
    id: 6,
    name: "MSM86",
    seguridad: {
      real: 18,
      plan: 18,
    },
    calidad: {
      real: 31,
      plan: 0,
    },
    rh: {
      real: 61,
      plan: 55,
    },
    produccion: {
      real: 41,
      plan: 53,
    },
    mantenimiento: {
      real: 45,
      plan: 57,
    },
  },
  {
    id: 7,
    name: "Cableadora C.",
    seguridad: {
      real: 18,
      plan: 18,
    },
    calidad: {
      real: 31,
      plan: 0,
    },
    rh: {
      real: 61,
      plan: 55,
    },
    produccion: {
      real: 41,
      plan: 53,
    },
    mantenimiento: {
      real: 45,
      plan: 57,
    },
  },
  {
    id: 8,
    name: "X Compound",
    seguridad: {
      real: 18,
      plan: 18,
    },
    calidad: {
      real: 31,
      plan: 0,
    },
    rh: {
      real: 61,
      plan: 55,
    },
    produccion: {
      real: 41,
      plan: 53,
    },
    mantenimiento: {
      real: 45,
      plan: 57,
    },
  },
  {
    id: 9,
    name: "P. Electricas",
    seguridad: {
      real: 18,
      plan: 18,
    },
    calidad: {
      real: 31,
      plan: 0,
    },
    rh: {
      real: 61,
      plan: 55,
    },
    produccion: {
      real: 41,
      plan: 53,
    },
    mantenimiento: {
      real: 45,
      plan: 57,
    },
  },
  {
    id: 10,
    name: "Fase 2",
    seguridad: {
      real: 18,
      plan: 18,
    },
    calidad: {
      real: 31,
      plan: 0,
    },
    rh: {
      real: 61,
      plan: 55,
    },
    produccion: {
      real: 41,
      plan: 53,
    },
    mantenimiento: {
      real: 45,
      plan: 57,
    },
  },
  {
    id: 11,
    name: "Med 2da mano",
    seguridad: {
      real: 18,
      plan: 18,
    },
    calidad: {
      real: 31,
      plan: 0,
    },
    rh: {
      real: 61,
      plan: 55,
    },
    produccion: {
      real: 41,
      plan: 53,
    },
    mantenimiento: {
      real: 45,
      plan: 57,
    },
  },
  {
    id: 12,
    name: "Coiler 2da mano",
    seguridad: {
      real: 18,
      plan: 18,
    },
    calidad: {
      real: 31,
      plan: 0,
    },
    rh: {
      real: 61,
      plan: 55,
    },
    produccion: {
      real: 41,
      plan: 53,
    },
    mantenimiento: {
      real: 45,
      plan: 57,
    },
  },
  {
    id: 13,
    name: "Est. Gruesa",
    seguridad: {
      real: 18,
      plan: 18,
    },
    calidad: {
      real: 31,
      plan: 0,
    },
    rh: {
      real: 61,
      plan: 55,
    },
    produccion: {
      real: 41,
      plan: 53,
    },
    mantenimiento: {
      real: 45,
      plan: 57,
    },
  },
];
