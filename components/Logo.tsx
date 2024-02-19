function Logo(props: any) {
  const { renderDefault, title } = props;
  return (
    <div>
      <div className=' flex items-center space-x-2'>
        <p className='rounded-full'>Hari</p>
      </div>
      ;<>{renderDefault(props)}</>
    </div>
  );
}

export default Logo;
