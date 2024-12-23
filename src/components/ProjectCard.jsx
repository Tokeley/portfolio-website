import { Badge, Box, HStack, Image, Flex } from "@chakra-ui/react";

const ProjectCard = ({ project }) => (
  <a href={project.link} target="_blank" rel="noreferrer" >
    <Flex
      direction="row"
      overflow="hidden"
      width="full"
      padding={4}
      className="2xl:h-72 hover:scale-105 group bg-white/70 dark:bg-appleGrey/70 dark:hover:bg-appleGrey hover:bg-white hover:cursor-pointer transition-all duration-300 rounded-lg shadow-md mb-10"
    >
      <Box width="25%" padding={4} className="flex items-center justify-center">
        <Image
          height="full"
          width="full"
          className="border-2 border-gray-200 dark:border-gray-700 rounded-lg"
          src={project.imageLink}
          alt={project.title}
        />
      </Box>
      <Box width="75%" padding={4}>
        <Box className="flex">
          <Box mb={2} className="text-3xl font-montserratMedium text-gray-700 dark:text-offwhite">
            {project.title}
          </Box>
          <i className="fa fa-arrow-right text-gray-700 dark:text-offwhite text-3xl pl-2 transform translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"></i>
        </Box>
        <Box className="text-xl font-montserratLight text-gray-600 dark:text-gray-300">
          {project.description}
        </Box>
        <HStack mt={4} spacing={2}>
          {project.technologies.map((tech, index) => (
            <Badge
              key={index}
              className="text-lg font-montserratMedium py-1 px-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              {tech}
            </Badge>
          ))}
        </HStack>
      </Box>
    </Flex>
  </a>
);

export default ProjectCard;
