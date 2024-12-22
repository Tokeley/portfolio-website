const stats = [
  { label: "Creating:", value: "This website", link: "https://github.com/Tokeley/portfolio-website"},
  { label: "Working at:", value: "Serato Audio Research Lab", link: "https://serato.com/"}, 
  { label: "Reading:", value: "Brave New World", link: "https://en.wikipedia.org/wiki/Brave_New_World"},
]


const About = () => {
  return (
    <section id="About" className="section h-screen flex items-center justify-center py-32">
      <div className="h-full w-4/5 flex  p-10 ">
        <div className='h-full w-1/2 -800 mr-10 '>
          <h2 className='text-8xl font-montserratMedium text-gray-700 dark:text-offwhite p-2'>
            Hi, I'm Alex
          </h2>
          <p className='text-3xl font-montserratLight text-gray-700 dark:text-offwhite p-2'>
            Software Engineer • Musician • Student
          </p>
          <div className='w-full border-t-2 border-gray-400 dark:border-offwhite my-4'></div>
          <a href="https://www.google.com/maps/place/Auckland/@-36.8596971,174.5413126,11z/data=!3m1!4b1!4m6!3m5!1s0x6d0d47fb5a9ce6fb:0x500ef6143a29917!8m2!3d-36.8508827!4d174.7644881!16zL20vMDEydHM?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className='flex hover:cursor-pointer items-center group p-2'>
            <i className="fa fa-map-marker-alt text-gray-700 dark:text-offwhite text-4xl"></i>
            <p className='ml-4 text-3xl font-montserratMedium text-gray-700 dark:text-offwhite p-2'>
              Auckland, New Zealand
            </p>
            <i className="fa fa-arrow-right text-gray-700 dark:text-offwhite text-3xl pl-2 transform translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"></i>
          </a>
          <div className='w-full border-t-2 border-gray-400 dark:border-offwhite my-4'></div>
          <div className='w-full p-2'>
            <p className='mb-2 text-3xl font-montserratMedium text-gray-700 dark:text-offwhite '>
              Currently I am...
            </p>
            <div className='pl-2 w-full h-full '>
              {stats.map((stat, index) => (
                <div className='flex py-2 items-center'>
                  <div className='w-1/4'>
                    <p className='text-2xl font-montserratLight'>{stat.label}</p>
                  </div>
                  <a key={index} a href={stat.link} target="_blank" rel="noopener noreferrer" className='w-3/4 flex hover:cursor-pointer items-center group'>
                    <p className='text-2xl font-montserratLight font-bold'>{stat.value}</p>
                    <i className="fa fa-arrow-right text-gray-700 dark:text-offwhite text-2xl pl-2 transform translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"></i>
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className='w-full border-t-2 border-gray-400 dark:border-offwhite my-4'></div>
          <a href="/resources/Alex_Manning_CV_2024.pdf" target="_blank" rel="noreferrer" className='flex hover:cursor-pointer items-center group p-2'>
              <i className="fa fa-file text-gray-700 dark:text-offwhite text-4xl"></i>
              <p className='ml-4 text-3xl font-montserratMedium text-gray-700 dark:text-offwhite p-2'>
                  My Resume
              </p>
              <i className="fa fa-arrow-right text-gray-700 dark:text-offwhite text-3xl pl-2 transform translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"></i>
          </a>

        </div>
        <div className='border-r-2 border-gray-400 dark:border-offwhite'></div>
        <div className='h-full w-1/2  ml-10'>
          <p className='text-2xl font-montserratLight pb-4'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className='text-2xl font-montserratLight font-light pb-4'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className='text-2xl font-montserratLight font-light pb-4'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;