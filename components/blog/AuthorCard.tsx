import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AuthorCardProps {
  name: string;
  bio: string;
  avatar?: string;
}

export function AuthorCard({ name, bio, avatar }: AuthorCardProps) {
  return (
    <div className="max-w-md mx-auto mt-16">
      <div className="flex items-center gap-4 p-6 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
        <Avatar className="h-16 w-16 ring-2 ring-border">
          <AvatarImage
            src={avatar}
            alt={name}
            className="object-cover object-[center_15%]"
          />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground">{bio}</p>
        </div>
      </div>
    </div>
  );
}