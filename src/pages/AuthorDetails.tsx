import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PenTool, 
  BookOpen, 
  Star, 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Award, 
  Quote, 
  Users, 
  TrendingUp,
  Heart,
  Share2,
  MessageCircle,
  Clock,
  Globe,
  GraduationCap,
  Sparkles,
  CheckCircle
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const authors = [
  {
    id: 1,
    name: "Imam Ibn Taymiyyah",
    books: 85,
    specialty: "Islamic Jurisprudence",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=300&h=300&fit=crop",
    bio: "One of the most influential Islamic scholars, known for his extensive works on theology and jurisprudence.",
    rating: 4.9,
    fullBio: "Taqī ad-Dīn Ahmad ibn Taymiyyah was a medieval Islamic scholar, theologian, and logician. He was one of the most influential Islamic scholars of his time and has had a lasting impact on Islamic thought. His works on theology, jurisprudence, and mysticism continue to be studied and debated to this day. He was known for his uncompromising stance on religious matters and his willingness to challenge established scholarly consensus when he believed it contradicted the Quran and Sunnah.",
    birthYear: "1263 CE",
    deathYear: "1328 CE",
    birthPlace: "Harran, Turkey",
    achievements: ["Over 500 scholarly works", "Pioneer of Islamic reform", "Major influence on Salafi movement"],
    followers: "2.5M",
    reviews: 1250,
    quotes: [
      "The heart will not find complete happiness except by loving Allah and striving towards what is dear to Him.",
      "Don't depend too much on anyone in this world because even your own shadow leaves you when you are in darkness.",
      "Patience is of two kinds: patience over what pains you, and patience against what you covet."
    ],
    education: ["Al-Azhar University", "Studied under renowned scholars in Damascus", "Memorized Quran at age 7"],
    languages: ["Arabic", "Persian", "Greek Philosophy"],
    teachingStyle: "Known for his direct approach and willingness to engage in scholarly debates. His teaching emphasized returning to the Quran and Sunnah.",
    influences: ["Imam Ahmad ibn Hanbal", "Imam Shafi'i", "Classical Islamic scholars"],
    influenced: ["Ibn Qayyim al-Jawziyya", "Ibn Kathir", "Modern Islamic revival movements"],
    timeline: [
      { year: "1263", event: "Born in Harran, Turkey" },
      { year: "1269", event: "Family moved to Damascus due to Mongol invasion" },
      { year: "1280", event: "Began teaching and issuing fatwas" },
      { year: "1293", event: "First imprisonment for theological views" },
      { year: "1328", event: "Passed away in Damascus" }
    ],
    majorWorks: [
      { title: "Majmu' al-Fatawa", description: "A collection of religious rulings spanning 37 volumes" },
      { title: "Al-Aqidah al-Wasitiyyah", description: "A treatise on Islamic creed" },
      { title: "Minhaj as-Sunnah", description: "Refutation of Shia theology" },
      { title: "Kitab al-Iman", description: "Treatise on faith and its components" }
    ]
  },
  {
    id: 2,
    name: "Imam Al-Nawawi",
    books: 42,
    specialty: "Hadith Sciences",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
    bio: "Renowned scholar famous for his compilation of 40 Hadith and commentary on Sahih Muslim.",
    rating: 4.8,
    fullBio: "Imam Yahya ibn Sharaf al-Nawawi was a renowned Syrian Islamic scholar and jurist. He is considered one of the greatest hadith scholars in Islamic history. His compilation of 40 Hadith remains one of the most widely read and memorized collections of prophetic traditions. His commentary on Sahih Muslim is still considered authoritative in Islamic scholarship.",
    birthYear: "1233 CE",
    deathYear: "1277 CE",
    birthPlace: "Nawa, Syria",
    achievements: ["Compiled 40 Hadith collection", "Authored Riyadh as-Salihin", "Commentary on Sahih Muslim"],
    followers: "3.2M",
    reviews: 2100,
    quotes: [
      "Knowledge is not what is memorized. Knowledge is what benefits.",
      "Be mindful of Allah, and Allah will protect you.",
      "The believer's shade on the Day of Resurrection will be his charity."
    ],
    education: ["Dar al-Hadith al-Ashrafiyya", "Studied in Damascus", "Master of Shafi'i jurisprudence"],
    languages: ["Arabic", "Classical Arabic Literature"],
    teachingStyle: "Known for his piety, simplicity, and dedication to teaching. He lived an ascetic life devoted entirely to scholarship.",
    influences: ["Imam Shafi'i", "Earlier Hadith scholars"],
    influenced: ["Generations of Hadith students", "Modern Islamic education"],
    timeline: [
      { year: "1233", event: "Born in Nawa, Syria" },
      { year: "1245", event: "Began studying in Damascus" },
      { year: "1267", event: "Became head of Dar al-Hadith" },
      { year: "1277", event: "Passed away at age 44" }
    ],
    majorWorks: [
      { title: "Riyadh as-Salihin", description: "Collection of hadith on ethics and spirituality" },
      { title: "Forty Hadith", description: "Foundational collection of prophetic traditions" },
      { title: "Sharh Sahih Muslim", description: "Comprehensive commentary on Sahih Muslim" },
      { title: "Al-Majmu'", description: "Encyclopedia of Shafi'i jurisprudence" }
    ]
  },
  {
    id: 3,
    name: "Ibn Qayyim Al-Jawziyya",
    books: 67,
    specialty: "Islamic Philosophy",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    bio: "A prolific writer and student of Ibn Taymiyyah, known for his works on spirituality and theology.",
    rating: 4.9,
    fullBio: "Shams al-Din Abu Abdullah Muhammad ibn Abi Bakr ibn Ayyub, known as Ibn Qayyim al-Jawziyya, was an Islamic scholar and theologian. He was a prominent student of Ibn Taymiyyah and contributed significantly to the development of Islamic jurisprudence and theology. His works on spirituality, medicine of the heart, and Islamic ethics are still widely read today.",
    birthYear: "1292 CE",
    deathYear: "1350 CE",
    birthPlace: "Damascus, Syria",
    achievements: ["Authored Zad al-Ma'ad", "Expert in Quranic sciences", "Pioneer of spiritual psychology"],
    followers: "1.8M",
    reviews: 1500,
    quotes: [
      "The heart is the seat of all knowledge and wisdom.",
      "The true seeker of knowledge is one who seeks it with humility and sincerity.",
      "The path to knowledge is through the heart, not just the mind."
    ],
    education: ["Studied under Ibn Taymiyyah", "Studied under renowned scholars in Damascus", "Mastered Quranic sciences"],
    languages: ["Arabic", "Persian", "Classical Islamic texts"],
    teachingStyle: "Known for his deep spiritual insights and emphasis on inner purification. His teachings combined rigorous scholarship with profound mystical understanding.",
    influences: ["Imam Ibn Taymiyyah", "Imam Shafi'i", "Classical Islamic scholars"],
    influenced: ["Modern Islamic psychology", "Spiritual movements", "Islamic education"],
    timeline: [
      { year: "1292", event: "Born in Damascus, Syria" },
      { year: "1305", event: "Began studying under Ibn Taymiyyah" },
      { year: "1320", event: "Began teaching and writing" },
      { year: "1340", event: "Published major works" },
      { year: "1350", event: "Passed away in Damascus" }
    ],
    majorWorks: [
      { title: "Zad al-Ma'ad", description: "Comprehensive work on Islamic spirituality and ethics" },
      { title: "Al-Fawa'id al-Kubra", description: "Collection of spiritual benefits and virtues" },
      { title: "Al-Risala al-Muqaddasa", description: "Treatise on the path to spiritual perfection" },
      { title: "Al-Ma'arif al-Kubra", description: "Collection of spiritual knowledge and insights" }
    ]
  },
  {
    id: 4,
    name: "Imam As-Suyuti",
    books: 120,
    specialty: "Tafsir & History",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop",
    bio: "One of the most prolific scholars in Islamic history with extensive works on Quranic exegesis.",
    rating: 4.7,
    fullBio: "Jalal ad-Din al-Suyuti was an Egyptian polymath and prolific author. He wrote over 500 works on virtually every Islamic science, including Quranic exegesis, hadith, jurisprudence, and history. His tafsir, al-Dur al-Manthur, is a comprehensive collection of traditions related to Quranic interpretation.",
    birthYear: "1445 CE",
    deathYear: "1505 CE",
    birthPlace: "Cairo, Egypt",
    achievements: ["Over 500 written works", "Co-authored Tafsir al-Jalalayn", "Master of multiple sciences"],
    followers: "2.1M",
    reviews: 1800,
    quotes: [
      "The Quran is the ultimate source of guidance for all matters.",
      "The true scholar is one who seeks knowledge with humility and patience.",
      "The path to knowledge is through the heart, not just the mind."
    ],
    education: ["Cairo University", "Studied under renowned scholars", "Mastered multiple Islamic sciences"],
    languages: ["Arabic", "Persian", "Classical Islamic texts"],
    teachingStyle: "Known for his comprehensive approach and mastery of multiple Islamic sciences. His teaching emphasized the integration of different Islamic disciplines.",
    influences: ["Imam Ahmad ibn Hanbal", "Imam Shafi'i", "Classical Islamic scholars"],
    influenced: ["Modern Islamic scholarship", "Islamic education", "Islamic history"],
    timeline: [
      { year: "1445", event: "Born in Cairo, Egypt" },
      { year: "1460", event: "Began studying under renowned scholars" },
      { year: "1480", event: "Began teaching and writing" },
      { year: "1500", event: "Published major works" },
      { year: "1505", event: "Passed away in Cairo" }
    ],
    majorWorks: [
      { title: "Tafsir al-Dur al-Manthur", description: "Comprehensive tafsir of the Quran" },
      { title: "Tafsir al-Jalalayn", description: "Co-authored with Ibn Kathir" },
      { title: "Al-Muwatta", description: "Comprehensive collection of hadith" },
      { title: "Al-Masalik al-Muqaddasa", description: "Comprehensive work on Islamic history" }
    ]
  },
  {
    id: 5,
    name: "Dr. Zakir Naik",
    books: 28,
    specialty: "Comparative Religion",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
    bio: "Contemporary Islamic scholar known for his comparative religious studies and public debates.",
    rating: 4.6,
    fullBio: "Dr. Zakir Abdul Karim Naik is an Indian Islamic televangelist and comparative religion scholar. He is the founder and president of the Islamic Research Foundation. Known for his public debates and ability to quote religious texts verbatim, he has been influential in modern Islamic dawah efforts.",
    birthYear: "1965 CE",
    deathYear: "Present",
    birthPlace: "Mumbai, India",
    achievements: ["Founded Islamic Research Foundation", "Peace TV founder", "Expert in comparative religion"],
    followers: "150M",
    reviews: 5000,
    quotes: [
      "The Quran is the ultimate source of guidance for all matters.",
      "The true scholar is one who seeks knowledge with humility and patience.",
      "The path to knowledge is through the heart, not just the mind."
    ],
    education: ["University of Mumbai", "Studied under renowned scholars", "Mastered multiple Islamic sciences"],
    languages: ["Arabic", "English", "Persian"],
    teachingStyle: "Known for his modern approach and ability to communicate complex Islamic concepts to a global audience. His teaching emphasizes the relevance of Islamic teachings in contemporary society.",
    influences: ["Modern Islamic scholars", "Contemporary Islamic movements"],
    influenced: ["Modern Islamic scholarship", "Islamic education", "Islamic history"],
    timeline: [
      { year: "1965", event: "Born in Mumbai, India" },
      { year: "1980", event: "Began studying under renowned scholars" },
      { year: "1990", event: "Began teaching and writing" },
      { year: "2000", event: "Founded Islamic Research Foundation" },
      { year: "Present", event: "Continues to teach and write" }
    ],
    majorWorks: [
      { title: "The Quran and the Bible", description: "Comparative study of the Quran and Bible" },
      { title: "The Quran and the Torah", description: "Comparative study of the Quran and Torah" },
      { title: "The Quran and the New Testament", description: "Comparative study of the Quran and New Testament" },
      { title: "The Quran and the Christian Bible", description: "Comparative study of the Quran and Christian Bible" }
    ]
  },
  {
    id: 6,
    name: "Maulana Tariq Jameel",
    books: 15,
    specialty: "Islamic Ethics",
    image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=300&h=300&fit=crop",
    bio: "Popular Pakistani scholar known for his lectures on Islamic ethics and spirituality.",
    rating: 4.8,
    fullBio: "Maulana Tariq Jameel is a Pakistani religious scholar and member of the Tablighi Jamaat. He is known for his moving lectures on Islamic ethics, morality, and spirituality. His approach emphasizes love, compassion, and unity among Muslims and humanity at large.",
    birthYear: "1953 CE",
    deathYear: "Present",
    birthPlace: "Tulamba, Pakistan",
    achievements: ["Influential Tablighi scholar", "Known for interfaith dialogue", "Massive social media following"],
    followers: "50M",
    reviews: 10000,
    quotes: [
      "The heart is the seat of all knowledge and wisdom.",
      "The true seeker of knowledge is one who seeks it with humility and sincerity.",
      "The path to knowledge is through the heart, not just the mind."
    ],
    education: ["Studied under renowned scholars", "Studied under Tablighi Jamaat leaders", "Mastered Quranic sciences"],
    languages: ["Arabic", "English", "Persian"],
    teachingStyle: "Known for his deep spiritual insights and emphasis on inner purification. His teachings combined rigorous scholarship with profound mystical understanding.",
    influences: ["Imam Ibn Taymiyyah", "Imam Shafi'i", "Classical Islamic scholars"],
    influenced: ["Modern Islamic psychology", "Spiritual movements", "Islamic education"],
    timeline: [
      { year: "1953", event: "Born in Tulamba, Pakistan" },
      { year: "1970", event: "Began studying under renowned scholars" },
      { year: "1980", event: "Began teaching and writing" },
      { year: "1990", event: "Began public lectures" },
      { year: "Present", event: "Continues to teach and write" }
    ],
    majorWorks: [
      { title: "The Path to Spiritual Perfection", description: "Comprehensive work on Islamic spirituality and ethics" },
      { title: "The Heart of Islam", description: "Comprehensive work on Islamic ethics and morality" },
      { title: "The Quran and the Heart", description: "Comprehensive work on Islamic spirituality and ethics" },
      { title: "The Heart of Islam", description: "Comprehensive work on Islamic ethics and morality" }
    ]
  },
  {
    id: 7,
    name: "Sheikh Yusuf Al-Qaradawi",
    books: 95,
    specialty: "Contemporary Fiqh",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop",
    bio: "Influential contemporary scholar known for his moderate approach to Islamic jurisprudence.",
    rating: 4.7,
    fullBio: "Yusuf al-Qaradawi was an Egyptian Islamic theologian and chairman of the International Union of Muslim Scholars. He was known for his moderate approach to Islamic jurisprudence and his efforts to make Islamic law relevant to contemporary issues. His book 'The Lawful and the Prohibited in Islam' is widely read.",
    birthYear: "1926 CE",
    deathYear: "2022 CE",
    birthPlace: "Saft Turab, Egypt",
    achievements: ["Authored 120+ books", "Pioneered moderate Islamic approach", "Al Jazeera program host"],
    followers: "100M",
    reviews: 8000,
    quotes: [
      "The Quran is the ultimate source of guidance for all matters.",
      "The true scholar is one who seeks knowledge with humility and patience.",
      "The path to knowledge is through the heart, not just the mind."
    ],
    education: ["Cairo University", "Studied under renowned scholars", "Mastered multiple Islamic sciences"],
    languages: ["Arabic", "English", "Persian"],
    teachingStyle: "Known for his modern approach and ability to communicate complex Islamic concepts to a global audience. His teaching emphasizes the relevance of Islamic teachings in contemporary society.",
    influences: ["Modern Islamic scholars", "Contemporary Islamic movements"],
    influenced: ["Modern Islamic scholarship", "Islamic education", "Islamic history"],
    timeline: [
      { year: "1926", event: "Born in Saft Turab, Egypt" },
      { year: "1940", event: "Began studying under renowned scholars" },
      { year: "1960", event: "Began teaching and writing" },
      { year: "1980", event: "Began public lectures" },
      { year: "2022", event: "Passed away in Cairo" }
    ],
    majorWorks: [
      { title: "The Lawful and the Prohibited in Islam", description: "Comprehensive work on Islamic jurisprudence" },
      { title: "The Quran and the Bible", description: "Comparative study of the Quran and Bible" },
      { title: "The Quran and the Torah", description: "Comparative study of the Quran and Torah" },
      { title: "The Quran and the New Testament", description: "Comparative study of the Quran and New Testament" }
    ]
  },
  {
    id: 8,
    name: "Dr. Israr Ahmed",
    books: 32,
    specialty: "Quranic Studies",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop",
    bio: "Pakistani Islamic theologian known for his scholarly approach to Quranic interpretation.",
    rating: 4.8,
    fullBio: "Dr. Israr Ahmed was a Pakistani Islamic theologian, philosopher, and Islamic scholar. He founded the Tanzeem-e-Islami and Anjuman Khuddam-ul-Quran. He was known for his unique approach to Quranic tafsir and his emphasis on understanding the Quran in its historical and thematic context.",
    birthYear: "1932 CE",
    deathYear: "2010 CE",
    birthPlace: "Hisar, British India",
    achievements: ["Founded Tanzeem-e-Islami", "Pioneering Quranic lectures", "Published extensive tafsir"],
    followers: "50M",
    reviews: 1200,
    quotes: [
      "The heart is the seat of all knowledge and wisdom.",
      "The true seeker of knowledge is one who seeks it with humility and sincerity.",
      "The path to knowledge is through the heart, not just the mind."
    ],
    education: ["Studied under renowned scholars", "Studied under Tablighi Jamaat leaders", "Mastered Quranic sciences"],
    languages: ["Arabic", "English", "Persian"],
    teachingStyle: "Known for his deep spiritual insights and emphasis on inner purification. His teachings combined rigorous scholarship with profound mystical understanding.",
    influences: ["Imam Ibn Taymiyyah", "Imam Shafi'i", "Classical Islamic scholars"],
    influenced: ["Modern Islamic psychology", "Spiritual movements", "Islamic education"],
    timeline: [
      { year: "1932", event: "Born in Hisar, British India" },
      { year: "1950", event: "Began studying under renowned scholars" },
      { year: "1960", event: "Began teaching and writing" },
      { year: "1980", event: "Began public lectures" },
      { year: "2010", event: "Passed away in Lahore" }
    ],
    majorWorks: [
      { title: "The Path to Spiritual Perfection", description: "Comprehensive work on Islamic spirituality and ethics" },
      { title: "The Heart of Islam", description: "Comprehensive work on Islamic ethics and morality" },
      { title: "The Quran and the Heart", description: "Comprehensive work on Islamic spirituality and ethics" },
      { title: "The Heart of Islam", description: "Comprehensive work on Islamic ethics and morality" }
    ]
  },
];

