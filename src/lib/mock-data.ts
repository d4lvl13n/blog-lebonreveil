import type { WPPostSummary, WPPostFull, WPCategory } from "./wordpress";

export const mockCategories: WPCategory[] = [
  {
    name: "Réveils",
    slug: "reveils",
    description: "Guides et comparatifs pour choisir le réveil idéal.",
    count: 3,
  },
  {
    name: "Sommeil",
    slug: "sommeil",
    description: "Conseils pour améliorer la qualité de votre sommeil.",
    count: 2,
  },
  {
    name: "Routine matinale",
    slug: "routine-matinale",
    description: "Astuces pour bien démarrer votre journée.",
    count: 1,
  },
];

const mockImage = {
  sourceUrl: "https://picsum.photos/seed/reveil1/1200/630",
  altText: "Un réveil posé sur une table de nuit",
  mediaDetails: { width: 1200, height: 630 },
};

const mockImage2 = {
  sourceUrl: "https://picsum.photos/seed/sommeil2/1200/630",
  altText: "Chambre zen propice au sommeil",
  mediaDetails: { width: 1200, height: 630 },
};

const mockImage3 = {
  sourceUrl: "https://picsum.photos/seed/lumiere3/1200/630",
  altText: "Réveil simulateur d'aube avec lumière progressive",
  mediaDetails: { width: 1200, height: 630 },
};

const articleContent = `
<p>Le choix d'un réveil peut transformer votre routine matinale. Un bon réveil ne se contente pas de vous sortir du sommeil : il respecte vos cycles de sommeil et vous aide à démarrer la journée du bon pied.</p>

<h2>Pourquoi le type de réveil compte</h2>

<p>Les réveils classiques à sonnerie brusque provoquent un pic de cortisol qui peut affecter votre humeur pendant plusieurs heures. Les études montrent qu'un réveil progressif réduit l'inertie du sommeil de 40% en moyenne.</p>

<p>Il existe aujourd'hui plusieurs catégories de réveils, chacune avec ses avantages et inconvénients. Voici les principales technologies disponibles sur le marché en 2026.</p>

<h2>Les simulateurs d'aube</h2>

<p>Les simulateurs d'aube reproduisent un lever de soleil artificiel dans votre chambre. La lumière augmente progressivement pendant 20 à 40 minutes avant l'heure de réveil programmée.</p>

<h3>Comment ça fonctionne</h3>

<p>La lumière progressive stimule la production de cortisol naturel et réduit la mélatonine, ce qui prépare votre corps au réveil avant même que l'alarme sonore ne se déclenche. C'est le mécanisme le plus proche du réveil naturel.</p>

<h3>Pour qui c'est adapté</h3>

<p>Les simulateurs d'aube sont particulièrement recommandés pour les personnes vivant dans des régions avec peu de lumière naturelle en hiver, ou pour ceux qui doivent se lever avant le lever du soleil.</p>

<h2>Les réveils connectés</h2>

<p>Les réveils connectés analysent vos cycles de sommeil via des capteurs (bracelet, tapis sous le matelas, ou radar) et déclenchent l'alarme au moment optimal de votre phase de sommeil léger.</p>

<p>Les modèles les plus avancés intègrent des microphones pour détecter les ronflements, des capteurs de température, et se synchronisent avec votre domotique pour ajuster la température de la chambre avant le réveil.</p>

<h2>Les réveils analogiques</h2>

<p>Ne sous-estimez pas les réveils analogiques. Sans écran lumineux ni ondes électromagnétiques, ils offrent un environnement de sommeil optimal. Leur tic-tac régulier peut même avoir un effet apaisant pour certaines personnes.</p>

<h2>Notre recommandation</h2>

<p>Pour la plupart des gens, un simulateur d'aube avec alarme sonore progressive offre le meilleur compromis. Il respecte vos cycles naturels tout en garantissant que vous ne manquerez pas votre réveil.</p>

<p>Le budget moyen pour un simulateur d'aube de qualité se situe entre 50 et 150 euros. C'est un investissement dans votre bien-être quotidien qui se rentabilise rapidement en termes de qualité de vie.</p>
`;

