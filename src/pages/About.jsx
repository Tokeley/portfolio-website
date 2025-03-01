const stats = [
  { label: "Creating:", value: "This website", link: "https://github.com/Tokeley/portfolio-website"},
  { label: "Studying at:", value: "Victoria University", link: "https://www.wgtn.ac.nz/"}, 
  { label: "Reading:", value: "A History of The World in 47 Borders", link: "https://www.youtube.com/watch?v=MkXHsq0gqrQ"},
]


const About = () => {
  return (
    <section id="About" className="section lg:h-screen h-full flex items-center justify-center py-32">
      <div className="flex items-center justify-center">
        <div className="h-full w-4/5 lg:flex  lg:p-8 ">
          <div className='h-full lg:w-1/2 -800 lg:mr-8 '>
            <h2 className='lg:text-6xl text-4xl font-montserratMedium text-gray-700 dark:text-offwhite p-2'>
              Hi, I'm Alex
            </h2>
            <p className='lg:text-xl text-lg font-montserratLight text-gray-700 dark:text-offwhite p-2'>
              Software Engineer • Musician • Student
            </p>
            <div className='w-full border-t-2 border-gray-400 dark:border-offwhite my-2'></div>
            <a href="https://www.google.com/maps/place/Auckland/@-36.8596971,174.5413126,11z/data=!3m1!4b1!4m6!3m5!1s0x6d0d47fb5a9ce6fb:0x500ef6143a29917!8m2!3d-36.8508827!4d174.7644881!16zL20vMDEydHM?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className='flex hover:cursor-pointer items-center group p-2'>
              <i className="fa fa-map-marker-alt text-gray-700 dark:text-offwhite lg:text-xl text-base"></i>
              <p className='ml-2 lg:text-xl text-base font-montserratMedium text-gray-700 dark:text-offwhite p-2'>
                Auckland, New Zealand
              </p>
              <i className="fa fa-arrow-right text-gray-700 dark:text-offwhite lg:text-xl text-base pl-2 transform translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"></i>
            </a>
            <div className='w-full border-t-2 border-gray-400 dark:border-offwhite my-2'></div>
            <div className='w-full p-2'>
              <p className='mb-2 lg:text-xl text-base font-montserratMedium text-gray-700 dark:text-offwhite '>
                Currently I am...
              </p>
              <div className='pl-2 w-full h-full '>
                {stats.map((stat, index) => (
                  <div className='lg:flex py-1 items-center'>
                    <div className='lg:w-1/4'>
                      <p className='lg:text-lg text-sm font-montserratLight text-gray-700 dark:text-offwhite'>{stat.label}</p>
                    </div>
                    <a key={index} a href={stat.link} target="_blank" rel="noopener noreferrer" className='w-3/4 flex hover:cursor-pointer items-center group'>
                      <p className='lg:text-lg text-sm font-montserratLight font-bold text-gray-700 dark:text-offwhite'>{stat.value}</p>
                      <i className="fa fa-arrow-right text-gray-700 dark:text-offwhite lg:text-lg text-sm pl-2 transform translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"></i>
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className='w-full border-t-2 border-gray-400 dark:border-offwhite my-2'></div>
            <a href="/resources/Alex_Manning_Resume_2025.pdf" target="_blank" rel="noreferrer" className='flex hover:cursor-pointer items-center group p-2'>
                <i className="fa fa-file text-gray-700 dark:text-offwhite lg:text-xl text-base"></i>
                <p className='ml-2 lg:text-xl text-base font-montserratMedium text-gray-700 dark:text-offwhite p-2'>
                    Resume
                </p>
                <i className="fa fa-arrow-right text-gray-700 dark:text-offwhite lg:text-xl text-base pl-2 transform translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"></i>
            </a>
            <div className='w-full border-t-2 border-gray-400 dark:border-offwhite my-2'></div>
          </div>
          <div className='lg:border-r-2 border-gray-400 dark:border-offwhite'></div>
          <div className='h-full lg:w-1/2  lg:ml-8 '>
            <p className='lg:text-base text-sm font-montserratLight pb-4'>
              I am a developer who is passionate about crafting accessible and robust applications that solve problems and provide genuine value to the user. Every project I work on I make sure is as equally well designed as it is well engineered. I believe code can be just as beautiful as an aesthetic user interface. Currently I am studying Software Engineering at Victoria University of Wellington. Areas that I am interested to work within are audio software and web development.
            </p>
            <p className='lg:text-base text-sm  font-montserratLight font-light pb-4'>
              This summer I was working as a Software Engineer intern at Serato, working on hardware mapping and music production software. I contributed to the implementation and testing of a new mapping framework as well as general bug fixes and code refactoring. Last summer I did an Internship at NOW Broadband in Napier. At NOW, I developed and deployed an internal web application to streamline client and service information retrieval for technical support staff, enhancing operational efficiency and customer service delivery. 
            </p>
            <p className='lg:text-base text-sm font-montserratLight font-light pb-4'>
              In my spare time, I’m usually going to the gym, mountain biking, making beats, or jamming on the bass guitar with my band mates. 
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;