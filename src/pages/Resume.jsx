import { Heading } from '@chakra-ui/react';

const Resume = () => {
  return (
    <section id="Resume" className="section h-screen flex items-center justify-center pt-14">
        <div className="h-full w-2/3 bg-white bg-opacity-50 backdrop-blur-md shadow-xl rounded-md flex items-center justify-center">
          <Heading as="h2" size="2xl" className="text-gray-700">Resume</Heading>
        </div>
    </section>
  )
}

export default Resume