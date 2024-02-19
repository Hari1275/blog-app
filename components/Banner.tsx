function Banner() {
  return (
    <div className='flex flex-col lg:flex-row lg:space-5 justify-between font-bold px-10 py-5 mb-10'>
      <div>
        <h1 className='text-7xl'>Hari Daily Blog</h1>
        <h2 className='mt-5 md:mt-0'>
          Welcome to{' '}
          <span className='underline decoration-4 decoration-[#F7AB0A] '>
            Every developer
          </span>{' '}
          favorite blog in devosphere
        </h2>
      </div>

      <p className='mt-5 md:mt-2 text-gray-400 max-w-sm'>
        New Product Features | The latest technology
      </p>
    </div>
  );
}

export default Banner;
