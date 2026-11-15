"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  avatarFallback: string;
}

interface TeamManagementProps {
  className?: string;
}

const defaultMembers: TeamMember[] = [
  { id: "1", name: "Alex Johnson", email: "alex@example.com", role: "Admin", avatarFallback: "AJ" },
  { id: "2", name: "Samantha Lee", email: "sam@example.com", role: "Editor", avatarFallback: "SL" },
  { id: "3", name: "Jordan Smith", email: "jordan@example.com", role: "Viewer", avatarFallback: "JS" },
  { id: "4", name: "Casey Rivera", email: "casey@example.com", role: "Editor", avatarFallback: "CR" },
];

const roleBadgeVariant: Record<string, "default" | "secondary" | "outline"> = {
  Admin: "default",
  Editor: "secondary",
  Viewer: "outline",
};

export function TeamManagement({ className }: TeamManagementProps) {
  const [members, setMembers] = useState<TeamMember[]>(defaultMembers);

  const removeMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Team Members</h2>
          <p className="text-sm text-muted-foreground">Manage your team members and their roles.</p>
        </div>
        <Button size="sm">Invite Member</Button>
      </div>
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Member</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Role</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="" alt={member.name} />
                        <AvatarFallback>{member.avatarFallback}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{member.email}</td>
                  <td className="px-4 py-3">
                    <Badge variant={roleBadgeVariant[member.role] ?? "secondary"}>{member.role}</Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => removeMember(member.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No team members yet. Invite someone to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
