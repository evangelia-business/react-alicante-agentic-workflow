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

      <Grid gap="4" templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }}>
        {speakers.map((speaker) => (
          <SpeakerCard
            key={speaker.name}
            name={speaker.name}
            sessions={speaker.sessions}
          />
        ))}
      </Grid>
    </Flex>
  );
}
