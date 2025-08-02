import { Project } from './types';
import CoffeeWithDyImage from '../../assets/CoffeeWIthDy.png';

const coffeeWithDyProject: Project = {
  id: 2,
  title: "Coffee with Dy",
  description: "A personalized coffee brewing guide featuring custom recipes and the famous 4:6 method by Tetsu Kasuya. Perfect your coffee brewing with different water ratios and weights.",
  category: "Web App",
  technologies: ["React", "Next.js", "Tailwind CSS", "Vercel"],
  liveUrl: "https://coffeewith-dy.vercel.app",
  githubUrl: "#",
  status: "Active",
  image: CoffeeWithDyImage,
  storySlug: "coffee-with-dy-story"
};

export default coffeeWithDyProject;