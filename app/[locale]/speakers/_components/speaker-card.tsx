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
        <CardTitle as="h2" fontSize="md">
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Flex as="ul" direction="column" gap="2" listStyleType="none">
          {sessions.map((session) => (
            <li key={session.id}>
              <Link
                href={`/sessions/${session.id}`}
                aria-label={`${session.title}, ${session.startTime}, by ${name}`}
              >
                <Text
                  fontSize="sm"
                  color="var(--text-secondary)"
                  _hover={{ color: "var(--accent-hex)" }}
                >
                  {session.title} · {session.startTime}
                </Text>
              </Link>
            </li>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
