import { Heading } from '@chakra-ui/react';

const Contact = () => {
  return (
    <section id="Contact" className="section h-screen flex items-center justify-center pt-14">
      <div className="h-full w-2/3 bg-white bg-opacity-50 backdrop-blur-md shadow-xl rounded-md flex items-center justify-center">
        <Heading as="h2" size="2xl" className="text-gray-700">Contact</Heading>
      </div>
    </section>
  )
}

export default Contact