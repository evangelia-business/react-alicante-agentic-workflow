import { SpeakerCard } from "@/app/[locale]/speakers/_components/speaker-card";
import { SpeakersPageHeading } from "@/app/[locale]/speakers/_components/speakers-page-heading";
import { fetchSessions } from "@/services/sessions";
import { groupSessionsBySpeaker } from "@/utils/speakers";
import { Flex, Grid } from "@chakra-ui/react";

export default async function SpeakersPage() {
  const sessions = await fetchSessions();
  const speakers = groupSessionsBySpeaker(sessions);

  return (
    <Flex direction="column" gap="8" flex="1" width="full">
      <SpeakersPageHeading />

      <Grid
        as="ul"
        gap="4"
        templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }}
        listStyleType="none"
      >
        {speakers.map((speaker) => (
          <li key={speaker.name}>
            <SpeakerCard name={speaker.name} sessions={speaker.sessions} />
          </li>
        ))}
      </Grid>
    </Flex>
  );
}
