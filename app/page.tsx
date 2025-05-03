"use client"
import { useState, useRef, useEffect } from "react" // Added useEffect
import Image from "next/image"; // Import Image
import Link from "next/link"; // Import Link
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence
import {
  ChevronRight,
  Globe,
  Search,
  Bell,
  User,
  Play,
  Plus,
  ThumbsUp,
  Share,
  Bookmark,
  MessageCircle,
  Video,
  Mic,
  X,
  Shuffle,
  Smile,
  Frown,
  Coffee,
  Flame,
  ChevronDown,
  Calendar,
  Trophy,
  Volume2,
  VolumeX,
  Check,
  Users,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import confetti from "canvas-confetti" // Import confetti

// Define interfaces for voting data
interface EpisodeOption {
  id: number;
  title: string;
  votes: number;
}

interface VotingSeries {
  id: number;
  series: string;
  season: number;
  episodeOptions: EpisodeOption[];
  votingEndsIn: string;
  releaseDate: string;
}

// Movie data
const movieData = [
  {
    id: 1,
    title: "Stranger Things",
    image: "/images/stranger-things.jpg",
    banner: "/images/stranger-things.jpg", // Assuming banner is same as image for now
    description:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    year: 2016,
    rating: "16+",
    seasons: 4,
    genre: ["Sci-Fi", "Horror", "Drama"],
    match: 98,
    isTrending: true,
    isFree: false,
    rentPrice: 4.99,
    music: ["Synth Wave", "80s Classics", "Suspense"],
    mood: ["Chill", "Angry"],
  },
  {
    id: 2,
    title: "The Crown",
    image: "/images/the-crown.jpeg",
    banner: "/images/the-crown.jpeg", // Assuming banner is same as image for now
    description:
      "This drama follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century.",
    year: 2016,
    rating: "16+",
    seasons: 5,
    genre: ["Drama", "Historical", "Biography"],
    match: 95,
    isTrending: true,
    isFree: false,
    rentPrice: 3.99,
    music: ["Classical", "Orchestral", "Royal"],
    mood: ["Chill", "Sad"],
  },
  {
    id: 3,
    title: "Money Heist",
    image: "/images/money-heist.jpeg",
    banner: "/images/money-heist.jpeg", // Assuming banner is same as image for now
    description:
      "Eight thieves take hostages and lock themselves in the Royal Mint of Spain as a criminal mastermind manipulates the police to carry out his plan.",
    year: 2017,
    rating: "18+",
    seasons: 5,
    genre: ["Crime", "Thriller", "Drama"],
    match: 92,
    isTrending: true,
    isFree: false,
    rentPrice: 4.99,
    music: ["Spanish Pop", "Tension", "Heist"],
    mood: ["Angry", "Happy"],
  },
  {
    id: 4,
    title: "Squid Game",
    image: "/images/squid-game.jpeg",
    banner: "/images/squid-game.jpeg", // Assuming banner is same as image for now
    description:
      "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits — with deadly high stakes.",
    year: 2021,
    rating: "18+",
    seasons: 1,
    genre: ["Thriller", "Drama", "Survival"],
    match: 97,
    isTrending: true,
    isFree: false,
    rentPrice: 5.99,
    music: ["Korean Pop", "Suspense", "Dramatic"],
    mood: ["Angry", "Sad"],
  },
  {
    id: 5,
    title: "Breaking Bad",
    image: "/images/breaking-bad.jpeg",
    banner: "/images/breaking-bad.jpeg", // Assuming banner is same as image for now
    description:
      "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
    year: 2008,
    rating: "18+",
    seasons: 5,
    genre: ["Crime", "Drama", "Thriller"],
    match: 96,
    isTrending: false,
    isFree: true,
    rentPrice: 0,
    music: ["Rock", "Desert Blues", "Tension"],
    mood: ["Angry", "Sad"],
  },
  {
    id: 6,
    title: "The Witcher",
    image: "/images/the-witcher.jpeg",
    banner: "/images/the-witcher.jpeg", // Assuming banner is same as image for now
    description:
      "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.",
    year: 2019,
    rating: "18+",
    seasons: 2,
    genre: ["Fantasy", "Action", "Adventure"],
    match: 91,
    isTrending: false,
    isFree: false,
    rentPrice: 4.99,
    music: ["Fantasy", "Medieval", "Epic"],
    mood: ["Chill", "Happy"],
  },
  {
    id: 7,
    title: "Friends",
    image: "/images/friends.jpeg",
    banner: "/images/friends.jpeg", // Assuming banner is same as image for now
    description:
      "Six young people from New York City, on their own and struggling to survive in the real world, find the companionship, comfort and support they get from each other to be the perfect solution to the pressures of life.",
    year: 1994,
    rating: "13+",
    seasons: 10,
    genre: ["Comedy", "Romance"],
    match: 94,
    isTrending: false,
    isFree: true,
    rentPrice: 0,
    music: ["90s Pop", "Sitcom", "Upbeat"],
    mood: ["Happy", "Chill"],
  },
  {
    id: 8,
    title: "Dark",
    image: "/images/dark.jpeg",
    banner: "/images/dark.jpeg", // Assuming banner is same as image for now
    description:
      "A missing child sets four families on a frantic hunt for answers as they unearth a mind-bending mystery that spans three generations.",
    year: 2017,
    rating: "16+",
    seasons: 3,
    genre: ["Sci-Fi", "Thriller", "Mystery"],
    match: 93,
    isTrending: false,
    isFree: false,
    rentPrice: 3.99,
    music: ["German Rock", "Eerie", "Time Travel"],
    mood: ["Sad", "Angry"],
  },
]

// Social posts data
const initialSocialPosts = [
  {
    id: 1,
    user: {
      name: "Jessica",
      avatar: "/placeholder-user.jpg", // Keep placeholder for user avatar
    },
    movie: movieData[0], // Uses Stranger Things data
    caption: "Watching Stranger Things for the 3rd time! Can't get enough of this show! 🍿👻",
    likes: 245,
    comments: 32,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    user: {
      name: "Michael",
      avatar: "/placeholder-user.jpg", // Keep placeholder for user avatar
    },
    movie: movieData[3], // Uses Squid Game data
    caption: "Squid Game is mind-blowing! Anyone else watching? No spoilers please! 🦑🎮",
    likes: 189,
    comments: 27,
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    user: {
      name: "Sarah",
      avatar: "/placeholder-user.jpg", // Keep placeholder for user avatar
    },
    movie: movieData[1], // Uses The Crown data
    caption: "The Crown season 5 is absolutely brilliant. The casting is perfect! 👑✨",
    likes: 312,
    comments: 41,
    timestamp: "1 day ago",
  },
];

// Favorite movies
// const favoriteMovies = [movieData[0], movieData[3], movieData[5]] // Stranger Things, Squid Game, The Witcher

// Watchlist
// const watchlistMovies = [movieData[1], movieData[2], movieData[7]] // The Crown, Money Heist, Friends

// Mood themes
const moodThemes = {
  Happy: {
    primary: "#FFD700", // Gold
    secondary: "#FF8C00", // Dark Orange
    gradient: "linear-gradient(to bottom, #FFD700, #FF8C00, #000000)",
    cardStyle: "border-yellow-400 shadow-lg shadow-yellow-400/20",
    icon: <Smile className="h-5 w-5" />,
    animation: "confetti",
  },
  Sad: {
    primary: "#4682B4", // Steel Blue
    secondary: "#191970", // Midnight Blue
    gradient: "linear-gradient(to bottom, #4682B4, #191970, #000000)",
    cardStyle: "border-blue-400 shadow-lg shadow-blue-400/20",
    icon: <Frown className="h-5 w-5" />,
    animation: "rain",
  },
  Chill: {
    primary: "#9370DB", // Medium Purple
    secondary: "#483D8B", // Dark Slate Blue
    gradient: "linear-gradient(to bottom, #9370DB, #483D8B, #000000)",
    cardStyle: "border-purple-400 shadow-lg shadow-purple-400/20",
    icon: <Coffee className="h-5 w-5" />,
    animation: "fade",
  },
  Angry: {
    primary: "#FF4500", // Orange Red
    secondary: "#8B0000", // Dark Red
    gradient: "linear-gradient(to bottom, #FF4500, #8B0000, #000000)",
    cardStyle: "border-red-400 shadow-lg shadow-red-400/20",
    icon: <Flame className="h-5 w-5" />,
    animation: "shake",
  },
}

// Character themes
const characterThemes = {
  Default: {
    primary: "#e50914",
    secondary: "#000000",
    gradient: "linear-gradient(to bottom, #000000, #000000)",
    font: "'Inter', sans-serif",
    backgroundImage: "",
    music: "",
  },
  Barbie: {
    primary: "#FF69B4", // Hot Pink
    secondary: "#FFB6C1", // Light Pink
    gradient: "linear-gradient(to bottom, #FF69B4, #FFB6C1, #000000)",
    font: "'Comic Sans MS', cursive",
    backgroundImage: "/images/Barbie.jpg", // Changed to Barbie.jpg
    music: "https://example.com/barbie-theme.mp3",
  },
  Batman: {
    primary: "#4B0082", // Indigo
    secondary: "#000000", // Black
    gradient: "linear-gradient(to bottom, #4B0082, #000000, #000000)",
    font: "'Gotham', sans-serif",
    backgroundImage: "/images/Batman.jpg", // Changed to Batman.jpg
    music: "https://example.com/batman-theme.mp3",
  },
  "Spider-Man": {
    primary: "#FF0000", // Red
    secondary: "#0000FF", // Blue
    gradient: "linear-gradient(to bottom, #FF0000, #0000FF, #000000)",
    font: "'Arial', sans-serif",
    backgroundImage: "/images/Spider-Man.jpg", // Changed to Spider-Man.jpg
    music: "https://example.com/spiderman-theme.mp3",
  },
  "Stranger Things": {
    primary: "#B22222", // Firebrick
    secondary: "#000000", // Black
    gradient: "linear-gradient(to bottom, #B22222, #000000, #000000)",
    font: "'Benguiat', serif",
    backgroundImage: "/images/stranger-things.jpg",
    music: "https://example.com/stranger-things-theme.mp3",
  },
}

// Community voting data - Apply the type here
const votingData: VotingSeries[] = [
  {
    id: 1,
    series: "Stranger Things",
    season: 5,
    episodeOptions: [
      { id: 1, title: "The Upside Down Returns", votes: 1245 },
      { id: 2, title: "Hawkins Lab Secrets", votes: 876 },
      { id: 3, title: "Eleven's Journey", votes: 1532 },
    ],
    votingEndsIn: "2 days",
    releaseDate: "June 15, 2023",
  },
  {
    id: 2,
    series: "The Witcher",
    season: 3,
    episodeOptions: [
      { id: 1, title: "Geralt's Past", votes: 987 },
      { id: 2, title: "Ciri's Training", votes: 1123 },
      { id: 3, title: "The Wild Hunt", votes: 765 },
    ],
    votingEndsIn: "5 days",
    releaseDate: "July 22, 2023",
  },
  {
    id: 3,
    series: "Squid Game",
    season: 2,
    episodeOptions: [
      { id: 1, title: "New Games Begin", votes: 2134 },
      { id: 2, title: "Player 456 Returns", votes: 1876 },
      { id: 3, title: "Behind the Masks", votes: 1543 },
    ],
    votingEndsIn: "1 day",
    releaseDate: "August 10, 2023",
  },
]

const faqData = [
  { question: "What is Netflix?", answer: "Netflix is a streaming service..." },
  { question: "How much does Netflix cost?", answer: "Watch Netflix on your smartphone..." },
  { question: "Where can I watch?", answer: "Netflix has an extensive library..." },
  { question: "How do I cancel?", answer: "Netflix is flexible..." },
  { question: "What can I watch on Netflix?", answer: "Watch anywhere, anytime..." },
  { question: "Is Netflix good for kids?", answer: "The Netflix Kids experience..." },
];

// Helper function to get recommendations based on liked movies
const getMusicRecommendationsFromLiked = (likedMovies) => {
  const recommendations = [];
  likedMovies.forEach(movie => {
    if (movie.music && movie.music.length > 0) {
      recommendations.push({
        movie: movie, // Keep the movie object
        styles: movie.music, // Get music styles from the movie data
      });
    }
  });
  // Add a few generic ones if needed, or based on overall genre preferences
  // For now, just based on liked movies
  return recommendations.slice(0, 10); // Limit recommendations
};

// --- Location Scouting Challenge Data ---
const locationChallenges = [
  {
    id: 1,
    movieId: 1, // Stranger Things
    scene: "Hawkins Middle School exterior",
    clueImage: "/images/stranger-things-location.jpg", // Add this image to public/images
    correctLatLng: { lat: 33.6405, lng: -84.4277 }, // Example: Atlanta, GA
    userSubmissions: [], // { user: string, lat: number, lng: number, photoUrl?: string }
    leaderboard: [], // { user: string, points: number }
  },
  // Add more challenges for other movies
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [themeColor, setThemeColor] = useState({ primary: "#e50914", secondary: "#000000" })
  const [showWatchlist, setShowWatchlist] = useState(false)
  const [showMiniPlayer, setShowMiniPlayer] = useState(false)
  const [miniPlayerMovie, setMiniPlayerMovie] = useState(null)
  const [wheelSpinning, setWheelSpinning] = useState(false)
  const [randomMovie, setRandomMovie] = useState(null)
  const [selectedMood, setSelectedMood] = useState(null)
  const [selectedCharacter, setSelectedCharacter] = useState("Default")
  const [moodTransitioning, setMoodTransitioning] = useState(false)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [userVotes, setUserVotes] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false) // State to control view
  const [email, setEmail] = useState(""); // <-- Add state for email
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0); // State for banner carousel
  const wheelRef = useRef(null)
  const audioRef = useRef(null)
  // Create ref with explicit HTMLDivElement type
  const miniPlayerContainerRef = useRef<HTMLDivElement | null>(null);
  const [watchlistMovies, setWatchlistMovies] = useState([])
  const [favoriteMovies, setFavoriteMovies] = useState([])

  const [showLocationChallenge, setShowLocationChallenge] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState(null); // Holds the current challenge object
  const [userGuess, setUserGuess] = useState(null); // { lat, lng }
  const [challengeMessage, setChallengeMessage] = useState("");

  const [socialPosts, setSocialPosts] = useState(initialSocialPosts);
  // Like handler for social feed
  const handleLike = (postId) => {
    setSocialPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  // --- START: Simulate Liked Movies & Generate Music Recommendations ---
  // Simulate liked movies (e.g., first 3 movies or based on favorites/watchlist if implemented)
  // In a real app, this would come from user data
  const simulatedLikedMovies = movieData.slice(0, 3); // Example: Stranger Things, The Crown, Money Heist

  // Generate recommendations based on simulated liked movies
  const musicRecommendations = getMusicRecommendationsFromLiked(simulatedLikedMovies);
  // --- END: Simulate Liked Movies & Generate Music Recommendations ---

  // Function to handle "Get Started" click
  const handleGetStarted = () => {
    console.log("Get Started clicked. Email:", email); // <-- Log email
    // Add potential email validation logic here if needed
    if (email) { // Basic check if email is not empty
      setIsLoggedIn(true)
    } else {
      // Optionally, show an error message if email is required
      console.warn("Email is required to get started.");
      // You might want to add user feedback here (e.g., using a toast notification)
    }
  }

  // Function to handle mood selection
  const handleMoodSelect = (mood) => {
    if (selectedMood === mood) {
      setSelectedMood(null)
      setThemeColor({ primary: "#e50914", secondary: "#000000" })
      return
    }

    setMoodTransitioning(true)

    // Trigger mood-specific animation
    if (mood === "Happy" && moodThemes[mood].animation === "confetti") {
      triggerConfetti()
    }

    setTimeout(() => {
      setSelectedMood(mood)
      setThemeColor({
        primary: moodThemes[mood].primary,
        secondary: moodThemes[mood].secondary,
      })
      setMoodTransitioning(false)
    }, 300)
  }

  // Function to trigger confetti animation
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FFD700", "#FF8C00", "#FF4500"],
    })
  }

  // Function to handle character theme selection
  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character)

    if (character === "Default") {
      setThemeColor({ primary: "#e50914", secondary: "#000000" })
      if (audioRef.current) {
        audioRef.current.pause()
        setAudioPlaying(false)
      }
    } else {
      setThemeColor({
        primary: characterThemes[character].primary,
        secondary: characterThemes[character].secondary,
      })

      // Handle audio
      if (audioRef.current && characterThemes[character].music) {
        audioRef.current.src = characterThemes[character].music
        audioRef.current.load()
        if (audioPlaying) {
          audioRef.current.play()
        }
      }
    }
  }

  // Function to toggle audio
  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setAudioPlaying(!audioPlaying)
    }
  }

  // Function to handle voting
  const handleVote = (seriesId, optionId) => {
    // Check if user has already voted for this series
    if (userVotes[seriesId]) {
      return
    }

    // Update voting data
    const updatedVotingData = votingData.map((series) => {
      if (series.id === seriesId) {
        const updatedOptions = series.episodeOptions.map((option) => {
          if (option.id === optionId) {
            return { ...option, votes: option.votes + 1 }
          }
          return option
        })
        return { ...series, episodeOptions: updatedOptions }
      }
      return series
    })

    // Update user votes
    setUserVotes({ ...userVotes, [seriesId]: optionId })
  }

  // Function to handle movie hover for dynamic theming
  const handleMovieHover = (movie) => {
    // Only apply hover effects if no mood or character is selected
    if (!selectedMood && selectedCharacter === "Default") {
      // In a real implementation, we would extract colors from the movie poster
      // For this demo, we'll use predefined colors based on movie genres
      if (movie.genre.includes("Horror") || movie.genre.includes("Thriller")) {
        setThemeColor({ primary: "#ff0000", secondary: "#1a0000" })
      } else if (movie.genre.includes("Sci-Fi")) {
        setThemeColor({ primary: "#0066ff", secondary: "#000033" })
      } else if (movie.genre.includes("Comedy")) {
        setThemeColor({ primary: "#ffcc00", secondary: "#332600" })
      } else if (movie.genre.includes("Drama")) {
        setThemeColor({ primary: "#9900cc", secondary: "#1a0022" })
      } else {
        setThemeColor({ primary: "#e50914", secondary: "#000000" })
      }
    }
  }

  // Function to reset theme color
  const resetThemeColor = () => {
    if (!selectedMood && selectedCharacter === "Default") {
      setThemeColor({ primary: "#e50914", secondary: "#000000" })
    }
  }

  // Function to handle mini player
  const handleMiniPlayer = (movie) => {
    setMiniPlayerMovie(movie)
    setShowMiniPlayer(true)
  }

  // Function to spin the wheel
  const spinWheel = () => {
    if (wheelSpinning) return

    setWheelSpinning(true)

    // Random rotation between 2 and 10 full spins
    const spins = 2 + Math.random() * 8
    const degrees = spins * 360

    if (wheelRef.current) {
      wheelRef.current.style.transition = "transform 3s cubic-bezier(0.1, 0.7, 0.1, 1)"
      wheelRef.current.style.transform = `rotate(${degrees}deg)`
    }

    // Select a random movie after spinning
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * movieData.length)
      setRandomMovie(movieData[randomIndex])
      setWheelSpinning(false)

      // Reset wheel position after a delay
      setTimeout(() => {
        if (wheelRef.current) {
          wheelRef.current.style.transition = "none"
          wheelRef.current.style.transform = "rotate(0deg)"
        }
      }, 500)
    }, 3000)
  }

  // Filter movies based on active tab and mood
  const filteredMovies = movieData.filter((movie) => {
    // First filter by tab
    let passesTabFilter = true
    if (activeTab === "all") passesTabFilter = true
    else if (activeTab === "free") passesTabFilter = movie.isFree
    else if (activeTab === "trending") passesTabFilter = movie.isTrending
    else passesTabFilter = movie.genre.includes(activeTab)

    // Then filter by mood if selected
    let passesMoodFilter = true
    if (selectedMood) {
      passesMoodFilter = movie.mood && movie.mood.includes(selectedMood)
    }

    return passesTabFilter && passesMoodFilter
  })

  // Filter movies based on search query
  const searchResults = searchQuery
    ? movieData.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.genre.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    : []

  // Calculate total votes for each voting option - Add type annotation
  const calculateTotalVotes = (options: EpisodeOption[]) => {
    return options.reduce((total, option) => total + option.votes, 0)
  }

  // Get background style based on selected character
  const getBackgroundStyle = () => {
    if (selectedCharacter !== "Default" && characterThemes[selectedCharacter].backgroundImage) {
      return {
        backgroundImage: `url(${characterThemes[selectedCharacter].backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "overlay",
        backgroundRepeat: "no-repeat", // Prevent background image from repeating
      }
    }
    return {}
  }

  // Get font style based on selected character
  const getFontStyle = () => {
    if (selectedCharacter !== "Default") {
      return {
        fontFamily: characterThemes[selectedCharacter].font,
      }
    }
    return {}
  }

  // Get gradient style based on selected mood or character
  const getGradientStyle = () => {
    if (selectedMood) {
      return {
        backgroundImage: moodThemes[selectedMood].gradient,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    } else if (selectedCharacter !== "Default") {
      return {
        backgroundImage: characterThemes[selectedCharacter].gradient,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    }
    return {
      backgroundImage: `linear-gradient(to bottom, ${themeColor.secondary}, #000000)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  }

  // Define default theme for landing page explicitly
  const landingThemeColor = { primary: "#e50914", secondary: "#000000" };

  // Get the current movie for the banner
  const currentBannerMovie = movieData[currentBannerIndex];

  // Effect for banner image carousel
  useEffect(() => {
    if (isLoggedIn) { // Only run carousel when logged in
      const intervalId = setInterval(() => {
        setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % movieData.length);
      }, 2000); // Change image every 2 seconds

      return () => clearInterval(intervalId); // Cleanup interval on component unmount or when logged out
    }
  }, [isLoggedIn]); // Re-run effect if login status changes

  // Helper for wheel segment positions
  const getWheelSegmentStyle = (index, total, radius = 120) => {
    const angle = (index / total) * 2 * Math.PI
    const x = Math.cos(angle - Math.PI / 2) * radius
    const y = Math.sin(angle - Math.PI / 2) * radius
    return {
      position: 'absolute',
      left: `calc(50% + ${x}px - 32px)`,
      top: `calc(50% + ${y}px - 48px)`,
      width: '64px',
      height: '96px',
      transform: `rotate(${(index / total) * 360}deg)`
    }
  }

  // Add/remove movie from watchlist
  const toggleWatchlist = (movie) => {
    setWatchlistMovies((prev) => {
      if (prev.some((m) => m.id === movie.id)) {
        return prev.filter((m) => m.id !== movie.id)
      } else {
        return [...prev, movie]
      }
    })
  }

  // Add/remove movie from favorites
  const toggleFavorite = (movie) => {
    setFavoriteMovies((prev) => {
      if (prev.some((m) => m.id === movie.id)) {
        return prev.filter((m) => m.id !== movie.id)
      } else {
        return [...prev, movie]
      }
    })
  }

  // Function to share watchlist with others
  const shareWatchlist = () => {
    if (watchlistMovies.length === 0) return;

    // Create a shareable text with the watchlist contents
    const shareText = `Check out my Netflix watchlist!\n\n${watchlistMovies.map(movie => 
      `${movie.title} (${movie.year}) - ${movie.genre.join(', ')}`
    ).join('\n\n')}`;

    // If Web Share API is available, use it for native sharing
    if (navigator.share) {
      navigator.share({
        title: 'My Netflix Watchlist',
        text: shareText,
        // In a real app, this would be a deep link to the actual list
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(shareText)
        .then(() => {
          alert('Watchlist copied to clipboard! You can now paste and share it.');
        })
        .catch((error) => {
          console.error('Failed to copy: ', error);
          // If clipboard fails, show the text in an alert as last resort
          alert(`Copy this text to share your watchlist:\n\n${shareText}`);
        });
    }
  }

  // Function to open the challenge for a movie
  const openLocationChallenge = (movie) => {
    const challenge = locationChallenges.find((c) => c.movieId === movie.id);
    if (challenge) {
      setActiveChallenge(challenge);
      setShowLocationChallenge(true);
      setUserGuess(null);
      setChallengeMessage("");
    }
  };

  // Function to handle user pin on map (stub, to be replaced with map integration)
  const handleMapPin = (lat, lng) => {
    setUserGuess({ lat, lng });
    // Calculate distance to correct location (simple Haversine formula or similar)
    // For now, just check if within ~50km
    if (activeChallenge) {
      const dLat = (lat - activeChallenge.correctLatLng.lat);
      const dLng = (lng - activeChallenge.correctLatLng.lng);
      const distance = Math.sqrt(dLat * dLat + dLng * dLng) * 111; // rough km
      if (distance < 50) {
        setChallengeMessage("Correct! You found the filming location! 🏆");
        // Add to leaderboard (stub)
      } else {
        setChallengeMessage("Not quite! Try again or zoom in for a closer guess.");
      }
    }
  };

  // Function to submit a new location (stub)
  const submitUserLocation = (lat, lng, photoUrl) => {
    // Add to userSubmissions (stub)
    setChallengeMessage("Thanks for your submission! Moderators will review it.");
  };

  // Red button handlers
  const handleRedButtonClick = (url = 'https://netflix.com') => {
    window.open(url, '_blank');
  };

  // --- Trailer Roulette State and Audio ---
  const [showRoulette, setShowRoulette] = useState(false);
  const [rouletteMovie, setRouletteMovie] = useState(null);
  const [roulettePlaying, setRoulettePlaying] = useState(false);
  const rouletteAudioRef = useRef(null);

  // Play static+swoosh audio cue
  const playRouletteAudioCue = () => {
    if (rouletteAudioRef.current) {
      rouletteAudioRef.current.currentTime = 0;
      rouletteAudioRef.current.play();
    }
  };

  // Open Trailer Roulette
  const openTrailerRoulette = () => {
    setRouletteMovie(null);
    setShowRoulette(true);
    setRoulettePlaying(false);
    setTimeout(() => {
      // Pick a random movie
      const randomIdx = Math.floor(Math.random() * movieData.length);
      setRouletteMovie(movieData[randomIdx]);
      playRouletteAudioCue();
      setTimeout(() => setRoulettePlaying(true), 600); // Delay for effect
    }, 400);
  };

  // Next Trailer
  const nextRouletteTrailer = () => {
    setRoulettePlaying(false);
    setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * movieData.length);
      setRouletteMovie(movieData[randomIdx]);
      playRouletteAudioCue();
      setTimeout(() => setRoulettePlaying(true), 600);
    }, 400);
  };

  // Add to Watchlist from Roulette
  const addRouletteToWatchlist = () => {
    if (rouletteMovie) toggleWatchlist(rouletteMovie);
    setShowRoulette(false);
  };

  return (
    <div
      className="min-h-screen bg-black text-white transition-all duration-500"
      style={isLoggedIn ? { ...getGradientStyle(), ...getBackgroundStyle(), ...getFontStyle() } : { background: 'black' }}
    >
      {!isLoggedIn ? (
        // Landing Page View
        <>
          {/* Simplified Header for Landing Page */}
          <header className="fixed top-0 w-full z-50 flex items-center justify-between px-4 md:px-12 py-4 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm">
            <Link href="/" className="mr-8">
              <svg viewBox="0 0 111 30" className="h-[1.5rem] w-[5.5rem] text-[#e50914] fill-current">
                {/* ... (SVG path data remains the same) ... */}
                <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"></path>
              </svg>
            </Link>
            {/* Optional: Add a Sign In button for the landing page */}
            <Button variant="solid" style={{ backgroundColor: landingThemeColor.primary }}>Sign In</Button>
          </header>

          {/* Hero Section */}
          <section
            className="relative min-h-[700px] flex items-center justify-center text-center px-4 md:px-8 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/background.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative z-10 max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Unlimited movies, TV shows, and more.</h1>
              <p className="text-lg md:text-2xl mb-8">Watch anywhere. Cancel anytime.</p>
              <p className="text-lg md:text-xl mb-5">
                Ready to watch? Enter your email to create or restart your membership.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
                <Input
                  type="email"
                  placeholder="Email address"
                  className="h-14 bg-black/40 border border-gray-600 text-white px-4 flex-grow"
                  value={email} // <-- Bind value
                  onChange={(e) => setEmail(e.target.value)} // <-- Update state
                />
                <Button
                  className="h-14 hover:bg-opacity-80 text-white px-6 whitespace-nowrap text-lg font-medium"
                  style={{ backgroundColor: landingThemeColor.primary }}
                  onClick={handleGetStarted} // Trigger login state change
                >
                  Get Started <ChevronRight className="ml-1 h-5 w-5" />
                </Button>
              </div>
            </div>
          </section>

          {/* Feature Sections (Example) */}
          <section className="border-t-8 border-[#222] py-16 bg-black">
            <div className="max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Enjoy on your TV.</h2>
                <p className="text-lg md:text-2xl">Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
              </div>
              <div className="relative">
                {/* Add an image or video here */}
                <Image src="/images/netflixtv.jpg" width={500} height={300} className="mx-auto" alt="Netflix TV on various devices"/>
              </div>
            </div>
          </section>
          {/* Add more feature sections as needed */}

          {/* FAQ Section */}
          <section className="border-t-8 border-[#222] py-16 bg-black">
            <div className="max-w-3xl mx-auto px-4 md:px-8">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full mb-8">
                {faqData.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-[#303030] mb-2">
                    <AccordionTrigger className="text-lg md:text-xl p-6 hover:bg-[#404040]">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="p-6 bg-[#303030] text-base md:text-lg">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <div className="text-center">
                <p className="text-lg md:text-xl mb-5">
                  Ready to watch? Enter your email to create or restart your membership.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
                  <Input
                    type="email"
                    placeholder="Email address"
                    className="h-14 bg-black/40 border border-gray-600 text-white px-4 flex-grow"
                    value={email} // <-- Bind value
                    onChange={(e) => setEmail(e.target.value)} // <-- Update state
                  />
                  <Button
                    className="h-14 hover:bg-opacity-80 text-white px-6 whitespace-nowrap text-lg font-medium"
                    style={{ backgroundColor: landingThemeColor.primary }}
                    onClick={handleGetStarted} // Attach handler here too
                  >
                    Get Started <ChevronRight className="ml-1 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t-8 border-[#222] py-12 bg-black text-[#737373]">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
              <p className="mb-6">
                Questions? Call{" "}
                <a href="tel:000-800-919-1694" className="hover:underline">
                  000-800-919-1694
                </a>
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {/* Footer Links Column 1 */}
                <div>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="#" className="hover:underline">FAQ</Link></li>
                    <li><Link href="#" className="hover:underline">Investor Relations</Link></li>
                    <li><Link href="#" className="hover:underline">Privacy</Link></li>
                    <li><Link href="#" className="hover:underline">Speed Test</Link></li>
                  </ul>
                </div>
                {/* Footer Links Column 2 */}
                <div>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="#" className="hover:underline">Help Center</Link></li>
                    <li><Link href="#" className="hover:underline">Jobs</Link></li>
                    <li><Link href="#" className="hover:underline">Cookie Preferences</Link></li>
                    <li><Link href="#" className="hover:underline">Legal Notices</Link></li>
                  </ul>
                </div>
                {/* Footer Links Column 3 */}
                <div>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="#" className="hover:underline">Account</Link></li>
                    <li><Link href="#" className="hover:underline">Ways to Watch</Link></li>
                    <li><Link href="#" className="hover:underline">Corporate Information</Link></li>
                    <li><Link href="#" className="hover:underline">Only on Netflix</Link></li>
                  </ul>
                </div>
                {/* Footer Links Column 4 */}
                <div>
                  <ul className="space-y-3 text-sm">
                    <li><Link href="#" className="hover:underline">Media Center</Link></li>
                    <li><Link href="#" className="hover:underline">Terms of Use</Link></li>
                    <li><Link href="#" className="hover:underline">Contact Us</Link></li>
                  </ul>
                </div>
              </div>
              {/* Language Selector Example */}
              <div className="inline-block relative mb-4">
                <Select defaultValue="en">
                  <SelectTrigger className="w-[120px] bg-black border-[#333] text-[#737373]">
                    <Globe className="h-4 w-4 mr-1" />
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-[#333] text-[#737373]">
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm">Netflix Clone</p>
            </div>
          </footer>
        </>
      ) : (
        // Main Application View (Logged In)
        <>
          {/* Full Header for Main App */}
          <header className="fixed top-0 w-full z-50 flex items-center justify-between px-4 md:px-12 py-4 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm">
            <div className="flex items-center gap-4 md:gap-8">
              <Link href="/" className="mr-4">
                <svg viewBox="0 0 111 30" className="h-[1.5rem] w-[5.5rem] text-[#e50914] fill-current">
                  {/* ... (SVG path data remains the same) ... */}
                  <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"></path>
                </svg>
              </Link>
              <nav className="hidden md:flex items-center gap-4 text-sm">
                <Link href="#" className="hover:text-white/80 transition-colors">Home</Link>
                <Link href="#" className="hover:text-white/80 transition-colors">TV Shows</Link>
                <Link href="#" className="hover:text-white/80 transition-colors">Movies</Link>
                <Link href="#" className="hover:text-white/80 transition-colors">New & Popular</Link>
                <Button 
                  variant="link" 
                  className="text-sm hover:text-white/80 transition-colors p-0 h-auto" 
                  onClick={() => setShowWatchlist(true)}
                >
                  My List {watchlistMovies.length > 0 && <Badge className="ml-1 bg-red-600 text-xs">{watchlistMovies.length}</Badge>}
                </Button>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              {/* Search Input */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white"
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <Search className="h-5 w-5" />
                </Button>
                {showSearch && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="absolute right-full top-1/2 -translate-y-1/2 mr-2"
                  >
                    <Input
                      type="search"
                      placeholder="Titles, people, genres"
                      className="h-8 bg-black/80 border border-white/50 text-white pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
                  </motion.div>
                )}
              </div>
              {/* Search Results Popover */}
              {showSearch && searchQuery && (
                <div className="absolute top-full right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-black/90 border border-white/10 rounded-md shadow-lg z-50">
                  <ScrollArea className="h-full p-2">
                    <div className="p-2">
                      {searchResults.length > 0 ? (
                        <div className="grid gap-2">
                          {searchResults.map((movie) => (
                            <div key={movie.id} className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-md cursor-pointer">
                              <Image
                                src={movie.image}
                                alt={movie.title}
                                width={40}
                                height={60}
                                className="rounded object-cover"
                              />
                              <div className="flex-1">
                                <p className="text-sm font-medium truncate">{movie.title}</p>
                                <p className="text-xs text-white/70">{movie.genre.join(", ")}</p>
                              </div>
                              {movie.isFree && (
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-green-600/20 text-green-400 border-green-600/30"
                                >
                                  Free
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-white/70 p-4 text-center">No results found for "{searchQuery}"</p>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              )}
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                <Bell className="h-5 w-5" />
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="h-8 flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src="/placeholder-user.jpg" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline text-sm">Profile</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 bg-black/90 border border-white/10 p-0">
                  <div className="p-2">
                    <Button variant="ghost" className="w-full justify-start text-sm">Account</Button>
                    <Button variant="ghost" className="w-full justify-start text-sm">Help Center</Button>
                    <Button variant="ghost" className="w-full justify-start text-sm text-red-500" onClick={() => setIsLoggedIn(false)}>Sign out of Netflix</Button> {/* Sign out */}                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </header>

          {/* Audio element for character themes */}
          <audio ref={audioRef} loop muted={!audioPlaying} />

          {/* Audio control button */}
          {selectedCharacter !== "Default" && characterThemes[selectedCharacter]?.music && (
            <Button
              variant="ghost"
              size="icon"
              className="fixed bottom-4 left-4 z-50 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={toggleAudio}
            >
              {audioPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </Button>
          )}

          {/* Mood Selection Bar */}
          <div className="fixed top-20 left-0 right-0 z-40 flex justify-center px-4">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-black/70 backdrop-blur-md p-1 rounded-full border border-white/10 flex gap-1 items-center shadow-lg"
            >
              {Object.entries(moodThemes).map(([mood, theme]) => (
                <TooltipProvider key={mood}>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <Button
                        variant={selectedMood === mood ? "default" : "ghost"}
                        size="icon"
                        className={`rounded-full h-10 w-10 transition-all duration-300 ${selectedMood === mood ? 'scale-110' : 'opacity-70 hover:opacity-100'}`}
                        style={{
                          backgroundColor: selectedMood === mood ? theme.primary : undefined,
                          color: selectedMood === mood ? (theme.secondary === '#000000' ? 'white' : theme.secondary) : 'white',
                        }}
                        onClick={() => handleMoodSelect(mood)}
                      >
                        {theme.icon}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="bg-black/80 text-white border-none">
                      <p>{mood}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
              {selectedMood && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8 ml-1 text-white/70 hover:text-white"
                  onClick={() => handleMoodSelect(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </motion.div>
          </div>

          {/* Character Theme Selector */}
          <div className="fixed top-20 right-4 z-40">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-black/70 backdrop-blur-md border-white/10"
                  style={{
                    borderColor: selectedCharacter !== "Default" ? characterThemes[selectedCharacter]?.primary : undefined,
                  }}
                >
                  <span>Character Theme</span>
                  {selectedCharacter !== "Default" && (
                    <Badge
                      style={{
                        backgroundColor: characterThemes[selectedCharacter]?.primary,
                        color: characterThemes[selectedCharacter]?.secondary === '#000000' ? 'white' : characterThemes[selectedCharacter]?.secondary,
                      }}
                    >
                      {selectedCharacter}
                    </Badge>
                  )}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 bg-black/90 border border-white/10 p-2">
                <div className="grid gap-2">
                  {Object.keys(characterThemes).map((character) => (
                    <Button
                      key={character}
                      variant={selectedCharacter === character ? "default" : "ghost"}
                      className="justify-start"
                      style={{
                        backgroundColor: selectedCharacter === character ? characterThemes[character]?.primary : undefined,
                        color: selectedCharacter === character ? (characterThemes[character]?.secondary === '#000000' ? 'white' : characterThemes[character]?.secondary) : 'white',
                      }}
                      onClick={() => handleCharacterSelect(character)}
                    >
                      {character === "Default" ? "Default Netflix" : character}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Community Voting Widget */}
          <div className="fixed bottom-4 right-4 z-40 w-80">
            <Popover>
              <PopoverTrigger asChild>
                <Button className="w-full flex items-center gap-2" style={{ backgroundColor: themeColor.primary }}>
                  <Trophy className="h-5 w-5" />
                  <span>Bonus Episode Voting</span>
                  <Badge className="ml-auto bg-white/20">New</Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-black/90 border border-white/10 p-0">
                <div className="p-4 border-b border-white/10">
                  <h3 className="text-lg font-bold">Community Voting</h3>
                  <p className="text-sm text-white/70">Vote for the next bonus episode!</p>
                </div>
                <ScrollArea className="max-h-60">
                  <div className="p-4 space-y-4">
                    {votingData.map((series) => {
                      const totalVotes = calculateTotalVotes(series.episodeOptions);
                      const userVote = userVotes[series.id];
                      return (
                        <div key={series.id}>
                          <h4 className="font-semibold mb-2">{series.series}</h4>
                          <div className="space-y-2">
                            {series.episodeOptions.map((option) => {
                              const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                              const isSelected = userVote === option.id;
                              return (
                                <div key={option.id}>
                                  <Button
                                    variant={isSelected ? "default" : "outline"}
                                    className={`w-full justify-between h-auto py-2 px-3 text-left ${isSelected ? '' : 'border-white/20 hover:bg-white/10'}`}
                                    style={isSelected ? { backgroundColor: themeColor.primary } : {}}
                                    onClick={() => handleVote(series.id, option.id)}
                                    disabled={!!userVote} // Disable after voting
                                  >
                                    <span>{option.title}</span>
                                    {userVote && (
                                      <span className={`text-xs ${isSelected ? 'font-bold' : 'text-white/70'}`}>
                                        {percentage}%
                                      </span>
                                    )}
                                  </Button>
                                  {userVote && (
                                    <div className="mt-1 h-1 bg-white/20 rounded-full overflow-hidden">
                                      <motion.div
                                        className="h-full rounded-full"
                                        style={{ background: themeColor.primary }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${percentage}%` }}
                                        transition={{ duration: 0.5 }}
                                      />
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          {userVote && <p className="text-xs text-center mt-2 text-white/70">Thanks for voting!</p>}
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </PopoverContent>
            </Popover>
          </div>

          {/* Hero Section - Banner Carousel */}
          <section className="relative h-[70vh] w-full flex items-end p-4 md:p-12 overflow-hidden z-0 mb-0">
            <Image
              key={currentBannerMovie.banner}
              src={currentBannerMovie.banner}
              alt={currentBannerMovie.title}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 z-0 transition-opacity duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10"></div>
            <motion.div
              className="relative z-20 max-w-xl mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{currentBannerMovie.title}</h1>
              <p className="text-sm md:text-base text-white/80 mb-6 line-clamp-3">{currentBannerMovie.description}</p>
              <div className="flex gap-3">
                <Button size="lg" style={{ backgroundColor: themeColor.primary }} className="flex items-center gap-2" onClick={() => handleRedButtonClick()}>
                  <Play className="h-5 w-5 fill-current" /> Play
                </Button>
                <Button size="lg" variant="secondary" className="flex items-center gap-2 bg-white/20 hover:bg-white/30" onClick={() => toggleWatchlist(currentBannerMovie)}>
                  {watchlistMovies.some(m => m.id === currentBannerMovie?.id) 
                    ? <Check className="h-5 w-5" /> 
                    : <Plus className="h-5 w-5" />} 
                  My List
                </Button>
              </div>
            </motion.div>
          </section>

          {/* Genre Tabs with Animation - ensure z-20 to be above banner */}
          <section className="relative z-20 px-4 md:px-12 -mt-16 mb-8">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/10 inline-flex mb-6">
                <TabsTrigger value="all" className="rounded-full data-[state=active]:bg-white/10">All</TabsTrigger>
                {[...new Set(movieData.flatMap(m => m.genre))].map(genre => (
                  <TabsTrigger key={genre} value={genre} className="rounded-full data-[state=active]:bg-white/10">{genre}</TabsTrigger>
                ))}
              </TabsList>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab + (selectedMood || 'none')}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TabsContent value={activeTab} forceMount>
                    {filteredMovies.length > 0 ? (
                      <Carousel
                        opts={{ align: "start", loop: false }}
                        className="w-full"
                        onMouseEnter={() => resetThemeColor()} // Reset theme when interacting with carousel
                      >
                        <CarouselContent className="-ml-4">
                          {filteredMovies.map((movie) => (
                            <CarouselItem key={movie.id} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                              <motion.div
                                className="group relative aspect-[2/3] rounded-md overflow-hidden cursor-pointer shadow-lg"
                                whileHover="hover"
                                initial="rest"
                                animate="rest"
                                variants={{
                                  hover: { scale: 1.05, zIndex: 10 },
                                  rest: { scale: 1, zIndex: 1 },
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                onMouseEnter={() => handleMovieHover(movie)}
                                onClick={() => setSelectedMovie(movie)} // Show details on click
                              >
                                <Image
                                  src={movie.image}
                                  alt={movie.title}
                                  layout="fill"
                                  objectFit="cover"
                                  className="transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                                  <h3 className="text-sm font-semibold mb-1 truncate text-white">{movie.title}</h3>
                                  <div className="flex items-center justify-between gap-1">
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button variant="ghost" size="icon" className="h-7 w-7 bg-white/80 text-black rounded-full hover:bg-white" onClick={(e) => { e.stopPropagation(); handleMiniPlayer(movie); }}>
                                            <Play className="h-4 w-4 fill-current" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent><p>Play Trailer</p></TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-7 w-7 bg-black/50 text-white rounded-full border border-white/50 hover:bg-white/20"
                                            onClick={(e) => { 
                                              e.stopPropagation(); 
                                              toggleWatchlist(movie); 
                                            }}
                                          >
                                            {watchlistMovies.some(m => m.id === movie.id) 
                                              ? <Check className="h-4 w-4" /> 
                                              : <Plus className="h-4 w-4" />}
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent><p>
                                          {watchlistMovies.some(m => m.id === movie.id) 
                                            ? "Remove from My List" 
                                            : "Add to My List"}
                                        </p></TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                </div>
                              </motion.div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white disabled:opacity-0" />
                        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white disabled:opacity-0" />
                      </Carousel>
                    ) : (
                      <div className="col-span-full text-center py-10">
                        <div className="inline-block p-4 rounded-full bg-white/5 mb-4">
                          {selectedMood && moodThemes[selectedMood] ? moodThemes[selectedMood].icon : <Video className="h-8 w-8 text-white/50" />}
                        </div>
                        <h3 className="text-xl font-bold mb-2">No titles found</h3>
                        <p className="text-white/70 mb-4">Try selecting a different mood or category.</p>
                        {selectedMood && (
                          <Button onClick={() => handleMoodSelect(null)} style={{ backgroundColor: themeColor.primary }}>
                            Clear Mood Filter
                          </Button>
                        )}
                      </div>
                    )}
                  </TabsContent>
                </motion.div>
              </AnimatePresence>
            </Tabs>
          </section>

          {/* Music Recommendation Section - Updated */}
          <section className="px-4 md:px-12 py-8">
            <h2 className="text-2xl font-bold mb-4">Music Based on Your Taste</h2>
            {musicRecommendations.length > 0 ? (
              <Carousel
                opts={{ align: "start", dragFree: true }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {musicRecommendations.map((rec, index) => {
                    // Placeholder tracks if not present
                    const tracks = rec.tracks || [
                      { id: 1, title: "Running Up That Hill" },
                      { id: 2, title: "Master of Puppets" },
                      { id: 3, title: "Should I Stay or Should I Go" },
                    ];
                    return (
                      <CarouselItem key={index} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                        {/* Music Playlist Card */}
                        <div className="rounded-2xl w-[400px] bg-[#0f011a] p-0 flex flex-col h-full shadow-lg overflow-hidden border border-[#3a235a]">
                          {/* Image with Gradient Overlay and Text */}
                          <div className="relative w-full aspect-[4/3]">
                            <Image
                              src={rec.movie.image}
                              alt={`Playlist cover for ${rec.movie.title}`}
                              layout="fill"
                              objectFit="cover"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                            <div className="absolute left-4 bottom-4 z-10">
                              <h3 className="text-white font-bold text-lg leading-tight mb-0.5 drop-shadow">{rec.movie.title}</h3>
                              <p className="text-gray-300 text-xs font-medium drop-shadow">Music Playlist</p>
                            </div>
                          </div>
                          {/* Recommended Tracks */}
                          <div className="px-5 pt-5 pb-2 flex flex-col flex-1">
                            <h4 className="text-white font-bold text-base mb-3">Recommended Tracks:</h4>
                            <div className="flex flex-col gap-3 mb-4">
                              {tracks.slice(0, 3).map((track) => (
                                <div key={track.id} className="flex items-center">
                                  <button className="flex-shrink-0 bg-[#1a102b] rounded-full h-8 w-8 flex items-center justify-center mr-4">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <polygon points="4,3 11,7 4,11" fill="white" />
                                    </svg>
                                  </button>
                                  <span className="text-white text-sm font-medium truncate">{track.title}</span>
                                </div>
                              ))}
                            </div>
                            <div className="mt-auto pt-2">
                              <Button
                                className="w-full rounded-full bg-transparent hover:bg-[#5a3e99] text-white font-bold text-base py-2 px-0 shadow-none border-2"
                                style={{ boxShadow: 'none' }}
                              >
                                View Full Playlist
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white disabled:opacity-0" />
                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white disabled:opacity-0" />
              </Carousel>
            ) : (
              <p className="text-white/70">No music recommendations available based on your taste yet.</p>
            )}
          </section>

          {/* My Favorites Section */}
          <section className="px-4 md:px-12 py-8">
            <h2 className="text-2xl font-bold mb-4">My Favorites</h2>
            <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent className="-ml-4">
                {movieData.filter(m => m.isFree).map((movie) => (
                  <CarouselItem key={movie.id} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                    {/* ... (Similar movie card structure as above) ... */}
                    <div className="group relative aspect-[2/3] rounded-md overflow-hidden cursor-pointer shadow-lg">
                      <Image src={movie.image} alt={movie.title} layout="fill" objectFit="cover" />
                      {/* ... (Rest of the card overlay) ... */}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white disabled:opacity-0" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white disabled:opacity-0" />
            </Carousel>
          </section>

          {/* My Watchlist Section */}
          <section className="px-4 md:px-12 py-8">
            <h2 className="text-2xl font-bold mb-4">My Watchlist</h2>
            <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent className="-ml-4">
                {movieData.filter(m => m.rentPrice).map((movie) => (
                  <CarouselItem key={movie.id} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                    {/* ... (Similar movie card structure) ... */}
                    <div className="group relative aspect-[2/3] rounded-md overflow-hidden cursor-pointer shadow-lg">
                      <Image src={movie.image} alt={movie.title} layout="fill" objectFit="cover" />
                      {/* ... (Rest of the card overlay on hover) ... */}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white disabled:opacity-0" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white disabled:opacity-0" />
            </Carousel>
          </section>

          {/* Spinning Wheel Headline Section */}
          <section className="w-full bg-black flex flex-col items-center justify-center py-10 px-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-2" style={{letterSpacing: '-0.5px'}}>
              Can&apos;t Decide What to Watch?
            </h2>
            <p className="text-base md:text-xl text-gray-400 text-center font-normal mt-1">
              Spin the wheel and let us pick something for you!
            </p>
            {/* Trailer Roulette Button */}
            <Button
              className="mt-6 px-8 py-3 text-lg font-bold rounded-full bg-gradient-to-r from-red-600 to-pink-500 shadow-lg hover:scale-105 transition-transform"
              onClick={openTrailerRoulette}
            >
              🎲 Surprise Me with a Trailer
            </Button>
          </section>

          {/* Spinning Wheel Section - Updated Layout */}
          <section className="w-11/12 mx-auto bg-[#111] py-12 px-0 md:px-0 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10">
            {/* Left: Spinning Wheel (restored with images) */}
            <div className="flex-1 flex justify-center items-center w-full md:w-auto mb-8 md:mb-0">
              <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center select-none">
                {/* Wheel with images */}
                <div
                  ref={wheelRef}
                  className="absolute inset-0 rounded-full border-4 border-gray-700 bg-black flex items-center justify-center overflow-visible cursor-pointer"
                  style={{ boxShadow: '0 0 40px 0 #000a', transition: 'transform 3s cubic-bezier(0.1, 0.7, 0.1, 1)' }}
                  onClick={spinWheel}
                  title="Spin the wheel!"
                >
                  {movieData.map((movie, idx) => {
                    const total = movieData.length;
                    const angle = (idx / total) * 360;
                    const radius = 110;
                    const rad = (angle - 90) * (Math.PI / 180);
                    const x = Math.cos(rad) * radius;
                    const y = Math.sin(rad) * radius;
                    return (
                      <div
                        key={movie.id}
                        style={{
                          position: 'absolute',
                          left: `calc(50% + ${x}px - 32px)`,
                          top: `calc(50% + ${y}px - 48px)`,
                          width: '64px',
                          height: '96px',
                          transform: `rotate(${angle}deg)`
                        }}
                        className="shadow-lg rounded-lg overflow-hidden border-2 border-white/10 bg-black"
                      >
                        <Image
                          src={movie.image}
                          alt={movie.title}
                          width={64}
                          height={96}
                          className="object-cover w-full h-full mr-5"
                        />
                      </div>
                    );
                  })}
                  {/* Center Shuffle Icon */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#181818] rounded-full flex items-center justify-center border-2 border-gray-600 z-10 shadow-lg">
                    <Shuffle className="h-8 w-8 text-white" />
                  </div>
                  {/* Overlay to indicate clickable */}
                  <div className="absolute inset-0 rounded-full z-20" style={{ pointerEvents: 'none' }} />
                </div>
                {/* Pointer */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[28px] border-b-red-600 z-20" />
              </div>
            </div>
            {/* Right: Movie Card (unchanged, but use randomMovie if set, else default) */}
            <div className="flex-1 max-w-lg w-full flex items-center justify-center mr-16">
              <div className="flex bg-[#181818] border border-gray-700 rounded-xl shadow-lg w-full max-w-md p-5 gap-5 items-center">
                {/* Image */}
                <div className="w-24 h-36 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                  <Image src={(randomMovie?.image || '/images/the-witcher.jpeg')} alt={(randomMovie?.title || 'The Witcher')} width={96} height={144} className="object-cover w-full h-full" />
                </div>
                {/* Details */}
                <div className="flex flex-col flex-1 min-w-0">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 truncate">{randomMovie?.title || 'The Witcher'}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-400 font-medium mb-2">
                    <span>{randomMovie?.year || 2019}</span>
                    <span className="mx-1">•</span>
                    <span>{randomMovie?.rating || '18+'}</span>
                    <span className="mx-1">•</span>
                    <span>{randomMovie?.seasons ? `${randomMovie.seasons} Seasons` : '2 Seasons'}</span>
                  </div>
                  <p className="text-white text-sm mb-4 line-clamp-3">{randomMovie?.description || 'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.'}</p>
                  <div className="flex gap-2 items-center mt-auto">
                    <Button className="bg-[#e50914] hover:bg-[#b00610] text-white font-semibold px-6 py-2 rounded-md text-base" onClick={() => handleRedButtonClick()}>Watch Now</Button>
                    <Button variant="ghost" size="icon" className="bg-black border border-gray-600 text-white h-10 w-10 flex items-center justify-center rounded-md">
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Social Feed Section */}
          <section className="px-4 md:px-12 py-8">
            <h2 className="text-2xl font-bold mb-4">Social Feed</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {socialPosts.map((post) => (
                <div key={post.id} className="bg-[#181818] rounded-xl shadow-lg flex flex-col overflow-hidden">
                  {/* Top: Avatar, Name, Timestamp */}
                  <div className="flex items-center gap-3 px-4 pt-4 pb-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={post.user.avatar} alt={post.user.name} />
                      <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="font-semibold text-base truncate">{post.user.name}</span>
                      <span className="text-xs text-gray-400 font-medium">{post.timestamp}</span>
                    </div>
                  </div>
                  {/* Image Placeholder */}
                  <div className="relative w-full aspect-video bg-gray-800">
                    <Image
                      src={post.movie.image}
                      alt={`Post related to ${post.movie.title}`}
                      layout="fill"
                      objectFit="cover"
                      className="object-cover w-full h-full" 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      priority
                    />
                  </div>
                  {/* Show Tag, Comment */}
                  <div className="px-4 pt-3 flex flex-col flex-1">
                    <Badge variant="secondary" className="mb-2 bg-gray-700 text-white font-semibold text-xs w-fit px-3 py-1 rounded-full">
                      {post.movie.title}
                    </Badge>
                    <p className="text-sm mb-4 font-normal leading-snug text-white/90">{post.caption}</p>
                  </div>
                  {/* Bottom Row: Like, Comment, Share */}
                  <div className="flex items-center justify-between px-4 pb-4 pt-2 border-t border-gray-800 mt-auto">
                    <div className="flex gap-6">
                      <button
                        className="flex items-center gap-1 text-gray-400 hover:text-white font-medium text-sm transition-colors"
                        onClick={() => handleLike(post.id)}
                      >
                        <ThumbsUp className="h-5 w-5" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-400 hover:text-white font-medium text-sm transition-colors">
                        <MessageCircle className="h-5 w-5" />
                        <span>{post.comments}</span>
                      </button>
                    </div>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <Share className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Collaborative Watching Feature - Updated Layout */}
          <section className="px-4 md:px-12 py-12 bg-black rounded-lg mx-4 md:mx-12 my-8 flex flex-col md:flex-row items-center gap-12">
            {/* Left Side: Info and Button */}
            <div className="md:w-1/2 text-left">
              {/* Removed Video icon */}
              <h2 className="text-3xl font-bold mb-4">Watch Together</h2>
              <p className="text-white/80 mb-6 max-w-md">
                Enjoy your favorite shows with friends, no matter where they are.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Synchronized Playback</h4>
                    <p className="text-sm text-white/70">Watch in perfect sync with your friends.</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Live Chat</h4>
                    <p className="text-sm text-white/70">Text chat while watching.</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div>
                    <h4 className="font-semibold">Voice Chat</h4>
                    <p className="text-sm text-white/70">Talk with your friends in real-time.</p>
                  </div>
                </li>
              </ul>
              <Button size="lg" style={{ backgroundColor: themeColor.primary || '#e50914' }} className="hover:bg-red-700 transition-colors" onClick={() => handleRedButtonClick()}>
                Start a Watch Party
              </Button>
            </div>

            {/* Right Side: Preview Area */}
            <div className="md:w-1/2 h-80 bg-white/5 rounded-lg p-4 flex flex-col relative overflow-hidden border border-white/10 shadow-lg">
              {/* Blurred Background Image with proper aspect ratio */}
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <Image
                  src={movieData[0]?.image || '/public/placeholder.jpg'}
                  alt={movieData[0]?.title || 'Preview'}
                  layout="fill"
                  objectFit="cover"
                  className=" opacity-100"
                  priority
                />
              </div>

              {/* Chat Overlay */}
              <div className="relative z-10 flex-1 flex flex-col justify-end space-y-2 text-xs mt-2">
                {/* Example Chat Messages */}
                <div className="flex items-start gap-2 self-start max-w-[70%]">
                  <Avatar className="h-6 w-6 opacity-80 blur-[1px]">
                    <AvatarImage src="/placeholder-user.jpg" /> <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <div className="bg-black/60 p-2 rounded-lg rounded-tl-none">
                    <p className="text-white/90">OMG did you see that?! 🤯</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 self-end max-w-[70%]">
                  <div className="bg-red-600/80 p-2 rounded-lg rounded-tr-none">
                    <p className="text-white">I know right! Totally unexpected.</p>
                  </div>
                  <Avatar className="h-6 w-6 opacity-80 blur-[1px]">
                    <AvatarImage src="/placeholder-user.jpg" /> <AvatarFallback>B</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex items-start gap-2 self-start max-w-[70%]">
                  <Avatar className="h-6 w-6 opacity-80 blur-[1px]">
                    <AvatarImage src="/placeholder-user.jpg" /> <AvatarFallback>C</AvatarFallback>
                  </Avatar>
                  <div className="bg-black/60 p-2 rounded-lg rounded-tl-none">
                    <p className="text-white/90">This episode is intense!</p>
                  </div>
                </div>
              </div>

              {/* Bottom Input Placeholder */}
              <div className="relative z-10 mt-2 h-8 bg-black/50 rounded-full border border-white/20"></div>
            </div>
          </section>

          {/* Footer (App version - can be same as landing) */}
          <footer className="border-t border-[#232323] py-12 bg-black text-[#737373]">
            {/* ... (Use the same footer structure as the landing page) ... */}
            <div className="max-w-6xl mx-auto px-4 md:px-8">
              {/* ... footer content ... */}
            </div>
          </footer>

          {/* Floating Watchlist Sidebar */}
          <AnimatePresence>
            {showWatchlist && (
              <motion.div
                className="fixed top-0 right-0 bottom-0 w-80 bg-black/95 border-l border-white/10 z-[60] shadow-xl flex flex-col"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
              >
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <h3 className="text-lg font-semibold">My Watchlist</h3>
                  <div className="flex gap-2">
                    {watchlistMovies.length > 0 && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="h-8 w-8 border-white/20 bg-transparent" onClick={() => shareWatchlist()}>
                              <Share className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent><p>Share My List</p></TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => setShowWatchlist(false)} className="h-8 w-8">
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <ScrollArea className="flex-1">
                  <div className="p-4 space-y-4">
                    {watchlistMovies.length > 0 ? (
                      watchlistMovies.map((movie) => (
                        <div key={movie.id} className="flex gap-3 items-start">
                          <Image src={movie.image} alt={movie.title} width={60} height={90} className="rounded" />
                          <div className="flex-1">
                            <p className="text-sm font-medium mb-1">{movie.title}</p>
                            <p className="text-xs text-white/70 mb-2">{movie.genre.join(', ')}</p>
                            <div className="flex gap-2">
                              <Button size="sm" className="h-7 px-2 text-xs" style={{ backgroundColor: themeColor.primary }}>Play</Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-7 px-2 text-xs border-white/30"
                                onClick={() => toggleWatchlist(movie)}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-white/70 text-center py-8">Your watchlist is empty.</p>
                    )}
                  </div>
                </ScrollArea>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mini Player */}
          <AnimatePresence>
            {showMiniPlayer && miniPlayerMovie && (
              <div ref={miniPlayerContainerRef}>
                <motion.div
                  className="fixed bottom-20 right-4 w-80 bg-black border border-white/20 rounded-lg overflow-hidden shadow-lg z-50"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  drag
                  dragConstraints={miniPlayerContainerRef}
                >
                  <div className="relative aspect-video">
                    <Image
                      src={miniPlayerMovie.image} // Ideally use a trailer thumbnail or video
                      alt={miniPlayerMovie.title}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute top-1 right-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 bg-black/50 text-white hover:bg-black/70 rounded-full"
                        onClick={() => setShowMiniPlayer(false)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    {/* Basic progress bar simulation */}
                    <div className="absolute bottom-1 left-2 right-2">
                      <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                        <div className="bg-red-600 h-full w-[30%]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium truncate">{miniPlayerMovie.title}</h3>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-white/70">Trailer Playing</p>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-white/80 hover:text-white"><Play className="h-4 w-4 fill-current" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-white/80 hover:text-white"><Volume2 className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Movie Detail Modal (Example Structure) */}
          <AnimatePresence>
            {selectedMovie && (
              <motion.div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedMovie(null)} // Close on backdrop click
              >
                <motion.div
                  className="bg-[#141414] rounded-lg overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", damping: 20, stiffness: 200 }}
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                >
                  <div className="relative aspect-video">
                    <Image src={selectedMovie.image} alt={selectedMovie.title} layout="fill" objectFit="cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent"></div>
                    <Button
                      variant="ghost" size="icon"
                      className="absolute top-4 right-4 h-9 w-9 rounded-full bg-black/50 text-white hover:bg-black/70 z-10"
                      onClick={() => setSelectedMovie(null)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                    <div className="absolute bottom-6 left-6 z-10">
                      <h2 className="text-3xl font-bold mb-2 text-white drop-shadow-lg">{selectedMovie.title}</h2>
                      <div className="flex gap-3">
                        <Button size="lg" style={{ backgroundColor: themeColor.primary }} className="flex items-center gap-2" onClick={() => handleRedButtonClick()}>
                          <Play className="h-5 w-5 fill-current" /> Play
                        </Button>
                        <Button size="icon" variant="outline" className="h-11 w-11 border-white/50 bg-black/40 hover:bg-white/20">
                          <Plus className="h-6 w-6" />
                        </Button>
                        <Button size="icon" variant="outline" className="h-11 w-11 border-white/50 bg-black/40 hover:bg-white/20">
                          <ThumbsUp className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <ScrollArea className="flex-1">
                    <div className="p-6 grid grid-cols-3 gap-6">
                      <div className="col-span-2">
                        <div className="flex items-center gap-2 text-sm mb-3">
                          <span className="text-green-500 font-semibold">{selectedMovie.rating * 20}% Match</span>
                          <span>{selectedMovie.year}</span>
                          <span>{selectedMovie.duration}</span>
                          {selectedMovie.seasons && <span>{selectedMovie.seasons} Seasons</span>}
                          <Badge variant="outline" className="border-white/50">HD</Badge>
                        </div>
                        <p className="text-sm text-white/90 mb-4">{selectedMovie.description}</p>
                      </div>
                      <div className="text-sm space-y-1">
                        <p><span className="text-white/60">Cast:</span> Actor 1, Actor 2, ...</p>
                        <p><span className="text-white/60">Genres:</span> {selectedMovie.genre.join(', ')}</p>
                        <p><span className="text-white/60">This show is:</span> {selectedMovie.moods?.join(', ') || 'Exciting'}</p>
                      </div>
                    </div>
                    {/* Add sections for Episodes (if series), More Like This, About */}
                    <div className="flex gap-2 mt-4">
                      {/* ...existing code... */}
                      <Button
                        variant="outline"
                        className="border-blue-400 text-blue-400"
                        onClick={() => openLocationChallenge(selectedMovie)}
                      >
                        Location Challenge
                      </Button>
                    </div>
                  </ScrollArea>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Location Challenge Modal */}
          <AnimatePresence>
            {showLocationChallenge && activeChallenge && (
              <motion.div
                className="fixed inset-0 bg-black/80 z-[80] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowLocationChallenge(false)}
              >
                <motion.div
                  className="bg-[#181818] rounded-lg max-w-2xl w-full p-6 relative"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={e => e.stopPropagation()}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3"
                    onClick={() => setShowLocationChallenge(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                  <h2 className="text-2xl font-bold mb-2">Location Scouting Challenge</h2>
                  <p className="mb-4 text-white/80">Can you guess where this scene was filmed?</p>
                  <div className="mb-4">
                    <Image src={activeChallenge.clueImage} alt="Scene Clue" width={400} height={220} className="rounded shadow" />
                    <p className="mt-2 text-sm text-white/70">Scene: {activeChallenge.scene}</p>
                  </div>
                  {/* Map placeholder - replace with interactive map */}
                  <div className="w-full h-64 bg-gray-900 rounded flex items-center justify-center mb-4">
                    <p className="text-white/50">[Interactive Map Coming Soon]<br/>Click anywhere to pin your guess.</p>
                  </div>
                  <Button className="mb-2" onClick={() => handleMapPin(activeChallenge.correctLatLng.lat, activeChallenge.correctLatLng.lng)}>Simulate Correct Guess</Button>
                  {challengeMessage && <p className="mt-2 text-green-400">{challengeMessage}</p>}
                  <div className="mt-4">
                    <h3 className="font-semibold mb-1">Leaderboard</h3>
                    <ul className="text-sm text-white/80">
                      {activeChallenge.leaderboard.length === 0 ? <li>No entries yet.</li> : activeChallenge.leaderboard.map((entry, idx) => (
                        <li key={idx}>{entry.user}: {entry.points} pts</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold mb-1">Submit a New Location</h3>
                    <Button size="sm" onClick={() => submitUserLocation(0,0,null)}>Submit Location (Stub)</Button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trailer Roulette Modal */}
          <AnimatePresence>
            {showRoulette && (
              <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => setShowRoulette(false)}
              >
                <motion.div
                  className="relative w-full h-full flex flex-col items-center justify-center"
                  initial={{ scale: 0.98, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.98, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 30 }}
                  onClick={e => e.stopPropagation()}
                >
                  {/* Audio cue */}
                  <audio ref={rouletteAudioRef} src="/static/static-swoosh.mp3" preload="auto" />
                  {/* Cinematic transition effect */}
                  <motion.div
                    key={rouletteMovie?.id || 'roulette-bg'}
                    className="absolute inset-0 w-full h-full"
                    initial={{ opacity: 0, filter: 'blur(8px) grayscale(1)' }}
                    animate={{ opacity: 1, filter: 'blur(0px) grayscale(0)' }}
                    exit={{ opacity: 0, filter: 'blur(8px) grayscale(1)' }}
                    transition={{ duration: 0.7 }}
                  >
                    {rouletteMovie && (
                      <Image
                        src={rouletteMovie.banner}
                        alt={rouletteMovie.title}
                        layout="fill"
                        objectFit="cover"
                        className="w-full h-full object-cover"
                        priority
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
                  </motion.div>
                  {/* Trailer (image or video placeholder) */}
                  <motion.div
                    className="relative z-10 flex flex-col items-center justify-center w-full h-full"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                  >
                    {rouletteMovie && roulettePlaying && (
                      <>
                        <motion.div
                          className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 mb-8"
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        >
                          <Image
                            src={rouletteMovie.banner}
                            alt={rouletteMovie.title}
                            width={720}
                            height={400}
                            className="object-cover w-[90vw] max-w-2xl h-[40vw] max-h-[400px]"
                            priority
                          />
                        </motion.div>
                        <motion.h2
                          className="text-4xl md:text-5xl font-extrabold text-white text-center drop-shadow mb-2"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {rouletteMovie.title}
                        </motion.h2>
                        <motion.p
                          className="text-lg md:text-2xl text-white/80 text-center max-w-xl mb-8"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          {rouletteMovie.description}
                        </motion.p>
                        {/* Actions after a short delay */}
                        <motion.div
                          className="flex gap-6 mt-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.2 }}
                        >
                          <Button
                            size="lg"
                            className="px-8 py-3 text-lg font-bold rounded-full bg-gradient-to-r from-red-600 to-pink-500 shadow-lg hover:scale-105 transition-transform"
                            onClick={addRouletteToWatchlist}
                          >
                            + Add to Watchlist
                          </Button>
                          <Button
                            size="lg"
                            variant="secondary"
                            className="px-8 py-3 text-lg font-bold rounded-full bg-white/20 hover:bg-white/30 text-white border-white/30 shadow-lg"
                            onClick={nextRouletteTrailer}
                          >
                            Next Trailer
                          </Button>
                        </motion.div>
                      </>
                    )}
                    {/* Loading/transition state */}
                    {(!rouletteMovie || !roulettePlaying) && (
                      <motion.div
                        className="flex flex-col items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="w-24 h-24 rounded-full bg-white/10 border-4 border-white/20 animate-pulse mb-6 flex items-center justify-center">
                          <Shuffle className="h-10 w-10 text-white/70 animate-spin" />
                        </div>
                        <p className="text-xl text-white/80 font-semibold">Finding a surprise trailer...</p>
                      </motion.div>
                    )}
                  </motion.div>
                  {/* Close button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-6 right-8 z-20 h-12 w-12 bg-black/60 text-white hover:bg-black/80 rounded-full"
                    onClick={() => setShowRoulette(false)}
                  >
                    <X className="h-7 w-7" />
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </>
      )}
    </div>
  )
}
