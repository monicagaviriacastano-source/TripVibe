type MemberAvatarProps = {
  name: string;
  avatar?: string;
  className?: string;
};

export function MemberAvatar({ name, avatar, className = '' }: MemberAvatarProps) {
  if (avatar) {
    return <img src={avatar} alt="" className={className} />;
  }

  const initial = name.trim().charAt(0).toUpperCase() || '?';

  return (
    <div
      className={`${className} bg-[#a8e6d9] text-[#00201b] flex items-center justify-center font-bold`}
      aria-label={name}
    >
      <span className="font-caption leading-none">{initial}</span>
    </div>
  );
}
