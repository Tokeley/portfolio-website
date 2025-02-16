import { Badge, Box, HStack, Image, Flex } from "@chakra-ui/react";

const ProjectCard = ({ project }) => {

  return (
      <Flex
        direction={{ base: "column", lg: "row" }} // Switch direction based on screen size
        overflow=""
        width="full"
        className="group hover:scale-105 hover:cursor-default transition-all duration-300 rounded-lg shadow-md mb-4 bg-white/70 dark:bg-gray-800/70 dark:hover:bg-gray-800 hover:bg-white"
      >
        <Box
          padding={4}
          className="w-full lg:w-1/4 flex-col items-center justify-center"
        >
          <Image
            height="full"
            width="full"
            className="border-2 border-gray-200 dark:border-gray-700 rounded-lg"
            src={project.imageLink}
            alt={project.title}
          />
        </Box>
        <Box padding={4} className="w-full lg:w-3/4">
          <Box className="md:flex items-center mb-2">
            <Box
              className="flex items-center lg:text-xl text-lg font-montserratMedium text-gray-700 dark:text-offwhite"
            >
              {project.title}
            </Box>

            {(project.codeLink || project.liveLink) && (
              <i className="fa fa-arrow-right text-gray-700 dark:text-offwhite text-xl pl-1 transform md:translate-x-8 md:opacity-0 group-hover:md:translate-x-0 group-hover:md:opacity-100 transition-all duration-300 hidden md:inline"></i>
            )}

            {(project.codeLink || project.liveLink) && (
              <div className="my-2 md:border-0 border-t border-gray-200 dark:border-gray-700 w-full md:w-auto"></div>
            )}

            <div className="flex justify-around md:justify-normal md:py-0">
              {project.codeLink && (
                <a
                  href={project.codeLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="w-36 shadow-md hover:cursor-pointer hover:scale-105 rounded-md ml-3 border border-gray-700 flex items-center px-2 backdrop-blur-lg md:opacity-0 md:translate-x-8 md:group-hover:translate-x-0 md:group-hover:opacity-100 transition-all duration-300">
                    <p
                      
                      className="text-md font-montserratMedium text-gray-700 dark:text-offwhite flex-grow text-center"
                    >
                      Code
                    </p>
                    <i className="fa fa-code text-gray-700 dark:text-offwhite text-md ml-auto"></i>
                  </div>
                </a>
              )}


              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="w-36 shadow-md hover:cursor-pointer hover:scale-105 rounded-md ml-0 md:ml-3 mr-3 md:mr-0 border border-gray-700 flex items-center px-2 backdrop-blur-lg md:opacity-0 md:translate-x-8 md:group-hover:translate-x-0 md:group-hover:opacity-100 transition-all duration-300">
                    <p
                      className="text-md font-montserratMedium text-gray-700 dark:text-offwhite flex-grow text-center"
                    >
                      {project.liveLinkText}
                    </p>
                    <i className="fa fa-signal text-gray-700 dark:text-offwhite text-md ml-auto"></i>
                  </div>
                </a>
              )}

            </div>

            {(project.codeLink || project.liveLink) && (
              <div className="my-2 md:border-0 border-t border-gray-200 dark:border-gray-700 w-full md:w-auto"></div>
            )}


          </Box>
          <Box className="lg:text-md text-xs font-montserratLight text-gray-600 dark:text-gray-300">
            {project.description}
          </Box>
          <HStack mt={2} spacing={2} className="flex-wrap">
            {project.technologies.map((tech, index) => (
              <Badge
                key={index}
                className="text-xs font-montserratMedium py-1 px-2 text-gray-800 dark:text-gray-200"
              >
                {tech}
              </Badge>
            ))}
          </HStack>
        </Box>
      </Flex>

  ); 
};

export default ProjectCard;