const sleepArticleContent = `
<p>La qualité de votre sommeil dépend en grande partie de votre environnement. Température, luminosité, bruit : chaque détail compte pour créer les conditions idéales d'un sommeil réparateur.</p>

<h2>La température idéale</h2>

<p>La température optimale pour dormir se situe entre 16 et 19 degrés Celsius. Un corps qui se refroidit légèrement envoie un signal au cerveau qu'il est temps de dormir. C'est pourquoi une chambre fraîche favorise l'endormissement.</p>

<h3>Réguler la température naturellement</h3>

<p>Aérez votre chambre 15 minutes avant de vous coucher. En été, utilisez des draps en lin ou en coton léger. En hiver, préférez une couette adaptée à la saison plutôt que de surchauffer la pièce.</p>

<h2>L'obscurité totale</h2>

<p>La mélatonine, l'hormone du sommeil, est produite en réponse à l'obscurité. Même une faible source de lumière — le voyant de veille d'un appareil électronique — peut perturber sa production.</p>

<p>Investissez dans des rideaux occultants ou un masque de sommeil de qualité. Éliminez toutes les sources de lumière artificielle, y compris les LED de vos appareils.</p>

<h2>Le silence ou le bruit blanc</h2>

<p>Le silence absolu n'est pas toujours la meilleure option. Pour les personnes vivant en milieu urbain, un générateur de bruit blanc ou de sons naturels peut masquer les bruits parasites et créer un environnement sonore constant propice au sommeil.</p>

<h2>L'importance du matelas et de l'oreiller</h2>

<p>Un matelas de qualité a une durée de vie de 8 à 10 ans. Au-delà, il perd ses propriétés de soutien et peut provoquer des douleurs dorsales. L'oreiller doit maintenir l'alignement de votre colonne cervicale, quel que soit votre position de sommeil préférée.</p>
`;

const routineArticleContent = `
<p>Les 30 premières minutes après le réveil déterminent l'énergie et la productivité de votre journée entière. Voici une routine matinale simple et efficace, basée sur la science du sommeil et la chronobiologie.</p>

<h2>Les 5 premières minutes : lumière naturelle</h2>

<p>Exposez-vous à la lumière naturelle dès que possible après le réveil. Ouvrez les rideaux ou sortez sur votre balcon. La lumière du matin recalibre votre horloge circadienne et stoppe la production de mélatonine en quelques minutes.</p>

<h2>Minutes 5 à 15 : hydratation</h2>

<p>Après 7 à 8 heures sans boire, votre corps est déshydraté. Un grand verre d'eau à température ambiante relance votre métabolisme et améliore vos fonctions cognitives. Attendez au moins 30 minutes avant votre premier café pour maximiser son effet.</p>

<h3>Pourquoi retarder le café</h3>

<p>Le cortisol atteint naturellement son pic dans les 30 à 60 minutes suivant le réveil. Boire du café à ce moment-là réduit son efficacité et augmente votre tolérance à la caféine. En le décalant, vous profitez pleinement de ses effets stimulants.</p>

<h2>Minutes 15 à 30 : mouvement</h2>

<p>Pas besoin d'un entraînement intensif. 10 à 15 minutes d'étirements, de marche ou de yoga suffisent pour activer votre circulation sanguine et libérer des endorphines. Le mouvement matinal réduit le stress et améliore la concentration pour les heures suivantes.</p>
`;

export const mockPosts: WPPostFull[] = [
  {
    slug: "guide-choisir-reveil-2026",
    title: "Guide complet : comment choisir son réveil en 2026",
    excerpt: "<p>Le choix d'un réveil peut transformer votre routine matinale. Découvrez les différents types de réveils et trouvez celui qui correspond à vos besoins.</p>",
    date: "2026-03-25T08:00:00",
    modified: "2026-03-30T10:00:00",
    content: articleContent,
    featuredImage: { node: mockImage3 },
    categories: { nodes: [mockCategories[0]] },
    tags: { nodes: [{ name: "Comparatif", slug: "comparatif" }, { name: "Guide d'achat", slug: "guide-achat" }] },
    seo: {
      title: "Guide complet : comment choisir son réveil en 2026",
      metaDesc: "Simulateur d'aube, réveil connecté ou analogique ? Découvrez notre guide complet pour choisir le réveil adapté à vos besoins et améliorer votre routine matinale.",
      opengraphImage: null,
    },
  },
  {
    slug: "optimiser-environnement-sommeil",
    title: "Comment optimiser votre environnement de sommeil",
    excerpt: "<p>Température, luminosité, bruit : chaque détail compte pour créer les conditions idéales d'un sommeil réparateur.</p>",
    date: "2026-03-20T08:00:00",
    modified: "2026-03-28T14:00:00",
    content: sleepArticleContent,
    featuredImage: { node: mockImage2 },
    categories: { nodes: [mockCategories[1]] },
    tags: { nodes: [{ name: "Bien-être", slug: "bien-etre" }, { name: "Conseils", slug: "conseils" }] },
    seo: {
      title: "Comment optimiser votre environnement de sommeil",
      metaDesc: "Découvrez les conditions idéales pour un sommeil réparateur : température, obscurité, bruit blanc et choix du matelas.",
      opengraphImage: null,
    },
  },
  {
    slug: "routine-matinale-30-minutes",
    title: "La routine matinale idéale en 30 minutes",
    excerpt: "<p>Les 30 premières minutes après le réveil déterminent votre journée. Voici une routine simple et efficace basée sur la science.</p>",
    date: "2026-03-15T08:00:00",
    modified: "2026-03-15T08:00:00",
    content: routineArticleContent,
    featuredImage: { node: mockImage },
    categories: { nodes: [mockCategories[2]] },
    tags: { nodes: [{ name: "Productivité", slug: "productivite" }] },
    seo: {
      title: "La routine matinale idéale en 30 minutes",
      metaDesc: "Lumière naturelle, hydratation, mouvement : une routine matinale de 30 minutes basée sur la chronobiologie pour booster votre énergie.",
      opengraphImage: null,
    },
  },
  {
    slug: "simulateur-aube-guide-complet",
    title: "Simulateur d'aube : le guide complet pour bien choisir",
    excerpt: "<p>Les simulateurs d'aube reproduisent un lever de soleil pour un réveil naturel et progressif. Voici tout ce qu'il faut savoir avant d'acheter.</p>",
    date: "2026-03-10T08:00:00",
    modified: "2026-03-22T09:00:00",
    content: articleContent,
    featuredImage: { node: { ...mockImage3, sourceUrl: "https://picsum.photos/seed/aube4/1200/630" } },
    categories: { nodes: [mockCategories[0]] },
    tags: { nodes: [{ name: "Simulateur d'aube", slug: "simulateur-aube" }, { name: "Guide d'achat", slug: "guide-achat" }] },
    seo: null,
  },
  {
    slug: "melatonine-et-lumiere-bleue",
    title: "Mélatonine et lumière bleue : ce que dit la science",
    excerpt: "<p>La lumière bleue des écrans perturbe la production de mélatonine. Mais l'impact réel est-il aussi grave qu'on le dit ?</p>",
    date: "2026-03-05T08:00:00",
    modified: "2026-03-05T08:00:00",
    content: sleepArticleContent,
    featuredImage: { node: { ...mockImage2, sourceUrl: "https://picsum.photos/seed/bluelight5/1200/630" } },
    categories: { nodes: [mockCategories[1]] },
    tags: { nodes: [{ name: "Science", slug: "science" }] },
    seo: null,
  },
  {
    slug: "reveil-enfant-quel-age",
    title: "Réveil pour enfant : à partir de quel âge et lequel choisir",
    excerpt: "<p>Apprendre à votre enfant à se réveiller seul est une étape importante. Découvrez les réveils adaptés à chaque tranche d'âge.</p>",
    date: "2026-02-28T08:00:00",
    modified: "2026-03-18T11:00:00",
    content: articleContent,
    featuredImage: { node: { ...mockImage, sourceUrl: "https://picsum.photos/seed/enfant6/1200/630" } },
    categories: { nodes: [mockCategories[0]] },
    tags: { nodes: [{ name: "Enfants", slug: "enfants" }] },
    seo: null,
  },
];

export const mockPostSummaries: WPPostSummary[] = mockPosts.map(({ content, tags, ...rest }) => rest);
