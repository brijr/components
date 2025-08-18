import { HeroWithVideoProps } from "./index";

export const defaultContent: HeroWithVideoProps = {
  headline: "Experience the Future Today",
  subheadline: "Watch how our platform transforms the way teams work together.",
  primaryCTA: {
    text: "Start Free Trial",
    href: "/trial",
  },
  videoCTA: {
    text: "Watch Demo",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
};

export const variations = {
  withBackground: {
    headline: "Build Something Amazing",
    subheadline: "Join thousands of developers creating the next big thing.",
    primaryCTA: {
      text: "Get Started",
      href: "/signup",
    },
    videoCTA: {
      text: "See It In Action",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    backgroundVideo: {
      src: "/video-bg.mp4",
      poster: "/placeholder.webp",
    },
  },
  minimal: {
    headline: "Simple. Powerful. Beautiful.",
    subheadline: "The only tool you need to manage your entire business.",
    videoCTA: {
      text: "Play Video",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  },
  conference: {
    headline: "Join Us at DevConf 2024",
    subheadline: "The premier conference for developers, by developers.",
    primaryCTA: {
      text: "Register Now",
      href: "/register",
    },
    videoCTA: {
      text: "Watch 2023 Highlights",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  },
};