import React, { useEffect, useContext } from 'react';
import { DarkModeContext } from '../contexts/DarkModeContext';
import {
  Box,
  chakra,
  Container,
  Text,
  HStack,
  VStack,
  Flex,
  useBreakpointValue,
  Badge,
} from '@chakra-ui/react';

const experiences = [
  {
    id: 1,
    date: 'November, 2024 - Feburary, 2025',
    title: 'Software Engineer Intern • Serato',
    description: `At Serato I implemented new features and fixed bugs for their beat making application, Studio. The bulk of the work I did was on a hardware messaging system that allowed Studio to communicate with external devices. My responsibilities also included writing unit tests, code reviews, and documentation.`,
    technologies: ['C++', 'QT', 'Python', 'Azure DevOps']
  },
  {
    id: 2,
    date: 'December, 2023 - Feburary, 2024',
    title: 'Software Engineer Intern • NOW',
    description: `At NOW NZ, I developed and deployed an internal web application to streamline client and service information retrieval for technical support staff, improving operational efficiency and customer service delivery. I gained valuable CI/CD experience using Docker, Kubernetes, and Bitbucket Pipelines.`,
    technologies: ['JS','React', 'GraphQL', 'MUI', 'Docker', 'Bitbucket'] 
  },
  {
    id: 3,
    date: 'Feburary, 2023 - November, 2024',
    title: 'Tutor • Victoria University of Wellington',
    description:
      'As a tutor for Introduction to Computer Program Design, Data Structures and Algorithms, and Software Design, I provided personalized one-on-one guidance and feedback during lab sessions. I also marked student assignments, offering constructive feedback to help improve their coding skills.',
    technologies: ['Java', 'Marking', 'Communication']
  },
  {
    id: 4,
    date: 'July, 2018 - Feburary, 2022',
    title: 'Technician • MyDevice',
    description:
      "I oversaw order dispatch, storefront operations, and sales. I carried out laptop and industrial machinery repairs. Additionally, I managed the store database, maintaining accurate inventory, customer data, and sales records.",
    technologies: ['Customer Service', 'Laptop repair']
  }
];

const Experience = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <section id="Experience" className="h-full pt-20">
      <Container className="lg:w-2/3 w-10/12 justify-center p-0">
        <h1 className='pb-6 lg:text-6xl text-4xl font-montserratMedium text-gray-700 dark:text-offwhite p-2 text-center'>
          Experience
        </h1>
        {experiences.map((milestone) => (
          <Flex key={milestone.id} mb="10px">
            {/* Desktop view(left card) */}
            {isDesktop && milestone.id % 2 === 0 && (
              <>
                <EmptyCard />
                <LineWithDot />
                <Card {...milestone} />
              </>
            )}

            {/* Mobile view */}
            {isMobile && (
              <>
                <LineWithDot />
                <Card {...milestone} />
              </>
            )}

            {/* Desktop view(right card) */}
            {isDesktop && milestone.id % 2 !== 0 && (
              <>
                <Card {...milestone} />

                <LineWithDot />
                <EmptyCard />
              </>
            )}
          </Flex>
        ))}
      </Container>
    </section>
    
  );
};

const Card = ({ id, title, description, date, technologies }) => {
  const { darkModeOn } = useContext(DarkModeContext);

  const isEvenId = id % 2 == 0;
  let borderWidthValue = isEvenId ? '15px 15px 15px 0' : '15px 0 15px 15px';
  let leftValue = isEvenId ? '-15px' : 'unset';
  let rightValue = isEvenId ? 'unset' : '-15px';

  const isMobile = useBreakpointValue({ base: true, md: false });
  if (isMobile) {
    leftValue = '-15px';
    rightValue = 'unset';
    borderWidthValue = '15px 15px 15px 0';
  }

  return (
    <HStack
      flex={1}
      p={{ base: 3, sm: 6 }}
      spacing={5}
      rounded="lg"
      pos="relative"
      className='group hover:scale-105 transition-all duration-300 rounded-lg shadow-md mb-4 bg-white/70 dark:bg-gray-800/70 dark:hover:bg-gray-800 hover:bg-white'
      _before={{
        content: `""`,
        w: '0',
        h: '0',
        borderColor: darkModeOn ? 'transparent rgba(31, 41, 55, 0.7) transparent' : 'transparent rgba(255, 255, 255, 0.7) transparent',
        borderStyle: 'solid',
        borderWidth: borderWidthValue,
        position: 'absolute',
        left: leftValue,
        right: rightValue,
        display: 'block'
      }}
    >
      <Box>
        <Text color={isEvenId ? 'purple.400' : 'blue.400'} className="lg:text-sm text-xs font-montserratMedium text-gray-800 dark:text-gray-200">
          {date}
        </Text>

        <VStack spacing={2} textAlign="left">
          <chakra.h1 lineHeight={1.2} w="100%" className="lg:text-xl text-base font-montserratMedium text-gray-700 dark:text-offwhite">
            {title}
          </chakra.h1>
          <Text className="lg:text-sm text-xs font-montserratLight text-gray-600 dark:text-gray-300">{description}</Text>
        </VStack>
        <HStack spacing={2} align="left" mt={2} className='flex-wrap'>
            {technologies.map((tech, index) => (
              <Badge
                key={index}
                className="text-xs font-montserratMedium py-1 px-2 text-gray-800 dark:text-gray-200"
              >
                {tech}
              </Badge>
            ))}
          </HStack>
      </Box>
    </HStack>

  );
};

const LineWithDot = () => {
  return (
    <Flex
      pos="relative"
      alignItems="center"
      mr={{ base: '40px', md: '40px' }}
      ml={{ base: '0', md: '40px' }}
    >
      <chakra.span
        position="absolute"
        left="50%"
        height="calc(100% + 10px)"
        border="1px solid"
        top="0px"
        className='dark:bg-white text-gray-400'
      ></chakra.span>
      <Box pos="relative" p="10px">
        <Box
          className='dark:bg-white bg-gray-600'
          pos="absolute"
          top="0"
          left="0"
          bottom="0"
          right="0"
          width="100%"
          height="100%"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="center center"
          borderRadius="100px"
          backgroundImage="none"
          opacity={1}
        ></Box>
      </Box>
    </Flex>
  );
};

const EmptyCard = () => {
  return <Box flex={{ base: 0, md: 1 }} p={{ base: 0, md: 6 }} bg="transparent"></Box>;
};

export default Experience;