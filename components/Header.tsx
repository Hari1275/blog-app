import Image from 'next/image';
import Link from 'next/link';

function Header() {
  return (
    <header className='flex items-center justify-between space-x-2 font-bold px-10 py-5'>
      <div className='flex items-center space-x-2'>
        <Link href='/'>
          <Image
            src='https://images.unsplash.com/photo-1673468488507-1c8b71314b75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80'
            width={50}
            height={50}
            className='rounded-full'
            alt='logo'
          ></Image>
        </Link>
        <h1>Hari</h1>
      </div>
      <div>
        <Link
          href='/'
          className='px-3 py-3 text-sm md:text-base bg-gray-900 text-[#F7AB0A] flex items-center rounded-full text-center'
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
}

export default Header;
