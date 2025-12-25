interface AuthorCardProps {
  name: string;
  bio: string;
  avatar?: string;
}

export function AuthorCard({ name, bio, avatar }: AuthorCardProps) {
  return (
    <div className="flex items-start gap-4 p-6 bg-secondary/50 rounded-lg mt-12">
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-xl font-semibold">
          {name.charAt(0)}
        </div>
      )}
      <div>
        <h4 className="font-semibold mb-1">{name}</h4>
        <p className="text-sm text-muted-foreground">{bio}</p>
      </div>
    </div>
  );
}