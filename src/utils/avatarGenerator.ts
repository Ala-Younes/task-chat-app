const AvatarGenerator = (text?: string) => {
  // TODO: implement random text here
  return `https://api.multiavatar.com/${text || "random"}.png`;
};

export { AvatarGenerator };
