import { Product } from "./types";
import copaiboRecipeImg from "../assets/copaibo_recipe.png";
import guapuruRecipeImg from "../assets/guapuru_recipe.jpg";
import pesoeRecipeImg from "../assets/pesoe_recipe.png";
import achachairuRecipeImg from "../assets/achachairu_recipe.png";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "almendra-chiquitana",
    name: "Almendra Chiquitana",
    scientificName: "Dipteryx alata",
    description: "Conocida localmente como mupu, es el fruto seco emblemático de la Chiquitania. Crece de manera silvestre en el árbol del almendro. Posee un sabor tostado único que recuerda al cacao, maní y café, con un alto valor proteico y nutricional.",
    characteristics: [
      "Alto contenido de proteínas y fibra.",
      "Excelente fuente de ácidos grasos esenciales (Omega 6 y 9).",
      "Sabor intenso y textura sumamente crujiente al tostarse.",
      "Aprovechada un 100% (cáscara para carbón, semilla para gastronomía y aceites)."
    ],
    category: "Semilla/Nuez",
    seasonMonths: [8, 9, 10], // August, September, October
    imageUrl: "https://www.rewilding-brazil.org/wp-content/uploads/2022/04/shutterstock_1643097271-DIPTERYX-ALATA-TINY-scaled-scaled.jpg",
    origin: {
      town: "San Ignacio de Velasco",
      department: "Santa Cruz",
      lat: -16.3667,
      lng: -60.9540,
      mapsUrl: "https://www.google.com/maps/place/San+Ignacio+de+Velasco/@-16.3667,-60.9540,11z"
    },
    gastronomicUses: [
      "Tostadas como snack saludable.",
      "Molienda fina para harinas libres de gluten en pastelería.",
      "Pesto chiquitano (reemplazando piñones por almendra y albahaca chiquitana).",
      "Costras crocantes para carnes rojas y pescados serranos."
    ],
    contacts: [
      {
        id: "c1",
        name: "Asociación de Recolectores de Almendra de San Ignacio (ARASI)",
        role: "Acopio y venta mayorista para chefs",
        type: "Asociación",
        phone: "+591 67835553",
        location: "San Ignacio de Velasco, Santa Cruz"
      },
      {
        id: "c2",
        name: "Tienda Ecológica del Bosque de la FAN",
        role: "Venta directa de productos procesados (envasado al vacío)",
        type: "Tienda",
        phone: "+591 67835553",
        location: "Av. Las Américas, Santa Cruz de la Sierra"
      }
    ],
    recipes: [
      {
        id: "r1",
        title: "Pesto Chiquitano Silvestre",
        image: "https://img.magnific.com/fotos-premium/pesto-fresco-casero-ajo-silvestre-hecho-hierbas-bear-leek-deliciosa-salsa-salada-pasta-italiana-e-ingredientes-su-cocinax9_75517-2490.jpg",
        description: "Una variante crujiente y aromática del clásico pesto italiano, ideal para acompañar pastas talladas con yuca o carnes grilladas de la región.",
        ingredients: [
          "1 taza de Almendras Chiquitanas tostadas y picadas",
          "2 tazas de hojas de albahaca fresca del huerto",
          "1/2 taza de queso chiquitano semi-maduro rallado",
          "2 dientes de ajo nativos de Concepción",
          "1/2 taza de aceite de oliva o de palma asada",
          "Sal del salar y pimienta al gusto"
        ],
        instructions: [
          "Colocar el ajo, una pizca de sal y las almendras chiquitanas tostadas en un mortero tradicional (tacú) y triturar ligeramente hasta obtener una pasta granulosa.",
          "Agregar las hojas de albahaca de forma progresiva, continuando la molienda rítmicamente.",
          "Verter el aceite lentamente en forma de hilo mientras se sigue mezclando para emulsionar perfectamente.",
          "Incorporar el queso chiquitano rallado con suavidad y ajustar los condimentos.",
          "Servir frío sobre fettuccine caliente o yucas hervidas al hilo."
        ],
        servings: "4 porciones",
        difficulty: "Fácil"
      },
      {
        id: "r2",
        title: "Grisines Glaseados con Costra de Mupu",
        image: "https://tn.com.ar/resizer/v2/como-hacer-grisines-rapido-y-facil-receta-paso-a-paso-foto-pinterest-TP6YGSBTYJCN3A62L3V337PGRQ.png?auth=5811aa799646291acb8430f1e1b4dc1a40cb4bc9fa1b336fb86e33800ba42f73&width=1023",
        description: "Postre crujiente derivado del recetario comunitario. Combina harina de mupu y azúcar morena caramelizada.",
        ingredients: [
          "150g de harina refinada de Almendra Chiquitana",
          "100g de mantequilla artesanal",
          "1 huevo de campo",
          "50g de azúcar morena chiquitana",
          "50g de almendras enteras trituradas para la cobertura de grisin"
        ],
        instructions: [
          "Mezclar la harina de mupu con la mantequilla pomada hasta integrar.",
          "Añadir el huevo y el azúcar, amasando hasta que la masa quede uniforme y firme.",
          "Formar cilindros delgados (como grisines) y pasarlos por el baño de huevo batido restante.",
          "Rebozar en la almendra triturada y hornear a 170°C por 15 minutos hasta dorar.",
          "Acompañar con café de Concepción caliente por las tardes."
        ],
        servings: "6 porciones",
        difficulty: "Medio"
      }
    ]
  },
  {
    id: "totai",
    name: "Fruto de Totaí",
    scientificName: "Acrocomia aculeata",
    description: "El totaí es una palmera típica del paisaje cruceño y del bosque seco. Sus frutos amarillos-anaranjados se desprenden en racimos salvajes. La pulpa harinosa es extraordinariamente grasosa, de color ambarino dulce y sabor fuerte, ideal para repostería típica e investigación culinaria.",
    characteristics: [
      "Sabor dulce exótico y textura aceitosa altamente densa.",
      "Cáscara verde amarillenta fácil de quebrar para descubrir el núcleo duro.",
      "Nutricionalmente rico en beta-caroteno (vitamina A) con carozos aceiteros.",
      "Utilizado tanto por su harina dulce como por su almendra interior cristalina."
    ],
    category: "Palmera/Fruto",
    seasonMonths: [10, 11, 12, 1], // October, November, December, January
    imageUrl: "https://tse1.mm.bing.net/th/id/OIP.etbIZ7dRxhgpDOfP1xqg6gHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
    origin: {
      town: "Roboré",
      department: "Santa Cruz",
      lat: -18.3314,
      lng: -59.7611,
      mapsUrl: "https://www.google.com/maps/place/Robor%C3%A9/@-18.3314,-59.7611,11z"
    },
    gastronomicUses: [
      "Elaboración de la famosa chicha camba de totaí infusionado.",
      "Harina de pulpa de totaí deshidratada para hornear panificados típicos.",
      "Bases de heladería de autor y mousses de color naranja vibrante.",
      "Vinagretas templadas emulsionadas con puré de totaí."
    ],
    contacts: [
      {
        id: "c3",
        name: "Asociación de Productoras 'Las Palmeras de Chiquitos'",
        role: "Colectivo de mujeres recolectoras y molienda",
        type: "Asociación",
        phone: "+591 67835553",
        location: "Roboré, Santa Cruz"
      }
    ],
    recipes: [
      {
        id: "r3",
        title: "Cuñapé aromatizado con Aceite de Totaí",
        image: "https://i.pinimg.com/736x/c3/c7/1d/c3c71d525b55f73ab13011b33956f800.jpg",
        description: "Dando un giro místico al clásico cuñapé cruceño, agregando la riqueza lipídica y el color del fruto del totaí.",
        ingredients: [
          "500g de almidón de yuca fresco de la Chiquitania",
          "600g de queso criollo salado hilado",
          "50g de puré concentrado de pulpa de totaí",
          "2 huevos de granja",
          "Leche templada c/n"
        ],
        instructions: [
          "Rallar el queso criollo fino y colocar en un tazón amplio junto con el almidón de yuca de manera uniforme.",
          "Añadir los huevos y el puré concentrado de totaí, que aportará un bello color amarillo dorado y un aroma dulzón silvestre.",
          "Amasar enérgicamente, agregando un chorrito de leche si la mezcla se siente demasiado seca, hasta amalgamar perfectamente.",
          "Modelar esferas medianas con un hueco en la base con el pulgar.",
          "Hornear en bandeja engrasada a alta temperatura (200°C) durante 15 a 18 minutos hasta que inflen y formen una costra dorada."
        ],
        servings: "10 unidades",
        difficulty: "Medio"
      }
    ]
  },
  {
    id: "motacu",
    name: "Fruto de Motacú",
    scientificName: "Attalea phalerata",
    description: "El motacú es de las palmeras más imponentes y serviciales de la Chiquitania. Se recolectan racimos inmensos. Su pulpa carnosa de color crema es muy apreciada para preparar aceites artesanales finos y dulces cocidos tradicionales bolivianos. Un verdadero icono de la supervivencia boscosa.",
    characteristics: [
      "Disponible casi todo el año, con un pico de madurez en época lluviosa.",
      "Pulpa carnosa oleaginosa y semilla crujiente rica en aceites vegetales suaves.",
      "Sabor suave y lechoso que combina con ingredientes dulces o picantes.",
      "Artesanalmente se extrae el fino aceite de motacú calentándolo al sol."
    ],
    category: "Palmera/Fruto",
    seasonMonths: [11, 12, 1, 2, 3], // Nov to Mar
    imageUrl: "https://tse2.mm.bing.net/th/id/OIP.wgFUAPoe-Zv7HtkTst-Y8QHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    origin: {
      town: "Concepción",
      department: "Santa Cruz",
      lat: -16.1375,
      lng: -62.0222,
      mapsUrl: "https://www.google.com/maps/place/Concepci%C3%B3n/@-16.1375,-62.0222,11z"
    },
    gastronomicUses: [
      "Extracción de aceites gourmet para confitados de carnes silvestres.",
      "Crema de motacú batida con azúcar para postres calientes.",
      "Tostado de la almendra de motacú como guarnición crocante de cereales.",
      "Infusiones místicas de leche de almendra de palma de motacú."
    ],
    contacts: [
      {
        id: "c4",
        name: "Proveedor Indígena Limoncito",
        role: "Familias locales recolectoras de Concepción",
        type: "Productor",
        phone: "+591 67835553",
        location: "Comunidad Limoncito, Concepción"
      }
    ],
    recipes: [
      {
        id: "r4",
        title: "Crema Untuosa de Café de Motacú",
        image: "https://img.cocinarico.es/2023-07/crema-de-cafe-br92.jpg",
        description: "Un postre cremoso de cuchara que une el cacao silvestre, café local de Concepción y el aceite suave de la almendra de motacú.",
        ingredients: [
          "200g de pulpa cocida y colada de motacú",
          "100ml de crema de leche fresca",
          "2 cucharadas de café descafeinado de cebada o café de Concepción destilado",
          "80g de azúcar glass",
          "Hojitas de menta fresca"
        ],
        instructions: [
          "Cocinar la pulpa de motacú en agua hirviendo durante 20 minutos para ablandar perfectamente.",
          "Extraer la pulpa deshaciendo el fruto en un colador de malla fina para retirar las fibras duras.",
          "Batir la pulpa suave resultante con la crema de leche fría y el azúcar glass hasta ganar volumen estable.",
          "Incorporar lentamente el café templado concentrado sin dejar de mezclar.",
          "Verter en copas y refrigerar antes de servir. Decorar con almendra tostada de motacú triturada."
        ],
        servings: "4 copitas",
        difficulty: "Fácil"
      }
    ]
  },
  {
    id: "copaibo",
    name: "Aceite de Copaibo",
    scientificName: "Copaifera reticulata",
    description: "El copaibo es un majestuoso árbol del bosque alto. Se realiza una incisión cuidadosa en su tronco para recolectar un oleorresina ambarina traslúcida muy aromática. Tradicionalmente medicinal para desinflamar, en la gastronomía de vanguardia se usa en pequeñas dosis como fragancia mística y saborizante balsámico herbáceo único.",
    characteristics: [
      "Líquido viscoso dorado, de perfume altamente balsámico y resinoso.",
      "Sabor amargo medicinal que se mitiga al diluirse adecuadamente.",
      "Considerado el oro líquido del bosque por su escasez y valor curativo.",
      "Recolección forestal sostenible por goteo que no lastima el árbol."
    ],
    category: "Aceite/Aceituna/Resina",
    seasonMonths: [6, 7, 8, 9], // June to September
    imageUrl: "https://image.tuasaude.com/media/article/qo/xu/aceite-de-copaiba_51170.jpg",
    origin: {
      town: "Santiago de Chiquitos",
      department: "Santa Cruz",
      lat: -18.3422,
      lng: -59.5861,
      mapsUrl: "https://www.google.com/maps/place/Santiago+de+Chiquitos/@-18.3422,-59.5861,12z"
    },
    gastronomicUses: [
      "Aromatizante balsámico para heladerías y chocolates de origen.",
      "Aderezo para vinagretas de ensaladas con hojas amargas y frutos secos.",
      "Infusión de jarabes dulces balsámicos para coctelería exótica boliviana.",
      "Micro-pincelado en carnes de res ahumadas."
    ],
    contacts: [
      {
        id: "c5",
        name: "Asociación del Santuario Ecológico de Santiago",
        role: "Protectores del Copaibo y extractores comunitarios",
        type: "Asociación",
        phone: "+591 67835553",
        location: "Santiago de Chiquitos, Santa Cruz"
      }
    ],
    recipes: [
      {
        id: "r5",
        title: "Vinagreta Serrana al Perfume de Copaibo",
        image: copaiboRecipeImg,
        description: "Aderezo elegante y místico ideal para ensaladas crujientes de hortalizas nativas, rabanitos y gajos de achachairú.",
        ingredients: [
          "5 cucharadas de aceite de girasol de primera prensa",
          "2 cucharadas de jugo de limón mandarina fresco",
          "Solo 3 gotas puras de Aceite de Copaibo grado alimenticio",
          "1 cucharadita de miel de flores silvestres chiquitanas",
          "Pimienta dulce triturada y sal mineralizada"
        ],
        instructions: [
          "En un recipiente pequeño de vidrio, mezclar el jugo de limón mandarina con la miel silvestre hasta unificar.",
          "Añadir minuciosamente las tres gotas de Aceite de Copaibo. Nota: No exceder la dosis sugerida para mantener una nota balsámica equilibrada.",
          "Verter el aceite de girasol poco a poco mientras se emulsiona con un batidor de alambre pequeño.",
          "Sazonar con sal del salar de Uyuni y pimienta dulce fresca.",
          "Rociar sobre lechugas hidropónicas, quesos tiernos desmenuzados y láminas tostadas de almendra."
        ],
        servings: "1 taza de aderezo",
        difficulty: "Fácil"
      }
    ]
  },
  {
    id: "pesoe",
    name: "Fruto de Pesoé",
    scientificName: "Acrocomia totai variant",
    description: "El Pesoé es una pequeña y curiosa fruta de pulpa tierna que crece pegada al tallo de variedades de palmeras silvestres chiquitanas bajas de las pampas. De color verdoso y pulpa blanca lechosa que, fermentada o hervida con azúcar de caña virgen, da un jarabe cremoso y una de las bebidas caseras más entrañables de la selva santacruceña.",
    characteristics: [
      "Fruto pequeño esférico con pulpa feculenta muy sabrosa.",
      "Temporada efímera vinculada estrechamente con el final del año.",
      "Perfecto para confituras, jaleas espesas y jarabe fermentado dulce.",
      "Cosechada de forma netamente familiar comunitaria en los campos abiertos."
    ],
    category: "Fruta Silvestre",
    seasonMonths: [11, 12, 1], // Nov, Dec, Jan
    imageUrl: "https://www.laregion.bo/wp-content/uploads/2020/08/peso%C3%A9.jpg",
    origin: {
      town: "Lomerío",
      department: "Santa Cruz",
      lat: -16.9720,
      lng: -61.6160,
      mapsUrl: "https://www.google.com/maps/place/San+Antonio+de+Lomer%C3%ADo/@-16.9720,-61.6160,11z"
    },
    gastronomicUses: [
      "Mermeladas densas que acompañan quesillos tradicionales calientes.",
      "Jarabes reductores para rociar queques de harina de yuca.",
      "Fresco bebible tradicional por decantación."
    ],
    contacts: [
      {
        id: "c6",
        name: "Asociación Indígena de Lomerío - CICOL",
        role: "Recolectores de frutos de bosques comunitarios indígenas",
        type: "Asociación",
        phone: "+591 67835553",
        location: "Comunidad de San Antonio de Lomerío"
      }
    ],
    recipes: [
      {
        id: "r6",
        title: "Dulce de Conservación de Pesoé",
        image: pesoeRecipeImg,
        description: "Mermelada rústica reducida lentamente en olla de barro a fuego de leña que rescata las tradiciones de la cocina de campo.",
        ingredients: [
          "1kg de frutos frescos de Pesoé pelados",
          "500g de azúcar de caña orgánica o chancaca desmenuzada",
          "2 ramitas de canela del bosque",
          "Agua filtrada la necesaria"
        ],
        instructions: [
          "Colocar los frutos de pesoé pelados en una olla profunda con suficiente agua para cubrirlos.",
          "Hervir suavemente durante 30 minutos hasta que la pulpa se desprenda con facilidad del hueso duro.",
          "Colar y triturar la pulpa para separar los carozos interiores.",
          "Regresar la pulpa purificada a la olla junto con la chancaca o azúcar y la canela silvestre.",
          "Cocinar a fuego bajo removiendo constantemente con cuchara de madera de chonta hasta obtener un punto dulce espeso y brillante."
        ],
        servings: "2 frascos de conserva",
        difficulty: "Medio"
      }
    ]
  },
  {
    id: "guapuru-silvestre",
    name: "Guapurú del Bosque",
    scientificName: "Plinia cauliflora var.",
    description: "Pequeña baya esférica de color morado oscuro casi negro que brota adherida directamente al tronco del árbol guapurú en las serranías chiquitanas. De cáscara lustrosa y acídula y pulpa blanca translúcida, jugosa, sumamente dulce. Es un manjar codiciado que atrae aves y vida silvestre abundante.",
    characteristics: [
      "Baya de crecimiento caulifloro (nace en las ramas y troncos gruesos).",
      "Sabor intensamente dulce y ligeramente ácido (antioxidante puro).",
      "Piel rica en taninos ideales para macerados en alcoholes de caña neutros.",
      "Fruto muy perecedero que requiere recolección cuidadosa por la mañana."
    ],
    category: "Fruta Silvestre",
    seasonMonths: [9, 10, 11], // September, October, November
    imageUrl: "https://tse1.mm.bing.net/th/id/OIP.qTQMudVZR-ftt6K3X9LvoAHaKp?rs=1&pid=ImgDetMain&o=7&rm=3",
    origin: {
      town: "San José de Chiquitos",
      department: "Santa Cruz",
      lat: -17.8420,
      lng: -60.7480,
      mapsUrl: "https://www.google.com/maps/place/San+Jos%C3%A9+de+Chiquitos/@-17.8420,-60.7480,11z"
    },
    gastronomicUses: [
      "Elaboración de vinagres aromatizados y licores artesanales macerados.",
      "Reducciones agridulces ideales para salsear carnes de monte de origen certificado.",
      "Tartaletas frescas y jaleas brillantes sin pectina añadida.",
      "Sorbete refrescante de guapurú morado."
    ],
    contacts: [
      {
        id: "c7",
        name: "Productora Ecológica Doña Mercedes Sabor",
        role: "Elaboradora de licores y jaleas tradicionales de San José",
        type: "Productor",
        phone: "+591 67835553",
        location: "Barrio Histórico, San José de Chiquitos"
      }
    ],
    recipes: [
      {
        id: "r7",
        title: "Glaseado de Guapurú Silvestre para Carnes",
        image: guapuruRecipeImg,
        description: "Reducción agridulce balanceada que marida a la perfección con filetes de carne vacuna criolla de la Chiquitania.",
        ingredients: [
          "2 tazas de Guapurú del Bosque frescos",
          "1/2 taza de vinagre de caña o de manzana artesanal",
          "1/2 taza de miel de abejas nativas",
          "1 ramita de romero fresco",
          "Sal del salar y pimentón ahumado"
        ],
        instructions: [
          "Aplastar ligeramente las bayas de guapurú para liberar los jugos color morado intenso.",
          "Verter en una cacerola pequeña el jugo con las bayas trituradas, el vinagre de caña y la miel.",
          "Integrar el romero y dejar reducir a fuego lento durante 20 minutos hasta que tome consistencia untuosa de jarabe.",
          "Colar la salsa para remover las pepas y la piel gruesa, presionando firmemente para extraer los jugos.",
          "Volver a calentar brevemente con sal y pimienta de cayena, y pincelar sobre carnes antes o después del asador."
        ],
        servings: "4 porciones",
        difficulty: "Fácil"
      }
    ]
  },
  {
    id: "achachairu",
    name: "Achachairú Silvestre",
    scientificName: "Garcinia humilis",
    description: "Fruto de piel gruesa de un encendido color naranja dorado que alberga en su interior una pulpa carnosa dulce y refrescante. Crece de manera silvestre en el sotobosque húmedo de la ceja chiquitana. Cada mordisco es un estallido frutal dulce y ácido muy cotizado en el oriente boliviano.",
    characteristics: [
      "Fruta de cáscara resistente de color naranja brillante con forma de lágrima.",
      "Pulpa blanca inmaculada que recubre una semilla grande.",
      "Sabor agridulce sumamente equilibrado y refrescante.",
      "Se aprovecha la cáscara para preparar refrescos antioxidantes tradicionales."
    ],
    category: "Fruta Silvestre",
    seasonMonths: [12, 1, 2], // December, January, February
    imageUrl: "https://1.bp.blogspot.com/-XtxIaJ_pL1w/Xe0IHipQQfI/AAAAAAAAGJA/m2ZD10oW8GIBwcbw1StOyPCFTYjkaVpdgCLcBGAsYHQ/w1320/77422166_2517075098574055_4622361563368521728_n.jpg",
    origin: {
      town: "Concepción",
      department: "Santa Cruz",
      lat: -16.1375,
      lng: -62.0222,
      mapsUrl: "https://www.google.com/maps/place/Concepci%C3%B3n/@-16.1375,-62.0222,11z"
    },
    gastronomicUses: [
      "Consumo al natural directo (el snack escolar tradicional camba).",
      "Infusión refrescante de la cáscara secada al sol con canela y clavo.",
      "Coulis brillante para verter sobre flanes u hojaldres crujientes.",
      "Cocteles tropicales con macerado de achachairú en singani boliviano."
    ],
    contacts: [
      {
        id: "c8",
        name: "Asociación Campesina APER-C",
        role: "Productores ecológicos organizados de Concepción",
        type: "Asociación",
        phone: "+591 67835553",
        location: "Concepción, Santa Cruz"
      }
    ],
    recipes: [
      {
        id: "r8",
        title: "Sorbete Refrescante de Achachairú Camba",
        image: achachairuRecipeImg,
        description: "Postre helado sin lácteos que conserva intacto el sabor electrizante y fresco del achachairú del bosque.",
        ingredients: [
          "3 tazas de pulpa de Achachairú Silvestre (sin pepas)",
          "1 taza de jarabe simple elaborado con azúcar morena y agua (proporción 1:1)",
          "1 clara de huevo batida a punto de nieve (opcional, para cremosidad)",
          "Unas gotitas de limón del chaco"
        ],
        instructions: [
          "Mezclar la pulpa blanca descarozada de achachairú silvestre con el jarabe simple de azúcar y unas gotas de limón del chaco.",
          "Licuar por un minuto hasta conseguir una mezcla liviana y homogénea.",
          "Verter la mezcla en un molde plano de metal y llevar al congelador de tu cocina por 2 horas.",
          "Retirar la mezcla parcialmente congelada y procesarla de nuevo en un procesador o licuadora para romper los cristales grandes.",
          "Incorporar suavemente la clara de huevo montada a nieve, regresar al molde y congelar por 3 horas más.",
          "Servir en copas heladas con almendra chiquitana rallada encima."
        ],
        servings: "6 porciones",
        difficulty: "Medio"
      }
    ]
  }
];

export const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export const CATEGORIES = ["Semilla/Nuez", "Palmera/Fruto", "Aceite/Aceituna/Resina", "Fruta Silvestre", "Túberculo/Raíz/Otros"];
