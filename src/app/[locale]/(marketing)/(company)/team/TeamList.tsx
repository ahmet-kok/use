import { TeamMember } from "@/lib/airtable";
import { TeamCard } from "@/components/ui/team-card";

interface TeamListProps {
  team: TeamMember[];
}

function TeamSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
      {[...Array(4)].map((_, i) => (
        <div key={i}>
          <div className="bg-dark-100 dark:bg-dark-800 aspect-[4/3] animate-pulse rounded-lg" />
          <div className="mt-6 space-y-4">
            <div className="bg-dark-100 dark:bg-dark-800 h-8 animate-pulse rounded" />
            <div className="bg-dark-100 dark:bg-dark-800 h-4 w-2/3 animate-pulse rounded" />
            <div className="space-y-3">
              <div className="bg-dark-100 dark:bg-dark-800 h-4 animate-pulse rounded" />
              <div className="bg-dark-100 dark:bg-dark-800 h-4 animate-pulse rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TeamList({ team }: TeamListProps) {
  return (
    <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
      {team.map((member, index) => (
        <TeamCard
          key={index}
          index={index}
          name={member.name}
          role={member.role}
          image={member.image}
          linkedin={member.linkedin}
          bio={member.bio}
        />
      ))}
    </div>
  );
}

export { TeamSkeleton };
