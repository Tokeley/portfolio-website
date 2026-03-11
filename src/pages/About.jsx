const stats = [
  { label: "Creating:", value: "MEAP", link: "https://meap-log.vercel.app/"},
  { label: "Working at:", value: "Serato", link: "https://serato.com/"}, 
  { label: "Reading:", value: "Klara and the Sun", link: "https://en.wikipedia.org/wiki/Klara_and_the_Sun"},
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
              Software Engineer • Musician
            </p>
            <div className='w-full border-t-2 border-gray-400 dark:border-offwhite my-2'></div>
            <a href="https://www.google.com/maps/place/wellington/data=!4m2!3m1!1s0x6d38b1fc49e974cb:0xa00ef63a213b470?sa=X&ved=1t:155783&ictx=111" target="_blank" rel="noopener noreferrer" className='flex hover:cursor-pointer items-center group p-2'>
              <i className="fa fa-map-marker-alt text-gray-700 dark:text-offwhite lg:text-xl text-base"></i>
              <p className='ml-2 lg:text-xl text-base font-montserratMedium text-gray-700 dark:text-offwhite p-2'>
                Wellington, New Zealand
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
              I am a software engineer who loves working in music technology. Currently I am working at Serato in Auckland , New Zealand, where I am developing new features for world leading DJ and music production tools. 
            </p>
            <p className='lg:text-base text-sm  font-montserratLight font-light pb-4'>
              Last year I was completing my honours year for my software engineering degree at Victoria University of Wellington. My honours capstone project, MEAP, a Musical Mechatronic Ensemble Performance system was a software system that allowed for any musician to control any group of musical mechatronic instruments (aka a music robot band!). This project was featured in the Dean’s Presentation which showcases the year’s best projects to industry leaders.
            </p>
            <p className='lg:text-base text-sm font-montserratLight font-light pb-4'>
              In my spare time, I’m usually playing tennis, mountain biking, making beats, or jamming on bass guitar with my band mates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;