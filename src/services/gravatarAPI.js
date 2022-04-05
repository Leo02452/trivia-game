import md5 from 'crypto-js/md5';

const gravatarAPI = async (email) => {
  const hashCreated = md5(email).toString();
  await fetch(`https://br.gravatar.com/site/implement/${hashCreated}/`);
};

export default gravatarAPI;
