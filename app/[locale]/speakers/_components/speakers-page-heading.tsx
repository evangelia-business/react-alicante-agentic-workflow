import { PageHeading } from "@/components/atoms/page-heading";
import { useTranslations } from "next-intl";

export function SpeakersPageHeading() {
  const t = useTranslations("SpeakersPage");

  return <PageHeading title={t("title")}>{t("description")}</PageHeading>;
}
