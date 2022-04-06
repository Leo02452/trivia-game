import md5 from 'crypto-js/md5';

const gravatarAPI = async (email) => {
  const hashCreated = md5(email).toString();
  // console.log(hashCreated);
  const response = await fetch(`https://www.gravatar.com/avatar/${hashCreated}/`);
  return response.url;
};

export default gravatarAPI;
