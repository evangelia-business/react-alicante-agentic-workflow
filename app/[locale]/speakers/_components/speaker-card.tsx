import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { Session } from "@/types/session";
import { Flex, Text } from "@chakra-ui/react";

interface SpeakerCardProps {
  name: string;
  sessions: Session[];
}

export function SpeakerCard({ name, sessions }: SpeakerCardProps) {
  return (
    <Card height="full">
      <CardHeader>
        <CardTitle fontSize="md">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Flex direction="column" gap="2">
          {sessions.map((session) => (
            <Link key={session.id} href={`/sessions/${session.id}`}>
              <Text
                fontSize="sm"
                color="var(--text-muted)"
                _hover={{ color: "var(--accent-hex)" }}
              >
                {session.title} · {session.startTime}
              </Text>
            </Link>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
