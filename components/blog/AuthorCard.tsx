import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AuthorCardProps {
  name: string;
  bio: string;
  avatar?: string;
}

export function AuthorCard({ name, bio, avatar }: AuthorCardProps) {
  return (
    <div className="flex items-start gap-4 p-6 bg-secondary/50 rounded-lg mt-12">
      <Avatar className="h-16 w-16 shrink-0 ring-2 ring-border">
        <AvatarImage
          src={avatar}
          alt={name}
          className="object-cover object-[center_15%]"
        />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h4 className="font-bold text-lg mb-1">{name}</h4>
        <p className="text-muted-foreground leading-relaxed">{bio}</p>
      </div>
    </div>
  );
}