// Default extended data for authors without full data
const defaultExtendedData = {
  followers: "500K",
  reviews: 500,
  quotes: [
    "Seek knowledge from the cradle to the grave.",
    "The best of you are those who learn and teach.",
    "Actions are judged by intentions."
  ],
  education: ["Traditional Islamic Education", "Studied under local scholars"],
  languages: ["Arabic"],
  teachingStyle: "Traditional teaching methodology with emphasis on classical texts.",
  influences: ["Classical Islamic scholars"],
  influenced: ["Students and followers worldwide"],
  timeline: [
    { year: "Early Life", event: "Began seeking knowledge" },
    { year: "Youth", event: "Studied under renowned scholars" },
    { year: "Maturity", event: "Began teaching and writing" }
  ],
  majorWorks: [
    { title: "Various Works", description: "Authored numerous works on Islamic sciences" }
  ]
};

const sampleBooks = [
  { id: 1, title: "Kitab Al-Iman", price: 24.99, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop", rating: 4.8 },
  { id: 2, title: "Al-Aqidah Al-Wasitiyyah", price: 19.99, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop", rating: 4.9 },
  { id: 3, title: "Majmu' Al-Fatawa", price: 89.99, image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&h=300&fit=crop", rating: 4.7 },
  { id: 4, title: "Minhaj As-Sunnah", price: 34.99, image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=200&h=300&fit=crop", rating: 4.8 },
  { id: 5, title: "Ar-Risalah", price: 29.99, image: "https://images.unsplash.com/photo-1509266272358-7701da638078?w=200&h=300&fit=crop", rating: 4.6 },
  { id: 6, title: "Fiqh As-Sunnah", price: 39.99, image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=200&h=300&fit=crop", rating: 4.9 },
];

const AuthorDetails = () => {
  const { id } = useParams();
  const baseAuthor = authors.find((a) => a.id === Number(id)) || authors[0];
  const author = { ...defaultExtendedData, ...baseAuthor };

  if (!baseAuthor) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground">Author not found</h1>
          <Link to="/writers" className="text-primary hover:underline mt-4 inline-block">
            Back to Authors
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/80 py-16 overflow-hidden">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-gold rotate-45" />
          <div className="absolute bottom-10 right-10 w-48 h-48 border-4 border-gold rotate-12" />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 border-2 border-gold rounded-full" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/writers" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-8">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Authors</span>
          </Link>
          
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Author Image */}
            <div className="relative flex-shrink-0">
              <div className="relative">
                <img 
                  src={author.image} 
                  alt={author.name}
                  className="w-56 h-56 lg:w-72 lg:h-72 object-cover rounded-2xl border-4 border-gold shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-gold text-dark px-4 py-2 rounded-xl text-lg font-bold flex items-center gap-2 shadow-lg">
                  <Star className="h-5 w-5 fill-current" />
                  {author.rating}
                </div>
              </div>
              
              {/* Social Stats */}
              <div className="flex gap-4 mt-6 justify-center">
                <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-primary-foreground hover:bg-white/20">
                  <Heart className="h-4 w-4 mr-2" />
                  Follow
                </Button>
                <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-primary-foreground hover:bg-white/20">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
            
            {/* Author Info */}
            <div className="flex-1 text-primary-foreground">
              <div className="flex items-center gap-3 mb-3">
                <Badge className="bg-gold/20 text-gold border-gold/30 text-sm">
                  <PenTool className="h-3 w-3 mr-1" />
                  {author.specialty}
                </Badge>
                <Badge className="bg-white/10 border-white/20 text-primary-foreground">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified Scholar
                </Badge>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 font-heading">{author.name}</h1>
              
              <div className="flex flex-wrap gap-6 mb-6 text-primary-foreground/80">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{author.birthYear} - {author.deathYear}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{author.birthPlace}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span>{author.books} Published Works</span>
                </div>
              </div>
              
              <p className="text-primary-foreground/90 leading-relaxed text-lg max-w-3xl">
                {author.fullBio}
              </p>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                <Card className="bg-white/10 border-white/20 p-4 text-center">
                  <BookOpen className="h-6 w-6 mx-auto mb-2 text-gold" />
                  <p className="text-2xl font-bold text-primary-foreground">{author.books}</p>
                  <p className="text-sm text-primary-foreground/70">Books</p>
                </Card>
                <Card className="bg-white/10 border-white/20 p-4 text-center">
                  <Users className="h-6 w-6 mx-auto mb-2 text-gold" />
                  <p className="text-2xl font-bold text-primary-foreground">{author.followers}</p>
                  <p className="text-sm text-primary-foreground/70">Followers</p>
                </Card>
                <Card className="bg-white/10 border-white/20 p-4 text-center">
                  <MessageCircle className="h-6 w-6 mx-auto mb-2 text-gold" />
                  <p className="text-2xl font-bold text-primary-foreground">{author.reviews}</p>
                  <p className="text-sm text-primary-foreground/70">Reviews</p>
                </Card>
                <Card className="bg-white/10 border-white/20 p-4 text-center">
                  <Star className="h-6 w-6 mx-auto mb-2 text-gold" />
                  <p className="text-2xl font-bold text-primary-foreground">{author.rating}</p>
                  <p className="text-sm text-primary-foreground/70">Rating</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-14 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-1 bg-primary rounded" />
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground font-heading flex items-center gap-3">
              <Award className="h-7 w-7 text-primary" />
              Key Achievements
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {author.achievements.map((achievement, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary bg-card hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-foreground font-medium text-lg">{achievement}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Famous Quotes Section */}
      <section className="py-14 bg-gradient-to-r from-primary/5 via-transparent to-primary/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-1 bg-primary rounded" />
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground font-heading flex items-center gap-3">
              <Quote className="h-7 w-7 text-primary" />
              Famous Quotes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {author.quotes.map((quote, index) => (
              <Card key={index} className="p-8 bg-card hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <Quote className="absolute top-4 right-4 h-12 w-12 text-primary/10 group-hover:text-primary/20 transition-colors" />
                <p className="text-foreground italic text-lg leading-relaxed relative z-10">"{quote}"</p>
                <p className="text-primary font-semibold mt-4">— {author.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Section: Biography, Education, Timeline */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="biography" className="w-full">
            <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0 h-auto flex-wrap">
              <TabsTrigger 
                value="biography"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4 text-base"
              >
                Biography
              </TabsTrigger>
              <TabsTrigger 
                value="education"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4 text-base"
              >
                Education & Languages
              </TabsTrigger>
              <TabsTrigger 
                value="timeline"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4 text-base"
              >
                Life Timeline
              </TabsTrigger>
              <TabsTrigger 
                value="influence"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4 text-base"
              >
                Influence
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="biography" className="pt-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <PenTool className="h-5 w-5 text-primary" />
                    Teaching Style
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{author.teachingStyle}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {author.languages.map((lang, idx) => (
                      <Badge key={idx} variant="secondary" className="text-sm px-3 py-1">{lang}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="education" className="pt-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Education
                  </h3>
                  <ul className="space-y-3">
                    {author.education.map((edu, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        {edu}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Languages Mastered
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {author.languages.map((lang, idx) => (
                      <Card key={idx} className="px-4 py-2 bg-muted/50">
                        <span className="font-medium">{lang}</span>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="timeline" className="pt-8">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20" />
                <div className="space-y-6">
                  {author.timeline.map((item, idx) => (
                    <div key={idx} className="relative pl-12">
                      <div className="absolute left-2 w-5 h-5 rounded-full bg-primary border-4 border-background" />
                      <Card className="p-4 hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-3 mb-1">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="font-bold text-primary">{item.year}</span>
                        </div>
                        <p className="text-foreground">{item.event}</p>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="influence" className="pt-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Influenced By
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {author.influences.map((inf, idx) => (
                      <Badge key={idx} variant="outline" className="text-sm px-3 py-1">{inf}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Legacy & Influence
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {author.influenced.map((inf, idx) => (
                      <Badge key={idx} className="text-sm px-3 py-1 bg-primary/10 text-primary border-primary/20">{inf}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Major Works Section */}
      <section className="py-14 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-1 bg-primary rounded" />
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground font-heading flex items-center gap-3">
              <BookOpen className="h-7 w-7 text-primary" />
              Major Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {author.majorWorks.map((work, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-xl font-bold text-foreground mb-2">{work.title}</h3>
                <p className="text-muted-foreground">{work.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-1 bg-primary rounded" />
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground font-heading flex items-center gap-3">
                <BookOpen className="h-7 w-7 text-primary" />
                Books by {author.name.split(" ")[0]}
              </h2>
            </div>
            <Button variant="outline" className="hidden md:flex">View All Books</Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {sampleBooks.map((book) => (
              <Link to={`/book/${book.id}`} key={book.id}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                  <div className="aspect-[2/3] overflow-hidden relative">
                    <img 
                      src={book.image} 
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-gold text-dark px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      {book.rating}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground line-clamp-1 text-sm">{book.title}</h3>
                    <p className="text-primary font-bold mt-1">${book.price}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="mt-6 text-center md:hidden">
            <Button variant="outline">View All Books</Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-4 font-heading">
            Explore More Islamic Scholars
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
            Discover the wisdom and teachings of renowned Islamic scholars throughout history.
          </p>
          <Link to="/writers">
            <Button size="lg" className="bg-gold text-dark hover:bg-gold/90">
              View All Authors
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AuthorDetails;
