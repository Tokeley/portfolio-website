import { Heading } from '@chakra-ui/react';
import ProjectCard from '../components/ProjectCard';

const projects = [
  { title: "The Zen Zone", description: "The Zen Zone is a soundscape generator and mixer designed to help you study, work, relax or tune out the unpleasant sounds surrounding you. You can create an account, favourite soundscapes, create and save mixes, share mixes with your friends. With a extensive list of soundscapes, ranging from 'Campfire' to 'Mexican Market', the possibilities are endless!", technologies: ['MongoDB', 'ExpressJS', 'React', 'NodeJS', 'Vercel'], link: "https://www.thezenzone.app/", imageLink: "resources/zen-zone.png" },
  { title: "NOW Salt", description: "An internal use web application for NOW NZ to streamline client and service information retrieval for technical support staff. The app allowed you to search the client database, view profiles and view what services clients had. The web app made queires to a GraphQL endpoint in order to acess and update the compnay database.", technologies: ['React', 'GraphQL', 'MUI'], link: "", imageLink: "resources/now-salt.png" },
  { title: "Devastation", description: "Devastation is an educational web-based multiplayer videogame with the aim of teaching computer science students how Kanban works. The game invloves playing in a team of three and completing as many tickets as possible by using the workstations. This project invloved creating and hosting a java spring server and using WebSockets to enable real time multiplayer.", technologies: ['Java', 'SpringBoot', 'WebSockets', 'React', 'PixiJS', 'AWS'], link: "https://github.com/Tokeley/devastation", imageLink: "resources/devastation.png" },
  { title: "Reel It In", description: "Reel-It-In is a top down, pixel art, fishing themed video game where you control a fishing boat. The aim of the game is to collect all the fish by traversing a maze of keys and doors. This game is based of Chips Challenge. Created with Java and Swing, the game uses a model view controller architecture as well as custom pixel art amination", technologies: ['Java', 'Swing'], link: "https://github.com/Tokeley/reel-it-in", imageLink: "resources/reel-it-in.png" },
  { title: "Portfolio Website", description: "Wow, this is the website you are on right now. That is some website-ception. This portfolio website was made as a central hub where I can show case all my work. The website includes many custom componets. If you are wondering what the squiggle pattern in the background is, it is a dynamically generated flow field.", technologies: ['React', 'Tailwind', 'p5JS', 'Vercel'], link: "https://github.com/Tokeley/portfolio-website", imageLink: "resources/portfolio-website.png" },
  { title: "Lightspeed", description: "Lightspeed is an educational game with the aim of teaching young kids olds basic arithmetic. The game invloves flying a sapceship through the cosmos and surviving by lazering astroids. The game was created using the Pygame library and the pixel art was created by my friend George Hart. The game also invloves sound effects and background music I composed myself.", technologies: ['Python', 'Pygame'], link: "https://github.com/Tokeley/Light-Speed", imageLink: "resources/lightspeed.png" },

]

const Projects = () => {
  return (
    <section id="Projects" className="section h-full flex items-center justify-center pt-20">
      <div className="h-full lg:w-2/3 w-10/12 justify-center ">
        <h1 className='pb-6 lg:text-6xl text-4xl font-montserratMedium text-gray-700 dark:text-offwhite p-2 text-center'>
          Projects
        </h1>
        <div className='w-full mt-2 justify-center'>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project}/>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects